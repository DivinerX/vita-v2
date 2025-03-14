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
    <div className="grid gap-3 mt-4 bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg p-5 border border-green-200 dark:border-green-800 shadow">
      <h2 className="text-md font-semibold text-green-700 dark:text-green-400 flex items-center">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Suggested Habits
      </h2>
      <hr className="border-green-200 dark:border-green-800" />

      {habits.map((habit) => (
        <div key={habit.title} className="
          border border-green-100 dark:border-green-900
          shadow-sm 
          rounded-lg p-4 
          hover:bg-white dark:hover:bg-gray-800
          hover:shadow
          transition-all duration-200
          bg-white/80 dark:bg-gray-800/80
          backdrop-blur-sm
        ">
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100">{habit.title}</h3>
                <button className="
                  px-3 py-1.5
                  text-xs font-medium text-white 
                  bg-gradient-to-r from-emerald-500 to-green-600 dark:from-emerald-600 dark:to-green-700
                  rounded-md
                  hover:from-emerald-600 hover:to-green-700 dark:hover:from-emerald-500 dark:hover:to-green-600
                  transition-all duration-200
                  shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
                  disabled={isAdding[habit.title] || isAdded[habit.title]}
                  onClick={() => handleAddHabit(habit)}
                >
                  {isAdding[habit.title] ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding
                    </span>
                  ) : isAdded[habit.title] ? (
                    <span className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Added
                    </span>
                  ) : "Add Habit"}
                </button>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{habit.description}</p>
            </div>

            <hr className="my-2 border-green-100 dark:border-green-900/50" />

            <div className="flex gap-4 text-xs">
              <div className="flex items-center text-green-600 dark:text-green-400">
                <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span>{habit.category}</span>
              </div>

              <div className="flex items-center text-green-600 dark:text-green-400">
                <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{habit.time}</span>
              </div>

              <div className="flex items-center text-green-600 dark:text-green-400">
                <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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