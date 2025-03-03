import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const { quantity } = await req.json();

    if (!params.id || !quantity) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error: cartError } = await supabase
        .from("cart")
        .update({ quantity })
        .eq("id", params.id)
        .select();

    if (cartError) {
        return NextResponse.json({ error: cartError.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    if (!params.id) {
        return NextResponse.json({ error: "Missing cart item ID" }, { status: 400 });
    }

    const { error: cartError } = await supabase
        .from("cart")
        .delete()
        .eq("id", params.id);

    if (cartError) {
        return NextResponse.json({ error: cartError.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Item removed from cart" });
}