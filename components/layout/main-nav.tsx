"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  MessageSquare,
  BarChart2,
  Book,
  Award,
  Sparkles,
  Dumbbell,
  CalendarCheck,
  Heart,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />
    },
    {
      title: "Chat",
      href: "/chat",
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      title: "Journal",
      href: "/journal",
      icon: <Book className="h-5 w-5" />
    },
    {
      title: "Diet",
      href: "/plan/diet",
      icon: <Heart className="h-5 w-5" />
    },
    {
      title: "Exercise",
      href: "/plan/exercise",
      icon: <Dumbbell className="h-5 w-5" />
    },
    {
      title: "Habits",
      href: "/plan/habits",
      icon: <CalendarCheck className="h-5 w-5" />
    },
    {
      title: "Progress",
      href: "/progress",
      icon: <BarChart2 className="h-5 w-5" />
    },
    {
      title: "Health Twin",
      href: "/health-twin",
      icon: <Sparkles className="h-5 w-5" />
    },
    {
      title: "Achievements",
      href: "/gamification",
      icon: <Award className="h-5 w-5" />
    }
  ];

  return (
    <nav className={cn("flex", className)}>
      <ul className="flex flex-col gap-1 w-full">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-green-50 text-green-600"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {item.icon}
              <span className="hidden lg:inline">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}