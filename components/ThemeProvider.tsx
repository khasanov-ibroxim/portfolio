"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    // ✅ Client-side da mount bo'lguncha kutish
    useEffect(() => {
        setMounted(true);
    }, []);

    // ✅ SSR paytida default theme (light)
    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="light"  // ✅ Default: light theme
            enableSystem={true}    // ✅ System theme qo'llab-quvvatlash
            storageKey="theme"     // ✅ localStorage key
            disableTransitionOnChange={false}  // ✅ Smooth transitions
        >
            {children}
        </NextThemesProvider>
    );
}