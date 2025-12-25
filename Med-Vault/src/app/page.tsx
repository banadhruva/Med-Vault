import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-zinc-900">
      <main className="flex flex-col items-center gap-8 text-center px-6">
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          Med-<span className="text-blue-600">Vault</span>
        </h1>
        <p className="max-w-prose text-zinc-700 sm:text-xl">
          Chat with your medical documents in seconds. Secure, private, and powered by AI.
        </p>
        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-white transition-hover hover:bg-blue-700 font-medium"
          >
            Go to Dashboard <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </main>
    </div>
  );
}