"use client"
import React from "react";
import {motion} from "framer-motion";

export default function ClientHoverScale({ children }: { children: React.ReactNode }) {
    return (
        <motion.div whileHover={{ scale: 1.02 }}>
            {children}
        </motion.div>
    );
}