import supabase from "@/services/supabaseService";

export const getMessages = async (user_id: string) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const createMessage = async ({
  user_id,
  content,
  role,
  timestamp,
}: {
  user_id: string;
  content: string;
  role: string;
  timestamp: string;
}) => {
  const { data, error } = await supabase
    .from("messages")
    .insert({ user_id, content, role, created_at: timestamp });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getLastMessage = async (user_id: string) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("user_id", user_id)
    .eq("role", "assistant")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};
