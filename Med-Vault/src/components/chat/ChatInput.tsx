"use client"

import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Send } from "lucide-react"
import { useRef } from "react"

interface ChatInputProps {
    input: string
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    isLoading?: boolean
}

export default function ChatInput({ input, handleInputChange, handleSubmit, isDisabled }: ChatInputProps) {
    return (
        <div className="absolute bottom-0 left-0 w-full bg-white border-t border-zinc-200 p-4">
            <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto flex gap-2 items-end"
            >
                <div className="relative flex-1">
                    <Textarea
                        autoFocus
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask a question about this document..."
                        className="resize-none pr-12 min-h-[44px] max-h-[200px] py-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault()
                                handleSubmit(e as any)
                            }
                        }}
                    />
                    <Button
                        type="submit"
                        disabled={isDisabled || !input.trim()}
                        className="absolute bottom-1.5 right-1.5 h-8 w-8"
                        size="icon"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </form>
        </div>
    )
}