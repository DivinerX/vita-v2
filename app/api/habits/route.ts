import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOption";
import { supabase } from "@/config/supabase";

export async function POST(request: NextRequest) {
  const { habit } = await request.json();
  console.log(habit);
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  const { data, error } = await supabase.from("habits").insert({
    user_id: userId,
    title: habit.title,
    description: habit.description,
    category: habit.category,
    time: habit.time,
    frequency: habit.frequency,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: "Habit added", data }, { status: 200 });
}