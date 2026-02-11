"use client";
import { usePathname, useRouter } from 'next/navigation';
import { i18n } from '@/i18n-config';

export function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();

    const getCurrentLocale = () => {
        const segments = pathname.split('/');
        return segments[1] as string;
    };

    const switchLanguage = (newLocale: string) => {
        const currentLocale = getCurrentLocale();
        const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
        router.push(newPathname);
    };

    const currentLocale = getCurrentLocale();

    return (
        <div className="flex gap-2 items-center">
            {i18n.locales.map((locale) => (
                <button
                    key={locale}
                    onClick={() => switchLanguage(locale)}
                    className={`
                        px-3 py-1 rounded-lg font-bold uppercase text-sm
                        transition-all duration-300
                        ${currentLocale === locale
                        ? 'bg-black dark:bg-white text-white dark:text-black'
                        : 'bg-transparent border-2 border-black dark:border-white hover:bg-black/10 dark:hover:bg-white/10'
                    }
                    `}
                >
                    {locale}
                </button>
            ))}
        </div>
    );
}

