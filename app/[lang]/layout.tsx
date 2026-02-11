// app/[lang]/layout.tsx
import { i18n, Locale } from "@/i18n-config";
import { getCommonDictionary } from "@/lib/dictionary";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { notFound } from "next/navigation";
import GoToTop from "@/components/goToTop.tsx";

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function LangLayout({
                                             children,
                                             params
                                         }: {
    children: React.ReactNode,
    params: Promise<{ lang: Locale }>
}) {
    const { lang } = await params;

    if (!i18n.locales.includes(lang)) {
        notFound();
    }

    const dict = await getCommonDictionary(lang);

    return (
        <>
            <GoToTop/>
            <Navbar dict={dict} lang={lang}/>
            {children}
            <Footer dict={dict}/>
        </>
    );
}