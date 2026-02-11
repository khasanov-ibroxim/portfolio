"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image, {StaticImageData} from "next/image";

interface ServiceProp {
    id: number;
    number: string;
    title: string;
    description: string;
    price: string;
    fullDescription: string;
    features: string[];
    image: string | StaticImageData;
}

const Expertise = ({dict}) => {
    const [selectedService, setSelectedService] = useState<ServiceProp | null>(null);

    const services: ServiceProp[] = [
        {
            id: 1,
            number: "(1)",
            title: "APP DESIGN",
            description: "Craft intuitive navigation that makes features accessible. Choose layouts and graphics that fit your app's personality.",
            price: "$3,999",
            fullDescription: "App design is one my high end skill that i give to my customers.",
            features: [
                "Web Application Design",
                "Responsive Design",
                "Animation Effects"
            ],
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
        },
        {
            id: 2,
            number: "(2)",
            title: "WEB DESIGN",
            description: "Polish animations and microinteractions that add delight. Every detail matters when sculpting an web.",
            price: "$2,999",
            fullDescription: "Creating beautiful and functional websites that engage users.",
            features: [
                "Responsive Layouts",
                "Modern UI/UX",
                "SEO Optimization"
            ],
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop"
        },
        {
            id: 3,
            number: "(3)",
            title: "FRAMER",
            description: "The process involves building virtual 3D models and materials, setting lighting, and then rendering the final images.",
            price: "$1,999",
            fullDescription: "Professional Framer development and prototyping services.",
            features: [
                "Interactive Prototypes",
                "3D Animations",
                "Custom Components"
            ],
            image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop"
        },
        {
            id: 4,
            number: "(4)",
            title: "PHOTOGRAPHY PRO",
            description: "With the click of a shutter, an image is imprinted that tells a story or makes a statement. an image is imprinted that tells a story or makes a statement.",
            price: "$899",
            fullDescription: "Professional photography services for all occasions.",
            features: [
                "Portrait Photography",
                "Event Coverage",
                "Product Photography"
            ],
            image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop"
        },
        {
            id: 5,
            number: "(5)",
            title: "MOTION GRAPHICS",
            description: "The interplay between graphic elements, typography and movement opens up a world of creative possibilities. typography and movement.",
            price: "$1,499",
            fullDescription: "Dynamic motion graphics that bring your brand to life.",
            features: [
                "2D/3D Animation",
                "Video Editing",
                "Brand Animation"
            ],
            image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop"
        }
    ];
    console.log(dict)
    return (
        <div className="py-16 px-3 md:px-10 bg  min-h-screen">
            {/* Header */}
            <div className="flex w-full  flex-col font-bold text-4xl md:text-7xl mb-16">
                <motion.div
                    viewport={{ once: true, amount: 0.5 }}
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    {dict.expertise.title}
                </motion.div>

            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  ">
                {dict.expertise.content.map((service, index) => (
                    <motion.div
                        key={index}
                       data-aos="fade-up"
                        className="relative dark:bg-[#0A0A0A] bg-[#F5F5F7] rounded-3xl p-8 border border-black/10 hover:border-black/50 transition-all group"
                    >
                        {/* Plus Button */}
                        <button
                            onClick={() => setSelectedService(service)}
                            className="absolute top-6 right-6 w-12 h-12 rounded-full border-2 border-black/16 dark:border-[rgba(255,255,255,0.04)]] flex items-center justify-center dark:hover:bg-white dark:hover:text-black  dark:group-hover:border-white
                            hover:bg-[#000] hover:text-[#fff] group-hover:border-black/20
                                transition-transform duration-700
                            hover:rotate-[180deg]
                            "
                        >
                            <span className="text-2xl font-light">+</span>
                        </button>

                        {/* Content */}
                        <div className="space-y-4">
                            <p className="text-sm text-zinc-500">{service.number}</p>
                            <h3 className="text-2xl md:text-3xl font-bold">{service.title}</h3>
                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedService && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#F5F5F7]/70 dark:bg-[#0A0A0A]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedService(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#F5F5F7] dark:bg-[#0A0A0A] relative rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-black/15"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedService(null)}
                                className="absolute top-6 right-6 w-12 h-12 rounded-full  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all flex items-center justify-center z-10"
                            >
                                <X size={24} />
                            </button>

                            <div className="p-8 md:p-12">
                                {/* Header */}
                                <div className="mb-8">
                                    <span className="inline-block px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-semibold mb-4">
                                         {selectedService.price}
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                        {selectedService.title}
                                    </h2>
                                </div>

                                {/* Image and Features Grid */}
                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                    {/* Features */}
                                    <div>
                                        <p className="text-zinc-400 text-lg mb-2">
                                            {selectedService.fullDescription}
                                        </p>
                                        <h3 className="text-2xl font-bold mb-6">{dict.expertise.key_fueters}</h3>
                                        <div className="space-y-4">
                                            {selectedService.features.map((feature, index) => (
                                                <div key={index} className="flex items-start gap-3">
                                                    <span className="text-zinc-500">({index + 1})</span>
                                                    <span className="text-zinc-500">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Image */}
                                    <div className="rounded-2xl overflow-hidden">
                                        <Image  src={selectedService.image}
                                                alt={selectedService.title}
                                                width={"122"}
                                                height={"122"}
                                                className="w-full h-full object-cover"/>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-wrap gap-4">
                                    <a href={"https://t.me/DrTex"} target={"_blank"} className="px-8 py-4 dark:bg-white dark:text-black bg-black text-white rounded-full font-semibold hover:bg-black/80 transition-colors">
                                        Telegram
                                    </a>
                                    <a href={"mailto:shams.yokubov@mail.ru"} target={"_blank"}
                                       className="px-8 py-4 border-2 dark:border-white border-black rounded-full font-semibold dark:hover:bg-white
                                       hover:bg-black hover:text-white dark:hover:text-black transition-colors">
                                        E-MAIL
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Expertise;