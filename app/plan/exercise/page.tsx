"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ChevronLeft, ChevronRight, Dumbbell, Flame } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

interface ExerciseItemProps {
  name: string;
  duration: string;
  difficulty: string;
  calories: number;
  muscleGroups: string[];
  image?: string;
  completed?: boolean;
  videoUrl?: string;
}

function ExerciseItem({ 
  name, 
  duration, 
  difficulty, 
  calories, 
  muscleGroups,
  image, 
  completed = false,
  videoUrl 
}: ExerciseItemProps) {
  return (
    <Card className={`mb-6 ${completed ? 'border-green-200 bg-green-50/50' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{name}</CardTitle>
          <div className="text-sm text-muted-foreground">{duration}</div>
        </div>
        <CardDescription>{difficulty} • {calories} calories</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          {image && (
            <div className="h-36 w-36 rounded-md overflow-hidden flex-shrink-0">
              <img 
                src={image} 
                alt={name} 
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <div className="flex flex-wrap gap-1 mb-2">
              {muscleGroups.map((group, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {group}
                </span>
              ))}
            </div>
            
            {completed ? (
              <div className="flex items-center text-green-600 font-medium">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Completed
              </div>
            ) : (
              <Button variant="outline" size="sm" className="mb-2">
                <Flame className="h-4 w-4 mr-1 text-orange-500" />
                Start Exercise
              </Button>
            )}
            
            {videoUrl && (
              <div className="mt-2">
                <Button variant="ghost" size="sm">
                  Watch Tutorial
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ExercisePlanPage() {
  const exerciseData = {
    day1: [
      {
        name: "Morning Stretch Routine",
        duration: "10 minutes",
        difficulty: "Beginner",
        calories: 60,
        muscleGroups: ["Full Body", "Flexibility"],
        image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=500&auto=format&fit=crop&q=60",
        completed: true,
        videoUrl: "#"
      },
      {
        name: "Bodyweight HIIT Circuit",
        duration: "15 minutes",
        difficulty: "Moderate",
        calories: 180,
        muscleGroups: ["Core", "Lower Body", "Cardio"],
        image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=500&auto=format&fit=crop&q=60",
        videoUrl: "#"
      },
      {
        name: "Evening Yoga Flow",
        duration: "20 minutes",
        difficulty: "Beginner",
        calories: 120,
        muscleGroups: ["Core", "Balance", "Flexibility"],
        image: "https://media.istockphoto.com/id/1490278453/photo/a-girl-gracefully-strikes-a-yoga-asana-on-the-beach-connecting-with-the-serene-beauty-of-the.webp?a=1&b=1&s=612x612&w=0&k=20&c=qA0r1V2wPak_NiogUVd6FHvERVa1JRZkk-xZlaIKwX4=",
        videoUrl: "#"
      }
    ],
    day2: [
      {
        name: "Upper Body Strength",
        duration: "25 minutes",
        difficulty: "Moderate",
        calories: 210,
        muscleGroups: ["Arms", "Chest", "Back"],
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=60",
        videoUrl: "#"
      },
      {
        name: "Low-Impact Cardio",
        duration: "15 minutes",
        difficulty: "Beginner",
        calories: 150,
        muscleGroups: ["Cardio", "Full Body"],
        image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=500&auto=format&fit=crop&q=60",
        videoUrl: "#"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Your Exercise Plan</h1>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Build Strength & Energy</h2>
            <p className="text-muted-foreground">Customized for your fitness level</p>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
        
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 text-white p-2 rounded-full">
                <Dumbbell className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Fitness AI Insights</h3>
                <p className="text-sm text-muted-foreground">
                  This plan focuses on building functional strength and increasing your energy levels.
                  The exercises are designed to be gentle on your joints while still providing an effective workout.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mb-6">
          <h3 className="font-medium mb-2">Weekly Progress</h3>
          <div className="flex justify-between text-sm mb-1">
            <span>4 of 14 exercises completed</span>
            <span>29%</span>
          </div>
          <Progress value={29} className="h-2" />
        </div>
        
        <Tabs defaultValue="day1" className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Your Program</h3>
            <TabsList>
              <TabsTrigger value="day1">Day 1</TabsTrigger>
              <TabsTrigger value="day2">Day 2</TabsTrigger>
              <TabsTrigger value="day3">Day 3</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="day1" className="space-y-4">
            {exerciseData.day1.map((exercise, index) => (
              <ExerciseItem key={index} {...exercise} />
            ))}
          </TabsContent>
          
          <TabsContent value="day2" className="space-y-4">
            {exerciseData.day2.map((exercise, index) => (
              <ExerciseItem key={index} {...exercise} />
            ))}
          </TabsContent>
          
          <TabsContent value="day3">
            <div className="flex items-center justify-center h-40 bg-muted rounded-lg">
              <p className="text-muted-foreground">Exercises for Day 3 are being prepared</p>
            </div>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <CardTitle className="text-lg">Exercise Tips</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Best Practices</h4>
              <ul className="list-disc list-inside text-sm pl-2 space-y-1">
                <li>Start with a 5-minute warm-up</li>
                <li>Stay hydrated throughout your workout</li>
                <li>Focus on proper form over speed</li>
                <li>Listen to your body - rest when needed</li>
                <li>End with gentle stretching</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">When to Skip</h4>
              <ul className="list-disc list-inside text-sm pl-2 space-y-1">
                <li>If you have sharp, shooting pain</li>
                <li>When extremely fatigued or sleep-deprived</li>
                <li>During illness with fever or respiratory symptoms</li>
                <li>After a recent injury without doctor clearance</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Add to Today's Plan</Button>
          </CardFooter>
        </Card>
        
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          Every movement matters—your future strength thanks you!
        </footer>
      </div>
    </div>
  );
}