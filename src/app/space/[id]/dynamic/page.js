'use client';
import { useState } from 'react';
import LeftNav from './components/LeftNav';
import DynamicItem from './components/DynamicItem';
import RightSidebar from './components/RightSidebar';

// 测试数据
const testData = [
    {
        id: 1,
        type: 'video',
        user: {
            id: 28354565,
            name: '黑い気持ち',
            avatar: '/images/testavatar.webp'
        },
        createTime: '2024年04月04日',
        content: {
            title: '日常五杀',
            videoUrl: '/http://localhost:9080/GM99%E5%90%8E%E5%85%A5%E6%8A%B1%E8%B6%85%E5%94%90%E9%97%A8.mp4',
            coverUrl: '/images/testcover.webp',
            duration: '00:52',
            desc:'不知道大麦在哪直播的可以看我动态置顶或者评论区相互问问。Mike直播通知与白水天河更新提醒：649358957',
        }
    },
    {
        id: 2,
        type: 'share',
        user: {
            id: 28354565,
            name: '黑い気持ち',
            avatar: '/images/testavatar.webp'
        },
        createTime: '2023年12月04日',
        content: {
            title: '奇点时代',
            rating: 5,
            gameInfo: {
                score: '6.99',
                players: '10262人评价',
                status: '未破'
            }
        }
    },
    {
        id: 3,
        type: 'video',
        user: {
            id: 28354565,
            name: '黑い気持ち',
            avatar: '/images/testavatar.webp'
        },
        createTime: '2023年09月28日',
        content: {
            title: '我的五杀',
            videoId: '20230924-011409--0KillStreakAchv-b9c2',
            videoUrl: '/http://localhost:9080/GM99%E5%90%8E%E5%85%A5%E6%8A%B1%E8%B6%85%E5%94%90%E9%97%A8.mp4',
            coverUrl: '/images/testcover.webp',
            duration: '00:31',
            desc:'不知道大麦在哪直播的可以看我动态置顶或者评论区相互问问。Mike直播通知与白水天河更新提醒：649358957',
        }
    }
];

export default function DynamicsPage() {
    const [activeType, setActiveType] = useState('all');

    // 根据选中的类型筛选内容
    const filteredData = activeType === 'all' 
        ? testData 
        : testData.filter(item => item.type === activeType);

    return (
        <>
        <div className="flex gap-[20px] w-full">
                    {/* 左侧导航 */}
                    <LeftNav 
                        activeType={activeType} 
                        onTypeChange={setActiveType} 
                    />

                    {/* 中间内容区 */}
                    <div className="flex-1 space-y-4">
                        {filteredData.map(item => (
                            <div key={item.id} className="bg-white rounded-lg p-4 shadow-lg">
                                <DynamicItem item={item} />
                            </div>
                        ))}
                    </div>

                    {/* 右侧信息栏 */}
                    <RightSidebar />
                </div>
        </>
    );
}
