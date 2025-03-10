"use client";

import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedGradientBackgroundProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedGradientBackground({ children, className }: AnimatedGradientBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Animated gradient shapes in the background */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-200/40 to-green-200/40 dark:from-blue-900/20 dark:to-green-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-200/40 to-pink-200/40 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2"></div>
      <div className="absolute -bottom-40 left-20 w-80 h-80 bg-gradient-to-r from-green-200/40 to-teal-200/40 dark:from-green-900/20 dark:to-teal-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4"></div>
      
      {/* Content */}
      {children}
    </div>
  );
}