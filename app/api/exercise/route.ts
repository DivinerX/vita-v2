import { NextRequest, NextResponse } from "next/server";
import { addExercise, addExerciseGroup, getAllExercisesbyGroup } from "./services";
import { authOptions } from "@/config/authOption";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  const exercises = await getAllExercisesbyGroup({ user_id: userId });

  return NextResponse.json(exercises);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  const exerciseGroup = await addExerciseGroup({ user_id: userId, name: "Default", description: "Default" });
  const exercise = await addExercise({ user_id: userId, group_id: exerciseGroup.id, name: "Default", duration: "10", difficulty: "Easy", calories: 100, muscleGroups: ["Default"], option: 1 });
  return NextResponse.json(exercise);
}
