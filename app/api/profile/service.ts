import supabase from "@/service/supabaseService";

export const getProfile = async (user_id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user_id)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
