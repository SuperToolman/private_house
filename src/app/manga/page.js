'use client';

import { useState } from "react";
import RecommandHeader from "./components/RecommandHeader";
import RecommandRowCarousel from "./components/RecommandRowCarousel";
import RecommandRowList from "./components/RecommandRowList";
import RecommandRankList from "./components/RecommandRankList";
import Link from "next/link";
export default function MangaPage() {

    return (
        <div>
            {/* 头部推荐漫画 */}
            <div className="recommed-header-wrap bg-gray-800 shadow-lg border-2 rounded-lg px-2 pt-2">
                <RecommandHeader />
            </div>
            {/* 导航 */}
            <div className="navigation bg-gray-500 shadow-lg border-2 rounded-lg px-2">
                <div className="py-5 text-white flex justify-center">
                    <div className="flex items-center justify-between w-[1160px]">
                        <div className="navigation-item-title">
                            <Link href="/manga/category/热血"><span>热血</span></Link>
                        </div>
                        <div className="navigation-item-title">
                            <Link href="/manga/category/古风"><span>古风</span></Link>
                        </div>
                        <div className="navigation-item-title">
                            <Link href="/manga/category/玄幻"><span>玄幻</span></Link>
                        </div>
                        <div className="navigation-item-title">
                            <Link href="/manga/category/奇幻"><span>奇幻</span></Link>
                        </div>
                        <div className="navigation-item-title">
                            <Link href="/manga/category/悬疑"><span>悬疑</span></Link>
                        </div>
                        <div className="navigation-item-title">
                            <Link href="/manga/category/都市"><span>都市</span></Link>
                        </div>
                        <div className="navigation-item-title">
                            <Link href="/manga/category/历史"><span>历史</span></Link>
                        </div>
                        <div className="navigation-item-title">
                            <Link href="/manga/category/武侠仙侠"><span>武侠仙侠</span></Link>
                        </div>
                        <div className="navigation-item-title">
                            <Link href="/manga/category/游戏竞技"><span>游戏竞技</span></Link>
                        </div>
                        <div className="navigation-item-title">
                            <Link href="/manga/category/悬疑灵异"><span>悬疑灵异</span></Link>
                        </div>
                        <div className="navigation-item-title">
                            <Link href="/manga/category/架空"><span>架空</span></Link>
                        </div>
                        <div className="navigation-item-title">
                            <Link href="/manga/category/青春"><span>青春</span></Link>
                        </div>
                        <div className="navigation-item-title">
                            <Link href="/manga/category/西幻"><span>西幻</span></Link>
                        </div>
                        <div className="navigation-item-title">
                            <Link href="/manga/category/现代"><span>现代</span></Link>
                        </div>
                        <div className="navigation-item-title">
                            <Link href="/manga/category/"><span>全部</span></Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* 轮播图组件 */}
            <div className="w-full bg-[#f6f9ff] py-7 mb-10">
                <div className="w-[1160px] mx-auto">
                    <div className="header flex items-center">
                        <div className="header-title text-[#1c1c1f] text-[34px] mr-3">畅销热门</div>
                        <div className="header-subtitle text-[#bfbfc3]">物有所值的真香漫画</div>
                    </div>
                    <RecommandRowCarousel />
                </div>
            </div>
            {/* 其他推荐内容 */}
            <div className="w-[1160px] mx-auto py-7">
                <div className="header flex items-center">
                    <div className="header-title text-[#1c1c1f] text-[34px] mr-3">全网热议</div>
                    <div className="header-subtitle text-[#bfbfc3]">恭喜你发现宝藏</div>
                </div>
                <RecommandRowList />
            </div>

            {/* 其他推荐内容 */}
            <div className="w-[1160px] mx-auto py-7">
                <div className="header flex items-center">
                    <div className="header-title text-[#1c1c1f] text-[34px] mr-3">完结佳作</div>
                    <div className="header-subtitle text-[#bfbfc3]">一口气追到大结局！</div>
                </div>
                <RecommandRowList />
            </div>

            {/* 排名内容 */}
            <div  className="w-[1160px] mx-auto py-7">
                <RecommandRankList/>
            </div>
        </div>
    )
}
