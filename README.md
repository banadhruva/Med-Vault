# 🏥 Med-Vault: Secure AI Medical Assistant

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)

**Med-Vault** is a sophisticated medical document management platform that leverages AI to help users understand their health data. Upload lab results, prescriptions, or discharge summaries and interact with them through a secure, context-aware chat interface.

---

## ✨ Key Features

- **📂 Intelligent Dashboard:** Centralized gallery to manage and track all your medical history.
- **💬 Medical AI Chat:** Real-time RAG (Retrieval-Augmented Generation) allowing you to ask questions directly to your PDF documents.
- **📄 Dual-Pane Viewing:** Seamless side-by-side view with a high-fidelity PDF renderer and a chat interface.
- **🔒 Privacy First:** Secure authentication powered by **Clerk** with data isolation—your health records are yours alone.
- **⚡ Optimized Workflows:** Fast file uploading via **UploadThing** and immediate document indexing.

---

## 🛠️ Architecture & Tech Stack



- **Core:** Next.js 15 (App Router)
- **Database:** PostgreSQL via Prisma ORM
- **Auth:** Clerk (Middleware-protected routes)
- **UI/UX:** Tailwind CSS, Shadcn UI, Lucide Icons
- **PDF Logic:** React-PDF-Renderer
- **AI/LLM:** LangChain & OpenAI API

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ 
- A PostgreSQL database (Local or hosted like Neon/Supabase)

### 2. Installation
```bash
git clone [https://github.com/banadhruva/med-vault.git](https://github.com/your-username/med-vault.git)
cd med-vault
npm install
```

### 3. Environment Configuration

- Database
DATABASE_URL="postgresql://user:password@localhost:5432/medvault"

- Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

- UploadThing
UPLOADTHING_SECRET=...
UPLOADTHING_APP_ID=...

- AI
OPENAI_API_KEY=sk-...

### 4. Database Setup & Prisma Fix

- Push schema to DB
npx prisma db push

- Generate the custom client
npx prisma generate



