"use client";
import useAuthModal from "@/hooks/useAuthModal";
import { useCart } from "@/hooks/useCart";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { openLogin, close, isLoggedIn, logout } = useAuthModal();
    const { clearCart } = useCart();
    const router = useRouter();

    const handleLogout = async() => {
        try {
            await axios.post("/api/auth/logout");
            logout();
            clearCart();
            close();
            alert("Logout successful");
            router.push("/");
            router.refresh();
        } catch (err: unknown) {
            console.error("Logout failed", err);
            alert("Logout failed. Please try again.");
        }
    }

    return (
        <nav className="flex justify-between items-center p-4 shadow-md">
            <Link href="/" className="text-2xl font-bold">
                Shop
            </Link>
            <div className="space-x-4">
                <Link href="/products" className="hover:underline">
                    Products
                </Link>
                <Link href="/cart" className="hover:underline">
                    Cart
                </Link>
                {
                    isLoggedIn ? (
                        <button onClick={handleLogout} className="hover:underline">Logout</button>
                    ) : (
                        <button onClick={openLogin} className="hover:underline">Login</button>
                    )
                }
            </div>
        </nav>
    );
}