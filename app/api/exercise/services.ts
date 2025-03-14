import { supabase } from "@/config/supabase";
import { OpenAIService } from "@/services/OpenAIService";
import { generateExerciseGroupPrompt } from "./prompt";
import { TExercise } from "@/types/exercise";
import { randomUUID } from "crypto";
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
      user_id: input.user_id,
      group_id: input.group_id,
      name: input.name,
      guideline: input.guideline,
      image: input.image,
      videoUrl: input.videoUrl,
      muscleGroups: input.muscleGroups.join(","),
      duration: input.duration,
      difficulty: input.difficulty,
      calories: input.calories,
      option: input.option
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const addExerciseGroup = async ({ user_id, name, description, insight }: { user_id: string, name: string, description: string, insight: string }) => {
  const { data, error } = await supabase
    .from("exercise_groups")
    .insert({ user_id, name, description, insight })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getExerciseGroup = async ({ user_id, group_name }: { user_id: string, group_name: string }) => {
  const { data, error } = await supabase
    .from("exercise_groups")
    .select("*")
    .eq("user_id", user_id)
    .eq("name", group_name)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const generateExerciseGroup = async ({ exerciseGroupName, exercises }: { exerciseGroupName: string, exercises: TExercise[] }) => {
  const prompt = generateExerciseGroupPrompt({ exerciseGroupName, exercises });
  const response = await OpenAIService.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [{ role: "system", content: prompt }],
  });

  console.log(response.choices[0].message.content);

  const data = JSON.parse(response.choices[0].message.content || "{}");
  return data;
};

export const checkImageURL = async (imageURL: string) => {
  const response = await fetch(imageURL);
  return response.ok; 
};

export const checkVideoURL = async (videoURL: string) => {
  const response = await fetch(videoURL);
  return response.ok;
};