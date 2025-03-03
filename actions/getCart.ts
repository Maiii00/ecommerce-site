import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getCart(email: string) {
    const { data: user, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();
    
        if (!user || userError) {
            throw new Error("Unauthorized");
        }

        const { data, error: cartError } = await supabase
            .from("cart")
            .select("id, product_id, quantity, products(name, price)")
            .eq("user_id", user.id);
        
        if (cartError) {
            throw new Error(cartError.message);
        }

        return data || [];
}

