"use client"

import { Loader2 } from "lucide-react"

interface PdfRendererProps {
    url: string
}

export default function PdfRenderer({ url }: PdfRendererProps) {
    return (
        <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
            <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
                <div className="flex items-center gap-1.5">
                    {/* Controls would go here */}
                    <p className="text-sm text-zinc-700">PDF Viewer</p>
                </div>
            </div>

            <div className="flex-1 w-full max-h-screen">
                <iframe
                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
                    className="w-full h-[calc(100vh-10rem)]"
                    frameBorder="0"
                />
            </div>
        </div>
    )
}