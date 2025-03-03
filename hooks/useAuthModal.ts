import { create } from "zustand";

interface AuthModalStore {
    isOpen: boolean;
    isLogin: boolean;
    isLoggedIn: boolean;
    userEmail: string | null;
    openLogin: () => void;
    openRegister: () => void;
    close: () => void;
    setLoggedIn: (loggedIn: boolean, email?: string) => void;
    logout:() => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
    isOpen: false,
    isLogin: false,
    isLoggedIn: false,
    userEmail: null,
    openLogin: () => set({ isOpen: true, isLogin: true }),
    openRegister: () => set({ isOpen: true, isLogin: false}),
    close: () => set({ isOpen: false }),
    setLoggedIn: (loggedIn, email) => 
        set({ isLoggedIn: loggedIn, userEmail: email }),
    logout: () => set({ isLoggedIn: false, userEmail: null }),
}));

export default useAuthModal;