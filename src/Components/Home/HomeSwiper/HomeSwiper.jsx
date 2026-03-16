import React from 'react'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

import "./HomeSwiper.css";

const HomeSwiper = () => {
    const banners = [
        {
            id: 1,
            title: "Run Faster",
            subtitle: "Next Level Adidas Performance",
            img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
        },
        {
            id: 2,
            title: "Street Style",
            subtitle: "Puma Urban Sneakers",
            img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
        },
        {
            id: 3,
            title: "Elite Performance",
            subtitle: "Nike Running Collection",
            img: "https://i.pinimg.com/1200x/52/71/89/527189616ebef392119d0297e5a2ecb9.jpg"
        }
    ];
    return (
        <div className="banner-container">

            <Swiper
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                autoplay={{ delay: 3500 }}
                pagination={{ clickable: true }}
                navigation
                effect="fade"
                loop
                className="banner-swiper"
            >

                {banners.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div
                            className="banner-slide"
                            style={{ backgroundImage: `url(${item.img})` }}
                        >

                            <div className="overlay"></div>

                            <div className="banner-content">

                                <h4 className="banner-subtitle">{item.subtitle}</h4>

                                <h1 className="banner-title">
                                    {item.title}
                                </h1>

                                <button className="banner-btn">
                                    Shop Collection
                                </button>

                            </div>

                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>

        </div>
    )
}

export default HomeSwiper