'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProduceLayout({ children }) {
    const currentPath = usePathname();
    const router = useRouter();
    const [isContentExpanded, setIsContentExpanded] = useState(false);
    const [isInteractionExpanded, setIsInteractionExpanded] = useState(false);
    const [isIncomeExpanded, setIsIncomeExpanded] = useState(false);

    const handleContentNavClick = () => {
        setIsContentExpanded(!isContentExpanded);
        setIsInteractionExpanded(false);
        setIsIncomeExpanded(false);
        if (!isContentExpanded) {
            router.push('/produce/content/manuscript');
        }
    };

    const handleUploadNavClick = () => {
        setIsContentExpanded(false);
        setIsInteractionExpanded(false);
        setIsIncomeExpanded(false);
    };

    const handleInteractionNavClick = () => {
        setIsInteractionExpanded(!isInteractionExpanded);
        setIsContentExpanded(false);
        setIsIncomeExpanded(false);
        if (!isInteractionExpanded) {
            router.push('/produce/interaction/comments');
        }
    };

    const handleIncomeNavClick = () => {
        setIsIncomeExpanded(!isIncomeExpanded);
        setIsContentExpanded(false);
        setIsInteractionExpanded(false);
        if (!isIncomeExpanded) {
            router.push('/produce/income/center');
        }
    };

    const handleSimpleNavClick = (path) => {
        setIsContentExpanded(false);
        setIsInteractionExpanded(false);
        setIsIncomeExpanded(false);
        router.push(path);
    };

    const handleSubNavClick = (e, path) => {
        e.stopPropagation();
        router.push(path);
    };

    return (
        <div className="left-0 top-0 w-[200px] h-[100vh]">
            <div className="nav-list flex flex-col">
                {/* 投稿 */}
                <div className="flex items-center w-full justify-center py-[10px]">
                    <Link onClick={() => handleUploadNavClick()} href="/produce/upload" className="w-[120px] h-[34px] rounded-lg bg-brand-pink text-white text-sm leading-5 cursor-pointer transition-colors hover:bg-[#fc88ab] flex items-center justify-center">
                        <i className="iconfont icon-box-shangchuan mr-2" style={{ fontSize: '14px' }}></i>
                        <span>投稿</span>
                    </Link>
                </div>
                {/* 首页 */}
                <Link href="/produce" className="flex items-center" onClick={() => handleSimpleNavClick('/produce')}>
                    <div className={`rounded-lg mx-2 my-[2px] flex flex-1 items-center nav-item pr-[24px] pl-[32px] h-[48px] transition-colors ${currentPath === '/produce' ? 'bg-brand-pink text-white' : 'hover:bg-[#d4d4d4]'
                        }`}>
                        <i className="iconfont icon-home mr-2" style={{ fontSize: '17px' }}></i>
                        <span className="text-[16px]">首页</span>
                    </div>
                </Link>
                {/* 内容管理 */}
                <div
                    className={`flex flex-col justify-center mx-2 my-[2px] rounded-lg nav-item pr-[24px] pl-[32px] min-h-[48px] transition-colors hover:bg-brand-pink hover:text-white ${currentPath.startsWith('/produce/content') ? 'bg-brand-pink text-white' : 'hover:bg-[#d4d4d4]'
                        }`}
                    onClick={handleContentNavClick}
                >
                    <div className='flex items-center cursor-pointer'>
                        <i className="iconfont icon-produce-neirongguanli mr-2" style={{ fontSize: '17px' }}></i>
                        <span className="text-[16px]">内容管理</span>
                    </div>

                    {/* 使用 CSS 过渡效果 */}
                    <div
                        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isContentExpanded ? 'max-h-[500px]' : 'max-h-0'}`}
                    >
                        <div className="space-y-2 my-[6px] flex flex-col">
                            <div onClick={(e) => handleSubNavClick(e, '/produce/content/manuscript')} className="flex items-center cursor-pointer">
                                <div className={`nav-item w-full rounded-lg px-[10px] h-[38px] flex items-center transition-colors ${currentPath === '/produce/content/manuscript' ? 'bg-gray-200 text-black' : 'hover:bg-gray-100 hover:text-black'
                                    }`}>
                                    <span className="text-[16px]">稿件管理</span>
                                </div>
                            </div>
                            <div onClick={(e) => handleSubNavClick(e, '/produce/content/appeal')} className="flex items-center cursor-pointer">
                                <div className={`nav-item w-full rounded-lg px-[10px] h-[38px] flex items-center transition-colors ${currentPath === '/produce/content/appeal' ? 'bg-gray-200 text-black' : 'hover:bg-gray-100 hover:text-black'
                                    }`}>
                                    <span className="text-[16px]">申诉管理</span>
                                </div>
                            </div>
                            <div onClick={(e) => handleSubNavClick(e, '/produce/content/subtitle')} className="flex items-center cursor-pointer">
                                <div className={`nav-item w-full rounded-lg px-[10px] h-[38px] flex items-center transition-colors ${currentPath === '/produce/content/subtitle' ? 'bg-gray-200 text-black' : 'hover:bg-gray-100 hover:text-black'
                                    }`}>
                                    <span className="text-[16px]">字幕管理</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 数据中心 */}
                <Link href="/produce/data" className="flex items-center" onClick={() => handleSimpleNavClick('/produce/data')}>
                    <div className={`rounded-lg mx-2 my-[2px] flex flex-1 items-center nav-item pr-[24px] pl-[32px] h-[48px] transition-colors ${currentPath === '/produce/data' ? 'bg-brand-pink text-white' : 'hover:bg-[#d4d4d4]'
                        }`}>
                        <i className="iconfont icon-dproduce-datacenter mr-2" style={{ fontSize: '17px' }}></i>
                        <span className="text-[16px]">数据中心</span>
                    </div>
                </Link>
                {/* 互动管理 */}
                <div
                    className={`flex flex-col justify-center mx-2 my-[2px] rounded-lg nav-item pr-[24px] pl-[32px] min-h-[48px] transition-colors hover:bg-brand-pink hover:text-white ${currentPath.startsWith('/produce/interaction') ? 'bg-brand-pink text-white' : 'hover:bg-[#d4d4d4]'
                        }`}
                    onClick={handleInteractionNavClick}
                >
                    <div className='flex items-center cursor-pointer'>
                        <i className="iconfont icon-produce-hudongguanli mr-2" style={{ fontSize: '17px' }}></i>
                        <span className="text-[16px]">互动管理</span>
                    </div>

                    {/* 使用 CSS 过渡效果 */}
                    <div
                        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isInteractionExpanded ? 'max-h-[500px]' : 'max-h-0'}`}
                    >
                        <div className="space-y-2 my-[6px] flex flex-col">
                            <div onClick={(e) => handleSubNavClick(e, '/produce/interaction/comments')} className="flex items-center cursor-pointer">
                                <div className={`nav-item w-full rounded-lg px-[10px] h-[38px] flex items-center transition-colors ${currentPath === '/produce/interaction/comments' ? 'bg-gray-200 text-black' : 'hover:bg-gray-100 hover:text-black'
                                    }`}>
                                    <span className="text-[16px]">评论管理</span>
                                </div>
                            </div>
                            <div onClick={(e) => handleSubNavClick(e, '/produce/interaction/barrage')} className="flex items-center cursor-pointer">
                                <div className={`nav-item w-full rounded-lg px-[10px] h-[38px] flex items-center transition-colors ${currentPath === '/produce/interaction/barrage' ? 'bg-gray-200 text-black' : 'hover:bg-gray-100 hover:text-black'
                                    }`}>
                                    <span className="text-[16px]">弹幕管理</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 粉丝管理 */}
                <Link href="/produce/fans" className="flex items-center" onClick={() => handleSimpleNavClick('/produce/fans')}>
                    <div className={`rounded-lg mx-2 my-[2px] flex flex-1 items-center nav-item pr-[24px] pl-[32px] h-[48px] transition-colors ${currentPath === '/produce/fans' ? 'bg-brand-pink text-white' : 'hover:bg-[#d4d4d4]'
                        }`}>
                        <i className="iconfont icon-produce-fansguanli mr-2" style={{ fontSize: '17px' }}></i>
                        <span className="text-[16px]">粉丝管理</span>
                    </div>
                </Link>
                {/* 收益管理 */}
                <div
                    className={`flex flex-col justify-center mx-2 my-[2px] rounded-lg nav-item pr-[24px] pl-[32px] min-h-[48px] transition-colors hover:bg-brand-pink hover:text-white ${currentPath.startsWith('/produce/income') ? 'bg-brand-pink text-white' : 'hover:bg-[#d4d4d4]'
                        }`}
                    onClick={handleIncomeNavClick}
                >
                    <div className='flex items-center cursor-pointer'>
                        <i className="iconfont icon-produce-shouyiguanli mr-2" style={{ fontSize: '17px' }}></i>
                        <span className="text-[16px]">收益管理</span>
                    </div>

                    {/* 使用 CSS 过渡效果 */}
                    <div
                        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isIncomeExpanded ? 'max-h-[500px]' : 'max-h-0'}`}
                    >
                        <div className="space-y-2 my-[6px] flex flex-col">
                            <div onClick={(e) => handleSubNavClick(e, '/produce/income/center')} className="flex items-center cursor-pointer">
                                <div className={`nav-item w-full rounded-lg px-[10px] h-[38px] flex items-center transition-colors ${currentPath === '/produce/income/center' ? 'bg-gray-200 text-black' : 'hover:bg-gray-100 hover:text-black'
                                    }`}>
                                    <span className="text-[16px]">收益中心</span>
                                </div>
                            </div>
                            <div onClick={(e) => handleSubNavClick(e, '/produce/income/incentive')} className="flex items-center cursor-pointer">
                                <div className={`nav-item w-full rounded-lg px-[10px] h-[38px] flex items-center transition-colors ${currentPath === '/produce/income/incentive' ? 'bg-gray-200 text-black' : 'hover:bg-gray-100 hover:text-black'
                                    }`}>
                                    <span className="text-[16px]">创作激励</span>
                                </div>
                            </div>
                            <div onClick={(e) => handleSubNavClick(e, '/produce/income/charge')} className="flex items-center cursor-pointer">
                                <div className={`nav-item w-full rounded-lg px-[10px] h-[38px] flex items-center transition-colors ${currentPath === '/produce/income/charge' ? 'bg-gray-200 text-black' : 'hover:bg-gray-100 hover:text-black'
                                    }`}>
                                    <span className="text-[16px]">充电计划</span>
                                </div>
                            </div>
                            <div onClick={(e) => handleSubNavClick(e, '/produce/income/reward')} className="flex items-center cursor-pointer">
                                <div className={`nav-item w-full rounded-lg px-[10px] h-[38px] flex items-center transition-colors ${currentPath === '/produce/income/reward' ? 'bg-gray-200 text-black' : 'hover:bg-gray-100 hover:text-black'
                                    }`}>
                                    <span className="text-[16px]">悬赏带货</span>
                                </div>
                            </div>
                            <div onClick={(e) => handleSubNavClick(e, '/produce/income/tasks')} className="flex items-center cursor-pointer">
                                <div className={`nav-item w-full rounded-lg px-[10px] h-[38px] flex items-center transition-colors ${currentPath === '/produce/income/tasks' ? 'bg-gray-200 text-black' : 'hover:bg-gray-100 hover:text-black'
                                    }`}>
                                    <span className="text-[16px]">任务广场</span>
                                </div>
                            </div>
                            <div onClick={(e) => handleSubNavClick(e, '/produce/income/huahuo')} className="flex items-center cursor-pointer">
                                <div className={`nav-item w-full rounded-lg px-[10px] h-[38px] flex items-center transition-colors ${currentPath === '/produce/income/huahuo' ? 'bg-gray-200 text-black' : 'hover:bg-gray-100 hover:text-black'
                                    }`}>
                                    <span className="text-[16px]">花火平台</span>
                                </div>
                            </div>
                            <div onClick={(e) => handleSubNavClick(e, '/produce/income/template')} className="flex items-center cursor-pointer">
                                <div className={`nav-item w-full rounded-lg px-[10px] h-[38px] flex items-center transition-colors ${currentPath === '/produce/income/template' ? 'bg-gray-200 text-black' : 'hover:bg-gray-100 hover:text-black'
                                    }`}>
                                    <span className="text-[16px]">模板激励</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
