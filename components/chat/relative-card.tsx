import { TRelativeCategory } from "@/types";
import { Dumbbell, ForkKnife, Bed } from "lucide-react";
import api from "@/config/axios";

interface RelativeCardProps {
  relative: TRelativeCategory;
}

const relatives = {
  diet: {
    title: "Diet",
    description: "Create a personalized diet plan to reach your goals",
    icon: <ForkKnife className="h-6 w-6" />,
    bgColor: "#FFF3DC",
    textColor: "#FF9800",
    borderColor: "#FFB74D",
    onClick: async () => {
      const response = await api.post("/message/diet");
      console.log(response);
    }
  },
  exercise: {
    title: "Exercise",
    description: "Create a personalized exercise plan to reach your goals",
    icon: <Dumbbell className="h-6 w-6" />,
    bgColor: "#E3F2FD",
    textColor: "#1976D2",
    borderColor: "#64B5F6",
    onClick: async () => {
      const response = await api.post("/message/exercise");
      console.log(response);
    }
  },
  habit: {
    title: "Habit",
    description: "Create a personalized habit plan to reach your goals",
    icon: <Bed className="h-6 w-6" />,
    bgColor: "#E8F5E9",
    textColor: "#2E7D32",
    borderColor: "#81C784",
    onClick: async () => {
      const response = await api.post("/message/habit");
      console.log(response);
    }
  }
}

export function RelativeCard({ relative }: RelativeCardProps) {
  return (
    <div
      className="group cursor-pointer rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
      style={{ 
        backgroundColor: relatives[relative].bgColor,
        border: `1px solid ${relatives[relative].borderColor}`,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
      onClick={() => {
        relatives[relative].onClick();
      }}
    >
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