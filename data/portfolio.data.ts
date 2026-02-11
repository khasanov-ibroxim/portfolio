import {StaticImageData} from "next/image";



import thompson_0 from "@/assets/work/thompson/thompson_0.jpg"
import thompson_1 from "@/assets/work/thompson/thompson_1.png"
import thompson_2 from "@/assets/work/thompson/thompson_2.png"
import thompson_3 from "@/assets/work/thompson/thompson_0.jpg"
import {getDictionary} from "@/lib/dictionary.ts";



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


export const projects: Project[] = [
    {
        id: "thompsonWindowFilm",
        slug: "thompsonWindowFilm",
        title: "Thompson Window Film",
        subtitle: "Window films product",
        category: "Karporativ website",
        year: "2025",
        client: "Thompson Window Film",
        thumbnail: thompson_0,
        heroImage: thompson_0,
        description: "A revolutionary automotive photography project capturing the essence of electric vehicle innovation and design.",
        sections: [
            {
                type: "text",
                title: "RESEARCH",
                content: "Informing decision-making: Research provides data and evidence to support design decisions. It helps designers make informed choices about layout, color schemes, typography, and other design elements, leading to more effective and user-friendly websites"
            },
            {
                type: "text",
                title: "DESIGN",
                content: "Usability and Accessibility: Good design considers the needs and preferences of users, ensuring that the website is easy to navigate and understand. Intuitive navigation, clear hierarchy, and logical organization of content enhance usability and accessibility, allowing users to find what they are looking for quickly and easily"
            },
            {
                type: "text",
                title: "DEVELOPMENT",
                content: "Development optimizes the website's performance by optimizing code, reducing file sizes, and improving loading times. A fast-loading website enhances user experience, reduces bounce rates, and improves search engine rankings"
            },

            {
                type: "image",
                src: thompson_1,
                alt: "Portrait photography"
            },
            {
                type: "text",
                title: "CONCEPT",
                content: "Informing decision-making: Research provides data and evidence to support design decisions. It helps designers make informed choices about layout, color schemes, typography, and other design elements, leading to more effective and user-friendly websites"
            },
            {
                type: "image",
                src: thompson_2,
                alt: "Laptop mockup"
            },
            {
                type: "image",
                src: thompson_3,
                alt: "Fluid design"
            }
        ],
        gallery: [],
        liveUrl: "https://www.thompsonwindowfilm.com/"
    }
];

// Helper function to get project by slug
export const getProjectBySlug = (slug: string): Project | undefined => {
    return projects.find(project => project.slug === slug);
};

// Helper function to get next/previous projects
export const getAdjacentProjects = (currentSlug: string) => {
    const currentIndex = projects.findIndex(p => p.slug === currentSlug);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
    const nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;

    return {
        prev: projects[prevIndex],
        next: projects[nextIndex]
    };
};