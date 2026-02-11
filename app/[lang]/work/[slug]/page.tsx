import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getProjectBySlug, projects } from '@/data/portfolio.data';
import { notFound } from 'next/navigation';
import { i18n, Locale } from '@/i18n-config';
import ClientScrollAnimation from '@/components/ui/ClientScrollAnimation';
import ClientAnimation from '@/components/ui/ClientAnimation';
import {getDictionary} from "@/lib/dictionary.ts";

type PageProps = {
    params: Promise<{
        lang: Locale;
        slug: string;
    }>;
}

// ✅ CRITICAL: Return format must match [lang] and [slug] exactly
export async function generateStaticParams() {
    const params: Array<{ lang: string; slug: string }> = [];

    // Generate for ALL combinations
    for (const locale of i18n.locales) {
        for (const project of projects) {
            params.push({
                lang: locale,
                slug: project.slug,
            });
        }
    }

    // Debug log
    console.log('🚀 Generated Static Params:', params);

    return params;
}

// ✅ Disable dynamic params
export const dynamicParams = false;

// ✅ For static export
export const dynamic = 'force-static';

export default async function WorkDetailPage({ params }: PageProps) {
    const resolvedParams = await params;
    const { slug, lang } = resolvedParams;
    const dict = await getDictionary(lang, 'work');

    console.log('📄 Rendering page:', { lang, slug });

    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    // Get 2 random projects excluding current one
    const otherProjects = projects
        .filter(p => p.slug !== slug)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-screen w-full overflow-hidden">
                <div className="relative w-full h-full">
                    <Image
                        src={project.heroImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                </div>

                <div className="absolute inset-0  bg-black/70 flex items-end">
                    <div className="container mx-auto px-5 pb-20">
                        <ClientAnimation>
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6">
                                {project.title}
                            </h1>
                            <div className="flex flex-wrap gap-8 text-white">
                                <div>
                                    <p className="text-sm opacity-60 mb-1">{dict.client}</p>
                                    <p className="text-xl font-bold">{project.client}</p>
                                </div>
                                <div>
                                    <p className="text-sm opacity-60 mb-1">{dict.year}</p>
                                    <p className="text-xl font-bold">{project.year}</p>
                                </div>
                                <div>
                                    <p className="text-sm opacity-60 mb-1">{dict.category}</p>
                                    <p className="text-xl font-bold">{project.category}</p>
                                </div>
                                {project.liveUrl !== "#" && (
                                    <div>
                                        <p className="text-sm opacity-60 mb-1">LIVE PROJECT</p>
                                        <Link
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xl font-bold flex items-center gap-2 hover:opacity-70 transition"
                                        >
                                            {dict.category} <ArrowUpRight size={20} />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </ClientAnimation>
                    </div>
                </div>
            </div>

            {/* Project Description */}
            <div className="container mx-auto px-5 py-20">
                <ClientScrollAnimation>
                    <p className="text-2xl md:text-3xl leading-relaxed max-w-4xl">
                        {project.description}
                    </p>
                </ClientScrollAnimation>
            </div>

            {/* Project Sections */}
            <div className="container mx-auto px-5 space-y-20 pb-20">
                {project.sections.map((section, index) => (
                    <ClientScrollAnimation key={index} delay={index * 0.1}>
                        {section.type === 'text' && (
                            <div className="flex flex-col lg:flex-row gap-10">
                                <div className="lg:w-1/3">
                                    <h2 className="text-4xl font-bold lg:sticky lg:top-20">
                                        {section.title}
                                    </h2>
                                </div>
                                <div className="lg:w-2/3">
                                    <p className="text-xl md:text-2xl leading-relaxed text-zinc-600 dark:text-zinc-400">
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                        )}

                        {section.type === 'image' && section.src && section.alt && (
                            <div className="relative w-full h-[60vh] md:h-[80vh] rounded-3xl overflow-hidden">
                                <Image
                                    src={section.src}
                                    alt={section.alt}
                                    fill
                                    className="object-cover"
                                    sizes="100vw"
                                />
                            </div>
                        )}
                    </ClientScrollAnimation>
                ))}
            </div>

            {/* More Works */}
            {otherProjects.length > 0 && (
                <div className="container mx-auto px-5 pb-20">
                    <h2 className="text-5xl font-bold mb-10">MORE WORKS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {otherProjects.map((work, index) => (
                            <ClientScrollAnimation key={work.id} delay={index * 0.1}>
                                <Link href={`/${lang}/work/${work.slug}`}>
                                    <div className="relative h-[400px] rounded-3xl overflow-hidden group cursor-pointer">
                                        <Image
                                            src={work.thumbnail}
                                            alt={work.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                            <h3 className="text-white text-3xl font-bold mb-2">{work.title}</h3>
                                            <p className="text-white/80 text-lg">{work.subtitle}</p>
                                            <span className="text-white/60 text-sm mt-2">{work.year}</span>
                                        </div>
                                    </div>
                                </Link>
                            </ClientScrollAnimation>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}