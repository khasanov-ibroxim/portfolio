"use client";
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
    const [isVisible, setIsVisible] = useState(false);
    const circleRef = useRef<HTMLDivElement>(null);
    const targetPosition = useRef({ x: 0, y: 0 });
    const currentPosition = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef<number | undefined>(undefined);

    useEffect(() => {
        // Medium ekrandan kichikda cursor ko'rinmasin
        const checkScreenSize = () => {
            setIsVisible(window.innerWidth >= 768);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        const handleMouseMove = (e: MouseEvent) => {
            targetPosition.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Dumaloq doira uchun smooth animation
        const speed = 0.15;

        const animate = (timestamp: number) => {
            const dx = targetPosition.current.x - currentPosition.current.x;
            const dy = targetPosition.current.y - currentPosition.current.y;

            currentPosition.current.x += dx * speed;
            currentPosition.current.y += dy * speed;

            if (circleRef.current) {
                circleRef.current.style.transform = `translate3d(${currentPosition.current.x - 20}px, ${currentPosition.current.y - 20}px, 0)`;
            }

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animationFrameId.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", checkScreenSize);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            ref={circleRef}
            className="pointer-events-none fixed top-0 left-0 z-[9999] w-10 h-10 rounded-full border-2 border-white/40 mix-blend-difference"
            style={{
                transform: 'translate3d(-20px, -20px, 0)',
            }}
        />
    );
}