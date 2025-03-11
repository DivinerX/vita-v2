"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "@/components/chat/chat-message";
import { QuickActionCard } from "@/components/chat/quick-action-card";
import { ToneIndicator } from "@/components/chat/tone-indicator";
import { SuggestionChip } from "@/components/chat/suggestion-chip";
import { useSearchParams } from "next/navigation";
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background";
import { motion } from "framer-motion";
import { TRelativeCategory } from "@/types";
import api from "@/config/axios";
import { RelativeCard } from "@/components/chat/relative-card";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const searchParams = useSearchParams();
  const goalParam = searchParams.get('goal');

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tone, setTone] = useState("assistant");
  const [vitaName, setVitaName] = useState("vita");
  const [relatives, setRelatives] = useState<TRelativeCategory[]>([]);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "How's my diet?",
    "I need help with sleep",
    "What exercises should I do?",
    "I'm feeling stressed",
    "Track my water intake"
  ];

  useEffect(() => {
    setMounted(true);
    const getProfile = async () => {
      const response = await api.get("profile");
      setVitaName(response.data.vita_name);
      setTone(response.data.vita_tone);
    };
    getProfile();
  }, []);

  // Initial greeting based on selected goal
  useEffect(() => {
    let initialMessage = `Hey there! I'm ${vitaName}, your health companion. How can I help you today?`;

    // Add initial greeting after a short delay
    const timer = setTimeout(() => {
      setMessages([
        {
          id: Date.now().toString(),
          role: "assistant",
          content: initialMessage,
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
    }, 1000);

    setIsTyping(true);

    return () => clearTimeout(timer);
  }, [goalParam]);

  const handleSendMessage = async () => {
    try {
      if (!inputValue.trim()) return;

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: inputValue,
        timestamp: new Date()
      };

      // Update messages with user message
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInputValue("");
      setIsTyping(true);

      const response = await api.post("/message", {
        message: inputValue,
      });

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: response.data.content,
        timestamp: new Date()
      };

      if (response.data.relatives && response.data.relatives.length > 0) {
        setRelatives(response.data.relatives);
      }

      // Use the updated messages array that includes the user message
      setMessages([...updatedMessages, assistantMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: 'smooth'  // or 'auto' for instant scroll
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!mounted) return null;

  return (
    <AnimatedGradientBackground className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h1 className="font-semibold text-lg">Chat with {vitaName}</h1>
        </div>
        <ToneIndicator tone={tone} />
      </header>

      {/* Chat Messages */}
      <div
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 overflow-x-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-green-50/10 to-transparent dark:from-blue-900/10 dark:via-green-900/5 dark:to-transparent pointer-events-none"></div>
        <div className="relative z-10 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ChatMessage
                key={message.id}
                message={{
                  ...message,
                  content: message.content
                }}
                vitaName={vitaName}
              />
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              className="flex items-center gap-2 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
              <span className="text-sm">{vitaName} is typing...</span>
            </motion.div>
          )}

          {relatives.length > 0 && messages[messages.length - 1].role === "assistant" && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4"
            >
              {relatives.map((r) => (
                <RelativeCard
                  key={r}
                  relative={r}
                />
              ))}
            </motion.div>
          )}

          {/* Goal cards appear if there are no messages yet */}
          {messages.length < 2 && !isTyping && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative h-full">
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
                <QuickActionCard
                  title="Lose Weight"
                  description="Create a personalized plan to reach your ideal weight"
                  icon={<ArrowRight className="h-5 w-5" />}
                  onClick={() => {
                    setInputValue("I want to lose weight and feel better about myself.");
                  }}
                  className="h-full"
                />
              </div>
              <div className="relative h-full">
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
                <QuickActionCard
                  title="Improve Sleep"
                  description="Develop better sleep habits for more energy"
                  icon={<ArrowRight className="h-5 w-5" />}
                  onClick={() => {
                    setInputValue("I'm having trouble sleeping and wake up tired.");
                  }}
                  className="h-full"
                />
              </div>
              <div className="relative h-full">
                <div className="absolute -bottom-10 right-10 w-24 h-24 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
                <QuickActionCard
                  title="Get Fit"
                  description="Create a personalized workout plan to reach fitness goals"
                  icon={<ArrowRight className="h-5 w-5" />}
                  onClick={() => {
                    setInputValue("I want to get fit and feel better about myself.");
                  }}
                  className="h-full"
                />
              </div>
              <div className="relative h-full">
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
                <QuickActionCard
                  title="Manage Stress"
                  description="Find ways to reduce stress in your life"
                  icon={<ArrowRight className="h-5 w-5" />}
                  onClick={() => {
                    setInputValue("I'm feeling stressed and anxious.");
                  }}
                  className="h-full"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="px-4 py-2 bg-background/80 backdrop-blur-sm">
        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            >
              <SuggestionChip
                text={suggestion}
                onClick={() => setInputValue(suggestion)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-background/90 backdrop-blur-md">
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md"
          >
            <Send className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </AnimatedGradientBackground >
  );
}