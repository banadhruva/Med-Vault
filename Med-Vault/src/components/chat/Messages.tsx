import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"

interface MessagesProps {
    messages: any[]
}

export default function Messages({ messages }: MessagesProps) {
    if (messages.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center gap-2 mt-24">
                <Bot className="h-10 w-10 text-blue-500 animate-pulse" />
                <h3 className="font-semibold text-xl text-zinc-800">Internal Assistant Ready</h3>
                <p className="text-zinc-500 text-sm">Query the uploaded SOP or manual above.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 px-2 py-4 overflow-y-auto">
            {messages.map((message, i) => {
                const isAi = message.role === "assistant"

                return (
                    <div
                        key={i}
                        className={cn("flex items-end gap-2", {
                            "justify-end": !isAi,
                        })}
                    >
                        <div
                            className={cn("flex flex-col space-y-2 text-sm max-w-[85%] mx-2", {
                                "order-1 items-end": !isAi,
                                "order-2 items-start": isAi,
                            })}
                        >
                            <div
                                className={cn("px-4 py-2 rounded-lg shadow-sm", {
                                    "bg-blue-600 text-white rounded-br-none": !isAi,
                                    "bg-white border border-zinc-200 text-gray-900 rounded-bl-none": isAi,
                                })}
                            >
                                {message.content}
                            </div>
                        </div>

                        <div
                            className={cn("h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0", {
                                "bg-blue-100 order-2": !isAi,
                                "bg-zinc-800 order-1": isAi,
                            })}
                        >
                            {isAi ? (
                                <Bot className="h-5 w-5 text-white" />
                            ) : (
                                <User className="h-5 w-5 text-blue-600" />
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}