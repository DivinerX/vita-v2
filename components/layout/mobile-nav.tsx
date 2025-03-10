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
  Settings,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export function MobileNav() {
  const pathname = usePathname();

  // Simplified navigation for mobile - just the most important items
  const navItems: NavItem[] = [
    {
      title: "Home",
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
      title: "Progress",
      href: "/progress",
      icon: <BarChart2 className="h-5 w-5" />
    },
    {
      title: "Achieve",
      href: "/gamification",
      icon: <Award className="h-5 w-5" />
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-10 lg:hidden">
      <div className="flex justify-between items-center px-4 py-1">
        <nav className="flex justify-around py-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-xs font-medium transition-colors",
                pathname === item.href
                  ? "text-green-600"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center">
          <Link
            href="/settings"
            className={cn(
              "flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-xs font-medium transition-colors",
              pathname === "/settings"
                ? "text-green-600"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}