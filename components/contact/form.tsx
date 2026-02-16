"use client"
import React, {useState} from 'react';
import Image from 'next/image';
import {motion} from 'framer-motion';
import {MapPin, Phone, Mail} from 'lucide-react';
import bg from "@/assets/footer/footer.jpg"

const ContactForm = ({dict , lang}) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState({
        name: '',
        phone: ''
    });

    // Name validation - faqat harflar va bo'sh joy, kamida 5 ta harf
    const validateName = (name: string): boolean => {
        const nameRegex = /^[a-zA-Zа-яА-ЯўҚқҒғҲҳӨөЎЁё\s]+$/;
        const letterCount = name.replace(/\s/g, '').length;

        if (!nameRegex.test(name)) {
            setErrors(prev => ({
                ...prev,
                name: lang === 'uz' ? 'Faqat harflar kiriting' :
                    lang === 'ru' ? 'Только буквы' :
                        'Only letters allowed'
            }));
            return false;
        }

        if (letterCount < 5) {
            setErrors(prev => ({
                ...prev,
                name: lang === 'uz' ? 'Kamida 5 ta harf kerak' :
                    lang === 'ru' ? 'Минимум 5 букв' :
                        'Minimum 5 letters required'
            }));
            return false;
        }

        setErrors(prev => ({...prev, name: ''}));
        return true;
    };

    // Phone validation - Uzbekistan format
    const validatePhone = (phone: string): boolean => {
        // Removes all non-digits
        const digitsOnly = phone.replace(/\D/g, '');

        // Must be exactly 12 digits (998 + 9 digits)
        if (digitsOnly.length !== 12) {
            setErrors(prev => ({
                ...prev,
                phone: lang === 'uz' ? 'Telefon raqamni to\'liq kiriting (+998 XX XXX XX XX)' :
                    lang === 'ru' ? 'Введите полный номер телефона (+998 XX XXX XX XX)' :
                        'Enter complete phone number (+998 XX XXX XX XX)'
            }));
            return false;
        }

        // Must start with 998
        if (!digitsOnly.startsWith('998')) {
            setErrors(prev => ({
                ...prev,
                phone: lang === 'uz' ? 'Telefon raqam 998 bilan boshlanishi kerak' :
                    lang === 'ru' ? 'Номер должен начинаться с 998' :
                        'Phone must start with 998'
            }));
            return false;
        }

        setErrors(prev => ({...prev, phone: ''}));
        return true;
    };

    const formatPhoneNumber = (value: string): string => {
        // Remove all non-digits
        const digitsOnly = value.replace(/\D/g, '');

        // Format: +998 XX XXX XX XX
        if (digitsOnly.length === 0) return '';

        // Start with +998
        let formatted = '+998';

        // Add first 2 digits (operator code)
        if (digitsOnly.length >= 3) {
            formatted += ' ' + digitsOnly.substring(3, Math.min(5, digitsOnly.length));
        }

        // Add next 3 digits
        if (digitsOnly.length >= 5) {
            formatted += ' ' + digitsOnly.substring(5, Math.min(8, digitsOnly.length));
        }

        // Add next 2 digits
        if (digitsOnly.length >= 8) {
            formatted += ' ' + digitsOnly.substring(8, Math.min(10, digitsOnly.length));
        }

        // Add last 2 digits
        if (digitsOnly.length >= 10) {
            formatted += ' ' + digitsOnly.substring(10, Math.min(12, digitsOnly.length));
        }

        return formatted;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            // Allow only digits and + symbol at the start
            const digitsOnly = value.replace(/\D/g, '');
            if (digitsOnly.length <= 12) {
                setFormData({
                    ...formData,
                    phone: formatPhoneNumber(digitsOnly)
                });
            }
        } else if (name === 'name') {
            // Allow only letters and spaces
            const lettersOnly = value.replace(/[^a-zA-Zа-яА-ЯўҚқҒғҲҳӨөЎЁё\s]/g, '');
            setFormData({
                ...formData,
                name: lettersOnly
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }

        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({...prev, [name]: ''}));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate before submit
        const isNameValid = validateName(formData.name);
        const isPhoneValid = validatePhone(formData.phone);

        if (!isNameValid || !isPhoneValid) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const TELEGRAM_BOT_TOKEN = '8380882002:AAFZQefFzQ68GNn-zTFEKQih5PSCBQPx7yw';
            const TELEGRAM_CHAT_ID = '-1003845080377';

            // Telegram xabari formatlash
            const telegramMessage = `
🔔 <b>Yangi Contact Form Xabari</b>

👤 <b>Ism:</b> ${formData.name}
📱 <b>Telefon:</b> ${formData.phone}

💬 <b>Xabar:</b>
${formData.message}

🌐 <b>Til:</b> ${lang.toUpperCase()}
⏰ <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}
            `.trim();

            // Telegram API ga yuborish
            const response = await fetch(
                `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: telegramMessage,
                        parse_mode: 'HTML',
                    }),
                }
            );

            const data = await response.json();

            if (data.ok) {
                setSubmitStatus('success');
                // Formani tozalash
                setFormData({
                    name: '',
                    phone: '',
                    message: ''
                });
                // 3 sekunddan keyin success xabarini yashirish
                setTimeout(() => setSubmitStatus('idle'), 3000);
            } else {
                throw new Error('Telegram API xatosi');
            }
        } catch (error) {
            console.error('Xatolik:', error);
            setSubmitStatus('error');
            // 3 sekunddan keyin error xabarini yashirish
            setTimeout(() => setSubmitStatus('idle'), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            title: dict.info.social,
            items: [
                {label: 'INSTAGRAM', link: 'https://www.instagram.com/khasanov_ibroxim/'},
                {label: 'TELEGRAM', link: 'https://t.me/Khasanov_ibroxim'},
                {label: 'WHATSAPP', link: 'https://wa.me/998993045475'}
            ]
        },
        {
            title: dict.info.location,
            items: [
                {label: 'Узбекистан'},
                {label: 'г. Ташкент'},
                {label: ''}
            ]
        },
        {
            title: dict.info.phone,
            items: [
                { value: '+99899 304 54 75', link: 'tel:+998993045475'}
            ]
        },
        {
            title: dict.info.email,
            items: [
                {label: 'xasanoviibroxim@gmail.com' , link: 'mailto:xasanoviibroxim@gmail.com'},
                {label: 'xibroxim11@gmail.com' , link: 'mailto:xibroxim11@gmail.com'}
            ]
        }
    ];

    return (
        <>
            <div className="min-h-screen pt-24 px-5 pb-10 sm:pt-52 sm:pb-16 sm:px-10 flex items-center justify-center">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Left Side - Form */}
                    <motion.div
                        initial={{opacity: 0, x: -50}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.8}}
                        className="space-y-8 w-full"
                    >
                        <div className="space-y-4 mb-20">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-instrument-sans">
                                {dict.title}
                            </h1>
                            <p className="text-lg font-inter-tight md:text-2xl dark:text-white/60 text-black/60">
                                {dict.subtitle}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h3 className="text-xl font-bold uppercase">{dict.form.title}</h3>

                            {/* Name Input */}
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onBlur={() => formData.name && validateName(formData.name)}
                                    placeholder={dict.form.name}
                                    required
                                    disabled={isSubmitting}
                                    className={`w-full rounded-xl bg-[#F5F5F7] dark:bg-[#0F0F0F] py-5
                                         text-black dark:text-white placeholder-[#737373] font-bold px-5
                                         focus:outline-none focus:ring-2 ${errors.name ? 'focus:ring-red-500' : 'focus:ring-black/20 dark:focus:ring-white/20'}
                                         transition-all duration-300 font-instrument-sans
                                         disabled:opacity-50 disabled:cursor-not-allowed
                                         ${errors.name ? 'ring-2 ring-red-500' : ''}`}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-2 ml-2">{errors.name}</p>
                                )}
                            </div>

                            {/* Phone Input */}
                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onBlur={() => formData.phone && validatePhone(formData.phone)}
                                    placeholder={dict.form.phone}
                                    required
                                    disabled={isSubmitting}
                                    maxLength={17}
                                    className={`w-full rounded-xl bg-[#F5F5F7] dark:bg-[#0F0F0F] py-5
                                         text-black dark:text-white placeholder-[#737373] font-bold px-5
                                         focus:outline-none focus:ring-2 ${errors.phone ? 'focus:ring-red-500' : 'focus:ring-black/20 dark:focus:ring-white/20'}
                                         transition-all duration-300 font-instrument-sans
                                         disabled:opacity-50 disabled:cursor-not-allowed
                                         ${errors.phone ? 'ring-2 ring-red-500' : ''}`}
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-2 ml-2">{errors.phone}</p>
                                )}
                                {formData.phone && !errors.phone && formData.phone.replace(/\D/g, '').length < 12 && (
                                    <p className="text-orange-500 text-sm mt-2 ml-2">
                                        {lang === 'uz' ? 'Yana ' + (12 - formData.phone.replace(/\D/g, '').length) + ' ta raqam kiriting' :
                                            lang === 'ru' ? 'Введите еще ' + (12 - formData.phone.replace(/\D/g, '').length) + ' цифр' :
                                                'Enter ' + (12 - formData.phone.replace(/\D/g, '').length) + ' more digits'}
                                    </p>
                                )}
                            </div>

                            {/* Message Textarea */}
                            <div>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder={dict.form.message}
                                    required
                                    rows={5}
                                    disabled={isSubmitting}
                                    className="w-full rounded-xl bg-[#F5F5F7] dark:bg-[#0F0F0F] py-5
                                         text-black dark:text-white placeholder-[#737373] font-bold px-5
                                         focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                                         transition-all duration-300 resize-none font-instrument-sans
                                         disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>

                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-center font-medium"
                                >
                                    {dict.form.success}
                                </motion.div>
                            )}

                            {submitStatus === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-center font-medium"
                                >
                                    {dict.form.error}
                                </motion.div>
                            )}

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{scale: isSubmitting ? 1 : 1.02}}
                                whileTap={{scale: isSubmitting ? 1 : 0.98}}
                                type="submit"
                                disabled={isSubmitting}
                                className="relative overflow-hidden
                                    font-inter-tight cursor-pointer
                                    border-2 border-border
                                    font-bold uppercase
                                    text-base sm:text-lg
                                    py-3 px-8 sm:py-4 sm:px-10
                                    rounded-3xl
                                    bg-black dark:bg-white
                                    text-white dark:text-black
                                    transition-colors duration-500
                                    w-full sm:w-auto
                                    disabled:opacity-50 disabled:cursor-not-allowed

                                    before:absolute before:inset-0 before:z-0
                                    before:bg-white dark:before:bg-black
                                    before:origin-bottom before:scale-y-0
                                    before:transition-transform before:duration-500
                                    before:content-['']

                                    hover:before:scale-y-100
                                    hover:text-black dark:hover:text-white
                                    disabled:hover:before:scale-y-0"
                            >
                                <span className="relative z-10">
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            {dict.form.submitting}
                                        </span>
                                    ) : (
                                        dict.form.submit
                                    )}
                                </span>
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Right Side - Image */}
                    <motion.div
                        initial={{opacity: 0, x: 50}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.8, delay: 0.2}}
                        className="hidden lg:block h-full min-h-[600px]"
                    >
                        <div className="relative h-full rounded-3xl overflow-hidden">
                            <Image
                                src={bg}
                                alt="Contact"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Address Section */}
            <motion.div
                initial={{opacity: 0, y: 50}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
                viewport={{once: true}}
                className="px-5 sm:px-10 py-20 bg-white dark:bg-black"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
                        {contactInfo.map((section, index) => (
                            <motion.div
                                key={section.title}
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: index * 0.1}}
                                viewport={{once: true}}
                                className="space-y-6"
                            >
                                <h3 className="text-sm font-bold text-black/40 dark:text-white/40 tracking-wider">
                                    {section.title}
                                </h3>
                                <div className="space-y-3">
                                    {section.items.map((item, idx) => (
                                        <div key={idx}>
                                            {item.link ? (
                                                <a
                                                    href={item.link}
                                                    className="text-lg font-light text-black dark:text-white hover:text-black/60 dark:hover:text-white/60 transition-colors duration-300 block"
                                                >
                                                    {item.label}
                                                </a>
                                            ) : (
                                                <p className="text-lg font-light text-black dark:text-white">
                                                    {item.value ? (
                                                        <>
                                                            <span
                                                                className="text-black/60 dark:text-white/60">{item.label}</span>
                                                            {' '}
                                                            <span>{item.value}</span>
                                                        </>
                                                    ) : (
                                                        item.label
                                                    )}
                                                </p>
                                            )}

                                            {item.link && item.value && (
                                                <a
                                                    href={item.link}
                                                    className="text-lg font-light text-black dark:text-white"
                                                >
                                                    {item.value}
                                                </a>
                                            ) }
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default ContactForm;