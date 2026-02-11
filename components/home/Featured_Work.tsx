"use client"
import { motion, Variants } from 'framer-motion';
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { projects } from '@/data/portfolio.data';

interface FeaturedWorkProps {
    dict: any; // Changed from { [key: string]: unknown }
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
                        FEATURED
                    </motion.div>
                    <motion.div
                        viewport={{ once: false, amount: 0.5 }}
                        initial={{ y: "100%", opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        WORK
                    </motion.div>
                </div>
                <div className="font-inter-tight text-2xl w-full md:w-2/4">
                    My creative spirit comes alive in the digital realm. With nimble fingers flying across the keyboard,
                    I craft clear experiences out of nothing but ones and zeroes.
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 mt-20 gap-5">
                {projects.map((project) => (
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
                                    width={800}
                                    height={600}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
        </div>
    );
};

export default FeaturedWork;