"use client";

import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/config/axios";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
export function UserGreeting() {
  // In a real app, these would come from the user's profile
  const [userName, setUserName] = useState("");
  const [vitaName, setVitaName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState("");
  const { data: session, status } = useSession();
  
  const hasNotifications = true;

  useEffect(() => {
    setCurrentDay(new Date().toLocaleDateString("en-US", { weekday: "long" }));
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        if (response.data) {
          setVitaName(response.data.vita_name);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (status === "authenticated") {
      fetchProfile();
      const username = session?.user?.name ? session?.user?.name : session?.user?.email?.split("@")[0] || "";
      setUserName(username);
    }
  }, [status]);
  
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 border-2 border-primary">
          <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&q=80" />
          <AvatarFallback>SJ</AvatarFallback>
        </Avatar>
        <div>
          {isLoading ? (
            <Skeleton className="h-10 w-48" />
          ) : (
            <h1 className="text-2xl font-bold">
              Hey {userName || "there"}, {vitaName} here!
            </h1>
          )}
          <p className="text-muted-foreground">
            It's a beautiful {currentDay}. Ready to feel amazing?
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative" asChild>
          <Link href="/notifications">
            <Bell className="h-5 w-5" />
            {hasNotifications && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/settings">
            <Settings className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}