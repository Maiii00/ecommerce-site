import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

    if (error || !user || user.password !== password) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
    }

    const { data: session, error: sessionError } = await supabase
        .from("sessions")
        .insert([{ user_id: user.id }])
        .select("*")
        .single();

    if (sessionError || !session) {
        return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
    }

    const cookieStore = await cookies();

    cookieStore.set("id", session.id, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        maxAge: 31536000,
        secure: process.env.NODE_ENV === "production",
        //secure: true
    });

    return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name, created_at: user.created_at} });
}