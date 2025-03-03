import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
        return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const { data: user, error } = await supabase
        .from("users")
        .select("id")
        .eq("token", token)
        .single();

    if (!user || error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    await supabase
        .from("users")
        .update({ is_verified: true, token: null })
        .eq("id", user.id);
    
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/verifyTemplate`);
}