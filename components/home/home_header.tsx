
"use client"
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import home_header_img from "@/assets/home/home_header/home_header.png"

const HomeHeader = ({ dict }) => {
    const [scrollY, setScrollY] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", checkMobile);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    // ✅ Mobile da kam zoom, desktop da ko'proq
    const maxScale = isMobile ? 1.1 : 1.3;
    const scale = 1 + Math.min(scrollY / 3000, maxScale - 1);

    return (
        <>
            <div className="w-full h-[95vh] relative flex items-center sm:justify-end justify-center flex-col gap-20 px-10 pb-5">
                <div className="text-center font-instrument-sans ">
                    <div className="text-[18px] w-full justify-center mb-10 flex items-center gap-2">
                        <span className="rounded-full bg-[#00B803] w-[15px] h-[15px] animate-pulse"></span>
                        {dict.hero.status}
                    </div>
                    <h1 className="text-[50px] font-bold leading-[40px] md:text-[100px] md:leading-[90px] lg:text-[140px] lg:leading-[120px]">
                        {dict.hero.name[0]}
                        <br /> {dict.hero.name[1]}
                    </h1>
                </div>
                <div className="w-full flex justify-between  text-[14px] absolute bottom-10 px-3 sm:static">
                    <div className="text-left text-xl">{dict.hero.location}</div>
                    <div className="text-right text-xl">{dict.hero.title}</div>
                </div>
            </div>

            {/* ✅ TO'G'RILANGAN - Overflow muammosi hal qilindi */}
            <div className="w-full h-screen overflow-hidden">
                <div
                    className="w-full h-full"
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: "center center",
                        transition: "transform 0.7s linear",
                    }}
                >
                    <Image
                        src={home_header_img}
                        alt="home"
                        className="w-full h-full object-cover object-center"
                        priority
                    />
                </div>
            </div>
        </>
    );
};

export default HomeHeader;
