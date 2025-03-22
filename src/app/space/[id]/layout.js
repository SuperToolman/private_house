'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useState, use, useEffect, createContext, useContext } from 'react';
import React from 'react';
import { useResponsive } from '../../contexts/ResponsiveContext';
import SpaceNav from './components/SpaceNav';

// 创建上下文
export const SpaceContext = createContext();

export default function SpaceLayout({ children, params }) {
    const { id } = use(params);
    const [isExpanded, setIsExpanded] = useState(false);
    const { isMobile, isTablet, isClient } = useResponsive();
    
    const [spaceInfo, setSpaceInfo] = useState({
        avatarUrl: `/images/testavatar.webp`,
        name: '用户' + id,
        description: '这个人很懒，什么都没有留下',
        followCount: 0,
        followerCount: 0,
        likeCount: 0,
        playCount: 0,
        videoCount: 0,
        backgroundVideoUrl: '/videos/test_video2.mp4',
        backgroundImageUrl: '/images/testcover.webp',
        backgroundType: 1,//0是图片背景，1是视频背景                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        videoItems: [
            {
                id: 1,
                title: '游戏实况：最新开放世界RPG游戏体验',
                user: { id: 1, name: '游戏达人' },
                releaseData: '2024-05-15',
                playCount: 15892,
                duration: '12:45',
                coverUrl: '/images/test_videoCard_cover (4).avif',
                videoUrl: '/videos/test_video1.mp4',
            },
            {
                id: 2,
                title: '编程教程：30分钟学会React基础',
                user: { id: 1, name: '程序员小李' },
                releaseData: '2024-05-10',
                playCount: 8743,
                duration: '28:30',
                coverUrl: '/images/test_videoCard_cover (5).avif',
                videoUrl: '/videos/test_video2.mp4',
            },
            {
                id: 3,
                title: '美食vlog：周末在家做简单早餐',
                user: { id: 1, name: '厨房实验室' },
                releaseData: '2024-05-08',
                playCount: 12456,
                duration: '09:15',
                coverUrl: '/images/test_videoCard_cover (6).avif',
                videoUrl: '/videos/test_video3.mp4',
            },
            {
                id: 4,
                title: '旅行日记：探索云南秘境小村落',
                user: { id: 1, name: '旅行者小王' },
                releaseData: '2024-05-01',
                playCount: 23541,
                duration: '15:20',
                coverUrl: '/images/test_videoCard_cover (7).avif',
                videoUrl: '/videos/test_video1.mp4',
            },
            {
                id: 5,
                title: '科技评测：最新旗舰手机对比',
                user: { id: 1, name: '科技测评' },
                releaseData: '2024-04-28',
                playCount: 19875,
                duration: '18:45',
                coverUrl: '/images/test_videoCard_cover (8).avif',
                videoUrl: '/videos/test_video2.mp4',
            },
            {
                id: 6,
                title: '健身教程：在家徒手练出腹肌',
                user: { id: 1, name: '健身教练小张' },
                releaseData: '2024-04-25',
                playCount: 31562,
                duration: '22:10',
                coverUrl: '/images/test_videoCard_cover (9).avif',
                videoUrl: '/videos/test_video3.mp4',
            },
            {
                id: 7,
                title: '摄影技巧：如何用手机拍出专业照片',
                user: { id: 1, name: '摄影师老赵' },
                releaseData: '2024-04-20',
                playCount: 11234,
                duration: '14:30',
                coverUrl: '/images/test_videoCard_cover (10).avif',
                videoUrl: '/videos/test_video1.mp4',
            },
            {
                id: 8,
                title: '动漫推荐：2024年春季必看新番',
                user: { id: 1, name: '动漫迷小林' },
                releaseData: '2024-04-15',
                playCount: 28963,
                duration: '11:25',
                coverUrl: '/images/test_videoCard_cover (11).avif',
                videoUrl: '/videos/test_video2.mp4',
            },
            {
                id: 9,
                title: '读书分享：改变我人生的十本书',
                user: { id: 1, name: '书虫先生' },
                releaseData: '2024-04-10',
                playCount: 9874,
                duration: '20:50',
                coverUrl: '/images/test_videoCard_cover (12).avif',
                videoUrl: '/videos/test_video3.mp4',
            },
            {
                id: 10,
                title: '音乐创作：我的第一首原创歌曲',
                user: { id: 1, name: '音乐人小陈' },
                releaseData: '2024-04-05',
                playCount: 14523,
                duration: '05:35',
                coverUrl: '/images/test_videoCard_cover (4).avif',
                videoUrl: '/videos/test_video1.mp4',
            },
            {
                id: 11,
                title: '生活Tips：整理收纳小窍门',
                user: { id: 1, name: '生活达人' },
                releaseData: '2024-04-01',
                playCount: 18754,
                duration: '08:40',
                coverUrl: '/images/test_videoCard_cover (5).avif',
                videoUrl: '/videos/test_video2.mp4',
            },
            {
                id: 12,
                title: '数码开箱：这款新品值得买吗',
                user: { id: 1, name: '数码玩家' },
                releaseData: '2024-03-28',
                playCount: 21365,
                duration: '16:15',
                coverUrl: '/images/test_videoCard_cover (6).avif',
                videoUrl: '/videos/test_video3.mp4',
            }
        ]
    })


    useEffect(() => {
        // 在移动端禁用展开效果
        if (isMobile) {
            setIsExpanded(false);
            return;
        }
        
        // 添加平滑滚动效果
        document.documentElement.style.scrollBehavior = 'smooth';
        
        const handleWheel = (e) => {
            // 使用防抖处理滚轮事件
            if (window.scrollY <= 50) {
                if (e.deltaY < 0) {
                    // 向上滚动
                    setIsExpanded(true);
                } else if (e.deltaY > 0) {
                    // 向下滚动
                    setIsExpanded(false);
                }
            } else if (window.scrollY > 50 && isExpanded) {
                // 当页面滑出顶部一定距离且处于展开状态时，自动收起
                setIsExpanded(false);
            }
        };

        // 防抖函数
        let scrollTimeout;
        const handleScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // 当用户向下滚动超过一定距离时，强制收起展开状态
                if (window.scrollY > 100 && isExpanded) {
                    setIsExpanded(false);
                }
            }, 100); // 100ms的延迟
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            document.documentElement.style.scrollBehavior = '';
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, [isExpanded, isMobile]);

    // 如果在服务端渲染或数据加载中，显示加载状态
    if (!isClient) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-[#f5f5f5]">
                <div className="text-lg text-gray-500">加载中...</div>
            </div>
        );
    }

    return (
        <SpaceContext.Provider value={spaceInfo}>
            <>
                <div className={`flex flex-1 items-end w-full bg-gray-100 bg-cover bg-center z-[-1] shadow-lg relative transition-all duration-300 ease-in-out ${
                    spaceInfo.backgroundType === 1 && isExpanded ? 'h-[80vh]' : isMobile ? 'h-[30vh]' : 'h-[50vh]'
                }`}>
                    {/* 用户个人主页背景 */}
                    <div className="absolute top-0 left-0 w-full h-full">
                        {spaceInfo.backgroundType === 1 ? (
                            <video
                                src={spaceInfo.backgroundVideoUrl}
                                autoPlay
                                muted
                                loop
                                className="w-full h-full object-cover object-[center_40%] brightness-[0.7] grayscale-[30%]"
                            />
                        ) : (
                            <Image
                                src={spaceInfo.backgroundImageUrl}
                                alt="背景图片"
                                fill
                                className="object-cover object-[center_40%] brightness-[0.7] grayscale-[30%]"
                            />
                        )}
                        {/* 添加一个半透明遮罩层 */}
                        <div className={`absolute top-0 left-0 w-full h-full bg-black/30 transition-opacity duration-300 ${spaceInfo.backgroundType === 1 && isExpanded ? 'opacity-0' : 'opacity-100'}`}></div>
                        {/* 添加从下往上的渐变阴影 */}
                        <div className={`absolute bottom-0 left-0 w-full h-[180px] bg-gradient-to-t from-black to-transparent transition-opacity duration-300 ${spaceInfo.backgroundType === 1 && isExpanded ? 'opacity-0' : 'opacity-100'}`}></div>
                    </div>

                    {/* 用户信息卡片 */}
                    <div className={`${isMobile ? 'mb-[10px] mx-[20px]' : isTablet ? 'mb-[15px] mx-[40px]' : 'mb-[20px] mx-[90px]'} flex items-center w-full justify-between relative z-10 transition-opacity duration-300 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
                        {/* 左部分 */}
                        <div className="flex items-center-left">
                            <div className="user-info-card flex items-center">
                                {/* 头像 */}
                                <div className="user-info-card-avatar">
                                    <Image
                                        src={spaceInfo.avatarUrl}
                                        alt="用户头像"
                                        width={isMobile ? 50 : 70}
                                        height={isMobile ? 50 : 70}
                                        className="rounded-full"
                                    />
                                </div>
                                <div className={`user-info-card-info ${isMobile ? 'ml-[10px]' : 'ml-[20px]'}`}>
                                    {/* 用户名 */}
                                    <div className="user-info-card-name">
                                        <div className={`user-info-card-name-text ${isMobile ? 'text-[16px]' : 'text-[20px]'} font-weight-[600] mt-[10px] mb-[5px] text-[#fff] font-bold`}>
                                            {spaceInfo.name}
                                        </div>
                                    </div>
                                    {/* 简介 */}
                                    <div className={`user-info-card-description ${isMobile ? 'text-[12px]' : 'text-[16px]'} text-[#9499a0]`}>
                                        {spaceInfo.description}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 右部分：关注按钮等 */}
                        <div className={`${isMobile ? 'hidden' : ''}`}>
                            <button className="bg-[#00aeec] text-white rounded-[5px] text-[16px] px-[20px] py-[6px] cursor-pointer transition-colors hover:bg-[#00a1d6]">
                                关注
                            </button>
                        </div>
                    </div>
                </div>

                {/* 移动端显示关注按钮 */}
                {isMobile && (
                    <div className="flex justify-end px-4 py-2 bg-white shadow">
                        <button className="bg-[#00aeec] text-white rounded-[5px] text-[14px] px-[15px] py-[4px] cursor-pointer transition-colors hover:bg-[#00a1d6]">
                            关注
                        </button>
                    </div>
                )}

                {/* 导航栏 - 确保居中 */}
                <div className="max-w-[1200px] mx-auto">
                    <SpaceNav userId={id} isMobile={isMobile} isTablet={isTablet} />
                </div>

                {/* 主体内容部分 */}
                <div className={`p-5 ${isMobile ? 'py-3' : 'py-5'} max-w-[1200px] mx-auto`}>
                    {children}
                </div>
            </>
        </SpaceContext.Provider>
    )
}
