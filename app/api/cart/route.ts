import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const { data: user, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

    if (!user || userError) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error: cartError } = await supabase
        .from("cart")
        .select("product_id, quantity")
        .eq("user_id", user.id)

    if (cartError) {
        return NextResponse.json({ error: cartError.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const { email, product_id, quantity } = await req.json();

    const { data: user, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

    if (!user || userError) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error: cartError } = await supabase
        .from("cart")
        .insert([{ user_id: user.id, product_id, quantity }]);

    if (cartError) {
        return NextResponse.json({ error: cartError.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
}