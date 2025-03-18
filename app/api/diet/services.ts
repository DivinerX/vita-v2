import { supabase } from "@/config/supabase";
import { OpenAIService } from "@/services/OpenAIService";
import { generateDietGroupPrompt } from "./prompt";
import { TDiet, TFood } from "@/types/diet";

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

export const generateDietGroup = async ({
  dietGroupName,
  diet
}: {
  dietGroupName: string,
  diet: TDiet
}) => {
  const prompt = generateDietGroupPrompt({ dietGroupName, diet });
  const response = await OpenAIService.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [{ role: "system", content: prompt }],
  });

  return JSON.parse(response.choices[0].message.content || "");
};

export const addDietGroup = async ({ user_id, name, description, insight }: { user_id: string, name: string, description: string, insight: string }) => {
  const { data, error } = await supabase
    .from("diet_groups")
    .insert({ user_id, name, description, insight })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getDietGroup = async ({ user_id, group_name }: { user_id: string, group_name: string }) => {
  const { data, error } = await supabase
    .from("diet_groups")
    .select("*")
    .eq("user_id", user_id)
    .eq("name", group_name)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const addDiet = async ({ 
  user_id, 
  group_id, 
  diet
}: { 
  user_id: string, 
  group_id: string, 
  diet: TDiet;
}) => {
  const { data, error } = await supabase
    .from("diets")
    .insert({ user_id, group_id, diet })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getAllDietsbyGroup = async ({ user_id }: { user_id: string }) => {
  const { data, error } = await supabase
    .from("diet_groups")
    .select("*, diets(*)")
    .eq("user_id", user_id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
