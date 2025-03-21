'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// 测试数据
const collectionData = [
    {
        id: 1,
        title: 'Mike单排天人之战',
        count: 409,
        videos: [
            {
                id: 1,
                title: 'Mike：天人卯开反春合金全套 | 秀冠军标 | 歪由天人10杀',
                coverUrl: '/images/testcover.webp',
                duration: '05:52',
                views: '8.7万',
                danmu: '233',
                createTime: '2022-06-02'
            },
            {
                id: 2,
                title: 'Mike说张天欣快 | 买塔拿物镜 | 初通龙龙骨 | 颜清清12杀',
                coverUrl: '/images/testcover.webp',
                duration: '06:20',
                views: '3.2万',
                danmu: '156',
                createTime: '2022-06-03'
            },
            {
                id: 3,
                title: '当你在天人单排秀到全套金 | Mike：绝杀狗都没了',
                coverUrl: '/images/testcover.webp',
                duration: '05:56',
                views: '3.1万',
                danmu: '145',
                createTime: '2022-06-04'
            },
            {
                id: 4,
                title: 'Mike武田二连鸡 | 狂风绝旨斩 | 高单相遇的秒人套路 | 武器大师',
                coverUrl: '/images/testcover.webp',
                duration: '13:12',
                views: '4.2万',
                danmu: '188',
                createTime: '2022-06-04'
            },
            {
                id: 5,
                title: '比拼控球 | Mike冰女天人空降 | 预转炫闪归',
                coverUrl: '/images/testcover.webp',
                duration: '05:00',
                views: '2.4万',
                danmu: '134',
                createTime: '2022-06-05'
            },
            {
                id: 6,
                title: '前排补上分 给我活动动力 | 白肉刺杀 | 完心豪者 | 天人三连鸡',
                coverUrl: '/images/testcover.webp',
                duration: '13:47',
                views: '2.3万',
                danmu: '167',
                createTime: '2022-06-05'
            }
        ]
    },
    {
        id: 2,
        title: 'Mike和他的朋友们',
        count: 268,
        videos: [
            {
                id: 1,
                title: '大麦为啥下午播？如何评价白水天河？Day计划怎么算的？',
                coverUrl: '/images/testcover.webp',
                duration: '03:34',
                views: '2.1万',
                danmu: '98',
                createTime: '12小时前'
            },
            {
                id: 2,
                title: '《永动版双影奇境》大麦发挥台词的武道宗师',
                coverUrl: '/images/testcover.webp',
                duration: '06:24',
                views: '3.1万',
                danmu: '145',
                createTime: '03-13'
            },
            {
                id: 3,
                title: '大麦大绝的武道宗师，喷爆爱好好为《老虎通用技巧》',
                coverUrl: '/images/testcover.webp',
                duration: '09:15',
                views: '5.9万',
                danmu: '234',
                createTime: '03-10'
            },
            {
                id: 4,
                title: '大麦解说名将冰皇杯 全程回放 | 冠军在线工作工程',
                coverUrl: '/images/testcover.webp',
                duration: '02:42:48',
                views: '2.2万',
                danmu: '567',
                createTime: '03-12'
            },
            {
                id: 5,
                title: '大麦的弹打弹幕大乐斗 | 要锁必须要是的时候...',
                coverUrl: '/images/testcover.webp',
                duration: '10:35',
                views: '3.3万',
                danmu: '178',
                createTime: '03-08'
            },
            {
                id: 6,
                title: '最完美的职业选手志！勇敢者看棋人物志：大麦集锦都像反派',
                coverUrl: '/images/testcover.webp',
                duration: '19:06',
                views: '5.6万',
                danmu: '245',
                createTime: '03-06'
            }
        ]
    }
];

// 视频卡片组件
const VideoCard = ({ video }) => {
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
                    <div className="text-[14px] text-[#18191c] line-clamp-2 group-hover:text-[#00aeec]">
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

// 合集列表组件
const CollectionList = ({ collection }) => {
    return (
        <div className="collection-list mb-12 last:mb-0">
            {/* 合集标题和操作按钮 */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <Link href={`/collection/${collection.id}`} className="text-[20px] text-[#18191c] font-medium hover:text-[#00aeec] transition-all duration-300 ease-in-out">
                        <span>{collection.title}</span>
                    </Link>
                    <span className="text-[#9499a0] text-[14px] ml-2">· {collection.count}</span>
                </div>
                <div className="flex items-center text-[14px]">
                    <Link href="/" className='flex items-center justify-center mr-2'>
                        <div className='flex items-center justify-center border rounded-[8px] px-4 py-2 hover:text-[#00aeec] hover:border-[#00aeec] transition-all duration-300 ease-in-out'>
                            <i className="iconfont icon-anime mr-1" style={{ fontSize: '16px' }}></i>
                            <span className='text-[14px] mt-[2px]'>播放全部</span>
                        </div>
                    </Link>
                    <Link href="/" className='flex items-center justify-center'>
                        <div className='flex items-center justify-center border rounded-[8px] px-4 py-2 hover:text-[#00aeec] hover:border-[#00aeec] transition-all duration-300 ease-in-out'>
                            <span className='text-[14px] mt-[2px]'>查看更多</span>
                            <i className="iconfont icon-right mr-1" style={{ fontSize: '16px' }}></i>
                        </div>
                    </Link>
                </div>
            </div>

            {/* 视频网格 */}
            <div className="grid grid-cols-6 gap-5">
                {collection.videos.map(video => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
};

// 合集卡片组件（网格视图）
const CollectionCard = ({ collection }) => {
    return (
        <div className="collection-card">
            <Link href={`/collection/${collection.id}`} className="block group">
                <div className="relative rounded-lg overflow-hidden">
                    {/* 使用第一个视频的封面作为合集封面 */}
                    <Image
                        src={collection.videos[0].coverUrl}
                        alt={collection.title}
                        width={200}
                        height={125}
                        className="w-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                        {collection.count}个视频
                    </div>
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <i className="iconfont icon-play-fill text-white text-3xl"></i>
                    </div>
                </div>
                <div className="mt-3">
                    <div className="text-[16px] font-medium text-[#18191c] line-clamp-1 group-hover:text-[#00aeec]">
                        合集：{collection.title}
                    </div>
                    <div className="mt-2 text-[14px] text-[#9499a0]">
                        最近更新：{collection.videos[0].createTime}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default function CollectionPage() {
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

    return (
        <div className="collection-page w-full px-4 py-6">
            <div className="flex items-center justify-between mb-8">
                <div className="text-[24px] text-[#18191c] font-bold">合集列表</div>
                <div className="text-[14px]">
                    <button
                        onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                        className="text-[#9499a0] hover:text-[#00aeec] flex items-center"
                    >
                        {viewMode === 'list' ?
                            <i className='iconfont icon-view-grid hover:text-[#00aeec] transition-all duration-300 ease-in-out' style={{ fontSize: '24px' }}></i>
                            : <i className='iconfont icon-view-list hover:text-[#00aeec] transition-all duration-300 ease-in-out' style={{ fontSize: '24px' }}></i>}
                    </button>
                </div>
            </div>

            {viewMode === 'list' ? (
                // 列表视图
                collectionData.map(collection => (
                    <div className='bg-white rounded-lg p-4 shadow-lg mb-4 last:mb-0'>
                        <CollectionList key={collection.id} collection={collection} />
                    </div>
                ))
            ) : (
                // 网格视图
                <div className="grid grid-cols-4 gap-6 bg-white rounded-lg p-4 shadow-lg">
                    {collectionData.map(collection => (
                        <CollectionCard key={collection.id} collection={collection} />
                    ))}
                </div>
            )}
        </div>
    );
}
