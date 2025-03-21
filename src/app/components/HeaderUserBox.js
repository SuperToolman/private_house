'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import LoginDialog from './LoginDialog.js'; // 确保路径正确


export default function HeaderUserBox() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dropdownRef = useRef(null);
    const timeoutRef = useRef(null);
    const animationRef = useRef(null);
    const [showLoginDialog, setShowLoginDialog] = useState(false);

    // 检查登录状态
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    // 模拟登录和注销
    const handleLogin = () => {
        localStorage.setItem('token', 'test-token');
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    // 处理鼠标悬停和离开事件
    const handleMouseEnterAvatar = () => {
        clearTimeout(timeoutRef.current);
        setIsOpen(true);
        setIsAnimating(true);

        // 设置动画完成后的状态
        animationRef.current = setTimeout(() => {
            setIsAnimating(false);
        }, 300); // 与CSS动画时长匹配
    };

    const handleMouseLeaveAvatar = () => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
            setIsAnimating(false); // 确保动画状态在关闭时重置
        }, 200); // 添加延迟，避免用户移动鼠标时菜单闪烁
    };

    // 清理定时器
    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
            clearTimeout(animationRef.current);
        };
    }, []);

    const handleLoginClick = () => {
        setShowLoginDialog(true);
    };

    const handleDialogClose = (loggedIn) => {
        setShowLoginDialog(false);
        if (loggedIn) {
            setIsLoggedIn(true);
        }
    };

    return (
        <div className="relative">
            {/* 用户头像和名称 - 非展开状态 */}
            <div className={`flex items-center space-x-2 cursor-pointer transition-all duration-300 ease-in-out px-2 py-1 rounded-lg ${isOpen ? 'opacity-0 invisible' : 'opacity-100 visible hover:bg-[#f1f2f3]'}`}
                onMouseEnter={handleMouseEnterAvatar}
                onMouseLeave={handleMouseLeaveAvatar}
            >
                {
                    isLoggedIn ? (
                        <>
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                <Image
                                    src="/images/testavatar.webp"
                                    alt="用户头像"
                                    className="w-full h-full object-cover"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <div className="text-[#18191c] text-sm">
                                <span>黑い気持ち</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="bg-blue-500 w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                                <span className="text-[12px] text-white">
                                    登录
                                </span>
                            </div>
                        </>
                    )
                }
            </div>

            {/* 展开状态容器 */}
            <div
                className={`absolute right-1/2 transform translate-x-1/2 bg-white rounded-lg shadow-xl z-50 
                    ${!isOpen ? 'opacity-0 invisible' : 'opacity-100 visible'}
                    ${isAnimating ? 'animate-dropdown-open' : 'w-[240px]'}`}
                style={{
                    top: 0,
                    transition: 'opacity 300ms ease-in-out, visibility 300ms ease-in-out',
                }}
                onMouseEnter={handleMouseEnterAvatar}
                onMouseLeave={handleMouseLeaveAvatar}
            >
                {isLoggedIn ? (
                    // 已登录状态的内容
                    <>
                        {/* 用户信息头部 */}
                        <div className="p-4 border-b border-[#e3e5e7]">
                            <div className="flex items-center justify-center space-x-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <Link href="/space/1">
                                        <Image
                                            src="/images/testavatar.webp"
                                            alt="用户头像"
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-cover"
                                        />
                                    </Link>
                                </div>
                                <div>
                                    <div className="text-[#18191c] font-medium">
                                        <Link href="/space/1" className="hover:text-brand-pink transition-colors">
                                            黑い気持ち
                                        </Link>
                                    </div>
                                    <div className="text-xs text-[#9499a0] mt-1">
                                        <span className="mr-2">硬币: 2607</span>
                                        <span>B币: 0</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between px-[24px]">
                                <div className="hover:text-brand-pink text-[#61666d] text-sm flex flex-col items-center cursor-pointer transition-colors">
                                    <span className="font-weight-[600] text-[#18191c] text-[18px]">323</span>
                                    <span className="text-[#9499a0] text-[12px]">关注</span>
                                </div>
                                <div className="hover:text-brand-pink text-[#61666d] text-sm flex flex-col items-center cursor-pointer transition-colors">
                                    <span className="font-weight-[600] text-[#18191c] text-[18px]">323</span>
                                    <span className="text-[#9499a0] text-[12px]">粉丝</span>
                                </div>
                                <div className="hover:text-brand-pink text-[#61666d] text-sm flex flex-col items-center cursor-pointer transition-colors">
                                    <span className="font-weight-[600] text-[#18191c] text-[18px]">323</span>
                                    <span className="text-[#9499a0] text-[12px]">动态</span>
                                </div>
                            </div>
                        </div>

                        {/* 菜单选项 */}
                        <div className="py-4 px-6 space-y-2">
                            <Link href="/space/1" className="text-[#61666d] flex items-center px-4 py-2 hover:bg-[#f1f2f3] text-[#18191c] text-sm rounded-lg transition-all duration-300 ease-in-out">
                                <i className="iconfont icon-box-user mr-3"></i>
                                <span className="text-7">个人中心</span>
                                <i className="iconfont icon-right ml-auto text-[#9499a0]"></i>
                            </Link>
                            <Link href="/produce/content/manuscript" className="text-[#61666d] flex items-center px-4 py-2 hover:bg-[#f1f2f3] text-[#18191c] text-sm rounded-lg transition-all duration-300 ease-in-out">
                                <i className="iconfont icon-box-tougao mr-3"></i>
                                <span className="text-7">投稿管理</span>
                                <i className="iconfont icon-right ml-auto text-[#9499a0]"></i>
                            </Link>
                            <Link href="/recommend" className="text-[#61666d] flex items-center px-4 py-2 hover:bg-[#f1f2f3] text-[#18191c] text-sm rounded-lg transition-all duration-300 ease-in-out">
                                <i className="iconfont icon-box-tuijianfuwu mr-3"></i>
                                <span className="text-7">推荐服务</span>
                                <i className="iconfont icon-right ml-auto text-[#9499a0]"></i>
                            </Link>
                            <div className="border-t border-[#e3e5e7] my-2"></div>
                            <div onClick={handleLogout} className="text-[#61666d] flex items-center px-4 py-2 hover:bg-[#f1f2f3] text-[#18191c] text-sm cursor-pointer rounded-lg transition-all duration-300 ease-in-out">
                                <i className="iconfont icon-box-loginout mr-3"></i>
                                <span className="text-7">退出登录</span>
                            </div>
                        </div>
                    </>
                ) : (
                    // 未登录状态的内容
                    <div className="p-4">
                        <div className="text-center mb-4">
                            <div className="text-[#18191c] text-lg font-medium mb-2">登录后查看更多</div>
                            <div className="text-[#9499a0] text-sm">登录后可以关注UP主，点赞投币收藏视频</div>
                        </div>
                        <div className="flex justify-center space-x-4">
                            <button onClick={handleLoginClick} className="px-6 py-2 bg-[#00aeec] text-white rounded-lg hover:bg-[#00a1d6] transition-colors duration-200">
                                登录
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {showLoginDialog && <LoginDialog onClose={handleDialogClose} />}

            {/* 添加全局CSS动画 */}
            <style jsx global>{`
                @keyframes dropdownOpen {
                    0% {
                        width: 100px;
                        max-height: 40px;
                        overflow: hidden;
                    }
                    100% {
                        width: 240px;
                        max-height: 500px;
                        overflow: visible;
                    }
                }
                
                .animate-dropdown-open {
                    animation: dropdownOpen 300ms ease-out forwards;
                }
            `}</style>
        </div>
    );
}