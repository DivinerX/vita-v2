"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Droplets, HeartPulse, Sparkles, Utensils, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background";
import { FloatingIcons } from "@/components/ui/floating-icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function PredictionCard({ title, icon, value, change, color }: { 
  title: string; 
  icon: React.ReactNode; 
  value: string; 
  change: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="overflow-hidden h-full backdrop-blur-sm bg-white/90 dark:bg-black/40 shadow-md hover:shadow-lg transition-all">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="text-xl font-bold mt-1">{value}</p>
              <p className={`text-xs mt-1 ${color}`}>{change}</p>
            </div>
            <div className={`p-2 rounded-full ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function HealthTwinPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatedGradientBackground className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <FloatingIcons iconCount={20} />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="flex items-center gap-2 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold">Your Future Self</h1>
          <div className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium animate-pulse">
            BETA
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="overflow-hidden shadow-lg border-0 bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 pb-0">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  Your Health Twin
                </CardTitle>
                <CardDescription>AI-powered predictions based on your habits and data</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="relative flex justify-center mb-6">
                  <div className="absolute top-0 w-48 h-48 bg-gradient-to-b from-green-300/20 to-blue-300/20 rounded-full animate-pulse"></div>
                  <div className="z-10 flex items-center justify-center">
                    <svg
                      width="180"
                      height="180"
                      viewBox="0 0 100 100"
                      className="transform rotate-90"
                    >
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#e6e6e6"
                        strokeWidth="6"
                      />
                      
                      {/* Progress circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#healthGradient)"
                        strokeWidth="6"
                        strokeDasharray="283"
                        strokeDashoffset="85"
                        strokeLinecap="round"
                      />
                      
                      {/* Gradient definition */}
                      <defs>
                        <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#4f46e5" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-bold">68%</span>
                      <span className="text-sm text-muted-foreground">Optimal</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1 text-center">
                  <h3 className="font-medium">6-Month Forecast</h3>
                  <p className="text-sm text-muted-foreground">
                    If you maintain your current habits, you'll reach <span className="text-green-600 font-medium">78% health optimization</span> within 6 months.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20">
                <div className="w-full text-center">
                  <p className="text-sm mb-2">
                    <span className="font-medium">Probability of success:</span> 87%
                  </p>
                  <Progress value={87} className="h-1.5" />
                </div>
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Your Next Milestones</CardTitle>
                <CardDescription>Key improvements predicted by your Health Twin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Energy Level Optimization</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-2 bg-gray-200 dark:bg-gray-700">
                    <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full" style={{ width: '65%' }}></div>
                  </Progress>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600 font-medium">+20%</span> expected within 4 weeks if sleep habits improve
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Anxiety Reduction</span>
                    <span>48%</span>
                  </div>
                  <Progress value={48} className="h-2 bg-gray-200 dark:bg-gray-700">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full" style={{ width: '48%' }}></div>
                  </Progress>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600 font-medium">-30%</span> expected within 8 weeks with consistent meditation
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Physical Endurance</span>
                    <span>42%</span>
                  </div>
                  <Progress value={42} className="h-2 bg-gray-200 dark:bg-gray-700">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" style={{ width: '42%' }}></div>
                  </Progress>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600 font-medium">+35%</span> expected within 10 weeks following exercise plan
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md">
                  View Detailed Projections
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
        
        <motion.h2 
          className="text-xl font-semibold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Future Health Insights
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <PredictionCard 
            title="Energy Level Forecast" 
            icon={<Zap className="h-5 w-5" />}
            value="82/100" 
            change="+22% in 2 months" 
            color="text-amber-600"
          />
          <PredictionCard 
            title="Mental Clarity Forecast" 
            icon={<Brain className="h-5 w-5" />}
            value="74/100" 
            change="+18% in 6 weeks" 
            color="text-indigo-600"
          />
          <PredictionCard 
            title="Sleep Quality Forecast" 
            icon={<HeartPulse className="h-5 w-5" />}
            value="7.8 hours" 
            change="+1.2 hours in 1 month" 
            color="text-violet-600"
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="challenges" className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upcoming Challenges</h2>
              <TabsList className="bg-gradient-to-r from-gray-200/80 to-gray-300/80 dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-sm">
                <TabsTrigger value="challenges" className="flex-1">Upcoming Challenges</TabsTrigger>
                <TabsTrigger value="opportunities" className="flex-1">Key Opportunities</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="challenges">
              <Card className="border-red-100 shadow-md bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Energy Dip Next Week</h3>
                      <p className="text-sm text-muted-foreground">
                        Based on your sleep patterns and calendar, we predict an energy challenge next Tuesday-Thursday.
                      </p>
                      <div className="mt-1">
                        <Button variant="outline" size="sm" className="shadow-sm">View Prevention Plan</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Utensils className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Nutrition Gap</h3>
                      <p className="text-sm text-muted-foreground">
                        Your current diet is low in magnesium and B vitamins, which may impact your energy in 2-3 weeks.
                      </p>
                      <div className="mt-1">
                        <Button variant="outline" size="sm" className="shadow-sm">Get Diet Recommendations</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="opportunities">
              <Card className="border-green-100 shadow-md bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Brain className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Cognitive Enhancement Window</h3>
                      <p className="text-sm text-muted-foreground">
                        The next 3 weeks are optimal for improving mental clarity with 15min daily meditation.
                      </p>
                      <div className="mt-1">
                        <Button variant="outline" size="sm" className="shadow-sm">Start Meditation Plan</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Droplets className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Hydration Impact</h3>
                      <p className="text-sm text-muted-foreground">
                        Increasing your water intake by just 2 cups daily could boost your energy by 15% within 10 days.
                      </p>
                      <div className="mt-1">
                        <Button variant="outline" size="sm" className="shadow-sm">Set Hydration Reminder</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>A Message From Your Future Self</CardTitle>
              <CardDescription>Insights generated from your Health Twin's projections</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="p-5 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30 italic text-gray-700 dark:text-gray-300 shadow-inner relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-200/20 dark:bg-blue-400/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-200/20 dark:bg-green-400/10 rounded-full blur-xl"></div>
                <p className="relative z-10">
                  "If you stay consistent with your current sleep improvements and add just 5 minutes of meditation daily,
                  you'll likely feel significantly more energetic and focused by April. The small habits you're building now
                  are creating a foundation for lasting wellness. Your future self is grateful for every small choice you're making today."
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md">
                Update My Plan Based on Predictions
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
        
        <motion.footer 
          className="mt-8 text-center text-sm text-muted-foreground pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-6 w-32 h-1 bg-gradient-to-r from-transparent via-green-200 to-transparent rounded-full"></div>
            Your future self is built by the choices you make today.
          </div>
        </motion.footer>
      </div>
    </AnimatedGradientBackground>
  );
}