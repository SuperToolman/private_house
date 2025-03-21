'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useState, use, useEffect, createContext, useContext } from 'react';
import React from 'react';

// 创建上下文
export const SpaceContext = createContext();

export default function SpaceLayout({ children, params }) {
    const { id } = use(params);
    const [isExpanded, setIsExpanded] = useState(false);
    const [spaceInfo, setSpaceInfo] = useState({
        avatarUrl: `/images/testavatar.webp`,
        name: '用户' + id,
        description: '这个人很懒，什么都没有留下',
        followCount: 0,
        followerCount: 0,
        likeCount: 0,
        playCount: 0,
        videoCount: 0,
        backgroundVideoUrl: 'http://localhost:9080/%E8%8B%B1%E9%9B%84%E8%81%94%E7%9B%9F2021MSI%E4%B8%BB%E9%A2%98%E6%9B%B2%E3%80%8AStarts%20Right%20Here%E3%80%8B.mp4',
        backgroundImageUrl: '/images/testcover.webp',
        backgroundType: 1,//0是图片背景，1是视频背景                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        videoItems: [
            {
                title: '公理秘术中单机器人毁了快速匹配！！大招影焰暴击电人爽的一！！',
                user: { id: 1, name: '测试用户' },
                releaseData: '2024-01-01',
                playCount: 1000,
                duration: '10:00',
                coverUrl: '/images/testcover.webp',
                videoUrl: 'http://localhost:9080/%E8%8B%B1%E9%9B%84%E8%81%94%E7%9B%9F2021MSI%E4%B8%BB%E9%A2%98%E6%9B%B2%E3%80%8AStarts%20Right%20Here%E3%80%8B.mp4',
                id: 1
            },
            {
                title: '公理秘术中单机器人毁了快速匹配！！大招影焰暴击电人爽的一！！',
                user: { id: 1, name: '测试用户' },
                releaseData: '2024-01-01',
                playCount: 1000,
                duration: '10:00',
                coverUrl: '/images/testcover.webp',
                videoUrl: 'http://localhost:9080/%E8%8B%B1%E9%9B%84%E8%81%94%E7%9B%9F2021MSI%E4%B8%BB%E9%A2%98%E6%9B%B2%E3%80%8AStarts%20Right%20Here%E3%80%8B.mp4',
                id: 1
            },
            {
                title: '公理秘术中单机器人毁了快速匹配！！大招影焰暴击电人爽的一！！',
                user: { id: 1, name: '测试用户' },
                releaseData: '2024-01-01',
                playCount: 1000,
                duration: '10:00',
                coverUrl: '/images/testcover.webp',
                videoUrl: 'http://localhost:9080/%E8%8B%B1%E9%9B%84%E8%81%94%E7%9B%9F2021MSI%E4%B8%BB%E9%A2%98%E6%9B%B2%E3%80%8AStarts%20Right%20Here%E3%80%8B.mp4',
                id: 1
            },
            {
                title: '公理秘术中单机器人毁了快速匹配！！大招影焰暴击电人爽的一！！',
                user: { id: 1, name: '测试用户' },
                releaseData: '2024-01-01',
                playCount: 1000,
                duration: '10:00',
                coverUrl: '/images/testcover.webp',
                videoUrl: 'http://localhost:9080/%E8%8B%B1%E9%9B%84%E8%81%94%E7%9B%9F2021MSI%E4%B8%BB%E9%A2%98%E6%9B%B2%E3%80%8AStarts%20Right%20Here%E3%80%8B.mp4',
                id: 1
            },
            {
                title: '公理秘术中单机器人毁了快速匹配！！大招影焰暴击电人爽的一！！',
                user: { id: 1, name: '测试用户' },
                releaseData: '2024-01-01',
                playCount: 1000,
                duration: '10:00',
                coverUrl: '/images/testcover.webp',
                videoUrl: 'http://localhost:9080/%E8%8B%B1%E9%9B%84%E8%81%94%E7%9B%9F2021MSI%E4%B8%BB%E9%A2%98%E6%9B%B2%E3%80%8AStarts%20Right%20Here%E3%80%8B.mp4',
                id: 1
            },
            {
                title: '公理秘术中单机器人毁了快速匹配！！大招影焰暴击电人爽的一！！',
                user: { id: 1, name: '测试用户' },
                releaseData: '2024-01-01',
                playCount: 1000,
                duration: '10:00',
                coverUrl: '/images/testcover.webp',
                videoUrl: 'http://localhost:9080/%E8%8B%B1%E9%9B%84%E8%81%94%E7%9B%9F2021MSI%E4%B8%BB%E9%A2%98%E6%9B%B2%E3%80%8AStarts%20Right%20Here%E3%80%8B.mp44',
                id: 1
            },
            {
                title: '公理秘术中单机器人毁了快速匹配！！大招影焰暴击电人爽的一！！',
                user: { id: 1, name: '测试用户' },
                releaseData: '2024-01-01',
                playCount: 1000,
                duration: '10:00',
                coverUrl: '/images/testcover.webp',
                videoUrl: 'http://localhost:9080/%E8%8B%B1%E9%9B%84%E8%81%94%E7%9B%9F2021MSI%E4%B8%BB%E9%A2%98%E6%9B%B2%E3%80%8AStarts%20Right%20Here%E3%80%8B.mp4',
                id: 1
            },
            {
                title: '公理秘术中单机器人毁了快速匹配！！大招影焰暴击电人爽的一！！',
                user: { id: 1, name: '测试用户' },
                releaseData: '2024-01-01',
                playCount: 1000,
                duration: '10:00',
                coverUrl: '/images/testcover.webp',
                videoUrl: 'http://localhost:9080/%E8%8B%B1%E9%9B%84%E8%81%94%E7%9B%9F2021MSI%E4%B8%BB%E9%A2%98%E6%9B%B2%E3%80%8AStarts%20Right%20Here%E3%80%8B.mp4',
                id: 1
            }, {
                title: '公理秘术中单机器人毁了快速匹配！！大招影焰暴击电人爽的一！！',
                user: { id: 1, name: '测试用户' },
                releaseData: '2024-01-01',
                playCount: 1000,
                duration: '10:00',
                coverUrl: '/images/testcover.webp',
                videoUrl: 'http://localhost:9080/%E8%8B%B1%E9%9B%84%E8%81%94%E7%9B%9F2021MSI%E4%B8%BB%E9%A2%98%E6%9B%B2%E3%80%8AStarts%20Right%20Here%E3%80%8B.mp4',
                id: 1
            },
            {
                title: '公理秘术中单机器人毁了快速匹配！！大招影焰暴击电人爽的一！！',
                user: { id: 1, name: '测试用户' },
                releaseData: '2024-01-01',
                playCount: 1000,
                duration: '10:00',
                coverUrl: '/images/testcover.webp',
                videoUrl: 'http://localhost:9080/%E8%8B%B1%E9%9B%84%E8%81%94%E7%9B%9F2021MSI%E4%B8%BB%E9%A2%98%E6%9B%B2%E3%80%8AStarts%20Right%20Here%E3%80%8B.mp4',
                id: 1
            },
            {
                title: '公理秘术中单机器人毁了快速匹配！！大招影焰暴击电人爽的一！！',
                user: { id: 1, name: '测试用户' },
                releaseData: '2024-01-01',
                playCount: 1000,
                duration: '10:00',
                coverUrl: '/images/testcover.webp',
                videoUrl: 'http://localhost:9080/%E8%8B%B1%E9%9B%84%E8%81%94%E7%9B%9F2021MSI%E4%B8%BB%E9%A2%98%E6%9B%B2%E3%80%8AStarts%20Right%20Here%E3%80%8B.mp4',
                id: 1
            },
            {
                title: '公理秘术中单机器人毁了快速匹配！！大招影焰暴击电人爽的一！！',
                user: { id: 1, name: '测试用户' },
                releaseData: '2024-01-01',
                playCount: 1000,
                duration: '10:00',
                coverUrl: '/images/testcover.webp',
                videoUrl: 'http://localhost:9080/%E8%8B%B1%E9%9B%84%E8%81%94%E7%9B%9F2021MSI%E4%B8%BB%E9%A2%98%E6%9B%B2%E3%80%8AStarts%20Right%20Here%E3%80%8B.mp4',
                id: 1
            }
        ]
    })


    useEffect(() => {
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
    }, [isExpanded]);

    return (
        <SpaceContext.Provider value={spaceInfo}>
            <>
                <div className={`flex flex-1 items-end w-full bg-gray-100 bg-cover bg-center z-[-1] shadow-lg relative transition-all duration-300 ease-in-out ${spaceInfo.backgroundType === 1 && isExpanded ? 'h-[80vh]' : 'h-[50vh]'}`}>
                    {/* 用户个人主页背景 */}
                    <div className="absolute top-0 left-0 w-full h-full">
                        {spaceInfo.backgroundType === 1 ? (
                            <video
                                src={spaceInfo.videoItems[0].videoUrl}
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
                    <div className={`mb-[20px] mx-[90px] flex items-center w-full justify-between relative z-10 transition-opacity duration-300 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
                        {/* 左部分 */}
                        <div className="flex items-center-left">
                            <div className="user-info-card flex items-center">
                                {/* 头像 */}
                                <div className="user-info-card-avatar">
                                    <Image
                                        src={spaceInfo.avatarUrl}
                                        alt="用户头像"
                                        width={70}
                                        height={70}
                                        className="rounded-full"
                                    />
                                </div>
                                <div className="user-info-card-info ml-[20px]">
                                    {/* 用户名 */}
                                    <div className="user-info-card-name">
                                        <div className="user-info-card-name-text text-[20px] font-weight-[600] mt-[10px] mb-[5px] text-[#fff] font-bold">
                                            {spaceInfo.name}
                                        </div>
                                    </div>
                                    {/* 简介 */}
                                    <div className="user-info-card-description text-[16px] text-[#9499a0]">
                                        {spaceInfo.description}
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* 右部分 */}
                        <div className="flex items-center-right">
                            {/* 关注与发消息的按钮 */}
                            <div className="flex items-center space-x-[24px]">
                                <button className="flex items-center justify-center cursor-pointer text-[#fff] font-weight-[600] text-[14px] bg-[#00aeec] text-[#fff] px-[10px] py-[8px] rounded-[8px] w-[150px]">
                                    <i className="iconfont icon-guanzhu mr-[4px]" style={{ fontSize: '18px' }}></i>
                                    <span>关注</span>
                                </button>
                                <button className="cursor-pointer text-[#fff] font-weight-[600] text-[14px] bg-[#ffffff24] text-[#fff] px-[10px] py-[8px] rounded-[8px] w-[150px]">发消息</button>
                                <div className="cursor-pointer text-[#fff] font-weight-[600] text-[14px] bg-[#ffffff24] text-[#fff] px-[10px] py-[8px] rounded-[8px]">
                                    <i className="iconfont icon-more-vertical-fill" style={{ fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 导航与内容 */}
                <div className="bg-[#fcfcfc] pt-6">
                    {/* 空间导航 */}
                    <div className='flex flex-1 items-center justify-between mx-[90px] px-[10px] py-[10px] rounded-[50px] bg-[#fff] shadow-xl'>
                        <div className="space-nav-wrap flex items-center  space-x-[20px] font-weight-[600]  bg-white">
                            <div className="space-nav-item group flex items-center cursor-pointer">
                                <Link href={`/space/${id}`}>
                                    <i className="iconfont icon-home mr-[4px]" style={{ fontSize: '20px', color: '#0e8350' }}></i>
                                    <span className="space-nav-item-text text-[16px] group-hover:text-[#0e8350] transition-colors duration-300">主页</span>
                                </Link>
                            </div>
                            <div className="space-nav-item group flex items-center cursor-pointer">
                                <Link href={`/space/${id}/dynamic`}>
                                    <i className="iconfont icon-header_dyanmic mr-[4px]" style={{ fontSize: '22px', color: '#ff6699' }}></i>
                                    <span className="space-nav-item-text text-[16px] group-hover:text-[#ff6699] transition-colors duration-300">动态</span>
                                </Link>
                            </div>
                            <div className="space-nav-item group flex items-center cursor-pointer">
                                <Link href={`/space/${id}/submit`}>
                                    <i className="iconfont icon-tv mr-[4px]" style={{ fontSize: '20px', color: '#00aeec' }}></i>
                                    <span className="space-nav-item-text text-[16px] group-hover:text-[#00aeec] transition-colors duration-300">投稿</span>
                                </Link>
                            </div>
                            <div className="space-nav-item group flex items-center cursor-pointer">
                                <Link href={`/space/${id}/collection`}>
                                    <i className="iconfont icon-heji mr-[4px]" style={{ fontSize: '22px', color: '#40c5f1' }}></i>
                                    <span className="space-nav-item-text text-[16px] group-hover:text-[#40c5f1] transition-colors duration-300">合集</span>
                                </Link>
                            </div>
                            <div className="space-nav-item group flex items-center cursor-pointer">
                                <Link href={`/space/${id}/collect`}>
                                    <i className="iconfont icon-header_shoucang mr-[4px]" style={{ fontSize: '20px', color: '#ffb027' }}></i>
                                    <span className="space-nav-item-text text-[16px] group-hover:text-[#ffb027] transition-colors duration-300">收藏</span>
                                </Link>
                            </div>
                            {/* 视频、动态一体式搜索 */}
                            <div className="space-nav-item">
                                <input type="text" className="space-nav-item-input" placeholder="搜索" />
                                <span className="space-nav-item-text">搜索</span>
                            </div>
                        </div>
                        <div className="user-info-card-data-wrap flex items-center text-[#000] space-x-[25px]">
                            <div className="user-info-card-data-item flex flex-col items-center text-[13px] cursor-pointer hover:text-[#00aeec] transition-colors duration-300">
                                <span className='data__title'>关注</span>
                                <span className='data__value'>{spaceInfo.followCount}</span>
                            </div>
                            <div className="user-info-card-data-item flex flex-col items-center text-[13px] cursor-pointer hover:text-[#00aeec] transition-colors duration-300">
                                <span className='data__title'>粉丝数</span>
                                <span className='data__value'>{spaceInfo.followerCount}</span>
                            </div>
                            <div className="user-info-card-data-item flex flex-col items-center text-[13px] cursor-pointer hover:text-[#00aeec] transition-colors duration-300">
                                <span className='data__title'>获赞数</span>
                                <span className='data__value'>{spaceInfo.likeCount}</span>
                            </div>
                            <div className="user-info-card-data-item flex flex-col items-center text-[13px] cursor-pointer hover:text-[#00aeec] transition-colors duration-300">
                                <span className='data__title'>播放数</span>
                                <span className='data__value'>{spaceInfo.playCount}</span>
                            </div>
                        </div>
                    </div>
                    {/* 作品内容 */}
                    <div className="flex flex-1 mx-[90px] mt-[20px]">
                        {children}
                    </div>
                </div>
            </>
        </SpaceContext.Provider>
    )
}
