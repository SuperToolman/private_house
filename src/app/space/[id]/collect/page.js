'use client';
import { useState } from 'react';
import { useResponsive } from '../../../contexts/ResponsiveContext';
import NavigationList from './components/NavigationList';
import CollectionHeader from './components/CollectionHeader';
import VideoCard from './components/VideoCard';

// 测试数据
const testData = {
    myCollections: [
        {
            id: 1,
            title: 'EPZ GM50',
            count: 5,
            isPrivate: true,
            firstVideoCover: '/images/testcover.webp',
            videoCount: 5,
            totalViews: '1.2万',
            updateTime: '03-14',
            likeCount: 50,
            favoriteCount: 20,
            shareCount: 10,
            description: '这是一个关于耳机的收藏集',
            videos: [
                {
                    id: 1,
                    title: '分享一个解决"系统音量已经调至最小，耳机声音依旧太大"的软件',
                    coverUrl: '/images/testcover.webp',
                    duration: '01:50',
                    views: '7.0万',
                    danmu: '11',
                    collectTime: '03-14'
                },
                {
                    id: 2,
                    title: 'epz耳机推荐',
                    coverUrl: '/images/testcover.webp',
                    duration: '01:13',
                    views: '253',
                    danmu: '0',
                    collectTime: '03-14'
                },
                {
                    id: 3,
                    title: '瓦宇第用什么耳机',
                    coverUrl: '/images/testcover.webp',
                    duration: '01:00',
                    views: '4400',
                    danmu: '1',
                    collectTime: '03-12'
                }
            ]
        },
        {
            id: 2,
            title: '太刀从零教学',
            count: 14,
            isPrivate: false,
            firstVideoCover: '/images/testcover.webp',
            videoCount: 14,
            totalViews: '5.6万',
            updateTime: '02-22',
            likeCount: 128,
            favoriteCount: 56,
            shareCount: 23,
            description: '怪物猎人太刀使用教程',
            videos: [
                {
                    id: 4,
                    title: '【怪物猎人世界】太刀入门教学',
                    coverUrl: '/images/testcover.webp',
                    duration: '12:34',
                    views: '3.2万',
                    danmu: '108',
                    collectTime: '02-22'
                }
            ]
        }
    ],
    followingCollections: [
        {
            id: 3,
            title: '动画混剪',
            count: 23,
            isPrivate: false,
            firstVideoCover: '/images/testcover.webp',
            videoCount: 23,
            totalViews: '8.4万',
            updateTime: '01-15',
            likeCount: 342,
            favoriteCount: 123,
            shareCount: 56,
            description: '各种动漫混剪合集',
            videos: []
        },
        {
            id: 4,
            title: '电化学ZCZ简介',
            count: 2,
            isPrivate: false,
            firstVideoCover: '/images/testcover.webp',
            videoCount: 2,
            totalViews: '1.3千',
            updateTime: '01-06',
            likeCount: 12,
            favoriteCount: 5,
            shareCount: 3,
            description: '电化学基础知识',
            videos: []
        }
    ]
};

const FilterTabs = ({ activeTab, onTabChange, isMobile }) => {
    const tabs = [
        { id: 'recent', label: '最近收藏' },
        { id: 'popular', label: '最多播放' },
        { id: 'latest', label: '最近投稿' }
    ];

    return (
        <div className={`flex items-center ${isMobile ? 'space-x-4' : 'space-x-6'}`}>
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`${isMobile ? 'text-[12px]' : 'text-[14px]'} pb-2 border-b-2 ${activeTab === tab.id
                        ? 'text-[#00aeec] border-[#00aeec]'
                        : 'text-[#61666d] border-transparent hover:text-[#18191c]'
                        }`}
                    onClick={() => onTabChange(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

const SearchBar = ({ value, onChange, isMobile }) => {
    return (
        <div className="relative">
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder="请输入关键词"
                className={`${isMobile ? 'w-[160px] h-[28px] text-[12px]' : 'w-[200px] h-[32px] text-[14px]'} pl-3 pr-8 rounded-lg border border-[#e3e5e7] focus:border-[#00aeec] outline-none`}
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9499a0] hover:text-[#00aeec]">
                <i className={`iconfont icon-search ${isMobile ? 'text-[14px]' : 'text-[16px]'}`}></i>
            </button>
        </div>
    );
};

export default function CollectPage() {
    const { isMobile, isTablet, isClient } = useResponsive();
    const [activeCollectionId, setActiveCollectionId] = useState(testData.myCollections[0].id);
    const [activeTab, setActiveTab] = useState('recent');
    const [searchQuery, setSearchQuery] = useState('');

    // 获取当前选中的收藏夹
    const activeCollection = testData.myCollections.find(c => c.id === activeCollectionId) ||
        testData.followingCollections.find(c => c.id === activeCollectionId) ||
        testData.myCollections[0]; // 提供默认值

    // 确保activeCollection有合法的数据结构
    const safeCollection = {
        id: activeCollection.id,
        title: activeCollection.title || '未命名收藏夹',
        isPrivate: activeCollection.isPrivate || false,
        firstVideoCover: activeCollection.firstVideoCover || '/images/default-cover.webp',
        videoCount: activeCollection.videoCount || 0,
        totalViews: activeCollection.totalViews || '0',
        updateTime: activeCollection.updateTime || '',
        likeCount: activeCollection.likeCount || 0,
        favoriteCount: activeCollection.favoriteCount || 0,
        shareCount: activeCollection.shareCount || 0,
        description: activeCollection.description || '',
        videos: Array.isArray(activeCollection.videos) ? activeCollection.videos : []
    };

    // 服务端渲染占位
    if (!isClient) {
        return <div className="w-full h-screen flex items-center justify-center bg-[#f5f5f5]">
            <div className="text-lg text-gray-500">加载中...</div>
        </div>;
    }

    return (
        <div className={`${isMobile ? 'flex flex-col' : 'flex gap-4'} w-full`}>
            {/* 左侧导航 */}
            <NavigationList
                collections={testData}
                activeId={activeCollectionId}
                onSelect={setActiveCollectionId}
                isMobile={isMobile}
            />

            {/* 右侧内容 */}
            <div className="flex-1 w-full">
                {/* 收藏夹信息头部 */}
                <CollectionHeader collection={safeCollection} isMobile={isMobile} />

                {/* 内容主体部分 */}
                <div className={`w-full shadow-lg bg-white rounded-lg flex flex-col ${isMobile ? 'px-3 py-3' : 'px-6 py-4'}`}>
                    {/* 筛选和搜索栏 */}
                    <div className={`${isMobile ? 'flex flex-col space-y-3' : 'flex items-center justify-between'} mb-4`}>
                        <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} isMobile={isMobile} />
                        <SearchBar value={searchQuery} onChange={setSearchQuery} isMobile={isMobile} />
                    </div>

                    {/* 视频网格 */}
                    <div className={`grid ${
                        isMobile ? 'grid-cols-2 gap-3' : 
                        isTablet ? 'grid-cols-3 gap-4' : 
                        'grid-cols-5 gap-x-4 gap-y-6'
                    }`}>
                        {safeCollection.videos.map(video => (
                            <VideoCard key={video.id} video={video} isMobile={isMobile} />
                        ))}
                        {safeCollection.videos.length === 0 && (
                            <div className={`${isMobile ? 'col-span-2' : isTablet ? 'col-span-3' : 'col-span-5'} py-8 text-center text-[#9499a0]`}>
                                <i className="iconfont icon-empty text-[40px]"></i>
                                <p className="mt-3">该收藏夹暂无视频</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
