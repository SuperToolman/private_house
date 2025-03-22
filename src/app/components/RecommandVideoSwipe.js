'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useResponsive } from '../contexts/ResponsiveContext';

// 导入Swiper样式
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function RecommandVideoSwipe() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const swiperRef = useRef(null);
    const { isMobile } = useResponsive();
    
    // 轮播图数据（标题和主色调）
    const slidesData = [
        { title: "2024年新番推荐：春季动漫大盘点", color: "#FF6B6B" },
        { title: "游戏区热门：最新游戏实况解说", color: "#4ECDC4" },
        { title: "音乐嘉年华：2024流行音乐盛典", color: "#7D70BA" },
        { title: "科技前沿：人工智能最新应用", color: "#45B7D1" },
        { title: "生活区：美食达人教你做家常菜", color: "#FF9F1C" },
        { title: "番剧更新：本周必看新番TOP10", color: "#6A0572" }
    ];
    
    // 鼠标悬停时暂停自动轮播
    const handleMouseEnter = () => {
        if (swiperRef.current && swiperRef.current.autoplay) {
            swiperRef.current.autoplay.stop();
        }
    };
    
    // 鼠标离开时恢复自动轮播
    const handleMouseLeave = () => {
        if (swiperRef.current && swiperRef.current.autoplay) {
            swiperRef.current.autoplay.start();
        }
    };
    
    return (
        <div 
            className="relative w-full rounded-lg group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    el: '.swiper-pagination',
                    type: 'bullets',
                    bulletClass: 'swiper-pagination-bullet',
                    bulletActiveClass: 'swiper-pagination-bullet-active',
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    enabled: !isMobile, // 在移动设备上禁用导航按钮
                }}
                onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                className="w-full"
            >
                {slidesData.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative">
                            <Image 
                                src="/images/testswipe.png" 
                                alt="测试轮播图"
                                className="w-full object-cover rounded-t-lg"
                                width={100}
                                height={100}
                                sizes={isMobile ? "(max-width: 768px) 100vw" : "50vw"}
                                priority={index === 0} // 优先加载第一张图片
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            
            {/* 标题容器 - 移到轮播图外部 */}
            <div 
                className={`w-full ${isMobile ? 'h-[60px] p-2' : 'h-[85px] p-2.5'} text-white rounded-b-lg`}
                style={{ 
                    backgroundColor: slidesData[currentIndex].color,
                    transition: 'background-color 0.5s ease'
                }}
            >
                <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-bold m-0 line-clamp-2`}>
                    {slidesData[currentIndex].title}
                </h3>
            </div>
            
            {/* 自定义导航按钮 - 在非移动设备上显示 */}
            {!isMobile && (
                <>
                    <button 
                        className="swiper-button-prev absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full text-xl flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 hover:bg-black/70 left-2.5"
                    >
                        &lt;
                    </button>
                    <button 
                        className="swiper-button-next absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full text-xl flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 hover:bg-black/70 right-2.5"
                    >
                        &gt;
                    </button>
                </>
            )}
            
            {/* 自定义分页器 */}
            <div className={`swiper-pagination absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20 ${isMobile ? 'bottom-4' : 'bottom-6'}`}>
                {/* 分页器将由Swiper自动生成 */}
            </div>
            
            <style jsx global>{`
                .swiper-pagination {
                    display: flex;
                    gap: 0.5rem;
                }
                .swiper-pagination-bullet {
                    width: 0.5rem;
                    height: 0.5rem;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 9999px;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .swiper-pagination-bullet-active {
                    background: white;
                    width: 1.25rem;
                    border-radius: 0.25rem;
                }
                .swiper-button-next:after,
                .swiper-button-prev:after {
                    display: none;
                }
                
                /* 移动端优化 */
                @media (max-width: 768px) {
                    .swiper-pagination-bullet {
                        width: 0.4rem;
                        height: 0.4rem;
                    }
                    .swiper-pagination-bullet-active {
                        width: 0.9rem;
                    }
                }
            `}</style>
        </div>
    );
}