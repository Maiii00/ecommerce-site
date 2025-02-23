import { create } from "zustand";

interface AuthModalStore {
    isOpen: boolean;
    isLogin: boolean;
    openLogin: () => void;
    openRegister: () => void;
    close: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
    isOpen: false,
    isLogin: true,
    openLogin: () => set({ isOpen: true, isLogin: true }),
    openRegister: () => set({ isOpen: true, isLogin: false}),
    close: () => set({ isOpen: false }),
}));

export default useAuthModal;