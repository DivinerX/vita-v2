import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/config/authOption";
import { getServerSession } from "next-auth";
import { getProfile } from "./services";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await getProfile(session.user.id!);
    return NextResponse.json(data);
  } catch (error: any) {
    console.log("error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}