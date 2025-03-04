"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useAuthModal from "@/hooks/useAuthModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginModal = () => {
    const { openRegister, close, setLoggedIn } = useAuthModal();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async() => {
        if (!email || !password) {
            alert("Please enter email or password");
            return;
        }
        try {
            const res = await axios.post("/api/auth/login", { email, password });
            console.log("Login success:", res.data);
            alert("Login successful");
            setLoggedIn(true, email);
            close();
            router.refresh();
        } catch (err: unknown) {
            setError(String(err));
        }
    };

    return (
        <Card className="w-full max-w-md p-6 shadow-lg rounded-lg bg-white">
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">e-mail</label>
                <Input 
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">password</label>
                <Input 
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <Button className="w-full mt-4" onClick={handleLogin}>
                Login
            </Button>

            <p className="text-center text-sm mt-4">
                Don&apos;t have account yet?&nbsp;
                <button onClick={openRegister} className="text-blue-600">register</button>
            </p>
        </Card>
    );
};

export default LoginModal;