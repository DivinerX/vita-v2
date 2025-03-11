import { supabase } from "@/config/supabase";
import { THabit } from "@/types";

export const getHabits = async (userId: string) => {
  const { data, error } = await supabase.from("habits")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const addHabit = async (userId: string, habit: THabit) => {
  const { data, error } = await supabase.from("habits").insert({
    user_id: userId,
    title: habit.title,
    description: habit.description,
    category: habit.category,
    time: habit.time,
    frequency: habit.frequency,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};