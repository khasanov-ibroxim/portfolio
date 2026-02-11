"use client"
import React, { useEffect } from 'react';
import Lenis from "lenis";
import { usePathname } from 'next/navigation';
import 'lenis/dist/lenis.css';

const SlowScroll: React.FC<{children: React.ReactNode}> = ({children}) => {
    const pathname = usePathname();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.8,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Global lenis
        (window as any).lenis = lenis;

        return () => {
            lenis.destroy();
            delete (window as any).lenis;
        };
    }, []);

    // Route o'zgarganda smooth scroll to top
    useEffect(() => {
        const lenis = (window as any).lenis;
        if (lenis) {
            // Animatsiya bilan
            lenis.scrollTo(0, {
                duration: 0.5,  // 0.5 soniya animatsiya
                immediate: false
            });

            // Yoki tezkor
            // lenis.scrollTo(0, { immediate: true });
        }
    }, [pathname]);

    return <>{children}</>;
};

export default SlowScroll;