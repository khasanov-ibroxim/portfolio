"use client"
import React, {useEffect, useState} from 'react';

import bg from "@/assets/home/motivation/motivation_bottom_img.jpg"
import Image from "next/image";

const Motivation = ({dict}) => {
    const [scrollY, setScrollY] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    const imageRef = React.useRef<HTMLDivElement>(null);
    const [imageTop, setImageTop] = useState(0);

    useEffect(() => {
        setWindowHeight(window.innerHeight);

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (imageRef.current) {
            const rect = imageRef.current.getBoundingClientRect();
            setImageTop(rect.top + window.scrollY);
        }
    }, []);

    // Rasm viewport ga kirganmi tekshirish
    const viewportStart = scrollY + windowHeight; // Ekranning pastki qismi
    const imageInView = viewportStart > imageTop;

    // Scale ni hisoblash - faqat viewport ga kirganida
    const scrollProgress = imageInView ? Math.max(0, viewportStart - imageTop) : 0;
    const maxScroll = windowHeight * 1.5; // Bu raqamni o'zgartiring (katta = sekinroq zoom)
    const scale = 1 + Math.min(scrollProgress / maxScroll, 1) * 0.2; // 1 dan 1.5x gacha

    return (
        <div className={"py-16 "}>
            <div className={"flex justify-between flex-col md:flex-row md:px-10 pb-0 px-3 overflow-hidden"}>
                <h3 className={"w-full mb-10 md:mb-0 md:w-2/4 font-bold text-4xl md:text-6xl"}>{dict.motivation.title}</h3>
                <div className="w-full md:w-2/4 flex flex-col text-lg md:text-xl gap-5">
                    <p>{dict.motivation.content}</p>
                </div>
            </div>

            <div
                ref={imageRef}
                className="w-full h-[50vh] md:h-screen mt-0 relative overflow-hidden"
            >
                <div
                    className="w-full h-full absolute inset-0 overflow-hidden"
                    style={{
                        transform: `scale(${scale})`,
                        transition: "transform 0.1s linear",
                        transformOrigin: "center center"
                    }}
                >
                    <Image
                        src={bg}
                        alt="motivation"
                        className="w-full h-full object-cover object-center"
                        fill
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default Motivation;