import { NextRequest, NextResponse } from "next/server";
import { OpenAIService } from "@/services/OpenAIService";
import { exercisePrompt } from "./prompt";
import { getAllExercisesbyGroup } from "@/app/api/exercise/services";
import { authOptions } from "@/config/authOption";
import { getServerSession } from "next-auth";
import { getLastMessage } from "../service";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  console.log(userId);
  const lastMessage = await getLastMessage(userId);
  const exercises = await getAllExercisesbyGroup({ user_id: userId });
  console.log(exercises);
  const prompt = exercisePrompt(lastMessage.content, exercises);
  const response = await OpenAIService.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [{ role: "system", content: prompt }],
  });

  console.log(response.choices[0].message.content);
  return NextResponse.json(JSON.parse(response.choices[0].message.content || "{}"));
}