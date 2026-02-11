"use client";

import React, {useEffect} from 'react';
import AOS from "aos";

const AosAnimate = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            offset:100,
            easing: "ease-out",
        })
    },[])
    return null
};

export default AosAnimate;