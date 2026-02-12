import {StaticImageData} from "next/image";
import { Locale } from '@/i18n-config';

import thompson_0 from "@/assets/work/thompson/thompson_0.jpg"
import thompson_1 from "@/assets/work/thompson/thompson_1.png"
import thompson_2 from "@/assets/work/thompson/thompson_2.png"
import thompson_3 from "@/assets/work/thompson/thompson_0.jpg"

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
        dictKey: "thompson", // dictionary key
        year: "2025",
        thumbnail: thompson_0,
        heroImage: thompson_0,
        liveUrl: "https://www.thompsonwindowfilm.com/",
        images: {
            thompson_1,
            thompson_2,
            thompson_3
        }
    }
];

// ✅ Get projects with translations - SYNC version for build time
export const getProjects = (locale: Locale): Project[] => {
    // Dynamic import using require (synchronous)
    const dict = require(`@/dictionaries/work/${locale}.json`);

    return projectsConfig.map(config => {
        const projectDict = dict[config.dictKey];

        return {
            id: config.id,
            slug: config.slug,
            title: projectDict.client,
            subtitle: "Window films product",
            category: dict.category_type[projectDict.category],
            year: config.year,
            client: projectDict.client,
            thumbnail: config.thumbnail,
            heroImage: config.heroImage,
            description: projectDict.description,
            sections: [
                ...projectDict.sections.map((section: any) => ({
                    type: 'text' as const,
                    title: section.title,
                    content: section.desc
                })),

                {
                    type: 'image' as const,
                    src: config.images.thompson_3,
                    alt: "Thompson Window Film - Design"
                }
            ],
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