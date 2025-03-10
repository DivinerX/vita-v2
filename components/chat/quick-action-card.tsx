"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
interface QuickActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
  className?: string;
}

export function QuickActionCard({ title, description, icon, onClick, className }: QuickActionCardProps) {
  return (
    <Card 
      className={cn("cursor-pointer hover:shadow-md transition-all duration-300 hover:scale-[1.02]", className)}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-green-100 text-green-600 p-2 rounded-full">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}