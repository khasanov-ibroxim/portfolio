"use client"
import React from "react";
import {motion} from "framer-motion";

export default function ClientAnimation({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            {children}
        </motion.div>
    );
}