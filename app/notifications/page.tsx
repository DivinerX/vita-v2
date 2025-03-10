"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckCheck, Clock, Dumbbell, Heart, MessageSquare, Settings, Trash2, Utensils, Zap } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  type: 'habit' | 'message' | 'achievement' | 'reminder' | 'plan';
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Vita Message",
      message: "I noticed your sleep was restless last night. Want to chat about some relaxation techniques for tonight?",
      timestamp: new Date(2025, 1, 24, 8, 30),
      type: 'message',
      read: false
    },
    {
      id: "2",
      title: "Achievement Unlocked!",
      message: "Hydration Hero: You've completed your water intake goal for 5 consecutive days!",
      timestamp: new Date(2025, 1, 23, 17, 45),
      type: 'achievement',
      read: false
    },
    {
      id: "3",
      title: "Meditation Reminder",
      message: "Time for your 5-minute afternoon mindfulness session. Take a moment to center yourself.",
      timestamp: new Date(2025, 1, 23, 14, 0),
      type: 'reminder',
      read: true
    },
    {
      id: "4",
      title: "Diet Plan Updated",
      message: "Based on your feedback, I've adjusted your meal plan to include more plant-based proteins.",
      timestamp: new Date(2025, 1, 22, 19, 15),
      type: 'plan',
      read: true
    },
    {
      id: "5",
      title: "Workout Ready",
      message: "Your 20-minute evening strength routine is ready. Would you like to start now?",
      timestamp: new Date(2025, 1, 22, 18, 0),
      type: 'habit',
      read: true
    }
  ]);
  
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notif => ({ ...notif, read: true }))
    );
  };
  
  const clearAll = () => {
    setNotifications([]);
  };
  
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'habit':
        return <Clock className="h-5 w-5 text-indigo-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'achievement':
        return <Zap className="h-5 w-5 text-amber-500" />;
      case 'reminder':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'plan':
        return <Utensils className="h-5 w-5 text-green-500" />;
      default:
        return <MessageSquare className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead} className="flex items-center">
              <CheckCheck className="h-4 w-4 mr-1" />
              Mark all read
            </Button>
            <Button variant="outline" size="sm" onClick={clearAll} className="flex items-center">
              <Trash2 className="h-4 w-4 mr-1" />
              Clear all
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href="/settings">
                <Settings className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-muted rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Bell className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">All caught up!</h3>
              <p className="text-sm text-muted-foreground">
                You have no new notifications to review.
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <Card key={notification.id} className={notification.read ? "" : "border-l-4 border-l-blue-500"}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-full ${notification.read ? 'bg-muted' : 'bg-blue-50'} flex items-center justify-center flex-shrink-0`}>
                      {getIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className={`font-medium ${notification.read ? '' : 'text-blue-600'}`}>
                            {notification.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                        </span>
                      </div>
                      
                      <div className="mt-3 flex justify-end gap-2">
                        {notification.type === 'message' && (
                          <Button size="sm" variant="outline">
                            Reply
                          </Button>
                        )}
                        {notification.type === 'habit' && (
                          <Button size="sm" className="bg-green-500 hover:bg-green-600">
                            <Dumbbell className="h-4 w-4 mr-1" />
                            Start Now
                          </Button>
                        )}
                        {notification.type === 'plan' && (
                          <Button size="sm" variant="outline">
                            View Plan
                          </Button>
                        )}
                        {notification.type === 'achievement' && (
                          <Button size="sm" variant="outline">
                            Share
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          Your notifications are personalized based on your preferences.
        </footer>
      </div>
    </div>
  );
}