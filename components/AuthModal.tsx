"use client";

import { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const AuthModal = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div>
            {isLogin ? (
                <LoginModal onSwitch={() => setIsLogin(false)} />
            ) : (
                <RegisterModal onSwitch={() => setIsLogin(true)} />
            )}
        </div>
    );
};

export default AuthModal;