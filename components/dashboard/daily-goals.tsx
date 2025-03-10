"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

interface Goal {
  id: string;
  title: string;
  completed: boolean;
}

export function DailyGoals() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", title: "Drink 2L of water", completed: true },
    { id: "2", title: "15-minute morning stretch", completed: true },
    { id: "3", title: "Take vitamin supplements", completed: true },
    { id: "4", title: "10-minute mindfulness break", completed: false },
    { id: "5", title: "Evening walk (20 min)", completed: false },
  ]);
  
  const toggleGoal = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };
  
  const completedCount = goals.filter(goal => goal.completed).length;
  const progressPercentage = (completedCount / goals.length) * 100;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium">
          {completedCount} of {goals.length} completed
        </span>
        <span className="text-sm text-muted-foreground">
          {progressPercentage.toFixed(0)}%
        </span>
      </div>
      
      <Progress value={progressPercentage} className="h-2" />
      
      <ul className="space-y-3 mt-4">
        {goals.map(goal => (
          <li 
            key={goal.id} 
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
            onClick={() => toggleGoal(goal.id)}
          >
            {goal.completed ? (
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            )}
            <span className={goal.completed ? "line-through text-muted-foreground" : ""}>
              {goal.title}
            </span>
          </li>
        ))}
      </ul>
      
      <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${completedCount === goals.length ? 'bg-green-50 text-green-800' : 'bg-blue-50 text-blue-800'}`}>
        {completedCount === goals.length 
          ? "Amazing work! You've completed all goals for today!" 
          : "You're making great progress! Keep going!"}
      </div>
    </div>
  );
}