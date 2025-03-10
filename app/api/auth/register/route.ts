import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/config/supabase";

export async function POST(request: NextRequest) {
  const { email, password, name, vitaName, vitaTone } = await request.json();
  console.log("email", email, "password", password, "name", name, "vitaName", vitaName, "vitaTone", vitaTone);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: name,
      },
    },
  });

  console.log("data", data);
  if (data.user?.id) {
    // First check if profile exists
    const { data: existingProfile, error: fetchError } = await supabase
      .from("profiles")
      .select()
      .eq("user_id", data.user.id)
      .single();

    let userError;
    if (existingProfile) {
      // Update existing profile
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          vita_name: vitaName,
          vita_tone: vitaTone,
        })
        .eq("user_id", data.user.id);
      userError = updateError;
    } else {
      // Insert new profile
      const { error: insertError } = await supabase
        .from("profiles")
        .insert({
          user_id: data.user.id,
          vita_name: vitaName,
          vita_tone: vitaTone,
        });
      userError = insertError;
    }

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }
  }
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data, ok: true });
}
