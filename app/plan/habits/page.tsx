"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Tag, ChevronLeft, ChevronRight, CalendarCheck, Clock, MoveHorizontal, Trash2, Repeat, CircleCheck } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState, useEffect } from "react";
import api from "@/config/axios";
import { THabit } from "@/types";

function HabitItem({
  id,
  title,
  time,
  category,
  description,
  frequency,
  on_progress,
  streak_days,
  created_at,
  onToggle
}: THabit & { onToggle: (id: string) => void }) {
  return (
    <Card className={`mb-4 ${on_progress ? 'border-green-200 bg-green-50/30' : ''}`}>
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Checkbox
              id={`habit-${id}`}
              checked={on_progress}
              onCheckedChange={() => onToggle(id!)}
              className="data-[state=checked]:bg-green-500 data-[state=checked]:text-white mx-2"
            />
            <div>
              <h3 className="font-medium">{title}</h3>
              <hr className="my-2" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{time}</span>
                {category && (
                  <>
                    <Tag className="h-3 w-3" />
                    <span>{category}</span>
                  </>
                )}
                {frequency && (
                  <>
                    <Repeat className="h-3 w-3" />
                    <span>{frequency}</span>
                  </>
                )}
              </div>
              {description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {description}
                </p>
              )}
              <div className="flex items-center gap-8 mt-2 text-xs text-orange-600 font-medium">
                {
                  created_at && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-green-600 font-medium">
                      <CalendarCheck className="h-3 w-3" />
                      <span>{new Date(created_at).toLocaleDateString()}</span>
                    </div>
                  )
                }
                {!!streak_days && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-orange-600 font-medium">
                    <CircleCheck className="h-3 w-3" />
                    <span>{streak_days} day streak</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoveHorizontal className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HabitsPlanPage() {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [habits, setHabits] = useState<THabit[]>([]);

  const [eveningHabits, setEveningHabits] = useState<THabit[]>([]);

  const toggleHabit = (id: string) => {
    setHabits(
      habits.map(habit =>
        habit.id === id
          ? { ...habit, on_progress: !habit.on_progress }
          : habit
      )
    );
  };

  useEffect(() => {
    console.log("fetching habits");
    const fetchHabits = async () => {
      try {
        setLoading(true);
        const response = await api.get("/habits");
        setHabits(response.data.data.filter((habit: any) => habit.time.toLowerCase() === "morning" || habit.time.toLowerCase() === "noon" || habit.time.toLowerCase() === "afternoon" || habit.time.toLowerCase() === "daytime"));
        setEveningHabits(response.data.data.filter((habit: any) => habit.time.toLowerCase() === "evening" || habit.time.toLowerCase() === "bedtime" || habit.time.toLowerCase() === "night"));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setLoaded(true);
      }
    };
    fetchHabits();
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Your Habits Plan</h1>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Daily Wellness Habits</h2>
            <p className="text-muted-foreground">Small actions, massive impact</p>
          </div>

          {/* <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div> */}
        </div>

        <Card className="mb-6 border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="bg-purple-500 text-white p-2 rounded-full">
                <CalendarCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Habits AI Insights</h3>
                <p className="text-sm text-muted-foreground">
                  These micro-habits are designed to improve your energy and reduce anxiety.
                  Remember: consistency beats intensity! Even 80% adherence will create lasting change.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="daytime" className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Your Habits</h3>
            <TabsList>
              <TabsTrigger value="daytime">Daytime</TabsTrigger>
              <TabsTrigger value="evening">Evening</TabsTrigger>
              <TabsTrigger value="add">+ Add New</TabsTrigger>
            </TabsList>
          </div>
          {loading || !loaded ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="mb-4 animate-pulse">
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded bg-gray-200" />
                        <div>
                          <div className="h-5 w-48 bg-gray-200 rounded mb-2" />
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-gray-200" />
                            <div className="h-3 w-16 bg-gray-200 rounded" />
                            <div className="h-3 w-3 rounded-full bg-gray-200" />
                            <div className="h-3 w-20 bg-gray-200 rounded" />
                          </div>
                          <div className="flex items-center gap-8 mt-2">
                            <div className="flex items-center gap-1">
                              <div className="h-3 w-3 rounded bg-gray-200" />
                              <div className="h-3 w-24 bg-gray-200 rounded" />
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="h-3 w-3 rounded bg-gray-200" />
                              <div className="h-3 w-20 bg-gray-200 rounded" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <div className="h-8 w-8 rounded bg-gray-200" />
                        <div className="h-8 w-8 rounded bg-gray-200" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <TabsContent value="daytime" className="space-y-4">
                {
                  habits.length > 0 ? habits.map(habit => (
                    <HabitItem
                      key={habit.id}
                      {...habit}
                      onToggle={toggleHabit}
                    />
                  )) : (
                    <div className="flex justify-center items-center h-full py-4 text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <CalendarCheck className="h-4 w-4" />
                        No habits found
                      </p>
                    </div>
                  )}
              </TabsContent>

              <TabsContent value="evening" className="space-y-4">
                {eveningHabits.length > 0 ? eveningHabits.map(habit => (
                  <HabitItem
                    key={habit.id}
                    {...habit}
                    onToggle={toggleHabit}
                  />
                )) : (
                  <div className="flex justify-center items-center h-full py-4 text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <CalendarCheck className="h-4 w-4" />
                      No habits found
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="add">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Create New Habit</CardTitle>
                    <CardDescription>
                      Start small - tiny habits are more likely to stick!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="habit-name">Habit Name</Label>
                      <Input id="habit-name" placeholder="e.g., Drink a glass of water" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="habit-time">Time</Label>
                        <Select defaultValue="morning">
                          <SelectTrigger id="habit-time">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning</SelectItem>
                            <SelectItem value="noon">Noon</SelectItem>
                            <SelectItem value="afternoon">Afternoon</SelectItem>
                            <SelectItem value="evening">Evening</SelectItem>
                            <SelectItem value="bedtime">Before Bed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="habit-category">Category</Label>
                        <Select defaultValue="wellness">
                          <SelectTrigger id="habit-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wellness">Wellness</SelectItem>
                            <SelectItem value="hydration">Hydration</SelectItem>
                            <SelectItem value="nutrition">Nutrition</SelectItem>
                            <SelectItem value="movement">Movement</SelectItem>
                            <SelectItem value="mindfulness">Mindfulness</SelectItem>
                            <SelectItem value="sleep">Sleep</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="habit-description">Description (Optional)</Label>
                      <Input id="habit-description" placeholder="Add details about this habit" />
                    </div>

                    <div className="flex items-center space-x-2 pt-4">
                      <Switch id="habit-reminder" />
                      <Label htmlFor="habit-reminder">Add a reminder notification</Label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-green-500 hover:bg-green-600">Create Habit</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5 text-purple-500" />
              <CardTitle className="text-lg">Habit Building Tips</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Keys to Success</h4>
              <ul className="list-disc list-inside text-sm pl-2 space-y-1">
                <li>Start with habits so small they seem too easy</li>
                <li>Anchor new habits to existing routines (habit stacking)</li>
                <li>Track your progress visually</li>
                <li>Celebrate small wins immediately</li>
                <li>Focus on identity ("I am a hydrated person") over outcomes</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Suggest Habits</Button>
            <Button className="bg-green-500 hover:bg-green-600">Add to My Day</Button>
          </CardFooter>
        </Card>

        <footer className="mt-8 text-center text-sm text-muted-foreground">
          Small habits, consistently done, create remarkable results.
        </footer>
      </div>
    </div>
  );
}