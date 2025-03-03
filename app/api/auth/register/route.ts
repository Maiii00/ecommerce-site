import { VerificationEmail } from "@/components/VerificationEmail";;
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
    const { email, password } = await req.json();
    console.log(resend);
    

    if (!email || !password) {
        return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

    if (existingUser) {
        return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const token = crypto.randomUUID();

    const { data, error } = await supabase
        .from("users")
        .insert([{ email, password, is_verified: false, token }])
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data) {
        return NextResponse.json({ error: "User registration failed" }, { status: 500 });
    }

    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}`;

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: "Email Verification",
            react: VerificationEmail({ url: verifyUrl })
        });
        return NextResponse.json({ message: "Verification email sent!" });
    } catch (err: any) {
        return NextResponse.json({ error: "Failed to send verification email" }, { status: 500 });
    }

}