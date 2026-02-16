import {StaticImageData} from "next/image";
import { Locale } from '@/i18n-config';

import thompson_0 from "@/assets/work/thompson/thompson_0.jpg"

import oltiMato_0 from "@/assets/work/oltinMato/oltinMato_0.webp"
import oltiMato_1 from "@/assets/work/oltinMato/oltinMato_1.webp"

import zarhal_0 from "@/assets/work/zarhal/zarhal_0.png"

import stampa_0 from "@/assets/work/stampa/stampa_0.png"

import akyus_0 from "@/assets/work/akyus/akyus_0.png"

import yustex_0 from "@/assets/work/yustex/yustex_0.png"
import yustex_1 from "@/assets/work/yustex/yustex_1.png"
import yustex_2 from "@/assets/work/yustex/yustex_2.png"

import chorkesar_0 from "@/assets/work/chorkesar/chorkesar_0.png"

import etbs_0 from "@/assets/work/etbs/etbs_0.png"

export type ProjectSection =
    | {
    type: 'text';
    title: string;
    content: string;
}
    | {
    type: 'image';
    src: string | StaticImageData;
    alt: string;
};

export interface Project {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    category: string;
    year: string;
    client: string;
    thumbnail: string | StaticImageData;
    heroImage: string | StaticImageData;
    description: string;
    sections: ProjectSection[];
    gallery: string[];
    liveUrl: string;
}

// ✅ Project configuration (language-independent)
const projectsConfig = [
    {
        id: "thompsonWindowFilm",
        slug: "thompsonWindowFilm",
        dictKey: "thompson",
        year: "2026",
        thumbnail: thompson_0,
        heroImage: thompson_0,
        liveUrl: "https://www.thompsonwindowfilm.com/",
        images: [thompson_0]
    },
    {
        id: "oltinMatoGroup",
        slug: "oltinMatoGroup",
        dictKey: "oltinMato",
        year: "2026",
        thumbnail: oltiMato_0,
        heroImage: oltiMato_0,
        liveUrl: "https://oltin-mato.vercel.app/",
        images: [oltiMato_0 , oltiMato_1]
    },
    {
        id: "zarhal",
        slug: "zarhal",
        dictKey: "zarhal",
        year: "2025",
        thumbnail: zarhal_0,
        heroImage: zarhal_0,
        liveUrl: "https://zarhalgroup.uz/",
        images: [zarhal_0]
    },
    {
        id: "stampa",
        slug: "stampa",
        dictKey: "stampa",
        year: "2025",
        thumbnail: stampa_0,
        heroImage: stampa_0,
        liveUrl: "https://stampa.uz/",
        images: [stampa_0]
    },
    {
        id: "Akyus",
        slug: "akyus",
        dictKey: "akyus",
        year: "2025",
        thumbnail: akyus_0,
        heroImage: akyus_0,
        liveUrl: "https://akyus.uz/",
        images: [akyus_0]
    },
    {
        id: "Yustex",
        slug: "yustex",
        dictKey: "yustex",
        year: "2025",
        thumbnail: yustex_2,
        heroImage: yustex_0,
        liveUrl: "https://yustex.uz/",
        images: [yustex_0 , yustex_1 , yustex_2]
    },
    {
        id: "chorkesar",
        slug: "chorkesar",
        dictKey: "chorkesar",
        year: "2025",
        thumbnail: chorkesar_0,
        heroImage: chorkesar_0,
        liveUrl: "https://chorkesarbroyler.uz/",
        images: [chorkesar_0]
    },
    {
        id: "etbs",
        slug: "etbs",
        dictKey: "etbs",
        year: "2024",
        thumbnail: etbs_0,
        heroImage: etbs_0,
        liveUrl: "https://etbs.uz/",
        images: [etbs_0]
    }
];

// ✅ Get projects with translations - SYNC version for build time
export const getProjects = (locale: Locale): Project[] => {
    // Dynamic import using require (synchronous)
    const dict = require(`@/dictionaries/work/${locale}.json`);

    return projectsConfig.map(config => {
        const projectDict = dict[config.dictKey];

        // ✅ Text sections
        const textSections: ProjectSection[] = projectDict.sections.map((section: any) => ({
            type: 'text' as const,
            title: section.title,
            content: section.desc
        }));

        // ✅ Image sections
        const imageSections: ProjectSection[] = config.images.map((image, index) => ({
            type: 'image' as const,
            src: image,
            alt: `${projectDict.client} - Image ${index + 1}`
        }));

        // ✅ Avval barcha text, keyin barcha imagelar
        const combinedSections: ProjectSection[] = [
            ...textSections,
            ...imageSections
        ];

        return {
            id: config.id,
            slug: config.slug,
            title: projectDict.client,
            subtitle: dict.category_type[projectDict.category],
            category: dict.category_type[projectDict.category],
            year: config.year,
            client: projectDict.client,
            thumbnail: config.thumbnail,
            heroImage: config.heroImage,
            description: projectDict.description,
            sections: combinedSections,
            gallery: [],
            liveUrl: config.liveUrl
        };
    });
};

// ✅ Default export for client components (Russian by default)
export const projects = getProjects('ru');

// ✅ Helper function to get project by slug
export const getProjectBySlug = (slug: string, locale: Locale = 'ru'): Project | undefined => {
    const projects = getProjects(locale);
    return projects.find(project => project.slug === slug);
};

// ✅ Helper function to get next/previous projects
export const getAdjacentProjects = (currentSlug: string, locale: Locale = 'ru') => {
    const projects = getProjects(locale);
    const currentIndex = projects.findIndex(p => p.slug === currentSlug);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
    const nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;

    return {
        prev: projects[prevIndex],
        next: projects[nextIndex]
    };
};