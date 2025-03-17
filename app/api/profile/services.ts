import supabase from "@/services/supabaseService";

export const getProfile = async (user_id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", user_id)

  if (data && data.length === 0) {
    const { data: newProfile, error: newProfileError } = await supabase
      .from("profiles")
      .insert({ user_id: user_id, vita_name: "vita", vita_tone: "assistant" })
      .select();

    if (newProfileError) {
      throw new Error(newProfileError.message);
    }

    return newProfile;
  }

  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};
