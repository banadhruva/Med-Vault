import { Pinecone } from '@pinecone-database/pinecone';

if (!process.env.PINECONE_API_KEY) {
    throw new Error('Missing PINECONE_API_KEY in .env');
}

export const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

// Replace 'med-vault' with the actual name of the index you created in the Pinecone dashboard
export const pineconeIndex = pinecone.Index('med-vault');