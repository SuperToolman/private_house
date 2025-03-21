'use client';

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image';

export default function RecommandVideoSwipe() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlay, setIsAutoPlay] = useState(true)
    const totalSlides = 6
    const autoPlayInterval = useRef(null)
    
    // 轮播图数据（标题和主色调）
    const slidesData = [
        { title: "2024年新番推荐：春季动漫大盘点", color: "#FF6B6B" },
        { title: "游戏区热门：最新游戏实况解说", color: "#4ECDC4" },
        { title: "音乐嘉年华：2024流行音乐盛典", color: "#7D70BA" },
        { title: "科技前沿：人工智能最新应用", color: "#45B7D1" },
        { title: "生活区：美食达人教你做家常菜", color: "#FF9F1C" },
        { title: "番剧更新：本周必看新番TOP10", color: "#6A0572" }
    ]
    
    // 自动轮播
    useEffect(() => {
        if (isAutoPlay) {
            autoPlayInterval.current = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % totalSlides)
            }, 3000) // 每3秒切换一次
        }
        
        return () => {
            if (autoPlayInterval.current) {
                clearInterval(autoPlayInterval.current)
            }
        }
    }, [isAutoPlay])
    
    // 手动切换到下一张
    const nextSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % totalSlides)
    }
    
    // 手动切换到上一张
    const prevSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + totalSlides) % totalSlides)
    }
    
    // 鼠标悬停时暂停自动轮播
    const handleMouseEnter = () => {
        setIsAutoPlay(false)
    }
    
    // 鼠标离开时恢复自动轮播
    const handleMouseLeave = () => {
        setIsAutoPlay(true)
    }
    
    // 点击指示器切换到指定幻灯片
    const goToSlide = (index) => {
        setCurrentIndex(index)
    }
    
    return (
        <div 
            className="relative w-full overflow-hidden rounded-lg group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div 
                className="flex transition-transform duration-500 ease-in-out w-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <div key={index} className="flex-shrink-0 w-full">
                        <Image 
                            src="/images/testswipe.png" 
                            alt="测试轮播图"
                            className="w-full h-full object-cover"
                            width={100}
                            height={100}
                            sizes="100vw"
                        />
                    </div>
                ))}
            </div>
            
            {/* 标题容器 */}
            <div 
                className="absolute bottom-0 left-0 w-full h-[85px] p-2.5 text-white z-10"
                style={{ 
                    backgroundColor: slidesData[currentIndex].color,
                    transition: 'background-color 0.5s ease'
                }}
            >
                <div className="absolute -top-20 left-0 w-full h-20 bg-gradient-to-b from-transparent to-black/70 -z-10"></div>
                <h3 className="text-lg font-bold m-0 text-shadow-lg">{slidesData[currentIndex].title}</h3>
            </div>
            
            {/* 左右箭头 */}
            <button 
                className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full text-xl flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 hover:bg-black/70 left-2.5"
                onClick={prevSlide}
            >
                &lt;
            </button>
            <button 
                className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full text-xl flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 hover:bg-black/70 right-2.5"
                onClick={nextSlide}
            >
                &gt;
            </button>
            
            {/* 指示器 */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <span 
                        key={index} 
                        className={`w-2 h-2 rounded-full bg-white/50 cursor-pointer transition-all duration-300 ${
                            index === currentIndex ? 'bg-white w-5 rounded' : ''
                        }`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    )
}