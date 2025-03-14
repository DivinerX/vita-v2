import { supabase } from "@/config/supabase";

export const getDietsByGroup = async (userId: string) => {
  const { data, error } = await supabase
    .from("diet_groups")
    .select("*, diets(*)")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
