"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export function ThemeToggle({dict}) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className=" relative overflow-hidden
            font-inter-tight cursor-pointer
            border-2 border-border
            font-bold uppercase
            sm:text-[18px]
            sm:py-2 sm:px-6
            text-[14px]
            py-1 px-4
            rounded-3xl
            dark:bg-transparent bg-black
            text-white
            transition-colors duration-500

            before:absolute before:inset-0 before:z-0
            dark:before:bg-white before:bg-white
            before:origin-bottom before:scale-y-0
            before:transition-transform before:duration-500
            before:content-['']

            hover:before:scale-y-100
            dark:hover:text-black hover:text-black
            "
        >
            <span className="relative z-10">
                {theme === "dark" ? dict.nav.theme[0] : dict.nav.theme[1]}
            </span>
        </button>
    );
}