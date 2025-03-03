"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useAuthModal from "@/hooks/useAuthModal";

const RegisterModal = () => {
    const { openLogin, close } = useAuthModal();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async() => {
        if (!email || !password || !confirmPassword) {
            alert("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError("");

        try {
            const res = await axios.post("/api/auth/register", { email, password });

            if (res.data.message === "Verification email sent!") {
                alert("Please check your email to verify your account.");
                close();
                router.refresh();
            } else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err: any) {
            const errorMsg = err?.response?.data?.error || "Registration failed";
            setError(errorMsg);
        }
    };

    return (
        <Card className="w-full max-w-md p-6 shadow-lg rounded-lg bg-white">
            <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

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

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">confirmPassword</label>
                <Input 
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <Button 
                className="w-full mt-4" 
                onClick={handleRegister} 
                disabled={!email || !password || !confirmPassword}
            >
                Register
            </Button>

            <p className="text-center text-sm mt-4">
                Already have an account?&nbsp;	
                <button onClick={openLogin} className="text-blue-600">Login</button>
            </p>
        </Card>
    )
}

export default RegisterModal;