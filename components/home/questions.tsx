"use client"
import React, {useState} from 'react';
import {ArrowUpRight, Plus, X} from 'lucide-react';
import Image from "next/image";
import home_about_index from "@/assets/footer/footer.jpg";
import Link from "next/link";
import {motion} from "framer-motion";


const Questions = ({dict, lang}) => {
    const [openIndex, setOpenIndex] = useState<number>(0);

    const toggleQuestion = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section className="min-h-screen py-20 px-5">
            <div
                className="font-inter-tight mb-10 w-full flex flex-col items-center justify-center font-bold text-5xl text-center">
                {dict.questions.title[0]} <br/> {dict.questions.title[1]}
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="space-y-4">
                    {dict.questions.questionsData.map((item, index) => (
                        <div
                            key={index}
                            className=" bg-[#f5f5f8]  dark:bg-[#0a0a0a] rounded-2xl
            border-[1px] dark:border-[#1d1d1d] border-[rgba(0, 0, 0, .04)]
             px-5
             overflow-hidden"
                        >
                            {/* Question Header */}
                            <button
                                onClick={() => toggleQuestion(index)}
                                className="w-full flex items-center justify-between py-5 text-left group hover:opacity-80 transition-opacity"
                            >
                                <h3 className="text-xl md:text-xl font-inter-tight font-bold tracking-tight pr-8">
                                    {item.question}
                                </h3>

                                {/* Plus/X Icon */}
                                <div className="flex-shrink-0">
                                    {openIndex === index ? (
                                        <X className="w-8 h-8 md:w-8 md:h-8" strokeWidth={1.5}/>
                                    ) : (
                                        <Plus className="w-8 h-8 md:w-8 md:h-8" strokeWidth={1.5}/>
                                    )}
                                </div>
                            </button>

                            {/* Answer Content */}
                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                    openIndex === index
                                        ? 'max-h-96 opacity-100 pb-8'
                                        : 'max-h-0 opacity-0'
                                }`}
                            >
                                <p className="dark:text-[rgba(255,255,255,0.6)] text-base md:text-lg leading-relaxed pr-12">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div className="pt-10 sm:pt-32">
                <div
                    className="font-inter-tight w-full flex flex-col items-center justify-center font-bold text-5xl sm:text-8xl text-center">
                    {dict.questions.footer_title[0]}
                    <br/> {dict.questions.footer_title[1]}
                    <Link href={`/${lang}/contact`}
                          className="
            relative overflow-hidden
            font-inter-tight cursor-pointer
            border-2 border-border
            font-bold uppercase
            sm:text-[18px]
            sm:py-4 sm:px-8
            text-[14px]
            py-3 px-6
            mt-10
            rounded-3xl
            dark:bg-white bg-black
            text-white dark:text-black
            transition-colors duration-500

            before:absolute before:inset-0 before:z-0
            dark:before:bg-black  before:bg-white
            before:origin-bottom before:scale-y-0
            before:transition-transform before:duration-500
            before:content-['']

            hover:before:scale-y-100
            dark:hover:text-white hover:text-black
          "
                    >
                        <span className="relative z-10 uppercase">{dict.questions.btn}</span>
                    </Link>
                </div>
                <div className="w-full flex items-center justify-center mt-10 flex-col">
                    <div
                        className="w-[420px] h-[630px] lg:w-[350px] lg:h-[500px] rounded-[40%] overflow-hidden shadow-2xl">
                        <Image
                            src={home_about_index}
                            alt="Profile"
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                    <div className="w-full px-5 sm:w-1/2 text-center mt-10 text-lg uppercase font-bold">
                        Я живу маркетингом, потому что он про решения, ответственность и рост. Всё остальное — вторично.
                    </div>
                    <div
                        className=" mt-10 bottom-10  text-[18px] uppercase font-bold flex flex-col justify-center items-center gap-5 sm:flex-row sm:right-[20px]">
                        {[{
                            name: "Instagram",
                            href: "https://www.instagram.com/yokubovsmarketing?igsh=OXpoNzh6a3d1bXN3&utm_source=qr"
                        }, {name: "Telegram", href: "https://t.me/DrTex"}, {
                            name: "Facebook",
                            href: "https://www.facebook.com/share/1DQEYrQj6o/?mibextid=wwXIfr"
                        }]
                            .map((item, index) => (
                                <Link
                                    key={index}
                                    href="#"
                                    className="
                                relative flex items-center gap-2
                                after:content-['']
                                after:absolute after:left-0 after:-bottom-1
                                after:h-[1px] after:w-[80%]  dark:after:bg-white after:bg-black
                                after:scale-x-0 after:origin-left
                                after:transition-transform after:duration-700
                                hover:after:scale-x-100
                                "
                                >
                                    <motion.a
                                        href={item.href}
                                        className={'flex'}>
                                        {item.name} <ArrowUpRight/>
                                    </motion.a>
                                </Link>
                            ))}
                    </div>

                </div>

            </div>
        </section>
    );
};

export default Questions;