"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ChevronLeft, ChevronRight, Dumbbell, Flame } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/config/axios";

interface Exercise {
  id: string;
  name: string;
  duration: string;
  difficulty: string;
  calories: number;
  muscleGroups: string;
  image?: string;
  videoUrl?: string;
  guideline?: string;
  option: string;
}

interface ExerciseGroup {
  id: string;
  name: string;
  description: string;
  insight: string;
  exercises: Exercise[];
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
}: Exercise & { completed?: boolean }) {
  return (
    <Card className={`mb-6`}>
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
              {muscleGroups.split(',').map((group, i) => (
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
  const [exerciseGroups, setExerciseGroups] = useState<ExerciseGroup[]>([]);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [optionTabs, setOptionTabs] = useState<string[]>([]);
  const [exercisesByOption, setExercisesByOption] = useState<Record<string, Exercise[]>>({});
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const response = await api.get("/exercise");
        setExerciseGroups(response.data);
        
        if (response.data.length > 0) {
          organizeExercisesByOption(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching exercise data:", error);
      }
    };
    fetchExerciseData();
  }, []);

  const organizeExercisesByOption = (group: ExerciseGroup) => {
    if (!group.exercises || group.exercises.length === 0) {
      setOptionTabs([]);
      setExercisesByOption({});
      return;
    }

    // Group exercises by option
    const groupedExercises: Record<string, Exercise[]> = {};
    const options = new Set<string>();

    group.exercises.forEach(exercise => {
      if (exercise.option) {
        options.add(exercise.option);
        if (!groupedExercises[exercise.option]) {
          groupedExercises[exercise.option] = [];
        }
        groupedExercises[exercise.option].push(exercise);
      }
    });

    // Convert options to array and sort
    const optionsArray = Array.from(options);
    setOptionTabs(optionsArray);
    setExercisesByOption(groupedExercises);
  };

  const handlePrevious = () => {
    if (currentGroupIndex > 0) {
      const newIndex = currentGroupIndex - 1;
      setCurrentGroupIndex(newIndex);
      organizeExercisesByOption(exerciseGroups[newIndex]);
    }
  };

  const handleNext = () => {
    if (currentGroupIndex < exerciseGroups.length - 1) {
      const newIndex = currentGroupIndex + 1;
      setCurrentGroupIndex(newIndex);
      organizeExercisesByOption(exerciseGroups[newIndex]);
    }
  };

  const currentGroup = exerciseGroups[currentGroupIndex];
  const totalExercises = currentGroup?.exercises?.length || 0;
  const progressPercentage = totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;

  // Format muscle groups from comma-separated string to array
  const formatMuscleGroups = (muscleGroupsStr: string): string[] => {
    return muscleGroupsStr ? muscleGroupsStr.split(',') : [];
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
        
        {currentGroup && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">{currentGroup.name}</h2>
                <p className="text-muted-foreground">{currentGroup.description}</p>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePrevious}
                  disabled={currentGroupIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleNext}
                  disabled={currentGroupIndex === exerciseGroups.length - 1}
                >
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
                      {currentGroup.insight}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Weekly Progress</h3>
              <div className="flex justify-between text-sm mb-1">
                <span>{completedCount} of {totalExercises} exercises completed</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            
            {optionTabs.length > 0 ? (
              <Tabs defaultValue={optionTabs[0]} className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Your Program</h3>
                  <TabsList>
                    {optionTabs.map((option, index) => (
                      <TabsTrigger key={option} value={option}>
                        Option {index + 1}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                {optionTabs.map((option) => (
                  <TabsContent key={option} value={option} className="space-y-4">
                    {exercisesByOption[option]?.map((exercise) => (
                      <ExerciseItem 
                        key={exercise.id}
                        id={exercise.id}
                        option={exercise.option}
                        name={exercise.name}
                        duration={exercise.duration}
                        difficulty={exercise.difficulty}
                        calories={exercise.calories}
                        muscleGroups={exercise.muscleGroups}
                        image={exercise.image}
                        videoUrl={exercise.videoUrl}
                      />
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <div className="flex items-center justify-center h-40 bg-muted rounded-lg mb-6">
                <p className="text-muted-foreground">No exercises available for this group</p>
              </div>
            )}
          </>
        )}
        
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