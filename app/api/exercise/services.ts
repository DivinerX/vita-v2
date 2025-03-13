import { supabase } from "@/config/supabase";
import { TExercise } from "@/types/exercise";

export const getAllExercisesbyGroup = async ({ user_id }: { user_id: string }) => {
  const { data, error } = await supabase
    .from("exercise_groups")
    .select("*, exercises(*)")
    .eq("user_id", user_id);

  console.log(data);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const addExercise = async (input: TExercise) => {
  const { data, error } = await supabase
    .from("exercises")
    .insert({ 
      ...input,
      muscle_groups: input.muscleGroups.join(",")
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const addExerciseGroup = async ({ user_id, name, description }: { user_id: string, name: string, description: string }) => {
  const { data, error } = await supabase
    .from("exercise_groups")
    .insert({ user_id, name, description })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};