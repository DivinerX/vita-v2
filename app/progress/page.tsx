"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, TrendingUp, TrendingDown, Activity, Clock, Droplets, Brain, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, subDays } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Function to generate demo chart data
const generateChartData = (daysBack: number, metric: string, baseline: number, trend: 'up' | 'down' | 'stable' = 'up', volatility = 0.2) => {
  return Array.from({ length: daysBack }).map((_, i) => {
    const date = subDays(new Date(), daysBack - i - 1);
    
    // Create some randomness with a general trend
    let value: number;
    if (trend === 'up') {
      value = baseline + (i * (baseline * 0.05)) + (Math.random() * volatility * baseline) - (volatility * baseline / 2);
    } else if (trend === 'down') {
      value = baseline - (i * (baseline * 0.02)) + (Math.random() * volatility * baseline) - (volatility * baseline / 2);
    } else {
      value = baseline + (Math.random() * volatility * baseline) - (volatility * baseline / 2);
    }
    
    // Ensure value is positive and rounded
    value = Math.max(0, Math.round(value * 10) / 10);
    
    return {
      date: format(date, 'MMM dd'),
      [metric]: value
    };
  });
};

const energyData = generateChartData(14, 'energy', 60, 'up', 0.3);
const anxietyData = generateChartData(14, 'anxiety', 75, 'down', 0.4);
const sleepData = generateChartData(14, 'hours', 6.5, 'up', 0.2);
const waterData = generateChartData(14, 'cups', 4, 'up', 0.3);

// Weekly completion data
const weeklyCompletionData = [
  { day: 'Mon', completionRate: 90 },
  { day: 'Tue', completionRate: 85 },
  { day: 'Wed', completionRate: 75 },
  { day: 'Thu', completionRate: 80 },
  { day: 'Fri', completionRate: 70 },
  { day: 'Sat', completionRate: 60 },
  { day: 'Sun', completionRate: 65 },
];

interface MetricCardProps {
  title: string;
  value: string;
  change: { value: string; positive: boolean };
  icon: React.ReactNode;
  color: string;
}

function MetricCard({ title, value, change, icon, color }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <div className={`flex items-center mt-1 text-xs ${change.positive ? 'text-green-600' : 'text-red-600'}`}>
              {change.positive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              <span>{change.value} {change.positive ? 'increase' : 'decrease'}</span>
            </div>
          </div>
          <div className={`p-2 rounded-full ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your Progress Tracker</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard 
            title="Energy Level" 
            value="72/100" 
            change={{ value: "12%", positive: true }}
            icon={<Activity className="h-5 w-5 text-blue-600" />}
            color="text-blue-600"
          />
          <MetricCard 
            title="Anxiety Level" 
            value="45/100" 
            change={{ value: "18%", positive: false }}
            icon={<Brain className="h-5 w-5 text-indigo-600" />}
            color="text-indigo-600"
          />
          <MetricCard 
            title="Sleep Quality" 
            value="7.2 hrs" 
            change={{ value: "0.8 hrs", positive: true }}
            icon={<Clock className="h-5 w-5 text-purple-600" />}
            color="text-purple-600"
          />
          <MetricCard 
            title="Hydration" 
            value="6 cups" 
            change={{ value: "2 cups", positive: true }}
            icon={<Droplets className="h-5 w-5 text-cyan-600" />}
            color="text-cyan-600"
          />
        </div>
        
        <Tabs defaultValue="energy" className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Health Trends</h2>
            <TabsList>
              <TabsTrigger value="energy">Energy</TabsTrigger>
              <TabsTrigger value="anxiety">Anxiety</TabsTrigger>
              <TabsTrigger value="sleep">Sleep</TabsTrigger>
              <TabsTrigger value="water">Hydration</TabsTrigger>
            </TabsList>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <TabsContent value="energy">
                <CardDescription className="mb-4 text-center">
                  Your energy levels are steadily improving - up 12% over the last 2 weeks!
                </CardDescription>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={energyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      allowDecimals={false} 
                      scale="auto" 
                      padding={{ left: 10, right: 10 }}
                      tickLine={true}
                      axisLine={true}
                      tickMargin={5}
                      minTickGap={5}
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      allowDecimals={false} 
                      scale="auto" 
                      padding={{ top: 10, bottom: 0 }}
                      tickLine={true}
                      axisLine={true}
                      tickMargin={5}
                      width={40}
                    />
                    <Tooltip />
                    <Line type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="anxiety">
                <CardDescription className="mb-4 text-center">
                  Great news! Your anxiety score has decreased by 18% since starting your mindfulness routine.
                </CardDescription>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={anxietyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      allowDecimals={false} 
                      scale="auto" 
                      padding={{ left: 10, right: 10 }}
                      tickLine={true}
                      axisLine={true}
                      tickMargin={5}
                      minTickGap={5}
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      allowDecimals={false} 
                      scale="auto" 
                      padding={{ top: 10, bottom: 0 }}
                      tickLine={true}
                      axisLine={true}
                      tickMargin={5}
                      width={40}
                    />
                    <Tooltip />
                    <Line type="monotone" dataKey="anxiety" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="sleep">
                <CardDescription className="mb-4 text-center">
                  You're consistently getting more sleep - averaging 7.2 hours compared to 6.4 two weeks ago.
                </CardDescription>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={sleepData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      allowDecimals={false} 
                      scale="auto" 
                      padding={{ left: 10, right: 10 }}
                      tickLine={true}
                      axisLine={true}
                      tickMargin={5}
                      minTickGap={5}
                    />
                    <YAxis 
                      domain={[0, 10]} 
                      allowDecimals={false} 
                      scale="auto" 
                      padding={{ top: 10, bottom: 0 }}
                      tickLine={true}
                      axisLine={true}
                      tickMargin={5}
                      width={40}
                    />
                    <Tooltip />
                    <Line type="monotone" dataKey="hours" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="water">
                <CardDescription className="mb-4 text-center">
                  Your hydration habits are improving! You're averaging 6 cups daily, up 50% from when you started.
                </CardDescription>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={waterData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      allowDecimals={false} 
                      scale="auto" 
                      padding={{ left: 10, right: 10 }}
                      tickLine={true}
                      axisLine={true}
                      tickMargin={5}
                      minTickGap={5}
                    />
                    <YAxis 
                      domain={[0, 10]} 
                      allowDecimals={false} 
                      scale="auto" 
                      padding={{ top: 10, bottom: 0 }}
                      tickLine={true}
                      axisLine={true}
                      tickMargin={5}
                      width={40}
                    />
                    <Tooltip />
                    <Line type="monotone" dataKey="cups" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Task Completion</CardTitle>
              <CardDescription>See how consistent you've been with your daily tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="day" 
                    allowDecimals={false} 
                    scale="auto" 
                    padding={{ left: 10, right: 10 }}
                    tickLine={true}
                    axisLine={true}
                    tickMargin={5}
                    minTickGap={5}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    unit="%" 
                    allowDecimals={false} 
                    scale="auto" 
                    padding={{ top: 10, bottom: 0 }}
                    tickLine={true}
                    axisLine={true}
                    tickMargin={5}
                    width={40}
                  />
                  <Tooltip />
                  <Bar dataKey="completionRate" fill="#10b981" name="Completion Rate" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Health Journey</CardTitle>
              <CardDescription>Key milestones and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <HeartPulse className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Anxiety Reduction Milestone</h3>
                    <p className="text-sm text-muted-foreground">You've reduced your anxiety score by 25% over the last month!</p>
                    <p className="text-xs text-muted-foreground mt-1">Feb 20, 2025</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Sleep Streak Achievement</h3>
                    <p className="text-sm text-muted-foreground">You've maintained 7+ hours of sleep for 10 consecutive days!</p>
                    <p className="text-xs text-muted-foreground mt-1">Feb 15, 2025</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Activity className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Energy Boost Breakthrough</h3>
                    <p className="text-sm text-muted-foreground">Your average energy score has increased by 15% since starting your new diet plan!</p>
                    <p className="text-xs text-muted-foreground mt-1">Feb 10, 2025</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button className="bg-green-500 hover:bg-green-600">
                  View All Achievements
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          Your journey isn't a straight line—every fluctuation is teaching you something.
        </footer>
      </div>
    </div>
  );
}