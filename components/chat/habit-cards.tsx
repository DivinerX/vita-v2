import { THabit } from "@/types";
import { useState } from "react";
import api from "@/config/axios";
import { toast } from "sonner";

interface HabitCardProps {
  habits: THabit[];
}

export function HabitCard({ habits }: HabitCardProps) {
  const [isAdding, setIsAdding] = useState<Record<string, boolean>>({});
  const [isAdded, setIsAdded] = useState<Record<string, boolean>>({});

  const handleAddHabit = async (habit: THabit) => {
    setIsAdding(prev => ({ ...prev, [habit.title]: true }));
    try {
      await api.post("/habit", { habit });
      setIsAdded(prev => ({ ...prev, [habit.title]: true }));
      toast.success("Habit added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add habit");
    } finally {
      setIsAdding(prev => ({ ...prev, [habit.title]: false }));
    }
  };

  return (
    <div className="grid gap-3 mt-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-green-200 dark:border-green-700 shadow-sm">
      <h2 className="text-md font-semibold text-green-700 dark:text-green-200">Suggested Habits</h2>
      <hr className="border-green-300 dark:border-green-700" />
      {habits.map((habit) => (
        <div key={habit.title} className="
          border border-gray-200 dark:border-gray-700
          shadow-sm 
          rounded-lg p-3 
          hover:bg-white dark:hover:bg-gray-700
          hover:shadow-md
          transition-all duration-200
          bg-white dark:bg-gray-800
        ">
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100">{habit.title}</h3>
                <button className="
                  px-2.5 py-1 
                  text-xs font-medium text-white 
                  bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700
                  rounded 
                  hover:from-green-600 hover:to-green-700 dark:hover:from-green-500 dark:hover:to-green-600
                  transition-all duration-200
                  shadow-sm
                  focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-opacity-50
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
                  disabled={isAdding[habit.title] || isAdded[habit.title]}
                  onClick={() => handleAddHabit(habit)}
                >
                  {isAdding[habit.title] ? "Adding..." : isAdded[habit.title] ? "Added" : "Add"}
                </button>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{habit.description}</p>
            </div>

            <hr className="my-1.5 border-gray-100 dark:border-gray-700" />

            <div className="flex gap-3 text-xs">
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span>{habit.category}</span>
              </div>

              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{habit.time}</span>
              </div>

              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{habit.frequency}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}