import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOption";
import { randomUUID } from "crypto";
import { addDietGroup, addDiet, generateDietGroup, getDietGroup } from "./services";
import { TDiet } from "@/types/diet";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  return NextResponse.json({ message: searchParams });
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user_id = session.user.id;
    const { group, diets } = await request.json();
    const option = randomUUID();
    if (!group.existing) {
      const generatedDietGroup = await generateDietGroup({ dietGroupName: group.name, diets });
      const savedDietGroup = await addDietGroup({ user_id, name: generatedDietGroup.name, description: generatedDietGroup.description, insight: generatedDietGroup.insight });
      diets.forEach(async (diet: TDiet) => {
        await addDiet({ user_id, group_id: savedDietGroup.id, type: diet.type, time: diet.time, foods: diet.foods, option });
      });
    } else {
      const savedDietGroup = await getDietGroup({ user_id, group_id: group.id });
      diets.forEach(async (diet: TDiet) => {
        await addDiet({ user_id, group_id: savedDietGroup.id, type: diet.type, time: diet.time, foods: diet.foods, option });
      });
    }

    return NextResponse.json({ message: "Diet saved" });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
