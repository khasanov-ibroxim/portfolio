"use client"
import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import Image from "next/image";
import logo_1 from "@/assets/home/trusted/l1.svg";
import logo_2 from "@/assets/home/trusted/l2.svg";
import logo_3 from "@/assets/home/trusted/l3.svg";
import logo_4 from "@/assets/home/trusted/l4.svg";
import logo_5 from "@/assets/home/trusted/l5.svg";
import logo_6 from "@/assets/home/trusted/l6.svg";

import human_1 from "@/assets/home/trusted/imgi_24_testimonial-1.png"
import human_2 from "@/assets/home/trusted/imgi_25_testimonial-2.png"
import human_3 from "@/assets/home/trusted/imgi_26_testimonial-3.png"
import human_4 from "@/assets/home/trusted/imgi_27_testimonial-4.png"
import human_5 from "@/assets/home/trusted/imgi_28_testimonial-5.png"
import human_6 from "@/assets/home/trusted/imgi_29_testimonial-6.png"
import bg from "@/assets/home/trusted/trusted_bottom_photo.jpg";

const Trusted = ({dict}) => {

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



    const trusted1 = [
        {
            name: 'Rick Oconnell',
            position: "Gameplay Programmer, Microsoft",
            desc: `"I was amazed by how intuitive and user-friendly everything felt. It's clear their designers obsess over every pixel, every transition, to create experiences that delight"`,
            logo: logo_1,
            human: human_1,
        },
        {
            name: 'Rick Oconnell',
            position: "Gameplay Programmer, Microsoft",
            desc: `"I was amazed by how intuitive and user-friendly everything felt. It's clear their designers obsess over every pixel, every transition, to create experiences that delight"`,
            logo: logo_2,
            human: human_2,
        },
        {
            name: 'Rick Oconnell',
            position: "Gameplay Programmer, Microsoft",
            desc: `"I was amazed by how intuitive and user-friendly everything felt. It's clear their designers obsess over every pixel, every transition, to create experiences that delight"`,
            logo: logo_3,
            human: human_3,
        },
        {
            name: 'Rick Oconnell',
            position: "Gameplay Programmer, Microsoft",
            desc: `"I was amazed by how intuitive and user-friendly everything felt. It's clear their designers obsess over every pixel, every transition, to create experiences that delight"`,
            logo: logo_4,
            human: human_4,
        },
        {
            name: 'Rick Oconnell',
            position: "Gameplay Programmer, Microsoft",
            desc: `"I was amazed by how intuitive and user-friendly everything felt. It's clear their designers obsess over every pixel, every transition, to create experiences that delight"`,
            logo: logo_5,
            human: human_5,
        },
        {
            name: 'Rick Oconnell',
            position: "Gameplay Programmer, Microsoft",
            desc: `"I was amazed by how intuitive and user-friendly everything felt. It's clear their designers obsess over every pixel, every transition, to create experiences that delight"`,
            logo: logo_6,
            human: human_6,
        },

    ];
    return (
        <div className={"py-16 "}>
            <div className="font-inter-tight w-full flex flex-col items-center justify-center font-bold text-6xl text-center">
                {dict.trusted.title[0]} <br/> {dict.trusted.title[1]}
            </div>
            <div className={"flex flex-col gap-5"}>
                <div className="mt-16 sm:mt-20 md:mt-24 overflow-hidden">
                    <motion.div
                        className="
      flex
      gap-4 sm:gap-6 md:gap-4 lg:gap-5
      overflow-visible

    "
                        animate={{
                            x: [0, -5000],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 100,
                                ease: "linear",
                            },
                        }}
                    >
                        {[...trusted1, ...trusted1, ...trusted1, ...trusted1, ...trusted1].map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`
            flex-shrink-0
            w-screen h-[300px]
            sm:w-screen sm:h-[300px]
            md:w-[500px] md:h-[300px]
            lg:w-[600px] lg:h-[300px]
            dark:bg-[#0a0a0a] bg-gray-100
             rounded-2xl
            border-[1px] dark:border-[#1d1d1d] border-[rgba(0, 0, 0, .04)]
            dark:text-white text-black
            p-5
          `}>
                                    <div className="flex w-full justify-between items-center">

                                        <div className="flex  w-4/5 justify-start items-center gap-5">
                                            <div
                                                className="w-2/12 rounded-2xl  border-[1px] border-[rgba(0, 0, 0, .04)] dark:border-[#1d1d1d] overflow-x-hidden">
                                                <Image src={item.human} alt={item.name}
                                                       className={"w-full h-full object-cover"}/>
                                            </div>
                                            <div className="flex-col flex">
                                            <span
                                                className={"font-inter-tight text-2xl font-bold uppercase"}>{item.name}</span>
                                                <span
                                                    className={"font-inter-tight text-xl font-bold "}>{item.position}</span>
                                            </div>

                                        </div>
                                        <div className="w-1/5 bg-gray-400 dark:bg-none py-0 px-5 rounded-2xl"><Image src={item.logo} alt={item.name}
                                                                       className={"w-full h-full object-cover"}/></div>
                                    </div>


                                    <div
                                        className="w-full p-5 rounded-2xl mt-5 bg-gray-300 dark:bg-[#0d0d0d] border-[1px] border-[rgba(0, 0, 0, .04)] dark:border-[#1d1d1d] font-inter-tight text-xl">
                                        {item.desc}
                                    </div>

                                </div>
                            );
                        })}
                    </motion.div>
                </div>


                <div className=" overflow-hidden">
                    <motion.div
                        className="
      flex
      gap-4 sm:gap-6 md:gap-4 lg:gap-5
      overflow-visible

    "
                        animate={{
                            x: [-5000, 0],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 100,
                                ease: "linear",
                            },
                        }}
                    >
                        {[...trusted1, ...trusted1, ...trusted1, ...trusted1, ...trusted1].map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`
            flex-shrink-0
            w-screen h-[300px]
            sm:w-screen sm:h-[300px]
            md:w-[500px] md:h-[300px]
            lg:w-[600px] lg:h-[300px]
            dark:bg-[#0a0a0a] bg-gray-100
             rounded-2xl
            border-[1px] dark:border-[#1d1d1d] border-[rgba(0, 0, 0, .04)]
            dark:text-white text-black
            p-5
          `}>
                                    <div className="flex w-full justify-between items-center">

                                        <div className="flex  w-4/5 justify-start items-center gap-5">
                                            <div
                                                className="w-2/12 rounded-2xl  border-[1px] border-[rgba(0, 0, 0, .04)] dark:border-[#1d1d1d] overflow-x-hidden">
                                                <Image src={item.human} alt={item.name}
                                                       className={"w-full h-full object-cover"}/>
                                            </div>
                                            <div className="flex-col flex">
                                            <span
                                                className={"font-inter-tight text-2xl font-bold uppercase"}>{item.name}</span>
                                                <span
                                                    className={"font-inter-tight text-xl font-bold "}>{item.position}</span>
                                            </div>

                                        </div>
                                        <div className="w-1/5 bg-gray-400 dark:bg-none py-0 px-5 rounded-2xl"><Image src={item.logo} alt={item.name}
                                                                                                                     className={"w-full h-full object-cover"}/></div>
                                    </div>


                                    <div
                                        className="w-full p-5 rounded-2xl mt-5 bg-gray-300 dark:bg-[#0d0d0d] border-[1px] border-[rgba(0, 0, 0, .04)] dark:border-[#1d1d1d] font-inter-tight text-xl">
                                        {item.desc}
                                    </div>

                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>


            <div
                ref={imageRef}
                className="w-full h-[60vh] md:h-screen overflow-hidden mt-32 relative"
            >
                <div
                    className="w-full h-full absolute inset-0"
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

export default Trusted;