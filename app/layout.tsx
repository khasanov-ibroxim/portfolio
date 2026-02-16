import type {Metadata, Viewport} from "next";
import {Montserrat} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "../components/ThemeProvider";
import AosAnimate from "@/components/AOS_animate";
import SlowScroll from "@/components/SlowScroll";
import Cursor from "@/components/cursor";
import { ThemeScript } from "./theme-script";


const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
});



export const metadata: Metadata = {
    title: "Khasanov Ibroxim",
    description: "Portfolio",
    icons: {
        icon: '/logoKH.png',
        shortcut: '/logoKH.png',
        apple: '/logoKH.png',
    },
    openGraph: {
        title: "Khasanov Ibroxim",
        description: "Portfolio",
        images: ['/logoKH.png'],
    },
};


export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning className="">
        <head>
            {/* ✅ Theme flash ni oldini olish */}
            <ThemeScript />
        </head>
        <body
            className={`${montserrat.variable} `}
            suppressHydrationWarning
        >

        <ThemeProvider>
            <SlowScroll>
                <Cursor />
                {children}
                <AosAnimate />

            </SlowScroll>
        </ThemeProvider>
        </body>
        </html>
    );
}