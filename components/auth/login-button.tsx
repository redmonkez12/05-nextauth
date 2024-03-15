"use client";

import { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";

type LoginButtonProps = {
    mode?: "modal" | "redirect";
    asChild?: boolean;
};

export function LoginButton({ mode, children, asChild }: PropsWithChildren<LoginButtonProps>) {
    const router = useRouter();

    function onClick() {
        router.push("/auth/login");
    }

    if (mode === "modal") {
        return (
            <span>@Todo implement modal</span>
        );
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
}