"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const VerifyTemplateContent = () => {
    const router = useRouter();

    const handleLoginRedirect = () => {
        router.push("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="p-8 bg-white shadow-md rounded-lg max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4 text-green-600">驗證成功！</h1>
                <p className="mb-6 text-gray-700">您的電子郵件已成功驗證，現在可以登入帳戶。</p>
                <Button className="mt-4" onClick={handleLoginRedirect}>
                    OK
                </Button>
            </div>
        </div>
    );
};

export default VerifyTemplateContent;
