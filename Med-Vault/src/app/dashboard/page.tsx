import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DocumentGallery from "@/components/dashboard/DocumentGallery";
import UploadButton from "@/components/dashboard/UploadDropzone";

export default async function DashboardPage() {
    const { userId } = await auth();
    if (!userId) redirect("/auth-callback");

    // Fetch all hospital docs for this specific user
    const files = await db.document.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });

    return (
        <main className="max-w-7xl mx-auto md:p-10">
            <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
                <h1 className="mb-3 font-bold text-5xl text-gray-900">Med-Vault</h1>

                <UploadButton />
            </div>

            {/* The Gallery Component */}
            <DocumentGallery files={files} />
        </main>
    );
}