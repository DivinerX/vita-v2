import { supabase } from "@/config/supabase";
import { OpenAIService } from "@/services/OpenAIService";
import { generateDietGroupPrompt } from "./prompt";
import { TDiet } from "@/types/diet";

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
  diets
}: {
  dietGroupName: string,
  diets: TDiet[]
}) => {
  const prompt = generateDietGroupPrompt({ dietGroupName, diets });
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

export const getDietGroup = async ({ user_id, group_id }: { user_id: string, group_id: string }) => {
  const { data, error } = await supabase
    .from("diet_groups")
    .select("*")
    .eq("user_id", user_id)
    .eq("id", group_id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const addDiet = async ({ 
  user_id, 
  group_id, 
  type, 
  time, 
  foods, 
  option 
}: { 
  user_id: string, 
  group_id: string, 
  type: string, 
  time: string, 
  foods: any[],
  option: string 
}) => {
  const { data, error } = await supabase
    .from("diets")
    .insert({ user_id, group_id, type, time, foods, option })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};