"use client";

import { ArrowLeft, Award, Flame, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

interface StreakCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

function StreakCard({ title, count, icon, color }: StreakCardProps) {
  return (
    <Card className={`border-l-4 ${color}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{title}</h3>
          <div className={`p-2 rounded-full ${color.replace('border-', 'bg-').replace('-500', '-100')} ${color.replace('border-', 'text-')}`}>
            {icon}
          </div>
        </div>
        <div className="flex items-end mt-2">
          <span className="text-3xl font-bold">{count}</span>
          <span className="text-muted-foreground ml-1 mb-1">days</span>
        </div>
      </CardContent>
    </Card>
  );
}

interface BadgeItemProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  unlocked: boolean;
  progress?: number;
}

function BadgeItem({ name, description, icon, color, unlocked, progress }: BadgeItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
      <div className={`p-3 rounded-full ${unlocked ? color.replace('text-', 'bg-').replace('-500', '-100') : 'bg-gray-100'} ${unlocked ? color : 'text-gray-400'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className={`font-medium ${unlocked ? '' : 'text-muted-foreground'}`}>{name}</h3>
          {unlocked && (
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              Unlocked
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        
        {!unlocked && progress !== undefined && (
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <span>{progress}%</span>
              <span>100%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function GamificationPage() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Your Victory Board</h1>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Experience Points</h2>
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">Level 2</span>
              <span className="text-sm font-medium">250/500 XP</span>
            </div>
          </div>
          
          <Progress value={50} className="h-2 mb-1" />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>250 XP Earned</span>
            <span>Level 3 Unlocks Premium Content</span>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Active Streaks</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StreakCard 
              title="Water Intake" 
              count={5} 
              icon={<Flame className="h-5 w-5" />} 
              color="border-blue-500" 
            />
            <StreakCard 
              title="Meditation" 
              count={3} 
              icon={<Flame className="h-5 w-5" />} 
              color="border-indigo-500" 
            />
            <StreakCard 
              title="Daily Exercise" 
              count={7} 
              icon={<Flame className="h-5 w-5" />} 
              color="border-green-500" 
            />
          </div>
        </div>
        
        <div>
          <Tabs defaultValue="badges">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Achievements</h2>
              <TabsList>
                <TabsTrigger value="badges">Badges</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="badges" className="space-y-4">
              <BadgeItem 
                name="Hydration Hero" 
                description="Maintain a 7-day water intake streak" 
                icon={<Award className="h-5 w-5" />} 
                color="text-blue-500" 
                unlocked={false}
                progress={71}
              />
              <BadgeItem 
                name="Early Bird" 
                description="Complete morning routine 5 days in a row" 
                icon={<Award className="h-5 w-5" />} 
                color="text-amber-500" 
                unlocked={true}
              />
              <BadgeItem 
                name="Nutrition Novice" 
                description="Follow your meal plan for 3 consecutive days" 
                icon={<Award className="h-5 w-5" />} 
                color="text-green-500" 
                unlocked={true}
              />
              <BadgeItem 
                name="Zen Master" 
                description="Complete 10 meditation sessions" 
                icon={<Award className="h-5 w-5" />} 
                color="text-indigo-500" 
                unlocked={false}
                progress={30}
              />
              <BadgeItem 
                name="Fitness Fanatic" 
                description="Exercise 20 days in a single month" 
                icon={<Award className="h-5 w-5" />} 
                color="text-rose-500" 
                unlocked={false}
                progress={35}
              />
            </TabsContent>
            
            <TabsContent value="leaderboard">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      <Users className="h-5 w-5 inline mr-2" />
                      Friends Leaderboard
                    </CardTitle>
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                      You're #3
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { position: 1, name: "Alex", score: 820, avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&q=80" },
                      { position: 2, name: "Morgan", score: 745, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80" },
                      { position: 3, name: "You", score: 650, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80", isUser: true },
                      { position: 4, name: "Jamie", score: 590, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80" },
                      { position: 5, name: "Taylor", score: 520, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80" },
                    ].map((person) => (
                      <div 
                        key={person.position} 
                        className={`flex items-center p-3 rounded-lg ${person.isUser ? 'bg-green-50 border border-green-200' : ''}`}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="flex-shrink-0 font-bold text-lg w-5 text-center">
                            {person.position}
                          </div>
                          <div className="h-10 w-10 rounded-full overflow-hidden">
                            <img 
                              src={person.avatar} 
                              alt={person.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="font-medium">
                            {person.name}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="h-4 w-4 text-amber-500" />
                          <span className="font-semibold">{person.score} XP</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-8 text-center">
          <Button asChild className="bg-green-500 hover:bg-green-600">
            <Link href="/dashboard">
              Keep Winning
            </Link>
          </Button>
        </div>
        
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          One streak today, a legend tomorrow.
        </footer>
      </div>
    </div>
  );
}