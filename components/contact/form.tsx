"use client"
import React, {useState} from 'react';
import Image from 'next/image';
import {motion} from 'framer-motion';
import {MapPin, Phone, Mail} from 'lucide-react';
import bg from "@/assets/footer/footer.jpg"

const ContactForm = ({dict}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const contactInfo = [
        {
            title: 'Соцсети',
            items: [
                {label: 'INSTAGRAM', link: 'https://www.instagram.com/yokubovsmarketing?igsh=OXpoNzh6a3d1bXN3&utm_source=qr'},
                {label: 'TELEGRAM', link: 'https://t.me/DrTex'},
                {label: 'FACEBOOK', link: 'https://www.facebook.com/share/1DQEYrQj6o/?mibextid=wwXIfr'}
            ]
        },
        {
            title: 'Адрес',
            items: [
                {label: 'Узбекистан'},
                {label: ' г. Ташкент'},
                {label: ' Ул.Кукча Дарвоза 314'}
            ]
        },
        {
            title: 'Телефон',
            items: [
                { value: '+99890 925 62 35', link: 'tel:+998909256235'},
                {value: '+99893 809 99 98', link: 'tel:+998938099998'}
            ]
        },
        {
            title: 'Почта',
            items: [
                {label: 'shams.yokubov@mail.ru' , link: 'mailto:shams.yokubov@mail.ru'},
                {label: 'shamsyokubov25@gmail.com' , link: 'mailto:shamsyokubov25@gmail.com'}
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
                                По делу!
                            </h1>
                            <p className="text-lg font-inter-tight md:text-2xl dark:text-white/60 text-black/60">
                                Я работаю на стыке маркетинга, бизнеса и производства. Помогаю компаниям выстраивать коммуникацию, находить партнёров и выходить на новые рынки.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h3 className="text-xl font-bold uppercase">Заполнить заявку</h3>

                            {/* Name Input */}
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Имя"
                                    required
                                    className="w-full rounded-xl bg-[#F5F5F7] dark:bg-[#0F0F0F] py-5
                                         text-black dark:text-white placeholder-[#737373] font-bold px-5
                                         focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                                         transition-all duration-300 font-instrument-sans"
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Почта"
                                    required
                                    className="w-full rounded-xl bg-[#F5F5F7] dark:bg-[#0F0F0F] py-5
                                         text-black dark:text-white placeholder-[#737373] font-bold px-5
                                         focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                                         transition-all duration-300 font-instrument-sans"
                                />
                            </div>

                            {/* Message Textarea */}
                            <div>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Сообщение"
                                    required
                                    rows={5}
                                    className="w-full rounded-xl bg-[#F5F5F7] dark:bg-[#0F0F0F] py-5
                                         text-black dark:text-white placeholder-[#737373] font-bold px-5
                                         focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                                         transition-all duration-300 resize-none font-instrument-sans"
                                />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
                                type="submit"
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

                                    before:absolute before:inset-0 before:z-0
                                    before:bg-white dark:before:bg-black
                                    before:origin-bottom before:scale-y-0
                                    before:transition-transform before:duration-500
                                    before:content-['']

                                    hover:before:scale-y-100
                                    hover:text-black dark:hover:text-white"
                            >
                                <span className="relative z-10">Отправить</span>
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