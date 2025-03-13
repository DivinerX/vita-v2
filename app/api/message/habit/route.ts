import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOption";
import { getLastMessage } from "../service";
import { getHabits } from "./service";
import { habitPrompt } from "./prompt";
import { OpenAIService } from "@/services/OpenAIService";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const lastMessage = await getLastMessage(session.user.id!);
  console.log(lastMessage);
  if (!lastMessage) {
    return NextResponse.json({ error: "No message found" }, { status: 400 });
  }

  const habits = await getHabits(session.user.id!);
  const prompt = habitPrompt(lastMessage.content, JSON.stringify(habits));
  const response = await OpenAIService.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: prompt }],
    response_format: { type: "json_object" },
  });

  const habit = JSON.parse(response.choices[0].message.content!);
  return NextResponse.json(habit);
}
