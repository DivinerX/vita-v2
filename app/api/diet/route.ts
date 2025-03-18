import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOption";
import { addDietGroup, addDiet, generateDietGroup, getDietGroup, getAllDietsbyGroup } from "./services";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  const diets = await getAllDietsbyGroup({ user_id: userId });

  return NextResponse.json(diets);
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user_id = session.user.id;
    const { group, diet } = await request.json();
    if (!group.existing) {
      const generatedDietGroup = await generateDietGroup({ dietGroupName: group.name, diet });
      const savedDietGroup = await addDietGroup({ user_id, name: group.name, description: generatedDietGroup.description, insight: generatedDietGroup.insight });
      await addDiet({ user_id, group_id: savedDietGroup.id, diet });
    } else {
      const savedDietGroup = await getDietGroup({ user_id, group_name: group.name });
      await addDiet({ user_id, group_id: savedDietGroup.id, diet });
    }

    return NextResponse.json({ message: "Diet saved" });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
