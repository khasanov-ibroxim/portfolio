// app/[lang]/contact/page.tsx
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/dictionary";
import ContactForm from "@/components/contact/form";

interface ContactProps {
    params: Promise<{ lang: Locale }>;
}

export default async function Page({ params }: ContactProps) {
    const { lang } = await params;
    const dict = await getDictionary(lang, 'contact');

    return (
        <div>
            <ContactForm dict={dict} />
        </div>
    );
}