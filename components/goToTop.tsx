"use client"
import React from 'react';
import { ArrowUpFromDot } from "lucide-react";

const GoToTop = () => {
    const scrollToTop = () => {
        const lenis = (window as any).lenis;

        if (lenis) {
            lenis.scrollTo(0, {
                duration: 0.8,
                easing: (t: number) => 1 - Math.pow(1 - t, 3),
            });
        } else {
            // Fallback agar Lenis yo‘q bo‘lsa
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div
            onClick={scrollToTop}
            className="fixed bottom-10 right-4 z-50 cursor-pointer bg-black dark:bg-white/70
      text-white dark:text-black
      rounded-[50%] w-[50px] h-[50px]
      flex flex-col items-center justify-center"
        >
            <ArrowUpFromDot />
        </div>
    );
};

export default GoToTop;
