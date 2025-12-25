import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { pineconeIndex } from "@/lib/pinecone";

const f = createUploadthing();

export const ourFileRouter = {
    pdfUploader: f({ pdf: { maxFileSize: "16MB" } })
        .middleware(async ({ req }) => {
            const { userId } = await auth();
            if (!userId) throw new Error("Unauthorized");
            return { userId };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // 1. Create a record in your PostgreSQL DB via Prisma
            const createdFile = await db.document.create({
                data: {
                    key: file.key,
                    name: file.name,
                    userId: metadata.userId,
                    url: file.url,
                    uploadStatus: 'PROCESSING', // Let the UI know we're working on it
                },
            });

            try {
                // 2. Fetch the file from the cloud and load it
                const response = await fetch(file.url);
                const blob = await response.blob();
                const loader = new PDFLoader(blob);
                const pageLevelDocs = await loader.load();

                // 3. Prepare the AI "Brain" (Embeddings)
                const embeddings = new OpenAIEmbeddings({
                    openAIApiKey: process.env.OPENAI_API_KEY,
                });

                // 4. Push to Pinecone (The Vector Vault)
                // We use a namespace unique to the file to keep data isolated
                await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
                    pineconeIndex,
                    namespace: createdFile.id,
                });

                // 5. Success! Update status so the UI can show a green checkmark
                await db.document.update({
                    where: { id: createdFile.id },
                    data: { uploadStatus: 'SUCCESS' },
                });
            } catch (err) {
                console.error("Vectorization failed:", err);
                await db.document.update({
                    where: { id: createdFile.id },
                    data: { uploadStatus: 'FAILED' },
                });
            }
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;