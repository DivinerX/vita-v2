import { TRelativeCategory, THabit } from "@/types";
import { TExercise } from "@/types/exercise";
import { Dumbbell, ForkKnife, Bed, Loader2 } from "lucide-react";
import api from "@/config/axios";
import { useState } from "react";
interface RelativeCardProps {
  relative: TRelativeCategory;
  setHabits: (habits: THabit[]) => void;
  setExercises: (exercises: TExercise[]) => void;
  setExerciseGroupSuggestions: (exerciseGroupSuggestions: { name: string, existing: boolean }[]) => void;
}

const relatives = {
  diet: {
    title: "Diet",
    description: "Create a personalized diet plan to reach your goals",
    icon: <ForkKnife className="h-6 w-6" />,
    bgColor: "#FFE0E6",
    textColor: "#FF1744",
    borderColor: "#FF4081",
    onClick: async () => {
      const response = await api.post("/message/diet");
      return response;
    }
  },
  exercise: {
    title: "Exercise",
    description: "Create a personalized exercise plan to reach your goals",
    icon: <Dumbbell className="h-6 w-6" />,
    bgColor: "#E0F7FA",
    textColor: "#00B8D4",
    borderColor: "#00E5FF",
    onClick: async () => {
      const response = await api.post("/message/exercise");
      return response;
    }
  },
  habit: {
    title: "Habit",
    description: "Create a personalized habit plan to reach your goals",
    icon: <Bed className="h-6 w-6" />,
    bgColor: "#E8F5E9",
    textColor: "#00C853",
    borderColor: "#69F0AE",
    onClick: async () => {
      const response = await api.post("/message/habit");
      return response;
    }
  }
}

export function RelativeCard({ relative, setHabits, setExercises, setExerciseGroupSuggestions }: RelativeCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div
      className="group relative cursor-pointer rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: relatives[relative].bgColor,
        border: `1px solid ${relatives[relative].borderColor}`,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        opacity: isLoading ? 0.5 : 1,
        cursor: isLoading ? 'not-allowed' : 'pointer'
      }}
      onClick={async () => {
        setIsLoading(true);
        try {
          const response = await relatives[relative].onClick();
          console.log(response.data);
          if (relative === "habit") {
            if (response.data.length > 0) {
              setHabits(response.data);
            } else {
              setHabits([response.data]);
            }
          } else if (relative === "exercise") {
            setExercises(response.data.exercises);
            setExerciseGroupSuggestions(response.data.suggestedGroups);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/5">
          <Loader2 className="h-6 w-6 animate-spin" style={{ color: relatives[relative].textColor }} />
        </div>
      )}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="p-2 rounded-lg transition-colors duration-300"
          style={{
            backgroundColor: `${relatives[relative].borderColor}40`,
            color: relatives[relative].textColor
          }}
        >
          {relatives[relative].icon}
        </div>
        <h3
          className="text-xl font-semibold tracking-tight"
          style={{ color: relatives[relative].textColor }}
        >
          {relatives[relative].title}
        </h3>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">
        {relatives[relative].description}
      </p>
    </div>
  )
}