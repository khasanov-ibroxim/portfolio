"use client";
import React from 'react';

const Experience = ({dict}) => {

    console.log(dict)
    return (
        <section className="min-h-screen dark:bg-black dark:text-white relative">
            <div className="flex sm:flex-row flex-col  px-5">
                {/* Left Side - Sticky Title */}
                <div className="w-full sm:w-1/2 sm:pr-5  top-0 sm:sticky text-5xl md:text-5xl font-bold tracking-tight h-full pt-10 sm:flex items-center  ">
                    {dict.experience.title}
                </div>

                {/* Right Side - Scrolling Content */}
                <div className="w-full sm:w-3/3 py-10 sm:py-0  sm:pr-12 md:pr-20">
                    <div className="flex flex-col gap-5">
                        {dict.experience.content.map((exp, index) => (
                            <div
                                key={index}
                                className="relative  border-border border-b-[1px] dark:border-b-[rgba(255,255,255,0.16)] border-b-[rgba(0, 0, 0, .04)] pb-10 "
                            >

                                {/* Company Name */}
                                <h3 className="text-4xl font-instrument-sans md:text-3xl font-bold mb-2 tracking-tight">
                                    {exp.company}
                                </h3>

                                {/* Position */}
                                <div className="text-2xl flex justify-between items-center md:text-2xl font-light mb-4 tracking-wide">
                                    {exp.position}

                                    <span className="">
                                        {exp.period}
                                    </span>
                                </div>

                                {/* Description */}

                                {exp.description.map((descItem , index) => (
                                    <p key={index} className=" text-black dark:text-[rgba(255,255,255,.6)] text-base md:text-lg leading-relaxed">
                                        {descItem && `- ${descItem} `}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;