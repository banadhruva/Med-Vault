import { db } from '@/lib/db'
import { pineconeIndex } from '@/lib/pinecone'
import { auth } from '@clerk/nextjs/server'
import { OpenAIEmbeddings } from '@langchain/openai'
import { PineconeStore } from '@langchain/pinecone'
import { streamText } from 'ai'
import { openai as aiSdkOpenai } from '@ai-sdk/openai'

export async function POST(req: Request) {
  const body = await req.json()
  const { userId } = await auth()

  if (!userId) return new Response('Unauthorized', { status: 401 })

  const { fileId, messages } = body
  const lastMessage = messages[messages.length - 1].content

  // 1. Fetch the file from DB to ensure access
  const file = await db.document.findFirst({
    where: { id: fileId, userId },
  })

  if (!file) return new Response('Not Found', { status: 404 })

  // 2. Search Pinecone for relevant chunks
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  })

  // Note: We use fromExistingIndex to query
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    namespace: file.id,
  })

  // Get top 4 results
  const results = await vectorStore.similaritySearch(lastMessage, 4);

  // 3. Create the Context from the PDF chunks
  const context = results.map((r) => r.pageContent).join('\n\n')

  // 4. Stream the response
  const result = await streamText({
    model: aiSdkOpenai('gpt-4o'),
    messages: [
      {
        role: 'system',
        content: `Use the following pieces of context (hospital protocols/SOPs) to answer the user's question. 
        If you don't know the answer based on the context, just say that you don't know, don't try to make up an answer.
        ----------------
        CONTEXT:
        ${context}`,
      },
      ...messages,
    ],
    // 5. Save the conversation to the DB on completion
    onFinish: async ({ text }) => {
      await db.message.createMany({
        data: [
          {
            text: lastMessage,
            isAi: false,
            fileId: fileId,
            userId: userId,
          },
          {
            text: text,
            isAi: true,
            fileId: fileId,
            userId: userId,
          },
        ],
      });
    },
  })

  return result.toTextStreamResponse()
}