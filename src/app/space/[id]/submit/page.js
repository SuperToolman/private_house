'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useResponsive } from '../../../contexts/ResponsiveContext';

// 测试数据
const testData = [
    {
        id: 1,
        title: '大麦的跳新圣经 | 二通完刺 | 三冠破防 | Mike无人',
        coverUrl: '/images/testcover.webp',
        duration: '18:53',
        views: '1.9万',
        danmu: '133',
        createTime: '9小时前',
        status: '审核通过'
    },
    {
        id: 2,
        title: '大麦为啥下午播？如何评价白水天河？Day计划怎么算的？',
        coverUrl: '/images/testcover.webp',
        duration: '03:34',
        views: '2.1万',
        danmu: '98',
        createTime: '12小时前',
        status: '审核通过'
    },
    {
        id: 3,
        title: '"炉石2恶魔守主力量" Mike单排秀女女',
        coverUrl: '/images/testcover.webp',
        duration: '15:18',
        views: '2.2万',
        danmu: '136',
        createTime: '17小时前',
        status: '审核通过'
    },
    {
        id: 4,
        title: 'Day7，好小炫的数字！大麦：我是一头大镖 | Mike单排探秘',
        coverUrl: '/images/testcover.webp',
        duration: '14:12',
        views: '3.2万',
        danmu: '130',
        createTime: '22小时前',
        status: '审核通过'
    },
    {
        id: 5,
        title: '玩炫刀の大麦："石月没这么死了，剧院火男！"Mike单排',
        coverUrl: '/images/testcover.webp',
        duration: '13:37',
        views: '2.2万',
        danmu: '143',
        createTime: '03-17',
        status: '审核通过'
    },
    {
        id: 6,
        title: '"他的大招怎么能破到又短又矮的？"Mike单排火男',
        coverUrl: '/images/testcover.webp',
        duration: '13:29',
        views: '5.4万',
        danmu: '222',
        createTime: '03-16',
        status: '审核通过'
    },
    {
        id: 7,
        title: '"你是说一把游戏，他杀了24个？"Mike单排守夜者',
        coverUrl: '/images/testcover.webp',
        duration: '14:31',
        views: '4.3万',
        danmu: '150',
        createTime: '03-16',
        status: '审核通过'
    },
    {
        id: 8,
        title: '大麦的银角胡桃 | 速通火男哥 | 被球炼舞妓 | Mike单排',
        coverUrl: '/images/testcover.webp',
        duration: '12:36',
        views: '2.6万',
        danmu: '112',
        createTime: '03-15',
        status: '审核通过'
    },
    {
        id: 9,
        title: '大麦春季赛用什么英雄？全玩恶梦号？Mike单排纯纯',
        coverUrl: '/images/testcover.webp',
        duration: '19:51',
        views: '3.1万',
        danmu: '175',
        createTime: '03-15',
        status: '审核通过'
    },
    {
        id: 10,
        title: '大麦被"豪家大将"单杀！锐评水友ID | Mike单排胡桃',
        coverUrl: '/images/testcover.webp',
        duration: '14:35',
        views: '2.8万',
        danmu: '112',
        createTime: '03-15',
        status: '审核通过'
    },
    {
        id: 11,
        title: '落地六连杀 | 讲解闪避 | 锐评出刀优化 | 下午播的好处 | Mike单排',
        coverUrl: '/images/testcover.webp',
        duration: '12:30',
        views: '2.3万',
        danmu: '117',
        createTime: '03-15',
        status: '审核通过'
    },
    {
        id: 12,
        title: '"看状态的海洋竟然军九之后力Z看的？"Mike单排张起灵',
        coverUrl: '/images/testcover.webp',
        duration: '17:24',
        views: '3.7万',
        danmu: '153',
        createTime: '03-15',
        status: '审核通过'
    }
];

// 左侧导航组件
const LeftNav = ({ isMobile }) => {
    const navItems = [
        { text: '视频', count: 2661, active: true },
        { text: '图文', count: 242 },
        { text: '音频', count: 0 }
    ];

    if (isMobile) {
        return (
            <div className="w-full mb-4 bg-white rounded-lg p-3 shadow-md">
                <div className="flex items-center justify-between space-x-2">
                    {navItems.map((item, index) => (
                        <div
                            key={index}
                            className={`flex-1 flex items-center justify-center px-2 py-2 rounded-lg cursor-pointer text-center ${
                                item.active ? 'bg-[#00aeec] text-white' : 'text-[#61666d] bg-[#f6f7f8]'
                            }`}
                        >
                            <span className="text-sm">{item.text}</span>
                            <span className="text-xs ml-1">({item.count})</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-[200px] shrink-0">
            {navItems.map((item, index) => (
                <div
                    key={index}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer mb-2 ${
                        item.active ? 'bg-[#00aeec] text-white' : 'text-[#61666d] hover:bg-[#f6f7f8]'
                    }`}
                >
                    <span>{item.text}</span>
                    <span>{item.count}</span>
                </div>
            ))}
        </div>
    );
};

// 顶部筛选组件
const FilterBar = ({ viewMode, onViewModeChange, isMobile }) => {
    const filters = [
        { text: '最新发布', active: true },
        { text: '最多播放', active: false },
        { text: '最多收藏', active: false }
    ];

    return (
        <div className={`flex items-center justify-between border-b border-[#e3e5e7] pb-3 ${isMobile ? 'flex-wrap' : ''}`}>
            <div className={`flex items-center ${isMobile ? 'space-x-3 mb-2' : 'space-x-6'}`}>
                {filters.map((filter, index) => (
                    <div
                        key={index}
                        className={`cursor-pointer ${isMobile ? 'text-[12px]' : 'text-[14px]'} ${
                            filter.active ? 'text-[#00aeec] font-medium' : 'text-[#61666d] hover:text-[#00aeec]'
                        }`}
                    >
                        {filter.text}
                    </div>
                ))}
            </div>
            <div
                className="text-[14px] text-[#61666d] hover:text-[#00aeec] transition-all duration-300 ease-in-out cursor-pointer flex items-center"
                onClick={() => onViewModeChange(viewMode === 'grid' ? 'list' : 'grid')}
            >
                {
                    viewMode === 'grid' ? (
                        <i className='iconfont icon-view-list' style={{ fontSize: '24px' }}></i>
                    ) : (
                        <i className='iconfont icon-view-grid' style={{ fontSize: '24px' }}></i>
                    )
                }
            </div>
        </div>
    );
};

// 视频卡片组件 - 网格视图
const VideoGridCard = ({ video, isMobile }) => {
    return (
        <div className="video-card">
            <Link href={`/video/${video.id}`} className="block group">
                <div className="relative rounded-lg overflow-hidden">
                    <Image
                        src={video.coverUrl}
                        alt={video.title}
                        width={200}
                        height={125}
                        className="w-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                        {video.duration}
                    </div>
                </div>
                <div className="mt-3">
                    <div className={`${isMobile ? 'text-[13px]' : 'text-[14px]'} text-[#18191c] line-clamp-2 group-hover:text-[#00aeec]`}>
                        {video.title}
                    </div>
                    <div className="mt-2 flex items-center text-[12px] text-[#9499a0]">
                        <div className="flex items-center">
                            <i className="iconfont icon-play-count-fill mr-1"></i>
                            <span>{video.views}</span>
                        </div>
                        <div className="flex items-center ml-3">
                            <i className="iconfont icon-danmu mr-1"></i>
                            <span>{video.danmu}</span>
                        </div>
                        <div className="ml-3">{video.createTime}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

// 视频卡片组件 - 列表视图
const VideoListCard = ({ video, isMobile }) => {
    return (
        <div className={`video-card flex gap-4 py-4 border-b border-[#e3e5e7] last:border-none ${isMobile ? 'flex-col' : ''}`}>
            <Link href={`/video/${video.id}`} className={`${isMobile ? 'w-full' : 'shrink-0'} block group`}>
                <div className={`relative ${isMobile ? 'w-full h-[180px]' : 'w-[256px] h-[144px]'} rounded-lg overflow-hidden`}>
                    <Image
                        src={video.coverUrl}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                        {video.duration}
                    </div>
                </div>
            </Link>
            <div className="flex-1">
                <Link href={`/video/${video.id}`} className="block">
                    <div className={`${isMobile ? 'text-[13px] mt-2' : 'text-[14px]'} text-[#18191c] line-clamp-2 group-hover:text-[#00aeec]`}>
                        {video.title}
                    </div>
                </Link>
                <div className="mt-2 flex items-center text-[12px] text-[#9499a0]">
                    <div className="flex items-center">
                        <i className="iconfont icon-play-count-fill mr-1"></i>
                        <span>{video.views}</span>
                    </div>
                    <div className="flex items-center ml-3">
                        <i className="iconfont icon-danmu mr-1"></i>
                        <span>{video.danmu}</span>
                    </div>
                    <div className="ml-3">{video.createTime}</div>
                </div>
                <div className={`mt-2 ${isMobile ? 'text-[11px]' : 'text-[12px]'} text-[#9499a0]`}>
                    不知道大麦在哪直播的可以看我动态置顶或者评论区这里相互问问，Mike直播通知与白水天河更新提醒：649358957
                </div>
            </div>
        </div>
    );
};

export default function SubmitPage() {
    const { isMobile, isTablet, isClient } = useResponsive();
    const [viewMode, setViewMode] = useState(isMobile ? 'list' : 'grid'); // 移动端默认使用列表视图

    // 服务端渲染占位
    if (!isClient) {
        return <div className="w-full h-screen flex items-center justify-center bg-[#f5f5f5]">
            <div className="text-lg text-gray-500">加载中...</div>
        </div>;
    }

    return (
        <div className="submit-page w-full py-6">
            <div className={`${isMobile ? 'flex flex-col' : 'flex gap-6'}`}>
                {/* 左侧导航 */}
                <LeftNav isMobile={isMobile} />

                {/* 右侧内容区 */}
                <div className="flex-1 bg-white rounded-lg p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center">
                            <span className={`${isMobile ? 'text-[16px]' : 'text-[20px]'} font-bold mr-3`}>TA的视频</span>
                            <span className="text-[#9499a0]">2661</span>
                        </div>
                        <Link href="/" className='flex items-center justify-center'>
                            <div className={`flex items-center justify-center border rounded-[8px] ${isMobile ? 'px-3 py-1' : 'px-4 py-2'} hover:text-[#00aeec] hover:border-[#00aeec] transition-all duration-300 ease-in-out`}>
                                <i className="iconfont icon-anime mr-1" style={{ fontSize: isMobile ? '14px' : '16px' }}></i>
                                <span className={`${isMobile ? 'text-[12px]' : 'text-[14px]'} mt-[2px]`}>播放全部</span>
                            </div>
                        </Link>
                    </div>

                    {/* 筛选栏 */}
                    <FilterBar viewMode={viewMode} onViewModeChange={setViewMode} isMobile={isMobile} />

                    {/* 视频列表 */}
                    {viewMode === 'grid' ? (
                        <div className={`mt-4 grid ${
                            isMobile ? 'grid-cols-2 gap-3' : 
                            isTablet ? 'grid-cols-3 gap-4' : 
                            'grid-cols-4 gap-5'
                        }`}>
                            {testData.map(video => (
                                <VideoGridCard key={video.id} video={video} isMobile={isMobile} />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-4">
                            {testData.map(video => (
                                <VideoListCard key={video.id} video={video} isMobile={isMobile} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
