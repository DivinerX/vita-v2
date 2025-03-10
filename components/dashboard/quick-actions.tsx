"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Weight, Activity, ThermometerSnowflake, Dumbbell, PanelTop, Zap, Wind, Flame } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";

interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href: string;
  color: string;
}

function QuickAction({ icon, title, subtitle, href, color }: QuickActionProps) {
  return (
    <Link href={href} className="block">
      <Card className={`min-w-[220px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] border-l-4 ${color}`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${color.replace('border-', 'bg-').replace('-500', '-100')} ${color.replace('border-', 'text-')}`}>
              {icon}
            </div>
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function QuickActions() {
  const actions = [
    {
      icon: <Weight className="h-5 w-5" />,
      title: "Lose Weight",
      subtitle: "Shed the extra and feel unstoppable!",
      href: "/chat?goal=weight-loss",
      color: "border-green-500",
    },
    {
      icon: <ThermometerSnowflake className="h-5 w-5" />,
      title: "Fix a Chronic Disease",
      subtitle: "Take control and ease the fight!",
      href: "/chat?goal=chronic-disease",
      color: "border-blue-500",
    },
    {
      icon: <Activity className="h-5 w-5" />,
      title: "Beat a Short-Term Bug",
      subtitle: "Kick that cold fast—your comeback starts now!",
      href: "/chat?goal=short-term-bug",
      color: "border-orange-500",
    },
    {
      icon: <Dumbbell className="h-5 w-5" />,
      title: "Get Fit",
      subtitle: "Unleash your stronger self!",
      href: "/chat?goal=fitness",
      color: "border-indigo-500",
    },
    {
      icon: <PanelTop className="h-5 w-5" />,
      title: "Get Your Life on Track",
      subtitle: "Chaos to calm—rediscover you!",
      href: "/chat?goal=life-track",
      color: "border-purple-500",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Master Your Energy",
      subtitle: "Tired of tired? Recharge your spark!",
      href: "/chat?goal=energy",
      color: "border-amber-500",
    },
    {
      icon: <Wind className="h-5 w-5" />,
      title: "Find Your Zen",
      subtitle: "Ditch stress and breathe easy!",
      href: "/chat?goal=zen",
      color: "border-teal-500",
    },
    {
      icon: <Flame className="h-5 w-5" />,
      title: "Live Healthier",
      subtitle: "Small steps, big glow!",
      href: "/chat?goal=healthier",
      color: "border-rose-500",
    },
  ];

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-4 pb-4">
        {actions.map((action) => (
          <QuickAction
            key={action.title}
            icon={action.icon}
            title={action.title}
            subtitle={action.subtitle}
            href={action.href}
            color={action.color}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}