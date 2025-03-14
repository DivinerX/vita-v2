import { useState, useEffect, useRef } from "react";
import api from "@/config/axios";
import { toast } from "sonner";
import Image from "next/image";
import { TExercise } from "@/types/exercise";
import { DEFAULT_EXERCISE_IMAGE } from "@/constant";
interface ExerciseCardProps {
  suggestedGroups: { name: string, existing: boolean }[];
  exercises: TExercise[];
}

export function ExerciseCards({ suggestedGroups, exercises }: ExerciseCardProps) {
  const [selectedGroup, setSelectedGroup] = useState(suggestedGroups[0]?.name || "");
  const [addingExercises, setAddingExercises] = useState(false);
  const [added, setAdded] = useState<boolean>(false);
  const [checkedExercises, setCheckedExercises] = useState<Record<string, boolean>>(() => {
    // Initialize with all exercises checked by default (except those already added)
    const initialCheckedState: Record<string, boolean> = {};
    exercises.forEach(exercise => {
      initialCheckedState[exercise.name] = true;
    });
    return initialCheckedState;
  });
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});
  
  const defaultImage = DEFAULT_EXERCISE_IMAGE; // Default image from Upstash
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Function to scroll to bottom of page
  const scrollToBottom = () => {
    const scrollingElement = document.scrollingElement || document.body;
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
  };

  // Scroll when exercises are loaded
  useEffect(() => {
    if (exercises.length > 0) {
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        setTimeout(scrollToBottom, 100);
      });
    }
  }, [exercises]);

  // Scroll when exercises are added
  useEffect(() => {
    if (added) {
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        setTimeout(scrollToBottom, 300);
      });
    }
  }, [added]);

  const handleToggleExercise = (exerciseName: string) => {
    setCheckedExercises(prev => ({
      ...prev,
      [exerciseName]: !prev[exerciseName]
    }));
  };

  const handleAddSelectedExercises = async () => {
    const selectedExercises = exercises.filter(ex => checkedExercises[ex.name] && !addedMap[ex.name]);
    
    if (selectedExercises.length === 0) return;
    
    setAddingExercises(true);
    
    try {
      await api.post("/exercise", { 
        exercises: selectedExercises,
        exerciseGroup: {
          name: selectedGroup,
          existing: suggestedGroups.find(group => group.name === selectedGroup)?.existing || false
        }
      });
      selectedExercises.forEach(exercise => {
        setAddedMap(prev => ({ ...prev, [exercise.name]: true }));
      });
      setAdded(true);
      toast.success(`${selectedExercises.length} exercise(s) added to your plan`);
      setCheckedExercises({});
      
      // Scroll after adding exercises
      requestAnimationFrame(() => {
        setTimeout(scrollToBottom, 500);
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to add exercises");
    } finally {
      setAddingExercises(false);
    }
  };
  
  // Count checked exercises that haven't been added yet
  const checkedCount = Object.entries(checkedExercises)
    .filter(([name, isChecked]) => isChecked && !addedMap[name])
    .length;

  return (
    <div 
      ref={containerRef}
      className="grid gap-3 mt-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-blue-200 dark:border-blue-700 shadow-sm"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-md font-semibold text-blue-700 dark:text-blue-200">Suggested Exercise Plan</h2>
        <button 
          className="
            px-3 py-1.5 
            text-xs font-medium text-white 
            bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700
            rounded 
            hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-500 dark:hover:to-blue-600
            transition-all duration-200
            shadow-sm
            focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          disabled={checkedCount === 0 || addingExercises || added}
          onClick={handleAddSelectedExercises}
        >
          {addingExercises ? "Adding..." : `Add Selected (${checkedCount})`}
        </button>
      </div>
      <hr className="border-blue-300 dark:border-blue-700" />
      
      <div className="flex flex-wrap gap-2 mb-2">
        {suggestedGroups.map((group) => (
          <button
            key={group.name}
            className={`
              px-2.5 py-1 
              text-xs font-medium 
              rounded 
              transition-all duration-200
              relative
              ${selectedGroup === group.name
                ? "bg-gradient-to-r from-blue-400 to-blue-500 dark:from-blue-600 dark:to-blue-700 text-white shadow-sm"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
              }
            `}
            onClick={() => setSelectedGroup(group.name)}
          >
            {group.name}
            
            {!group.existing && (
              <span className="absolute -top-2 -right-2 px-1 text-[0.4rem] font-bold bg-red-500 text-white rounded-full shadow-sm">
                NEW
              </span>
            )}
          </button>
        ))}
      </div>

      {exercises.map((exercise) => (
        <div 
          key={exercise.name} 
          className="
            border border-gray-200 dark:border-gray-700
            shadow-sm 
            rounded-lg p-3 
            hover:bg-white dark:hover:bg-gray-700
            hover:shadow-md
            transition-all duration-200
            bg-white dark:bg-gray-800
          "
        >
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0 shadow-sm">
                <Image 
                  src={imageErrorMap[exercise.name] ? defaultImage : (exercise.image || defaultImage)} 
                  alt={exercise.name}
                  fill
                  className="object-cover"
                  onError={() => setImageErrorMap(prev => ({ ...prev, [exercise.name]: true }))}
                />
                {exercise.videoUrl && (
                  <a 
                    href={exercise.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </a>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100">{exercise.name}</h3>
                  <div className="flex items-center">
                    {addedMap[exercise.name] ? (
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center">
                        <svg className="w-4 h-4 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Added
                      </span>
                    ) : (
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          style={{ backgroundColor: added ? "#007bff" : "white" }}
                          disabled={added}
                          checked={!!checkedExercises[exercise.name]}
                          onChange={() => handleToggleExercise(exercise.name)}
                        />
                        <span className="ml-1.5 text-xs text-gray-600 dark:text-gray-300">Select</span>
                      </label>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-1">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                    {exercise.difficulty}
                  </span>
                  <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {exercise.duration}
                  </span>
                  <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                    </svg>
                    {exercise.calories} cal
                  </span>
                </div>
              </div>
            </div>
            
            <div 
              className="
                text-xs text-gray-600 dark:text-gray-300 
                leading-relaxed whitespace-pre-line 
                overflow-hidden
                transition-all duration-300 ease-in-out
                max-h-[3em] hover:max-h-[20em]
              "
            >
              {exercise.guideline}
            </div>

            <hr className="my-1.5 border-gray-100 dark:border-gray-700" />

            <div className="flex flex-wrap gap-1.5 text-xs">
              <span className="text-gray-500 dark:text-gray-400 mr-1 flex items-center">
                <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                Targets:
              </span>
              {exercise.muscleGroups.map(muscle => (
                <span 
                  key={muscle} 
                  className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                >
                  {muscle}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
