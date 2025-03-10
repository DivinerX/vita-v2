"use client";

import { Button } from "@/components/ui/button";
import { WelcomeHero } from "@/components/welcome/welcome-hero";
import { SocialProof } from "@/components/welcome/social-proof";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FloatingIcons } from "@/components/ui/floating-icons";
import { motion } from "framer-motion";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-gray-950 -z-10"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-60 h-60 bg-gradient-to-br from-green-200/30 to-blue-200/30 dark:from-green-900/20 dark:to-blue-900/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-tr from-indigo-200/30 to-purple-200/30 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      
      <FloatingIcons iconCount={15} />
      
      <div className="max-w-3xl w-full flex flex-col items-center text-center space-y-8 px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <WelcomeHero />
        </motion.div>
        
        <motion.h1 
          className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Your Health, Reimagined—Meet Vita AI.
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          The companion who listens, plans, and cheers you on—starting <span className="font-semibold">now</span>.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <SocialProof />
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <Button asChild className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group relative">
            <Link href="/signup">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer group-hover:animate-none"></div>
              <span className="relative z-10">Start Your Journey</span>
            </Link>
          </Button>
          
          <Button variant="outline" className="py-6 text-lg rounded-lg border-2 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300">
            <Link href="/how-it-works">See How It Works</Link>
          </Button>
        </motion.div>
        
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-6 w-32 h-1 bg-gradient-to-r from-transparent via-green-200 to-transparent rounded-full"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400 pt-8">
            Trusted by thousands—join the wellness revolution.
          </p>
        </motion.div>
        
        {/* Decorative images positioned around the edges */}
        <img 
          src="https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?w=300&h=300&fit=crop&q=80" 
          alt="Meditation" 
          className="absolute bottom-20 -left-40 w-64 h-64 object-cover rounded-lg shadow-lg opacity-60 hidden lg:block" 
        />
        <img 
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=300&fit=crop&q=80" 
          alt="Healthy Food" 
          className="absolute top-20 -right-32 w-48 h-48 object-cover rounded-lg shadow-lg opacity-60 hidden lg:block rotate-3" 
        />
      </div>
    </main>
  );
}