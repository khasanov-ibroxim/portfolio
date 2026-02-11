import React from 'react';
import { motion, Variants } from "framer-motion";
import { getProjects } from "@/data/portfolio.data";
import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n-config";

const fadeInScale: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 1, ease: "easeOut" }
    }
};

type PageProps = {
    params: Promise<{
        lang: Locale;
    }>;
}

export default async function WorkPage({ params }: PageProps) {
    const resolvedParams = await params;
    const { lang } = resolvedParams;

    // Load dictionary and projects
    const dict = await getDictionary(lang, 'work');
    const projects = await getProjects(lang);

    return (
        <div>
            <div className="flex w-full h-[70vh] justify-end items-center flex-col font-inter-tight font-bold text-7xl sm:text-9xl">
                <div className="text-[18px] mb-5 dark:text-white/60 text-black/60 font-instrument-sans">
                    {dict.period}
                </div>
                <motion.div
                    viewport={{ once: false, amount: 0.5 }}
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    SELECTED
                </motion.div>
                <motion.div
                    viewport={{ once: false, amount: 0.5 }}
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    WORKS
                </motion.div>
            </div>

            <div className="grid px-5 grid-cols-1 sm:grid-cols-2 mt-20 gap-5">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
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
}