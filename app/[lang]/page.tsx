
// app/[lang]/page.tsx
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n-config";
import HomeHeader from "@/components/home/home_header";
import FeaturedWork from "@/components/home/Featured_Work";
import HomeAbout from "@/components/home/home_about";
import Expertise from "@/components/home/expertise";
import Motivation from "@/components/home/motivation";
import Experience from "@/components/home/experience";
import FavoriteStack from "@/components/home/FavoriteStack";
import Awwards from "@/components/home/awwards";
import Trusted from "@/components/home/trusted";
import Questions from "@/components/home/questions";

interface HomeProps {
    params: Promise<{ lang: Locale }>;
}

export default async function Home({ params }: HomeProps) {
    const { lang } = await params;
    const dict = await getDictionary(lang, 'home');

    return (
        <>
            <HomeHeader dict={dict} />
            <FeaturedWork dict={dict} lang={lang} />
            <HomeAbout dict={dict} />
            <Expertise dict={dict} />
            <Motivation dict={dict} />
            <Experience dict={dict} />
            <FavoriteStack dict={dict} />
            <Awwards dict={dict} />
            <Trusted dict={dict} />
            <Questions dict={dict} lang={lang} />
        </>
    );
}
