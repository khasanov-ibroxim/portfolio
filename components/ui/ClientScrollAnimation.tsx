"use client"
import React from "react";
import {motion} from "framer-motion";

export default function ClientScrollAnimation({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay }}
        >
            {children}
        </motion.div>
    );
}