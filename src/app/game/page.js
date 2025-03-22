'use client';

import { useState } from "react";
import RecommandGameList from "./components/RecommandGameList";
import GameRankList from "./components/GameRankList";
import GameCard from "./components/GameCard";
import { useResponsive } from "../contexts/ResponsiveContext";

export default function GamePage() {
    const { isMobile, isTablet, isClient } = useResponsive();

    // 服务端渲染占位
    if (!isClient) {
        return <div className="w-full h-screen flex items-center justify-center bg-[#f5f5f5]">
            <div className="text-lg text-gray-500">加载中...</div>
        </div>;
    }

    return (
        <div className={`${isMobile ? 'w-full px-3' : isTablet ? 'w-[95%]' : 'w-[1584px]'} mx-auto`}>
            <div>
                <RecommandGameList isMobile={isMobile} isTablet={isTablet} />
            </div>
            
            {/* 游戏排名 - 移动端单列显示 */}
            <div className={`${isMobile ? 'grid grid-cols-1 gap-4' : isTablet ? 'grid grid-cols-2 gap-4' : 'grid grid-cols-3 gap-4'}`}>
                <GameRankList title="热门游戏榜" isMobile={isMobile} />
                {!isMobile && <GameRankList title="新游排行榜" isMobile={isMobile} />}
                {!isMobile && !isTablet && <GameRankList title="收藏排行榜" isMobile={isMobile} />}
            </div>
            
            {/* 游戏卡片列表 - 移动端显示更少的卡片 */}
            <div className={`space-y-4 ${isMobile ? 'mt-4' : 'mt-10'}`}>
                <GameCard isMobile={isMobile} />
                <GameCard isMobile={isMobile} />
                {!isMobile && (
                    <>
                        <GameCard isMobile={isMobile} />
                        <GameCard isMobile={isMobile} />
                    </>
                )}
                {!isMobile && !isTablet && (
                    <>
                        <GameCard isMobile={isMobile} />
                        <GameCard isMobile={isMobile} />
                    </>
                )}
            </div>
            
            {/* 移动端底部导航 */}
            {isMobile && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-50">
                    <div className="flex justify-between">
                        <a href="/game" className="flex flex-col items-center text-pink-500">
                            <i className="iconfont icon-game text-lg"></i>
                            <span className="text-[10px]">游戏</span>
                        </a>
                        <a href="/game/category" className="flex flex-col items-center text-gray-500">
                            <i className="iconfont icon-category text-lg"></i>
                            <span className="text-[10px]">分类</span>
                        </a>
                        <a href="/game/rank" className="flex flex-col items-center text-gray-500">
                            <i className="iconfont icon-rank text-lg"></i>
                            <span className="text-[10px]">排行</span>
                        </a>
                        <a href="/game/new" className="flex flex-col items-center text-gray-500">
                            <i className="iconfont icon-new text-lg"></i>
                            <span className="text-[10px]">新游</span>
                        </a>
                        <a href="/user/games" className="flex flex-col items-center text-gray-500">
                            <i className="iconfont icon-gamepad text-lg"></i>
                            <span className="text-[10px]">我的</span>
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}
