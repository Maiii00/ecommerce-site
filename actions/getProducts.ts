export const getProducts = async() => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        return await res.json();
    } catch (error) {
        console.log("Error fetching products:", error);
        return [];
    }
}
