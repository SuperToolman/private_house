'use client'
import { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import Link from 'next/link'
import Image from 'next/image'
import AnimeRankList from './components/AnimeRankList'
import { useResponsive } from '../contexts/ResponsiveContext'

export default function Anime() {
    const { isMobile, isTablet, isClient } = useResponsive();
    const [currentBg, setCurrentBg] = useState('/images/testcover.webp')
    const [activeSlide, setActiveSlide] = useState(0)
    const isAnimating = useRef(false)

    // 轮播图数据
    const slides = [
        {
            id: 1,
            title: '我强升级 第二季',
            image: '/images/slides1.jpg',
            link: '/anime/1'
        },
        {
            id: 2,
            title: '关于我转生变成史莱姆这档事',
            image: '/images/slides2.jpg',
            link: '/anime/2'
        },
        {
            id: 3,
            title: '坂本日常',
            image: '/images/slides3.jpg',
            link: '/anime/3'
        },
        {
            id: 4,
            title: '普通的边缘生活 第二季',
            image: '/images/slides4.jpg',
            link: '/anime/4'
        },
        {
            id: 5,
            title: '青之驱魔师 终夜篇',
            image: '/images/slides5.jpg',
            link: '/anime/5'
        },
        {
            id: 6,
            title: '无职转生 特别篇',
            image: '/images/slides6.jpg',
            link: '/anime/6'
        },
        {
            id: 7,
            title: '金持勇者',
            image: '/images/slides7.jpg',
            link: '/anime/7'
        }
    ]

    // 右侧快捷入口
    const quickLinks = [
        { icon: '🌏', text: '国创', link: '/domestic' },
        { icon: '🎬', text: '电影', link: '/movies' },
        { icon: '📺', text: '电视剧', link: '/tv' },
        { icon: '📹', text: '电视剧', link: '/documentary' },
        { icon: '🎭', text: '纪录片', link: '/variety' },
        { icon: '🎵', text: '音乐', link: '/music' }
    ]

    // 分类数据
    const categories = [
        { id: 'index', name: '番剧索引 >', subItems: ['追番人数', '最高评分', '更新时间', '播放数量'] },
        { id: 'type', name: '类型风格 >', subItems: ['原创', '小说改', '特摄', '热血', '奇幻', '战斗'] },
        { id: 'source', name: '作品来源 >', subItems: ['漫画改', '游戏改', '布袋戏', '特摄', '轻小说'] },
        { id: 'year', name: '首播时间 >', subItems: ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'] }
    ]

    // 热搜数据
    const hotSearch = ['坂本日常', '我强自升级第二季', '恋乐人偶', '石纪元第四季']

    // 正在追番数据
    const watching = [
        {
            title: '关于我转生变成史莱姆这档事 第三季',
            image: '/images/testcover.webp',
            episode: '更新至第6话',
            progress: '82%',
            badge: '更新了!'
        },
        {
            title: '青之驱魔师 终夜篇',
            image: '/images/testcover.webp',
            episode: '更新至第6话',
            badge: '更新了!'
        },
        {
            title: '线上游戏的队友不可能是女生？',
            image: '/images/testcover.webp',
            episode: '全12话'
        },
        {
            title: 'EVA 新世纪福音战士',
            image: '/images/testcover.webp',
            episode: '全26话'
        },
        {
            title: 'Dr. STONE 石纪元(第四季)',
            image: '/images/testcover.webp',
            episode: '更新至第10话'
        },
        {
            title: '盾之勇者成名录 第三季',
            image: '/images/testcover.webp',
            episode: '全12话'
        }
    ]

    // 处理背景切换
    const handleSlideChange = (nextIndex) => {
        if (isAnimating.current) return;
        isAnimating.current = true;

        setActiveSlide(nextIndex);
        setCurrentBg(slides[nextIndex].image);

        setTimeout(() => {
            isAnimating.current = false;
        }, 500);
    }

    // 自动轮播效果
    useEffect(() => {
        const timer = setInterval(() => {
            const nextIndex = (activeSlide + 1) % slides.length;
            handleSlideChange(nextIndex);
        }, 3000);

        return () => clearInterval(timer);
    }, [activeSlide, slides.length]);

    // 服务端渲染占位
    if (!isClient) {
        return <div className="w-full h-screen flex items-center justify-center bg-[#f5f5f5]">
            <div className="text-lg text-gray-500">加载中...</div>
        </div>;
    }

    return (
        <div className="min-h-screen bg-white">
            {/* 背景区域 */}
            <div className={`relative ${isMobile ? 'h-[40vh]' : 'h-[70vh]'} overflow-hidden`}>
                {/* 背景图 */}
                <div
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                        backgroundImage: `url(${currentBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                {/* 渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 60%, white)' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" style={{ backgroundImage: 'linear-gradient(to top, white 5%, transparent 20%)' }} />
            </div>

            {/* 内容区域 */}
            <div className={`relative z-10 ${isMobile ? '-mt-16' : '-mt-32'}`}>
                {/* 主要内容区 */}
                <div className="max-w-[1600px] mx-auto px-4">
                    {/* 轮播区域 */}
                    <div className="relative mb-8">
                        {/* 当前视频信息 */}
                        <div className={`absolute ${isMobile ? '-top-12 left-2' : '-top-16 right-0'} z-20 flex items-center`}>
                            <span className={`text-black ${isMobile ? 'text-sm mr-1' : 'text-base mr-2'}`}>
                                {slides[activeSlide].title}
                            </span>
                            <button className={`flex items-center justify-center bg-[#4e6ef2] text-white ${isMobile ? 'px-2 py-1 text-xs' : 'px-4 py-2 text-sm'} rounded-full`}>
                                <i className="fas fa-play mr-1"></i>
                                <span>立即观看</span>
                            </button>
                        </div>

                        {/* 轮播图容器 */}
                        <div className={`grid ${isMobile ? 'grid-cols-4 gap-1 space-x-1' : 'grid-cols-7 gap-1 space-x-2'}`}>
                            {slides.map((slide, index) => (
                                <div key={slide.id} className={`relative ${isMobile && index >= 4 ? 'hidden' : ''}`}>
                                    <Link href={slide.link} className="block">
                                        <div
                                            className={`${isMobile ? 'h-[80px]' : 'h-[120px]'} rounded-lg overflow-hidden relative transition-all duration-500 origin-center ${index === activeSlide ? 'scale-110 z-10' : 'scale-100'
                                                }`}
                                            onMouseEnter={() => handleSlideChange(index)}
                                            onClick={() => isMobile && handleSlideChange(index)}
                                        >
                                            <div className="absolute inset-0 border border-white/30"></div>
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={slide.image}
                                                    alt={slide.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    priority={index === 0}
                                                />
                                            </div>
                                            <div className={`absolute inset-0 bg-black/50 transition-opacity duration-500 ${index === activeSlide ? 'opacity-0' : 'opacity-100'
                                                }`} />
                                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                                                <div className={`text-white ${isMobile ? 'text-xs' : 'text-sm'} truncate`}>
                                                    {slide.title}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 分类导航区域 */}
                    <div className={`border border-black/10 rounded-lg ${isMobile ? 'p-2' : 'p-4'} mb-8`}>
                        <div className={`${isMobile ? 'space-y-4' : 'grid grid-cols-4 gap-8'}`}>
                            {categories.map(category => (
                                <div key={category.id} className="space-y-2">
                                    <div className={`text-black/90 ${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>
                                        {category.name}
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {category.subItems.map(item => (
                                            <Link
                                                key={item}
                                                href="#"
                                                className={`text-black/60 hover:text-black ${isMobile ? 'text-xs' : 'text-sm'} transition-colors`}
                                            >
                                                {item}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 热搜区域 */}
                        <div className={`${isMobile ? 'mt-3 pt-3' : 'mt-4 pt-4'} border-t border-black/10`}>
                            <div className={`text-black/90 ${isMobile ? 'text-xs' : 'text-sm'} font-medium mb-2`}>
                                热搜
                            </div>
                            <div className={`flex ${isMobile ? 'gap-3 flex-wrap' : 'gap-6'}`}>
                                {hotSearch.map((item, index) => (
                                    <Link
                                        key={index}
                                        href="#"
                                        className={`text-black/60 hover:text-black ${isMobile ? 'text-xs' : 'text-sm'} transition-colors`}
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 正在追番区域 */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <i className="fas fa-heart text-pink-500"></i>
                            <span className={`text-black font-medium ${isMobile ? 'text-sm' : ''}`}>正在追</span>
                            <div className="flex-grow"></div>
                            <Link href="/my/following" className="text-black/60 hover:text-black">
                                <i className="fas fa-heart"></i> <span className={`${isMobile ? 'text-xs' : ''}`}>我的追番</span>
                            </Link>
                        </div>
                        <div className={`grid ${isMobile ? 'grid-cols-3' : isTablet ? 'grid-cols-4' : 'grid-cols-6'} gap-3`}>
                            {watching.map((anime, index) => (
                                <div key={index} className={`group cursor-pointer ${isMobile && index >= 6 ? 'hidden' : ''}`}>
                                    <div className="relative aspect-[16/9] mb-2">
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={anime.image}
                                                alt={anime.title}
                                                fill
                                                className="object-cover rounded"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                        {anime.badge && (
                                            <div className={`absolute top-0 left-0 bg-[#4e6ef2] text-white ${isMobile ? 'text-[10px] px-1' : 'text-xs px-2'} py-0.5 rounded-br`}>
                                                {anime.badge}
                                            </div>
                                        )}
                                        {anime.progress && (
                                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                                                <div
                                                    className="h-full bg-[#4e6ef2]"
                                                    style={{ width: anime.progress }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className={`text-black/80 ${isMobile ? 'text-xs' : 'text-sm'} group-hover:text-black transition-colors line-clamp-2`}>
                                        {anime.title}
                                    </div>
                                    <div className={`text-black/60 ${isMobile ? 'text-[10px]' : 'text-xs'} mt-1`}>
                                        {anime.episode}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 热播榜区域 */}
                    <AnimeRankList />
                </div>

                {/* 右侧快捷入口 - 移动端隐藏 */}
                {!isMobile && (
                    <div className="fixed right-4 top-1/2 -translate-y-1/2 space-y-2">
                        {quickLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.link}
                                className="flex flex-col items-center justify-center w-10 h-10 bg-black/5 hover:bg-black/10 rounded text-black/80 hover:text-black transition-colors"
                            >
                                <span className="text-lg">{link.icon}</span>
                                <span className="text-[10px]">{link.text}</span>
                            </Link>
                        ))}
                    </div>
                )}

                {/* 移动端底部快捷导航 */}
                {isMobile && (
                    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-50">
                        <div className="flex justify-between">
                            {quickLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.link}
                                    className="flex flex-col items-center"
                                >
                                    <span className="text-lg">{link.icon}</span>
                                    <span className="text-[10px]">{link.text}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
