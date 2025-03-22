'use client';

import Link from 'next/link';
import HeaderUserBox from './HeaderUserBox';
import { useState } from 'react';
import { useResponsive } from '../contexts/ResponsiveContext';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isMobile } = useResponsive();
    const router = useRouter();

    // 切换菜单状态
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // 处理移动端菜单链接点击
    const handleMenuLinkClick = (href) => {
        setIsMenuOpen(false); // 关闭菜单
        router.push(href); // 导航到目标页面
    };

    return (
        <header className="bg-white h-16 w-full px-2 md:px-6 flex flex-row flex-nowrap justify-between text-sm shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
            {/* 左侧导航 */}
            <div className="header-left flex items-center">
                {/* 移动端汉堡菜单按钮 */}
                {isMobile && (
                    <button 
                        onClick={toggleMenu}
                        className="mr-3 p-1 text-text-1 transition-colors"
                        aria-label="菜单"
                    >
                        <i className="fas fa-bars text-xl"></i>
                    </button>
                )}
                
                <ul className={`${isMobile ? 'hidden' : 'flex'} flex-row flex-nowrap items-center h-full`}>
                    <li className="relative mr-5">
                        <Link href="/" className="text-text-1 hover:text-brand-pink transition-colors">首页</Link>
                    </li>
                    <li className="relative mr-5">
                        <Link href="/anime" className="text-text-1 hover:text-brand-pink transition-colors">番剧</Link>
                    </li>
                    <li className="relative mr-5">
                        <Link href="/manga" className="text-text-1 hover:text-brand-pink transition-colors">漫画</Link>
                    </li>
                    <li className="relative mr-5">
                        <Link href="/game" className="text-text-1 hover:text-brand-pink transition-colors">游戏</Link>
                    </li>
                </ul>
            </div>

            {/* 右侧导航 */}
            <div className="header-right">
                <ul className="flex items-center h-full">
                    <li className="relative mr-5">
                        <HeaderUserBox />
                    </li>
                    {/* 移动端仅显示重要功能 */}
                    {isMobile ? (
                        <>
                            <li className="relative">
                                <Link href="/produce/upload" className="inline-block">
                                    <button className="w-[90px] h-[34px] rounded-lg bg-brand-pink text-white text-sm leading-5 cursor-pointer transition-colors hover:bg-[#fc88ab] flex items-center justify-center">
                                        <i className="iconfont icon-box-shangchuan mr-2" style={{ fontSize: '14px' }}></i>
                                        <span>投稿</span>
                                    </button>
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            {/* 消息 */}
                            <li className="relative mr-5">
                                <Link href="/" className="text-text-2 transition-colors">
                                    <div className="flex flex-col items-center group hover:text-brand-pink">
                                        <i className="iconfont icon-header_message group-hover:animate-jump" style={{ fontSize: '20px' }}></i>
                                        <span>消息</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="relative mr-5">
                                <Link href="/space/1/collect" className="text-text-2 transition-colors">
                                    <div className="flex flex-col items-center group hover:text-brand-pink">
                                        <i className="iconfont icon-header_shoucang group-hover:animate-jump" style={{ fontSize: '20px' }} ></i>
                                        <span>收藏</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="relative mr-5">
                                <Link href="/" className="text-text-2 transition-colors">
                                    <div className="flex flex-col items-center group hover:text-brand-pink">
                                        <i className="iconfont icon-header_history group-hover:animate-jump" style={{ fontSize: '20px' }}></i>
                                        <span>历史</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="relative mr-5">
                                <Link href="/" className="text-text-2 transition-colors">
                                    <div className="flex flex-col items-center group hover:text-brand-pink">
                                        <i className="iconfont icon-header_dyanmic group-hover:animate-jump" style={{ fontSize: '20px' }}></i>
                                        <span>动态</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="relative mr-5">
                                <Link href="/produce" className="text-text-2 transition-colors">
                                    <div className="flex flex-col items-center group hover:text-brand-pink">
                                        <i className="iconfont icon-header_chuangzuozhongxin group-hover:animate-jump" style={{ fontSize: '20px' }}></i>
                                        <span>创作中心</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="relative ml-4">
                                <Link href="/produce/upload" className="inline-block">
                                    <button className="w-[90px] h-[34px] rounded-lg bg-brand-pink text-white text-sm leading-5 cursor-pointer transition-colors hover:bg-[#fc88ab] flex items-center justify-center">
                                        <i className="iconfont icon-box-shangchuan mr-2" style={{ fontSize: '14px' }}></i>
                                        <span>投稿</span>
                                    </button>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {/* 移动端折叠菜单 */}
            {isMobile && isMenuOpen && (
                <div className="fixed top-16 left-0 w-full h-screen bg-white z-50 p-4 shadow-lg overflow-y-auto">
                    <ul className="flex flex-col space-y-4">
                        <li>
                            <button 
                                onClick={() => handleMenuLinkClick('/')} 
                                className="text-lg font-medium block py-2 border-b w-full text-left"
                            >
                                首页
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => handleMenuLinkClick('/anime')} 
                                className="text-lg font-medium block py-2 border-b w-full text-left"
                            >
                                番剧
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => handleMenuLinkClick('/manga')} 
                                className="text-lg font-medium block py-2 border-b w-full text-left"
                            >
                                漫画
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => handleMenuLinkClick('/game')} 
                                className="text-lg font-medium block py-2 border-b w-full text-left"
                            >
                                游戏
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => handleMenuLinkClick('/')} 
                                className="text-lg font-medium block py-2 border-b w-full text-left"
                            >
                                消息
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => handleMenuLinkClick('/space/1/collect')} 
                                className="text-lg font-medium block py-2 border-b w-full text-left"
                            >
                                收藏
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => handleMenuLinkClick('/')} 
                                className="text-lg font-medium block py-2 border-b w-full text-left"
                            >
                                历史
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => handleMenuLinkClick('/')} 
                                className="text-lg font-medium block py-2 border-b w-full text-left"
                            >
                                动态
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => handleMenuLinkClick('/produce')} 
                                className="text-lg font-medium block py-2 border-b w-full text-left"
                            >
                                创作中心
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
} 