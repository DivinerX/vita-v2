import { supabase } from "@/config/supabase";
import { TJournalInput } from "@/types/journal";
import { getProfile } from "../profile/services";
import { journalPrompt } from "./prompt";
import { OpenAIService } from "@/services/OpenAIService";

export const getJournal = async (userId: string) => {
  const { data, error } = await supabase.from("journals")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const addJournal = async (userId: string, journal: TJournalInput) => {
  const previousJournals = await getJournal(userId);
  const profile = await getProfile(userId);
  const tone = profile.tone;
  const prompt = journalPrompt( journal.content, tone, previousJournals);
  console.log(prompt);
  const result = await OpenAIService.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  const reflection = result.choices[0].message.content;
  const { data, error } = await supabase.from("journals")
    .insert({ user_id: userId, content: journal.content, reflection })
    .select("*")
    .single();
  
  if (error) {
    throw new Error(error.message);
  }

  return data;
};