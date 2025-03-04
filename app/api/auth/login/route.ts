import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);


export async function POST(req: Request) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

    if (error || !user || user.password !== password) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
    }

    if (!user.is_verified) {
        return NextResponse.json({ error: "Please verify your email before logging in."}, { status: 403 });
    }

    const { data: session, error: sessionError } = await supabase
        .from("sessions")
        .insert([{ user_id: user.id }])
        .select("*")
        .single();

    if (sessionError) {
        console.error("Session creation failed:", sessionError);
        return NextResponse.json({ error: sessionError.message || "Failed to create session" }, { status: 500 });
    }

    if (!session) {
        console.error("Session is null or undefined");
        return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
    }

    const cookieStore = await cookies();

    cookieStore.set("id", session.id, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        maxAge: 31536000,
        secure: false,
        //secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({ user: { id: user.id, email: user.email, created_at: user.created_at} });
}