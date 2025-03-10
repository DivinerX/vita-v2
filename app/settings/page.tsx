"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart, User2, Users, Clipboard } from "lucide-react";
import { ToneSelector } from "@/components/signup/tone-selector";
import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SettingsPage() {
  const [selectedTone, setSelectedTone] = useState<string>("friend");
  
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
          <div className="lg:hidden">
            <ThemeToggle />
          </div>
        </div>
        
        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
            <TabsTrigger value="preferences" className="flex-1">Preferences</TabsTrigger>
            <TabsTrigger value="notifications" className="flex-1">Notifications</TabsTrigger>
            <TabsTrigger value="privacy" className="flex-1">Privacy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your account details and how we contact you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Sarah Johnson" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="sarah@example.com" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">Height</Label>
                      <Input id="height" defaultValue="5'7&quot;" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight</Label>
                      <Input id="weight" defaultValue="142 lbs" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="birth-date">Date of Birth</Label>
                    <Input id="birth-date" type="date" defaultValue="1987-06-23" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="goals">Health Goals</Label>
                    <Textarea 
                      id="goals" 
                      placeholder="What are your primary health objectives?"
                      defaultValue="Reduce anxiety, improve energy levels, and build consistent exercise habits."
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-green-500 hover:bg-green-600">Save Profile Changes</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Connected Accounts</CardTitle>
                  <CardDescription>
                    Manage connections to other services
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#4285F4" viewBox="0 0 24 24">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                          <path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Google Fit</h3>
                        <p className="text-sm text-muted-foreground">
                          Connected
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Disconnect</Button>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
                          <path d="M16.36 12.76C16.31 9.6 19.15 8.17 19.25 8.11c-2.1-3.14-5.38-3.56-6.54-3.61-2.77-.28-5.43 1.66-6.83 1.66s-3.58-1.63-5.9-1.58c-3.02.04-5.82 1.78-7.38 4.53-3.17 5.56-.81 13.76 2.25 18.26 1.53 2.25 3.33 4.76 5.69 4.67 2.29-.1 3.16-1.5 5.93-1.5s3.55 1.5 5.95 1.45c2.47-.04 4.02-2.26 5.5-4.53 1.77-2.61 2.48-5.14 2.51-5.27-.05-.03-4.8-1.87-4.85-7.43zm-4.55-13.65c1.24-1.52 2.08-3.64 1.85-5.76-1.79.08-3.96 1.21-5.24 2.72-1.13 1.33-2.13 3.49-1.87 5.53 2 .16 4.04-1.03 5.25-2.5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Apple Health</h3>
                        <p className="text-sm text-muted-foreground">
                          Not connected
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>
                    Manage your password and account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-green-500 hover:bg-green-600">Update Password</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="preferences">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vita Personality Settings</CardTitle>
                  <CardDescription>
                    Customize how your Vita AI responds to you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="vita-name">Vita's Name</Label>
                    <Input id="vita-name" defaultValue="Emma" />
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Vita's Tone</Label>
                    <ToneSelector selectedTone={selectedTone} setSelectedTone={setSelectedTone} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Communication Style</Label>
                    <RadioGroup defaultValue="supportive">
                      <div className="flex items-center space-x-2 py-1">
                        <RadioGroupItem value="supportive" id="supportive" />
                        <Label htmlFor="supportive">Supportive & Encouraging</Label>
                      </div>
                      <div className="flex items-center space-x-2 py-1">
                        <RadioGroupItem value="direct" id="direct" />
                        <Label htmlFor="direct">Direct & Straightforward</Label>
                      </div>
                      <div className="flex items-center space-x-2 py-1">
                        <RadioGroupItem value="humorous" id="humorous" />
                        <Label htmlFor="humorous">Light & Humorous</Label>
                      </div>
                      <div className="flex items-center space-x-2 py-1">
                        <RadioGroupItem value="professional" id="professional" />
                        <Label htmlFor="professional">Formal & Professional</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-green-500 hover:bg-green-600">Save Vita Settings</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Display Settings</CardTitle>
                  <CardDescription>
                    Customize the appearance of your Vita AI
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Theme</h3>
                      <p className="text-sm text-muted-foreground">
                        Switch between light and dark themes
                      </p>
                    </div>
                    <ThemeToggle />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Animations</h3>
                      <p className="text-sm text-muted-foreground">
                        Enable or disable UI animations
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="text-size">Text Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="text-size">
                        <SelectValue placeholder="Select text size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="xl">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-green-500 hover:bg-green-600">Save Display Settings</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Health Tracking Preferences</CardTitle>
                  <CardDescription>
                    Customize which health metrics you want to track
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Sleep Tracking</h3>
                      <p className="text-sm text-muted-foreground">
                        Track sleep duration and quality
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Nutrition Tracking</h3>
                      <p className="text-sm text-muted-foreground">
                        Track meals and nutritional content
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Exercise Tracking</h3>
                      <p className="text-sm text-muted-foreground">
                        Track workouts and physical activity
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Mood Tracking</h3>
                      <p className="text-sm text-muted-foreground">
                        Track emotional well-being and mood patterns
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Symptom Tracking</h3>
                      <p className="text-sm text-muted-foreground">
                        Track physical symptoms and conditions
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-green-500 hover:bg-green-600">Save Tracking Preferences</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Control when and how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-3">Notification Channels</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h4 className="font-medium">Push Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications on your device
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Notification Types</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h4 className="font-medium">Habit Reminders</h4>
                        <p className="text-sm text-muted-foreground">
                          Reminders for your daily habits
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h4 className="font-medium">Plan Updates</h4>
                        <p className="text-sm text-muted-foreground">
                          Updates to your diet, exercise, or habit plans
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h4 className="font-medium">Achievement Alerts</h4>
                        <p className="text-sm text-muted-foreground">
                          Notifications when you earn achievements
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h4 className="font-medium">Vita Messages</h4>
                        <p className="text-sm text-muted-foreground">
                          Direct messages from your Vita AI
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h4 className="font-medium">Health Insights</h4>
                        <p className="text-sm text-muted-foreground">
                          Important health insights and alerts
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Quiet Hours</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quiet-start">Start Time</Label>
                      <Input id="quiet-start" type="time" defaultValue="22:00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quiet-end">End Time</Label>
                      <Input id="quiet-end" type="time" defaultValue="07:00" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">
                      No notifications will be sent during these hours except for critical health alerts.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-green-500 hover:bg-green-600">Save Notification Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Control your data and privacy preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Data Collection</h3>
                      <p className="text-sm text-muted-foreground">
                        Allow Vita AI to collect data to improve your experience
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Personalized Recommendations</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive recommendations based on your data
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Health Twin Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        Allow Vita AI to analyze your data for health projections
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Third-Party Sharing</h3>
                      <p className="text-sm text-muted-foreground">
                        Allow Vita AI to share data with connected services
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Download My Data</Button>
                  <Button className="bg-green-500 hover:bg-green-600">Save Privacy Settings</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Account Management</CardTitle>
                  <CardDescription>
                    Manage your account data and deletion options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Delete All Journal Entries</h3>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete all your journal entries
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                      Delete
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Delete All Data</h3>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete all your data from Vita AI
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                      Delete
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Delete Account</h3>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}