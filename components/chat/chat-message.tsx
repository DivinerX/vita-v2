"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  vitaName: string;
}

export function ChatMessage({ message, vitaName }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div className={cn("flex items-start gap-3", isAssistant ? "" : "flex-row-reverse")}>
      <Avatar className={cn("h-8 w-8", isAssistant ? "border-green-500" : "")}>
        {isAssistant ? (
          <>
            <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80" />
            <AvatarFallback>VA</AvatarFallback>
          </>
        ) : (
          <>
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80" />
            <AvatarFallback>ME</AvatarFallback>
          </>
        )}
      </Avatar>

      <div className={cn(
        "group relative max-w-[80%] rounded-lg px-3 py-2 text-sm",
        isAssistant
          ? "bg-green-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-green-200 dark:border-green-100"
          : "bg-pink-50 dark:bg-pink-800 text-gray-800 dark:text-gray-200 border border-pink-200 dark:border-pink-100"
      )}>
        {isAssistant && (
          <div className="font-medium text-green-600 dark:text-green-400 mb-1">
            {vitaName}
          </div>
        )}

        <ReactMarkdown
          components={{
            // Customize markdown components styling
            h1: ({ node, ...props }) => <h1 className="text-lg font-bold" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-md font-semibold" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc ml-4" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal ml-4" {...props} />,
            strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
            p: ({ node, ...props }) => <p className="text-gray-800 dark:text-gray-200" {...props} />,
            a: ({ node, ...props }) => <a className="text-blue-600 dark:text-blue-400 underline" {...props} />,
            code: ({ node, ...props }) => <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded" {...props} />,
          }}
        >
          {message.content}
        </ReactMarkdown>

        <div className={cn(
          "text-xs mt-1",
          isAssistant ? "text-gray-500 dark:text-gray-400" : "text-gray-300 dark:text-gray-400"
        )}>
          {format(new Date(message.timestamp), 'h:mm a')}
        </div>
      </div>
    </div>
  );
}