"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";

const CartContent = () => {
    const { cart, updateQuantity, removeFromCart } = useCart();
    
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">
            Shopping Cart
        </h1>
        {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
        ) : (
            <>
                <div className="grid grid-cols-1 gap-4">
                    {cart.map((item) => (
                        <Card key={item.id} className="p-4 flex justify-between items-center">
                            <div className="w-1/3">
                                <h2 className="text-xl font-bold">
                                    {item.name}
                                </h2>
                                <p className="text-lg font-semibold">
                                    ${item.price}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 w-1/3 justify-center">
                                <Input 
                                    type="number"
                                    className="w-16 h-10 text-center border rounded-md"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                    min="1"
                                />
                            </div>

                            <Button 
                                variant="destructive"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Remove
                            </Button>
                        </Card>
                    ))}
                </div>

                <div className="mt-6 p-4 bg-white shadow rounded-lg">
                    <h2 className="text-xl font-semibold">
                        Total: ${totalAmount}
                    </h2>
                    <Button
                        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white"
                        size="lg"
                        onClick={() => alert("Proceeding to Checkout!")}
                    >
                        Checkout
                    </Button>
                </div>
            </>
        )}
    </div>
  );
}

export default CartContent;