import { OpenAIService } from "@/services/OpenAIService";
import { getDietsByGroup } from "@/app/api/diet/services";
import { dietPrompt } from "./prompt";
import { NextResponse } from "next/server";
import { authOptions } from "@/config/authOption";
import { getServerSession } from "next-auth";
import { getLastMessage } from "../service";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  const lastMessage = await getLastMessage(userId);
  console.log(lastMessage);

  const previousDiets = await getDietsByGroup(userId);
  const prompt = dietPrompt(lastMessage.content, previousDiets);
  const response = await OpenAIService.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: prompt,
      },
    ],
  });

  const responseJson = JSON.parse(response.choices[0].message.content || "{}");

  return NextResponse.json(responseJson, { status: 200 });
}