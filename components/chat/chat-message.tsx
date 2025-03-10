"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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
          ? "bg-gradient-to-r from-green-50 to-green-100 text-gray-800" 
          : "bg-primary text-primary-foreground"
      )}>
        {isAssistant && (
          <div className="font-medium text-green-600 mb-1">
            {vitaName}
          </div>
        )}
        
        <div className="whitespace-pre-wrap break-words">{message.content}</div>
        
        <div className={cn(
          "text-xs mt-1 opacity-70",
          isAssistant ? "text-gray-600" : "text-gray-300"
        )}>
          {format(new Date(message.timestamp), 'h:mm a')}
        </div>
      </div>
    </div>
  );
}