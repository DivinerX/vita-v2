import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import { authOptions } from "@/config/authOption";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  console.log("session", session);
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", session.user.id)
    .single();
  console.log("data", data);
  if (error) {
    console.log("error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}