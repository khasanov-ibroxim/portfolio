"use client"
import React from 'react';
import {motion} from "framer-motion";


const Footer = ({dict}) => {
    const scrollToTop = () => {
        const lenis = (window as any).lenis;

        if (lenis) {
            lenis.scrollTo(0, {
                duration: 0.8,
                easing: (t: number) => 1 - Math.pow(1 - t, 3),
            });
        } else {
            // Fallback agar Lenis yo‘q bo‘lsa
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };
    return (
        <>
            <motion.div
                initial="initial"
                whileInView="inView"
                viewport={{ once: false, amount: 0.5 }}
                className="w-full justify-center items-center flex flex-col px-10 py-10"
            >
                {/* Overflow hidden container */}
                <div className="w-full overflow-hidden mb-8">
                    <motion.div
                        variants={{
                            initial: { y: "-100%" },
                            inView: { y: 0 },
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl md:text-6xl lg:text-8xl font-bold text-center"
                    >
                        {dict.footer.footer_title}
                    </motion.div>
                </div>

                {/* Bottom section with staggered animation */}
                <div className="w-full justify-between flex items-center font-bold text-sm md:text-base flex-col sm:flex-row gap-4">
                    {/* Copyright - slides from top */}
                    <div className="overflow-hidden">
                        <motion.h3
                            variants={{
                                initial: { y: "-100%", opacity: 0 },
                                inView: { y: 0, opacity: 1 },
                            }}
                            className={"flex"}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                        >
                            © 2024 ALL RIGHTS RESERVED
                        </motion.h3>
                    </div>

                    {/* Back to top - slides from top */}
                    <div className="relative flex items-center gap-2
                                after:content-['']
                                after:absolute after:left-0 after:-bottom-1
                                after:h-[1px] after:w-[80%]  dark:after:bg-white after:bg-black
                                after:scale-x-0 after:origin-left
                                after:transition-transform after:duration-700
                                hover:after:scale-x-100">
                        <motion.div
                            variants={{
                                initial: { y: "-100%", opacity: 0 },
                                inView: { y: 0, opacity: 1 },
                            }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                            className="cursor-pointer hover:opacity-70 transition-opacity"
                            onClick={scrollToTop}
                        >

                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </>

    );
};

export default Footer;


