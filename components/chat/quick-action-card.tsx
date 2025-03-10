"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
}

export function QuickActionCard({ title, description, icon, onClick }: QuickActionCardProps) {
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
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