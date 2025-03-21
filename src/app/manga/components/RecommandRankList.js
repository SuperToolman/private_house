import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function RecommandRankList() {
    const [activeTab, setActiveTab] = useState('日漫榜');
    
    // 排行榜数据
    const rankData = {
        '日漫榜': [
            {
                id: 1,
                rank: 1,
                title: '金牌得主',
                image: '/images/test_manga_cover (1).webp',
                tags: ['运动', '日常']
            },
            {
                id: 2,
                rank: 2,
                title: '间谍过家家',
                image: '/images/test_manga_cover (2).webp',
                tags: ['智商在线', '异能']
            },
            {
                id: 3,
                rank: 3,
                title: '咒术回战 (当咲当)',
                image: '/images/test_manga_cover (3).webp',
                tags: ['战斗', '热血']
            },
            {
                id: 4,
                rank: 4,
                title: '香格里拉边境-举作猎人与青鸟的诅咒',
                image: '/images/test_manga_cover (4).webp',
                tags: ['战斗', '学生']
            },
            {
                id: 5,
                rank: 5,
                title: '坂本日常',
                image: '/images/test_manga_cover (1).webp',
                tags: ['搞笑', '日常']
            },
            {
                id: 6,
                rank: 6,
                title: '入间同学入魔了！',
                image: '/images/test_manga_cover (2).webp',
                tags: ['温馨', '冒险']
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
    const getTagBgColor = (tag, index) => {
        const tagColors = {
            '运动': 'bg-blue-500',
            '日常': 'bg-blue-400',
            '智商在线': 'bg-indigo-500',
            '异能': 'bg-indigo-400',
            '战斗': 'bg-red-500',
            '热血': 'bg-red-400',
            '学生': 'bg-indigo-500',
            '搞笑': 'bg-green-500',
            '温馨': 'bg-amber-500',
            '冒险': 'bg-blue-500',
            '玄幻': 'bg-purple-500',
            '武侠': 'bg-orange-500',
            '历史': 'bg-amber-600',
            '悬疑': 'bg-yellow-600',
            '奇幻': 'bg-indigo-500',
            '科幻': 'bg-cyan-500',
            '恋爱': 'bg-pink-500',
            '古风': 'bg-yellow-800',
            '校园': 'bg-green-600',
            '爱情': 'bg-rose-500',
            '生活': 'bg-emerald-500',
            '游戏': 'bg-blue-600',
            '竞技': 'bg-orange-600'
        };
        
        return tagColors[tag] || (index === 0 ? 'bg-blue-500' : 'bg-purple-500');
    };

    // 排名数字对应的背景色
    const getRankColor = (rank) => {
        switch(rank) {
            case 1: return 'bg-gradient-to-br from-yellow-300 to-yellow-600';
            case 2: return 'bg-gradient-to-br from-gray-300 to-gray-500';
            case 3: return 'bg-gradient-to-br from-amber-600 to-amber-800';
            default: return 'bg-gray-100 text-gray-500';
        }
    };

    // 排名数字对应的文字颜色
    const getRankTextColor = (rank) => {
        return rank <= 3 ? 'text-white' : 'text-gray-700';
    };

    // 切换标签处理函数
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="w-[1160px] mx-auto py-6">
            <div className="flex items-baseline mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mr-10">高能排行</h2>
                
                {/* 标签切换 */}
                <div className="flex items-center space-x-8">
                    {Object.keys(rankData).map((tab) => (
                        <button
                            key={tab}
                            className={`text-base pb-1 ${
                                activeTab === tab 
                                    ? 'font-semibold text-gray-800 border-b-2 border-gray-800' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => handleTabChange(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                
                <div className="ml-auto">
                    <Link href="/ranking" className="text-blue-500 text-sm flex items-center">
                        更多
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
            
            {/* 排行榜内容 */}
            <div className="grid grid-cols-6 gap-4">
                {rankData[activeTab].map((manga) => (
                    <Link href={`/manga/${manga.id}`} key={manga.id} className="block">
                        <div className="manga-rank-card relative">
                            {/* 排名数字 */}
                            <div className={`absolute left-4 top-4 w-10 h-12 flex items-center justify-center text-2xl font-bold ${getRankColor(manga.rank)} ${getRankTextColor(manga.rank)} z-10`}>
                                {manga.rank}
                            </div>
                            
                            {/* 漫画封面 */}
                            <div className="relative h-[200px] w-full rounded-lg overflow-hidden mb-2">
                                <Image 
                                    src={manga.image}
                                    alt={manga.title}
                                    fill
                                    className="object-cover"
                                    sizes="180px"
                                />
                            </div>
                            
                            {/* 标题 */}
                            <h3 className="font-medium text-sm mb-1.5 line-clamp-1">{manga.title}</h3>
                            
                            {/* 标签 */}
                            <div className="flex gap-1 flex-wrap">
                                {manga.tags.map((tag, index) => (
                                    <span 
                                        key={index} 
                                        className={`text-xs py-0.5 px-1.5 rounded text-white ${getTagBgColor(tag, index)}`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
