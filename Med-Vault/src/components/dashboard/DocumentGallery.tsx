"use client"

import { File, MessageSquare, Plus, Trash } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
// Remove date-fns

interface DocumentGalleryProps {
    files: any[]
}

export default function DocumentGallery({ files }: DocumentGalleryProps) {
    if (files.length === 0) {
        return (
            <div className="mt-16 flex flex-col items-center gap-2">
                <File className="h-8 w-8 text-zinc-800" />
                <h3 className="font-semibold text-xl">Pretty empty around here</h3>
                <p>Let&apos;s upload your first hospital SOP.</p>
            </div>
        )
    }

    return (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
            {files.map((file) => (
                <li
                    key={file.id}
                    className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
                >
                    <Link href={`/dashboard/${file.id}`} className="flex flex-col gap-2">
                        <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    <h3 className="truncate text-lg font-medium text-zinc-900">
                                        {file.name}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <div className="px-6 mt-4 grid grid-cols-3 py-2 gap-6 text-xs text-zinc-500">
                        <div className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            {new Date(file.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </div>

                        <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            mocked
                        </div>

                        <Button
                            size="sm"
                            variant="destructive"
                            className="w-full"
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                </li>
            ))}
        </ul>
    )
}