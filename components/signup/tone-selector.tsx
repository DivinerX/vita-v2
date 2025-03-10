"use client";

import { cn } from "@/lib/utils";
import { Heart, User2, Users, Clipboard } from "lucide-react";

interface ToneSelectorProps {
  name: string;
  selectedTone: string | null;
  setSelectedTone: (tone: string) => void;
}

const toneOptions = [
  {
    id: "wife",
    name: "Wife",
    icon: Heart,
    description: "Caring and supportive",
  },
  {
    id: "mother",
    name: "Mother",
    icon: User2,
    description: "Nurturing and gentle",
  },
  {
    id: "friend",
    name: "Friend",
    icon: Users,
    description: "Casual and motivating",
  },
  {
    id: "assistant",
    name: "Assistant",
    icon: Clipboard,
    description: "Professional and focused",
  },
];

export function ToneSelector({ name, selectedTone, setSelectedTone }: ToneSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {toneOptions.map((tone) => {
        const Icon = tone.icon;
        return (
          <div
            key={tone.id}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200",
              selectedTone === tone.id
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-green-300 hover:bg-green-50/50"
            )}
            onClick={() => setSelectedTone(tone.id)}
          >
            <div className={cn(
              "p-2 rounded-full mb-2",
              selectedTone === tone.id ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500"
            )}>
              <Icon size={20} />
            </div>
            <span className="font-medium">{tone.name}</span>
            <span className="text-xs text-gray-500 text-center mt-1">{tone.description}</span>
          </div>
        );
      })}
      <input type="hidden" name={name} value={selectedTone ?? ""} />
    </div>
  );
}