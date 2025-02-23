import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { token } = await req.json();

    if (!token) {
        return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: session, error: sessionError } = await supabase
        .from("sessions")
        .select("id, user_id")
        .eq("id", token)
        .single();

    if (sessionError || !session) {
        return NextResponse.json({ error: "Invalid session" }, { status: 400 });
    }

    const { error: deleteSessionError } = await supabase
    .from("sessions")
    .delete()
    .eq("id", session.id);

    if (deleteSessionError) {
        return NextResponse.json({ error: "Failed to delete session" }, { status: 500 });
    }

    const cookieStore = await cookies();
    cookieStore.delete("id");

    return NextResponse.json({ message: "Logged out successfully" });
}