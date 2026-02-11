
// components/navbar.tsx
"use client";
import React, { useState } from "react";
import { Mail, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";  // ✅ Import
import { motion } from "framer-motion";
import Link from "next/link";

interface NavbarProps {
    dict: {
        nav: {
            menu: string;
            home: string;
            work: string;
            contact: string;
        };
    };
    lang: string;
}

const Navbar = ({ dict, lang }: NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: dict.nav.home, path: "" },
        { name: dict.nav.work, path: "work" },
        { name: dict.nav.contact, path: "contact" },
    ];

    return (
        <>
            {/* NAVBAR */}
            <div className="absolute z-50 w-full sm:py-10 sm:px-10 py-5 px-1 flex items-center justify-between border-b border-b-black/30 dark:border-b-[rgba(255,255,255,0.16)]">
                <div className="flex items-center gap-4">
                    <ThemeToggle dict={dict}/>
                    <LanguageSwitcher />  {/* ✅ Til almashtirish tugmasi */}
                </div>



                <div
                    onClick={() => setIsMenuOpen(true)}
                    className="relative overflow-hidden font-inter-tight cursor-pointer border-2 border-border font-bold uppercase sm:text-[18px] sm:py-2 sm:px-6 text-[14px] py-1 px-4 rounded-3xl dark:bg-transparent bg-black text-white transition-colors duration-500 before:absolute before:inset-0 before:z-0 dark:before:bg-white before:bg-white before:origin-bottom before:scale-y-0 before:transition-transform before:duration-500 before:content-[''] hover:before:scale-y-100 dark:hover:text-black hover:text-black"
                >
                    <span className="relative z-10">{dict.nav.menu}</span>
                </div>
            </div>

            {/* FULLSCREEN MENU */}
            <div
                className={`fixed inset-0 z-50 bg-white text-black dark:bg-black dark:text-white flex flex-col items-center justify-center transition-transform duration-700 ease-in-out w-full h-screen overflow-hidden ${
                    isMenuOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-full opacity-0 pointer-events-none"
                }`}
            >
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-10 rounded-[50%] border-border border p-1 hover:rotate-180 transition duration-700 text-[#7A7A7A] bg-[#333336] border-[#383838] dark:bg-transparent"
                >
                    <X size={32} />
                </button>

                <nav className="flex flex-col w-full justify-center items-center">
                    {navLinks.map((link) => (
                        <FlipLink key={link.path} href={`/${lang}/${link.path}`}>
                            {link.name}
                        </FlipLink>
                    ))}
                </nav>

                <div className="absolute bottom-10 text-[18px] uppercase font-bold flex flex-col justify-center items-center gap-5 sm:flex-row sm:right-[20px]">
                    {[{name:"Instagram" , href:"https://www.instagram.com/yokubovsmarketing?igsh=OXpoNzh6a3d1bXN3&utm_source=qr"}, {name:"Telegram" , href:"https://t.me/DrTex"}, {name:"Facebook" , href:"https://www.facebook.com/share/1DQEYrQj6o/?mibextid=wwXIfr"}]
                        .map((item,index) => (
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
        </>
    );
};

export default Navbar;

const FlipLink = ({ children, href }: { children: string; href: string }) => {
    return (
        <motion.a
            href={href}
            className="relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl"
            initial="initial"
            whileInView="inView"
            whileHover="hovered"
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 1 }}
        >
            <motion.div
                variants={{
                    initial: { y: "100%", opacity: 0 },
                    hovered: { y: "-100%" },
                    inView: { y: 0, opacity: 1 },
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
            >
                {children}
            </motion.div>

            <motion.div
                className="absolute inset-0"
                variants={{
                    initial: { y: "100%" },
                    hovered: { y: 0 },
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
            >
                {children}
            </motion.div>
        </motion.a>
    );
};