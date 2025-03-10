"use client";

import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { UserGreeting } from "@/components/dashboard/user-greeting";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export function DashboardLayout({ 
  children, 
  showHeader = true 
}: DashboardLayoutProps) {
  const pathname = usePathname();
  
  // Check if this is the main dashboard to adjust layout
  const isMainDashboard = pathname === "/dashboard";
  
  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col border-r w-56 p-4 sticky top-0 h-screen">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
              V
            </div>
            <h1 className="font-bold text-xl">Vita AI</h1>
          </div>
          <ThemeToggle />
        </div>
        <MainNav className="flex-1" />
        <div className="mt-auto pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            <p>Level 2 • 250 XP</p>
            <div className="h-1 w-full bg-muted mt-1 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-1/2 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={cn(
        "flex-1 flex flex-col mb-16 lg:mb-0",
        isMainDashboard ? "max-w-full" : "max-w-5xl mx-auto w-full"
      )}>
        {/* Only show header if showHeader is true */}
        {showHeader && (
          <header className="border-b p-4">
            <UserGreeting />
          </header>
        )}
        
        <main className="flex-1">
          {children}
        </main>
        
        {/* Mobile navigation */}
        <MobileNav />
      </div>
    </div>
  );
}