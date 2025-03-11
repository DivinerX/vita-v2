import { supabase } from "@/config/supabase";

export const getHabits = async (userId: string) => {
  const { data, error } = await supabase
    .from("habits")
    .select("title, description, category, time, frequency, created_at")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
