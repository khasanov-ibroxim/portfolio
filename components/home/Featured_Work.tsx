"use client"
import { motion, Variants } from 'framer-motion';
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { getProjects } from '@/data/portfolio.data';

interface FeaturedWorkProps {
    dict: any;
    lang: string;
}

const FeaturedWork = ({ dict, lang }: FeaturedWorkProps) => {
    const fadeInScale: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 1, ease: "easeOut" }
        }
    };

    // ✅ Get projects for current locale
    const projects = React.useMemo(() => getProjects(lang as any), [lang]);

    return (
        <div className="py-16 px-3 md:px-10">
            <div className="w-full justify-between items-center flex flex-col md:flex-row">
                <div className="flex w-full md:w-2/4 flex-col font-inter-tight font-bold text-6xl">
                    <motion.div
                        viewport={{ once: false, amount: 0.5 }}
                        initial={{ y: "100%", opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        {dict.portfolio.left[0]}
                    </motion.div>
                    <motion.div
                        viewport={{ once: false, amount: 0.5 }}
                        initial={{ y: "100%", opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        {dict.portfolio.left[1]}
                    </motion.div>
                </div>
                <div className="font-inter-tight text-2xl w-full md:w-2/4">
                    {dict.portfolio.right}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 mt-20 gap-5">
                {projects.slice(0 , 4).map((project) => (
                    <motion.div
                        key={project.id}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                        variants={fadeInScale}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Link
                            href={`/${lang}/work/${project.slug}`}
                            className="block rounded-2xl cursor-pointer bg-[#F5F5F7] border-[rgba(0,0,0,0.16)] dark:bg-[#0A0A0A] dark:border-[rgba(255,255,255,.1)] border"
                        >
                            <div className="h-[70%] lg:h-[80%] w-full group overflow-hidden rounded-2xl">
                                <Image
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-[100%] h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="flex justify-between items-center w-full px-5 py-5">
                                <div>
                                    <h2 className="font-inter-tight font-bold text-[20px]">
                                        {project.title}
                                    </h2>
                                    <p className="font-inter-tight text-lg text-[#52526D] dark:text-[rgba(255,255,255,.6)]">
                                        {project.subtitle}
                                    </p>
                                </div>
                                <div className="border-[#52526D] dark:border-[rgba(255,255,255,.2)] border px-3 py-2 rounded-2xl font-bold text-[#52526D] dark:text-[rgba(255,255,255,.5)]">
                                    {project.year}
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
            {projects.length > 4 &&
                <div className={"w-full mt-8 flex justify-center items-center"}>
                    <Link href={`/${lang}/work/`}
                          className=" relative overflow-hidden mt-10
            font-inter-tight cursor-pointer
            border-2 border-border
            font-bold uppercase
            sm:text-[18px]
            sm:py-4 sm:px-14
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
            dark:hover:text-black hover:text-black"
                    >
                        <span className={"relative z-10"}>{dict.moreWorks}</span>
                    </Link>
                </div>
            }
        </div>
    );
};

export default FeaturedWork;