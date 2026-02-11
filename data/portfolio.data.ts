import {StaticImageData} from "next/image";
import thompson_0 from "@/assets/work/thompson/thompson_0.jpg"
import thompson_1 from "@/assets/work/thompson/thompson_1.png"
import thompson_2 from "@/assets/work/thompson/thompson_2.png"
import thompson_3 from "@/assets/work/thompson/thompson_0.jpg"
import {getDictionary} from "@/lib/dictionary";
import {Locale} from "@/i18n-config";

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

// ✅ Static projects data (no async, for generateStaticParams)
const staticProjectsData: Omit<Project, 'category' | 'year' | 'client'>[] = [
    {
        id: "thompsonWindowFilm",
        slug: "thompson-window-film",
        title: "Thompson Window Film",
        subtitle: "Window films product",
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
    },
    {
        id: "project2",
        slug: "e-commerce-platform",
        title: "E-Commerce Platform",
        subtitle: "Online shopping experience",
        thumbnail: thompson_0,
        heroImage: thompson_0,
        description: "Modern e-commerce platform with seamless shopping experience and advanced product filtering.",
        sections: [
            {
                type: "text",
                title: "STRATEGY",
                content: "Developed a comprehensive digital strategy focusing on user conversion optimization and customer retention through personalized shopping experiences."
            },
            {
                type: "text",
                title: "IMPLEMENTATION",
                content: "Built a scalable platform using modern technologies, ensuring fast load times, secure payments, and responsive design across all devices."
            },
            {
                type: "image",
                src: thompson_1,
                alt: "E-commerce dashboard"
            }
        ],
        gallery: [],
        liveUrl: "https://example.com"
    },
    {
        id: "project3",
        slug: "mobile-banking-app",
        title: "Mobile Banking App",
        subtitle: "Financial services at your fingertips",
        thumbnail: thompson_0,
        heroImage: thompson_0,
        description: "Intuitive mobile banking application with advanced security features and seamless user experience.",
        sections: [
            {
                type: "text",
                title: "UX DESIGN",
                content: "Created an intuitive interface that simplifies complex financial operations while maintaining the highest security standards."
            },
            {
                type: "image",
                src: thompson_2,
                alt: "Mobile app interface"
            },
            {
                type: "text",
                title: "SECURITY",
                content: "Implemented multi-layer security protocols including biometric authentication and end-to-end encryption."
            }
        ],
        gallery: [],
        liveUrl: "https://example.com"
    },
    {
        id: "project4",
        slug: "restaurant-booking-system",
        title: "Restaurant Booking System",
        subtitle: "Streamlined reservation management",
        thumbnail: thompson_0,
        heroImage: thompson_0,
        description: "Comprehensive booking and management system for restaurants with real-time availability and automated confirmations.",
        sections: [
            {
                type: "text",
                title: "PLANNING",
                content: "Analyzed the restaurant industry needs and designed a system that handles reservations, waitlists, and table management efficiently."
            },
            {
                type: "image",
                src: thompson_3,
                alt: "Booking interface"
            }
        ],
        gallery: [],
        liveUrl: "https://example.com"
    },
    {
        id: "project5",
        slug: "fitness-tracking-app",
        title: "Fitness Tracking App",
        subtitle: "Your personal health companion",
        thumbnail: thompson_0,
        heroImage: thompson_0,
        description: "Comprehensive fitness and health tracking application with AI-powered workout recommendations.",
        sections: [
            {
                type: "text",
                title: "FEATURES",
                content: "Integrated workout tracking, nutrition monitoring, and progress analytics with personalized recommendations based on user goals."
            },
            {
                type: "image",
                src: thompson_1,
                alt: "Fitness app screens"
            }
        ],
        gallery: [],
        liveUrl: "https://example.com"
    },
    {
        id: "project6",
        slug: "real-estate-platform",
        title: "Real Estate Platform",
        subtitle: "Finding your dream home made easy",
        thumbnail: thompson_0,
        heroImage: thompson_0,
        description: "Advanced real estate platform with virtual tours, smart search filters, and integrated mortgage calculator.",
        sections: [
            {
                type: "text",
                title: "INNOVATION",
                content: "Developed virtual tour technology and AI-powered property matching to help users find their perfect home faster."
            },
            {
                type: "image",
                src: thompson_2,
                alt: "Property listing page"
            }
        ],
        gallery: [],
        liveUrl: "https://example.com"
    }
];

// ✅ Get all project slugs (synchronous, for generateStaticParams)
export function getAllProjectSlugs(): string[] {
    return staticProjectsData.map(project => project.slug);
}

// ✅ Get projects with translations (async, for rendering)
export async function getProjects(locale: Locale): Promise<Project[]> {
    const dict = await getDictionary(locale, 'home');

    return staticProjectsData.map(project => ({
        ...project,
        category: "Corporate Website",
        year: "2024",
        client: project.title,
    }));
}

// ✅ Get project by slug (async, for rendering)
export async function getProjectBySlug(slug: string, locale: Locale): Promise<Project | undefined> {
    const projects = await getProjects(locale);
    return projects.find(project => project.slug === slug);
}

// ✅ Get next/previous projects
export async function getAdjacentProjects(currentSlug: string, locale: Locale) {
    const projects = await getProjects(locale);
    const currentIndex = projects.findIndex(p => p.slug === currentSlug);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
    const nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;

    return {
        prev: projects[prevIndex],
        next: projects[nextIndex]
    };
}