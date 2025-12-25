"use client"

import { useChat } from "@ai-sdk/react"
import ChatInput from "./ChatInput"
import Messages from "./Messages"

export default function ChatWrapper({ fileId }: { fileId: string }) {
    // For version 2.x, 'api' is correct, but we need to satisfy 
    // the generic type requirements of the hook
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: '/api/chat',
        body: {
            fileId
        },
    })

    return (
        <div className="relative min-h-full bg-zinc-50 flex flex-col justify-between gap-2 p-4">
            <div className="flex-1 overflow-y-auto mb-20">
                <Messages messages={messages} isLoading={isLoading} />
            </div>

            <ChatInput
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </div>
    )
}