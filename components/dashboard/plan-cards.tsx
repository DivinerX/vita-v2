"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Salad, Dumbbell, HeartPulse } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";

interface PlanCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  href: string;
}

function PlanCard({ title, icon, description, href }: PlanCardProps) {
  return (
    <Link href={href} className="block">
      <Card className="min-w-[280px] h-full transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export function PlanCards() {
  const plans = [
    {
      title: "Meal Plan",
      icon: <Salad className="h-5 w-5 text-green-500" />,
      description: "Anti-inflammatory diet for energy & wellness",
      href: "/plan/diet",
    },
    {
      title: "Exercise Routine",
      icon: <Dumbbell className="h-5 w-5 text-blue-500" />,
      description: "15-min daily strength & flexibility workouts",
      href: "/plan/exercise",
    },
    {
      title: "Healthy Habits",
      icon: <HeartPulse className="h-5 w-5 text-rose-500" />,
      description: "Daily routines for mental & physical balance",
      href: "/plan/habits",
    },
  ];

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-4 pb-4">
        {plans.map((plan) => (
          <PlanCard
            key={plan.title}
            title={plan.title}
            icon={plan.icon}
            description={plan.description}
            href={plan.href}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}