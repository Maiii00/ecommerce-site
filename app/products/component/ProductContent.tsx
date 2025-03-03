"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useAuthModal from "@/hooks/useAuthModal";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/type";

interface ProductContentProps {
    products: Product[];
}

const ProductContent: React.FC<ProductContentProps> = ({ products }) => {
    const { openLogin, isLoggedIn } = useAuthModal();
    const { addToCart } = useCart();

    const handleAddToCart = (product: Product) => {
        if (!isLoggedIn) {
            alert("Please log in");
            openLogin();
        } else {
            addToCart(product);
            alert(`${product.name} has been add to your cart!`);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">
                Product List
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Card key={product.id} className="p-4 border rounded-lg">
                        <h2 className="text-xl font-bold">{product.name}</h2>
                        <p className="text-gray-700">{product.description}</p>
                        <p className="mt-2 text-lg font-semibold">${product.price}</p>
                        <Button size="lg" className="mt-4 w-full" onClick={() => handleAddToCart(product)}>
                            Add to Cart
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default ProductContent;