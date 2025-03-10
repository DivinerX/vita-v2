"use client";

import { useState, useRef, useEffect } from "react";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  const tone = "friend"; // This would come from user preferences
  const vitaName = "Emma"; // This would come from user preferences
  
  const suggestions = [
    "How's my diet?",
    "I need help with sleep",
    "What exercises should I do?",
    "I'm feeling stressed",
    "Track my water intake"
  ];
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Initial greeting based on selected goal
  useEffect(() => {
    let initialMessage = "Hey there! I'm Emma, your health companion. How can I help you today?";
    
    if (goalParam) {
      const greetings: Record<string, string> = {
        'weight-loss': "Let's talk about your weight loss journey! What specific goals are you aiming for?",
        'chronic-disease': "I'm here to help you manage your health condition. What symptoms are you experiencing?",
        'short-term-bug': "Sorry to hear you're not feeling well. Tell me what's going on so I can help you feel better!",
        'fitness': "Ready to get fit? Let's craft a routine that works for your lifestyle and goals!",
        'life-track': "Life feeling a bit chaotic? No worries—we'll bring order back together. What's your biggest challenge?",
        'energy': "Feeling low on energy? Let's find what's draining you and how to recharge your batteries!",
        'zen': "Finding your zen is so important. What's causing stress in your life right now?",
        'healthier': "Small steps lead to big changes! What area of your health would you like to improve first?"
      };
      
      initialMessage = greetings[goalParam] || initialMessage;
    }
    
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
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const responses = [
        "I understand how you're feeling. Let's work on a plan to help you with that.",
        "Based on what you're sharing, I'd recommend focusing on your sleep habits first. Would you like me to create a sleep improvement plan?",
        "That's a common concern. I've created a personalized meal plan that should help with your symptoms. You'll find it in your dashboard now.",
        "I hear you! Stress can definitely impact your overall health. Have you tried the 5-minute mindfulness exercise I added to your routine?",
        "Great progress! Remember, consistency is key. Keep up with your hydration goals and you'll notice improvements in your energy levels."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: randomResponse,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-green-50/10 to-transparent dark:from-blue-900/10 dark:via-green-900/5 dark:to-transparent pointer-events-none"></div>
        <div className="relative z-10">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ChatMessage
                message={message}
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
          
          {/* Goal cards appear if there are no messages yet */}
          {messages.length < 2 && !isTyping && (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
                <QuickActionCard 
                  title="Lose Weight"
                  description="Create a personalized plan to reach your ideal weight"
                  icon={<ArrowRight className="h-5 w-5" />}
                  onClick={() => {
                    setInputValue("I want to lose weight and feel better about myself.");
                  }}
                />
              </div>
              <div className="relative">
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
                <QuickActionCard 
                  title="Improve Sleep"
                  description="Develop better sleep habits for more energy"
                  icon={<ArrowRight className="h-5 w-5" />}
                  onClick={() => {
                    setInputValue("I'm having trouble sleeping and wake up tired.");
                  }}
                />
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
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
    </AnimatedGradientBackground>
  );
}