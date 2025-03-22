'use client';

import { useState } from "react";
import RecommandHeader from "./components/RecommandHeader";
import RecommandRowCarousel from "./components/RecommandRowCarousel";
import RecommandRowList from "./components/RecommandRowList";
import RecommandRankList from "./components/RecommandRankList";
import Link from "next/link";
import { useResponsive } from "../contexts/ResponsiveContext";

export default function MangaPage() {
    const { isMobile, isTablet, isClient } = useResponsive();
    
    // 分类导航项
    const categories = [
        '热血', '古风', '玄幻', '奇幻', '悬疑', '都市', 
        '历史', '武侠仙侠', '游戏竞技', '悬疑灵异', '架空', 
        '青春', '西幻', '现代', '全部'
    ];

    // 服务端渲染占位
    if (!isClient) {
        return <div className="w-full h-screen flex items-center justify-center bg-[#f5f5f5]">
            <div className="text-lg text-gray-500">加载中...</div>
        </div>;
    }

    return (
        <div>
            {/* 头部推荐漫画 */}
            <div className="recommed-header-wrap bg-gray-800 shadow-lg border-2 rounded-lg px-2 pt-2">
                <RecommandHeader />
            </div>
            
            {/* 导航 - 桌面版 */}
            {!isMobile && (
                <div className="navigation bg-gray-500 shadow-lg border-2 rounded-lg px-2">
                    <div className="py-5 text-white flex justify-center">
                        <div className="flex items-center justify-between w-[1160px]">
                            {categories.map((category) => (
                                <div key={category} className="navigation-item-title">
                                    <Link href={`/manga/category/${category}`}><span>{category}</span></Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            
            {/* 导航 - 移动版 */}
            {isMobile && (
                <div className="navigation bg-gray-500 shadow-lg border-2 rounded-lg px-2 py-3 mb-4">
                    <div className="overflow-x-auto">
                        <div className="flex space-x-4 px-2 whitespace-nowrap pb-1">
                            {categories.map((category) => (
                                <Link 
                                    key={category} 
                                    href={`/manga/category/${category}`}
                                    className="text-white text-sm py-1 px-2"
                                >
                                    {category}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            
            {/* 轮播图组件 */}
            <div className="w-full bg-[#f6f9ff] py-7 mb-10">
                <div className={`${isMobile ? 'w-full px-3' : 'w-[1160px]'} mx-auto`}>
                    <div className="header flex items-center">
                        <div className={`header-title text-[#1c1c1f] ${isMobile ? 'text-xl' : 'text-[34px]'} mr-3`}>畅销热门</div>
                        <div className={`header-subtitle text-[#bfbfc3] ${isMobile ? 'text-xs' : ''}`}>物有所值的真香漫画</div>
                    </div>
                    <RecommandRowCarousel />
                </div>
            </div>
            
            {/* 其他推荐内容 */}
            <div className={`${isMobile ? 'w-full px-3' : 'w-[1160px]'} mx-auto py-7`}>
                <div className="header flex items-center">
                    <div className={`header-title text-[#1c1c1f] ${isMobile ? 'text-xl' : 'text-[34px]'} mr-3`}>全网热议</div>
                    <div className={`header-subtitle text-[#bfbfc3] ${isMobile ? 'text-xs' : ''}`}>恭喜你发现宝藏</div>
                </div>
                <RecommandRowList />
            </div>

            {/* 其他推荐内容 */}
            <div className={`${isMobile ? 'w-full px-3' : 'w-[1160px]'} mx-auto py-7`}>
                <div className="header flex items-center">
                    <div className={`header-title text-[#1c1c1f] ${isMobile ? 'text-xl' : 'text-[34px]'} mr-3`}>完结佳作</div>
                    <div className={`header-subtitle text-[#bfbfc3] ${isMobile ? 'text-xs' : ''}`}>一口气追到大结局！</div>
                </div>
                <RecommandRowList />
            </div>

            {/* 排名内容 */}
            <div className={`${isMobile ? 'w-full px-3' : 'w-[1160px]'} mx-auto py-7 ${isMobile ? 'pb-20' : ''}`}>
                <RecommandRankList />
            </div>
            
            {/* 移动端底部快捷导航 */}
            {isMobile && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-50">
                    <div className="flex justify-between">
                        <Link href="/manga" className="flex flex-col items-center">
                            <i className="iconfont icon-manga text-lg"></i>
                            <span className="text-[10px]">漫画</span>
                        </Link>
                        <Link href="/manga/category" className="flex flex-col items-center">
                            <i className="iconfont icon-category text-lg"></i>
                            <span className="text-[10px]">分类</span>
                        </Link>
                        <Link href="/manga/rank" className="flex flex-col items-center">
                            <i className="iconfont icon-rank text-lg"></i>
                            <span className="text-[10px]">排行</span>
                        </Link>
                        <Link href="/manga/new" className="flex flex-col items-center">
                            <i className="iconfont icon-new text-lg"></i>
                            <span className="text-[10px]">更新</span>
                        </Link>
                        <Link href="/user/bookshelf" className="flex flex-col items-center">
                            <i className="iconfont icon-bookshelf text-lg"></i>
                            <span className="text-[10px]">书架</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
