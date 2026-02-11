"use client";
import React from 'react';

const Awwards = ({dict}) => {
    console.log(dict);
    return (
        <section className="min-h-screen dark:bg-black bg:text-white relative">
            <div className="flex sm:flex-row flex-col  px-5">
                {/* Left Side - Sticky Title */}
                <div className="w-full sm:w-1/2 sm:pr-5  top-0 sm:sticky text-5xl md:text-5xl font-bold tracking-tight h-full pt-10 sm:flex items-center  ">
                    {dict.awards.title}

                </div>

                {/* Right Side - Scrolling Content */}
                <div className="w-full sm:w-3/3 py-10 sm:py-0  sm:pr-12 md:pr-20">
                    <div className="flex flex-col gap-5">
                        {dict.awards.content.map((aw, index) => (
                            <div
                                key={index}
                                className="relative border-border border-b-[1px] border-b-[rgba(0, 0, 0, .04)] dark:border-b-[rgba(255,255,255,0.16)] pb-2 "
                            >

                                {/* Company Name */}
                                <h3 className="text-xl font-instrument-sans md:text-3xl font-light mb-2 tracking-tight">
                                    {aw.company}
                                </h3>

                                {/* Position */}
                                <div className="text-2xl flex justify-between items-center md:text-2xl font-light mb-4 tracking-wide
                                text-black dark:text-[rgba(255,255,255,.6)]
                                ">
                                    {aw.position}

                                    <span className="">
                                        {aw.period}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Awwards;