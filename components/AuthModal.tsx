"use client";

import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import useAuthModal from "@/hooks/useAuthModal";

const AuthModal = () => {
    const { isOpen, isLogin, close } = useAuthModal();

    if (!isOpen) return null;

    const handleClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            close();
        }
    };

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
            onMouseDown={handleClick}    
        >
            <button className="absolute top-3 right-3 text-gray-400/50" onClick={close}>✖</button>
            {isLogin ? <LoginModal /> : <RegisterModal />}
        </div>
    );
};

export default AuthModal;