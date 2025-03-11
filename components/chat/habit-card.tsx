import { THabit } from "@/types";
import { useState } from "react";
import api from "@/config/axios";
import { toast } from "sonner";
interface HabitCardProps {
  habit: THabit;
}

export function HabitCard({ habit }: HabitCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const handleAddHabit = async () => {
    setIsAdding(true);
    try {
      await api.post("/habits", { habit });
      setIsAdded(true);
      toast.success("Habit added successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setIsAdding(false);
    }
  };
  
  return (
    <div className="
      border border-gray-200 
      shadow-sm hover:shadow-md 
      rounded-lg p-4 
      hover:bg-gray-50/80 
      hover:-translate-y-0.5
      transform transition-all duration-300 ease-in-out
      cursor-pointer
    ">
      <div className="space-y-2">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">{habit.title}</h3>
            <button className="
              px-4 py-1.5 
              text-sm font-medium text-white 
              bg-gradient-to-r from-green-500 to-green-600
              rounded-md 
              hover:from-green-600 hover:to-green-700 
              active:scale-95
              transform transition-all duration-200
              shadow-md hover:shadow-lg
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            disabled={isAdding || isAdded}
            onClick={handleAddHabit}
            >
              {isAdding ? "Adding..." : isAdded ? "Added" : "Add to my habits"}
            </button>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">{habit.description}</p>
        </div>

        <hr className="my-2 transition-opacity duration-200 group-hover:opacity-70" />
        
        <div className="flex gap-4 text-sm">
          <div className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
            <svg className="w-4 h-4 mr-1.5 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span>{habit.category}</span>
          </div>
          
          <div className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
            <svg className="w-4 h-4 mr-1.5 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{habit.time}</span>
          </div>
          
          <div className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
            <svg className="w-4 h-4 mr-1.5 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{habit.frequency}</span>
          </div>
        </div>
      </div>
    </div>
  );
}