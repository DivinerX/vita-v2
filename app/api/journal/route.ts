import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOption";
import { getJournal, addJournal } from "./services";
import { TJournalInput } from "@/types/journal";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const journals = await getJournal(userId);
    return NextResponse.json({ data: journals }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const journalInput: TJournalInput = await request.json();
    if (!journalInput.content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const journal = await addJournal(userId, journalInput);
    return NextResponse.json({ data: journal }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

