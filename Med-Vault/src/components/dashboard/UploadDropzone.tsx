"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { UploadDropzone } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"

export default function UploadButtonComponent() {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Upload PDF</Button>
            </DialogTrigger>
            <DialogContent>
                <UploadDropzone
                    endpoint="pdfUploader"
                    onClientUploadComplete={(res: any) => {
                        // Do something with the response
                        console.log("Files: ", res);
                        setIsOpen(false);
                        router.refresh();
                    }}
                    onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                    }}
                />
            </DialogContent>
        </Dialog>
    )
}