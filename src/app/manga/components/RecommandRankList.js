import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useResponsive } from '../../contexts/ResponsiveContext';

export default function RecommandRankList() {
    const { isMobile, isTablet } = useResponsive();
    const [activeTab, setActiveTab] = useState('日漫榜');
    
    // 排行榜数据
    const rankData = {
        '日漫榜': [
            {
                id: 1,
                rank: 1,
                title: '咒术回战',
                image: '/images/test_manga_cover (1).webp',
                tags: ['热血', '战斗']
            },
            {
                id: 2,
                rank: 2,
                title: '间谍过家家',
                image: '/images/test_manga_cover (2).webp',
                tags: ['喜剧', '冒险']
            },
            {
                id: 3,
                rank: 3,
                title: '海贼王',
                image: '/images/test_manga_cover (3).webp',
                tags: ['冒险', '热血']
            },
            {
                id: 4,
                rank: 4,
                title: '进击的巨人',
                image: '/images/test_manga_cover (4).webp',
                tags: ['悬疑', '战斗']
            },
            {
                id: 5,
                rank: 5,
                title: '鬼灭之刃',
                image: '/images/test_manga_cover (1).webp',
                tags: ['战斗', '热血']
            },
            {
                id: 6,
                rank: 6,
                title: '蓝色监狱',
                image: '/images/test_manga_cover (2).webp',
                tags: ['运动', '热血']
            }
        ],
        '国漫榜': [
            {
                id: 7,
                rank: 1,
                title: '一人之下',
                image: '/images/test_manga_cover (3).webp',
                tags: ['热血', '玄幻']
            },
            {
                id: 8,
                rank: 2,
                title: '镖人',
                image: '/images/test_manga_cover (4).webp',
                tags: ['武侠', '历史']
            },
            {
                id: 9,
                rank: 3,
                title: '伏魔者',
                image: '/images/test_manga_cover (1).webp',
                tags: ['悬疑', '奇幻']
            },
            {
                id: 10,
                rank: 4,
                title: '雏蜂',
                image: '/images/test_manga_cover (2).webp',
                tags: ['科幻', '战斗']
            },
            {
                id: 11,
                rank: 5,
                title: '狐妖小红娘',
                image: '/images/test_manga_cover (3).webp',
                tags: ['恋爱', '奇幻']
            },
            {
                id: 12,
                rank: 6,
                title: '大理寺日志',
                image: '/images/test_manga_cover (4).webp',
                tags: ['悬疑', '古风']
            }
        ],
        '韩漫榜': [
            {
                id: 13,
                rank: 1,
                title: '独自练级',
                image: '/images/test_manga_cover (1).webp',
                tags: ['奇幻', '冒险']
            },
            {
                id: 14,
                rank: 2,
                title: '塔楼',
                image: '/images/test_manga_cover (2).webp',
                tags: ['悬疑', '战斗']
            },
            {
                id: 15,
                rank: 3,
                title: '女神降临',
                image: '/images/test_manga_cover (3).webp',
                tags: ['恋爱', '校园']
            },
            {
                id: 16,
                rank: 4,
                title: '今天的老师',
                image: '/images/test_manga_cover (4).webp',
                tags: ['爱情', '日常']
            },
            {
                id: 17,
                rank: 5,
                title: '甜蜜家庭',
                image: '/images/test_manga_cover (1).webp',
                tags: ['爱情', '生活']
            },
            {
                id: 18,
                rank: 6,
                title: '限制级选手',
                image: '/images/test_manga_cover (2).webp',
                tags: ['游戏', '竞技']
            }
        ]
    };

    // 获取标签背景色
    const getTagBgColor = (tag) => {
        const tagColors = {
            '冒险': 'bg-blue-500',
            '奇幻': 'bg-indigo-500',
            '热血': 'bg-orange-500',
            '战斗': 'bg-red-500',
            '玄幻': 'bg-purple-500',
            '喜剧': 'bg-green-500',
            '悬疑': 'bg-yellow-600',
            '科幻': 'bg-cyan-500',
            '恋爱': 'bg-pink-500',
            '武侠': 'bg-amber-700',
            '历史': 'bg-blue-700',
            '古风': 'bg-rose-700',
            '校园': 'bg-green-600',
            '日常': 'bg-blue-400',
            '爱情': 'bg-pink-400',
            '生活': 'bg-emerald-500',
            '运动': 'bg-sky-500',
            '游戏': 'bg-violet-500',
            '竞技': 'bg-orange-600'
        };
        
        return tagColors[tag] || 'bg-gray-500';
    };

    // 计算要显示的项目数量
    const displayCount = isMobile ? 4 : 6;

    return (
        <div className="rank-list-container">
            <div className={`flex items-center ${isMobile ? 'mb-3' : 'mb-6'}`}>
                <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mr-6`}>漫画排行榜</div>
                
                {/* Tab切换 */}
                <div className="flex space-x-4">
                    {Object.keys(rankData).map(tabName => (
                        <button
                            key={tabName}
                            className={`${isMobile ? 'text-sm px-2 py-1' : 'px-3 py-1.5'} rounded-md ${
                                activeTab === tabName
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            onClick={() => setActiveTab(tabName)}
                        >
                            {tabName}
                        </button>
                    ))}
                </div>
            </div>

            {/* 排行榜内容 */}
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-2 gap-4'}`}>
                {rankData[activeTab].slice(0, displayCount).map((item) => (
                    <div key={item.id} className="rank-item">
                        <Link href={`/manga/${item.id}`} className="block">
                            <div className={`flex ${isMobile ? 'h-24' : 'h-32'} bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300`}>
                                {/* 排名 */}
                                <div className={`flex items-center justify-center ${isMobile ? 'w-8' : 'w-12'} bg-gray-100`}>
                                    <div 
                                        className={`font-bold ${
                                            item.rank <= 3 
                                                ? 'text-orange-500' 
                                                : 'text-gray-500'
                                        } ${isMobile ? 'text-lg' : 'text-2xl'}`}
                                    >
                                        {item.rank}
                                    </div>
                                </div>
                                
                                {/* 封面 */}
                                <div className={`relative ${isMobile ? 'w-16' : 'w-24'} flex-shrink-0`}>
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        sizes={isMobile ? '64px' : '96px'}
                                    />
                                </div>
                                
                                {/* 信息 */}
                                <div className="flex-1 p-2">
                                    <h3 className={`${isMobile ? 'text-sm' : 'text-base'} font-medium text-gray-800 line-clamp-1`}>
                                        {item.title}
                                    </h3>
                                    
                                    {/* 标签 */}
                                    <div className={`flex mt-1 ${isMobile ? 'space-x-1' : 'space-x-2'}`}>
                                        {item.tags.map((tag, tagIndex) => (
                                            <span 
                                                key={tagIndex} 
                                                className={`${getTagBgColor(tag)} text-white rounded-sm ${isMobile ? 'px-1 text-[8px]' : 'px-1.5 py-0.5 text-xs'}`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {!isMobile && (
                                        <div className="mt-2 flex items-center text-gray-500 text-xs">
                                            <i className="fas fa-chart-line mr-1.5"></i>
                                            <span>热度上升中</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            
            {/* 查看更多按钮 */}
            <div className="mt-4 text-center">
                <Link 
                    href={`/manga/rank/${activeTab}`} 
                    className={`inline-block ${isMobile ? 'text-sm px-3 py-1.5' : 'px-4 py-2'} bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors`}
                >
                    查看完整榜单
                </Link>
            </div>
        </div>
    );
}
