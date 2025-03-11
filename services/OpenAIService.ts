import { OpenAI } from "openai";
import { env } from "@/env";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const OpenAIService = openai;
