"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Brain, Heart, Award, Sparkles, Activity, ArrowLeft, ChevronRight, Zap, Dumbbell, Droplets, Moon, Clock, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background";
import { FloatingIcons } from "@/components/ui/floating-icons";
import Link from "next/link";

export default function HowItWorksPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.6 }
    })
  };

  return (
    <AnimatedGradientBackground className="min-h-screen pb-20">
      <FloatingIcons iconCount={25} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-10">
        <header className="pt-6 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 text-transparent bg-clip-text">
                How Vita AI Works
              </h1>
            </div>
            <Button asChild className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md">
              <Link href="/signup">
                Start Now
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </header>
        
        {/* Hero Section */}
        <motion.section 
          className="mb-20"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          custom={0}
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Your AI Health Companion for a Better You</h2>
              <p className="text-muted-foreground text-lg mb-6">
                Vita AI learns about your unique health patterns and creates personalized guidance that evolves as you do. It's not just an app—it's a relationship that grows with you.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/30 dark:to-green-900/30 p-4 rounded-lg shadow-inner">
                <p className="italic text-sm">
                  "Using Vita AI has completely transformed my approach to wellness. It's like having a health coach, therapist, and friend all in one."
                  <span className="block mt-2 font-medium">— Sarah M., using Vita AI for 6 months</span>
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200/30 dark:bg-blue-800/30 rounded-full blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1519781542704-957ff19eff00?auto=format&fit=crop&q=80&w=800" 
                alt="Person using Vita AI on a smartphone" 
                className="rounded-2xl shadow-2xl w-full object-cover h-[400px]"
              />
              <div className="absolute -bottom-5 -right-5 w-40 h-40 bg-green-200/30 dark:bg-green-800/30 rounded-full blur-xl"></div>
            </div>
          </div>
        </motion.section>
        
        {/* Key Benefits */}
        <motion.section 
          className="mb-20"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          custom={1}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Key Benefits of Vita AI</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Brain className="h-8 w-8 text-purple-500" />,
                title: "Personalized Intelligence",
                description: "Vita AI learns your unique patterns and adapts to your specific health needs over time."
              },
              {
                icon: <Heart className="h-8 w-8 text-red-500" />,
                title: "Holistic Wellness",
                description: "Addresses all aspects of health: physical, mental, emotional, and even social well-being."
              },
              {
                icon: <Sparkles className="h-8 w-8 text-amber-500" />,
                title: "Predictive Health",
                description: "Uses advanced AI to predict potential health issues before they become problems."
              }
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                variants={fadeInUpVariants}
                custom={index + 1.5}
                className="relative"
              >
                <Card className="h-full backdrop-blur-sm bg-white/90 dark:bg-black/40 shadow-lg hover:shadow-xl transition-all border-0">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-purple-200/20 dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-xl"></div>
                  <CardHeader>
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full w-fit mb-4">
                      {benefit.icon}
                    </div>
                    <CardTitle>{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* How It Works */}
        <motion.section 
          className="mb-20"
          initial="hidden"
          animate="visible" 
          variants={fadeInUpVariants}
          custom={2}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How It Works</h2>
          
          <div className="space-y-12">
            {[
              {
                index: 1,
                title: "Share Your Health Goals",
                description: "Tell Vita what you want to achieve, from energy boost to stress reduction to weight management.",
                image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                icon: <MessageSquare className="h-6 w-6 text-blue-500" />
              },
              {
                index: 2,
                title: "Get a Personalized Plan",
                description: "Receive a custom health plan addressing diet, exercise, sleep, and mental wellness—all tailored to your specific needs.",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
                icon: <Activity className="h-6 w-6 text-indigo-500" />
              },
              {
                index: 3,
                title: "Track Progress & Adapt",
                description: "As you track your journey, Vita continuously refines your plan based on what's working and what needs adjustment.",
                image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=800",
                icon: <Zap className="h-6 w-6 text-amber-500" />
              },
              {
                index: 4,
                title: "Future Health Predictions",
                description: "Discover your Health Twin—a projection of how your health might evolve based on your current habits and potential changes.",
                image: "https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?auto=format&fit=crop&q=80&w=800",
                icon: <Sparkles className="h-6 w-6 text-green-500" />
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                variants={fadeInUpVariants}
                custom={index + 3}
                className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
              >
                <div className="md:w-1/2 relative">
                  <div className={`absolute -${index % 2 !== 0 ? 'left' : 'right'}-10 -top-10 w-40 h-40 bg-gradient-to-br from-blue-200/30 to-green-200/30 dark:from-blue-900/20 dark:to-green-900/20 rounded-full blur-xl`}></div>
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="rounded-2xl shadow-xl w-full object-cover h-[350px]"
                  />
                </div>
                <div className="md:w-1/2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 flex items-center justify-center">
                      <span className="font-bold text-blue-600 dark:text-blue-400">{step.index}</span>
                    </div>
                    <div className="p-2 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Features Section */}
        <motion.section 
          className="mb-20"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          custom={7}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Key Features</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Activity className="h-6 w-6 text-indigo-500" />,
                title: "Personalized Health Plans",
                description: "Customized wellness plans that adapt to your progress and changing needs."
              },
              {
                icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
                title: "Emotional Intelligence",
                description: "Conversations that understand your feelings and provide empathetic support."
              },
              {
                icon: <Brain className="h-6 w-6 text-purple-500" />,
                title: "Health Twin Predictions",
                description: "See your future health based on your current habits and potential changes."
              },
              {
                icon: <Dumbbell className="h-6 w-6 text-rose-500" />,
                title: "Exercise Routines",
                description: "Workout plans tailored to your fitness level, goals, and preferences."
              },
              {
                icon: <Droplets className="h-6 w-6 text-cyan-500" />,
                title: "Hydration Tracking",
                description: "Smart reminders and tracking for optimal daily hydration."
              },
              {
                icon: <Heart className="h-6 w-6 text-red-500" />,
                title: "Nutrition Guidance",
                description: "Meal plans and recipes customized to your dietary needs and goals."
              },
              {
                icon: <Moon className="h-6 w-6 text-indigo-500" />,
                title: "Sleep Optimization",
                description: "Analysis and recommendations to improve your sleep quality."
              },
              {
                icon: <Clock className="h-6 w-6 text-amber-500" />,
                title: "Habit Building",
                description: "Science-based approach to creating lasting healthy habits."
              },
              {
                icon: <BarChart2 className="h-6 w-6 text-green-500" />,
                title: "Progress Tracking",
                description: "Visualize your health journey with detailed analytics and insights."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeInUpVariants}
                custom={index * 0.1 + 7.5}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full backdrop-blur-sm bg-white/90 dark:bg-black/40 shadow-md hover:shadow-lg transition-all border-0">
                  <CardHeader className="pb-2">
                    <div className="p-2 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 w-fit mb-3">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Testimonials */}
        <motion.section 
          className="mb-20"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          custom={9}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "Vita AI's emotional intelligence is what sets it apart. It doesn't just give me health advice—it understands when I'm struggling and adapts accordingly.",
                name: "Michael T.",
                role: "Lost 30 pounds in 6 months",
                avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&q=80"
              },
              {
                quote: "The predictions from my Health Twin motivated me to make changes I'd been putting off for years. Seeing the potential impact made all the difference.",
                name: "Jessica K.",
                role: "Reduced anxiety by 70%",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80"
              },
              {
                quote: "As someone managing a chronic condition, having Vita AI's constant support has been life-changing. It's like having a health coach available 24/7.",
                name: "David L.",
                role: "Managing diabetes for 2 years",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={fadeInUpVariants}
                custom={index * 0.2 + 9.5}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full backdrop-blur-sm bg-white/90 dark:bg-black/40 shadow-lg border-0">
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-amber-400">★</span>
                      ))}
                    </div>
                    <p className="italic mb-6 text-muted-foreground">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Achievements & Results */}
        <motion.section 
          className="mb-20"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          custom={10}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Proven Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="backdrop-blur-sm bg-white/90 dark:bg-black/40 shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  Health Outcomes
                </CardTitle>
                <CardDescription>Real results from Vita AI users</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">87% report increased energy levels</p>
                      <p className="text-sm text-muted-foreground">Users experience noticeable improvement within 2 weeks</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      <Heart className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">92% improve cardiovascular health markers</p>
                      <p className="text-sm text-muted-foreground">Blood pressure and cholesterol improvements in 30+ days</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                      <Brain className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">73% reduction in stress and anxiety</p>
                      <p className="text-sm text-muted-foreground">Based on self-reported metrics after 8 weeks</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                      <Moon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">89% improve sleep quality</p>
                      <p className="text-sm text-muted-foreground">Average increase of 1.2 hours of quality sleep per night</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-sm bg-white/90 dark:bg-black/40 shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-500" />
                  Achievement Milestones
                </CardTitle>
                <CardDescription>Our users reach their goals faster</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="font-medium">Weight Management Goals</p>
                      <p className="text-green-600 dark:text-green-400 font-medium">78%</p>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">78% of users reach their weight goals within 6 months</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="font-medium">Fitness Level Improvement</p>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">92%</p>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">92% improve their fitness test scores within 90 days</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="font-medium">Stress Reduction Goals</p>
                      <p className="text-purple-600 dark:text-purple-400 font-medium">84%</p>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">84% significantly reduce stress within 8 weeks</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="font-medium">Nutrition Habit Adherence</p>
                      <p className="text-amber-600 dark:text-amber-400 font-medium">89%</p>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">89% successfully adopt healthier eating habits long-term</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>
        
        {/* CTA Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          custom={11}
        >
          <Card className="border-0 overflow-hidden bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/30 dark:to-green-900/30 shadow-2xl">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-200/40 dark:bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-green-200/40 dark:bg-green-400/10 rounded-full blur-3xl"></div>
            
            <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Health Journey?</h2>
                <p className="text-lg mb-8">
                  Join thousands of others who are experiencing better health, more energy, and improved well-being with Vita AI.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    <Link href="/signup">
                      Start Your Free Trial
                      <ChevronRight className="h-5 w-5 ml-1" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="border-2 py-6 text-lg rounded-lg">
                    <Link href="/chat">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Try a Demo Chat
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="md:w-1/3 relative">
                <img 
                  src="https://images.unsplash.com/photo-1571019613914-85f342c6a11e?auto=format&fit=crop&q=80&w=500"
                  alt="Woman feeling healthy and energetic"
                  className="rounded-xl shadow-xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-500" />
                    <p className="text-sm font-medium">Rated 4.9/5 by users</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
        
        <footer className="mt-20 text-center text-muted-foreground pb-20 lg:pb-10">
          <p>© 2025 Vita AI. All rights reserved. Your health journey awaits.</p>
        </footer>
      </div>
    </AnimatedGradientBackground>
  );
}