import { NextRequest, NextResponse } from "next/server";
import openai from "@/service/OpenAIService";
import { getProfile } from "../profile/service";
import { chatPrompts } from "./prompts";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOption";
import { createMessage, getMessages } from "./service";

export async function POST(request: NextRequest) {
  const { message } = await request.json();
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await getProfile(session.user.id!);
  const prompt = chatPrompts({
    vitaName: profile.vita_name,
    tone: profile.vita_tone,
  });
  await createMessage({
    user_id: session.user.id!,
    content: message,
    role: "user",
    timestamp: new Date().toISOString(),
  });
  const messages = await getMessages(session.user.id!);
  const messagesWithSystem: ChatCompletionMessageParam[] = [
    { role: "system", content: prompt },
    ...messages,
  ];
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messagesWithSystem,
  });
  await createMessage({
    user_id: session.user.id!,
    content: response.choices[0].message.content!,
    role: "assistant",
    timestamp: new Date().toISOString(),
  });
  return NextResponse.json({ content: response.choices[0].message.content });
}
