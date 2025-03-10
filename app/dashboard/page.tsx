"use client";

import { QuickActions } from "@/components/dashboard/quick-actions";
import { ProgressCircle } from "@/components/dashboard/progress-circle";
import { PlanCards } from "@/components/dashboard/plan-cards";
import { DailyGoals } from "@/components/dashboard/daily-goals";
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background";
import { FloatingIcons } from "@/components/ui/floating-icons";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatedGradientBackground className="min-h-screen bg-background">
      <FloatingIcons iconCount={15} />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4"
        >
          {/* Health Score Section */}
          <motion.div 
            className="md:col-span-4 flex flex-col" 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card rounded-xl shadow-md p-6 flex flex-col items-center text-center relative overflow-hidden backdrop-blur-sm bg-opacity-90">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br from-green-200 via-green-300 to-green-100 rounded-full opacity-40 blur-xl"></div>
              <h2 className="font-semibold text-xl mb-4 relative z-10">Your Health Overview</h2>
              <ProgressCircle value={65} className="relative z-10" />
              <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-green-100 text-green-800 rounded-lg w-full shadow-sm">
                <p className="text-sm font-medium flex items-center">
                  <Leaf className="h-4 w-4 mr-2 animate-pulse" />
                  Energy's up 10% — keep it up!
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Daily Goals Section */}
          <motion.div 
            className="md:col-span-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-card rounded-xl shadow-md p-6 h-full relative overflow-hidden backdrop-blur-sm bg-opacity-90">
              <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-gradient-to-tr from-blue-200 via-blue-100 to-transparent rounded-full opacity-30 blur-xl"></div>
              <h2 className="font-semibold text-xl mb-4 relative z-10">Today's Mission</h2>
              <DailyGoals />
            </div>
          </motion.div>
        </motion.div>
        
        {/* Plan Cards Section */}
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="font-semibold text-xl mb-4">Your Personalized Plan</h2>
          <PlanCards />
        </motion.div>
        
        {/* Quick Actions Section */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="font-semibold text-xl mb-4">Quick Actions</h2>
          <QuickActions />
        </motion.div>
        
        <motion.footer 
          className="mt-12 text-center text-sm text-muted-foreground pb-20 lg:pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-6 w-32 h-1 bg-gradient-to-r from-transparent via-green-200 to-transparent rounded-full"></div>
            Small wins today = a big you tomorrow.
          </div>
        </motion.footer>
      </div>
    </AnimatedGradientBackground>
  );
}