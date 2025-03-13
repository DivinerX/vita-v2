import { NextRequest, NextResponse } from "next/server";
import { OpenAIService } from "@/services/OpenAIService";
import { getProfile } from "../profile/services";
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
    {
      role: "system",
      content: prompt
    },

    ...messages,
  ];
  const response = await OpenAIService.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 1,
    response_format: { type: "json_object" },
    messages: messagesWithSystem,
  });

  console.log(response.choices[0].message.content);

  const parsedResponse = JSON.parse(response.choices[0].message.content!);

  await createMessage({
    user_id: session.user.id!,
    content: parsedResponse.message,
    role: "assistant",
    timestamp: new Date().toISOString(),
  });
  return NextResponse.json({ content: parsedResponse.message, relatives: parsedResponse.relatives });
}
