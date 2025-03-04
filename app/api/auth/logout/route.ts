import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST() {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("id")?.value;

    if (!sessionId) {
        return NextResponse.json({ error: "No active session" }, { status: 401 });
    }

    const { error: deleteSessionError } = await supabase
    .from("sessions")
    .delete()
    .eq("id", sessionId);

    if (deleteSessionError) {
        return NextResponse.json({ error: "Failed to delete session" }, { status: 500 });
    }

    cookieStore.delete("id");

    return NextResponse.json({ message: "Logged out successfully" });
}