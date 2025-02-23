import Link from "next/link";

export default function Navbar() {
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
                <Link href="/login" className="hover:underline">
                    Login
                </Link>
            </div>
        </nav>
    );
}