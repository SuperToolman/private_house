'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function GameRankList({title="热门游戏榜",iconName,backgroundColor}) {
    const [gameRankList] = useState([
        {
            id: 1,
            rank: 1,
            title: '明日方舟',
            cover: '/images/test_game_avatar (1).webp',
            rating: 7.4,
            tags: ['策略', '架空文明', '末世'],
            desc: '故事集「我们明日见」现已开启',
            badge: '黄B网感'
        },
        {
            id: 2,
            rank: 2,
            title: '龙息：神寂',
            cover: '/images/test_game_avatar (2).webp',
            rating: 8.8,
            tags: ['卡牌', '大世界RPG', '西幻'],
            desc: '全新超自由大世界屠龙冒险RPG'
        },
        {
            id: 3,
            rank: 3,
            title: '鸣潮',
            cover: '/images/test_game_avatar (3).webp',
            rating: 6.7,
            tags: ['角色扮演', '开放世界', '二次元'],
            desc: '黄B网感 鸣潮往复 文明不屈',
            badge: '黄B网感'
        },
        {
            id: 4,
            rank: 4,
            title: '命运-冠位指定（Fate/GO）',
            cover: '/images/test_game_avatar (4).webp',
            rating: 8.2,
            tags: ['角色扮演', '二次元']
        },
        {
            id: 5,
            rank: 5,
            title: '原神',
            cover: '/images/test_game_avatar (5).webp',
            rating: 8.9,
            tags: ['开放世界', '角色扮演']
        },
        {
            id: 6,
            rank: 6,
            title: '萌环：冒险铁道',
            cover: '/images/test_game_avatar (6).webp',
            rating: 7.8,
            tags: ['二次元', '角色扮演']
        },
        {
            id: 7,
            rank: 7,
            title: '碧蓝航线',
            cover: '/images/test_game_avatar (7).webp',
            rating: 7.5,
            tags: ['二次元', '射击']
        },
        {
            id: 8,
            rank: 8,
            title: 'BanG Dream!',
            cover: '/images/test_game_avatar (8).webp',
            rating: 7.6,
            tags: ['音乐', '二次元']
        },
        {
            id: 9,
            rank: 9,
            title: '碧蓝档案',
            cover: '/images/test_game_avatar (9).webp',
            rating: 7.7,
            tags: ['角色扮演', '二次元']
        },
        {
            id: 10,
            rank: 10,
            title: '王者荣耀',
            cover: '/images/test_game_avatar (10).webp',
            rating: 7.3,
            tags: ['竞技', 'MOBA']
        }
    ]);

    // 获取标签文字颜色
    const getTagTextColor = (tag) => {
        const tagColors = {
            '策略': 'text-blue-600',
            '架空文明': 'text-purple-600',
            '末世': 'text-red-600',
            '卡牌': 'text-amber-600',
            '大世界RPG': 'text-green-600',
            '西幻': 'text-indigo-600',
            '角色扮演': 'text-orange-600',
            '开放世界': 'text-cyan-600',
            '二次元': 'text-pink-600',
            '音乐': 'text-violet-600',
            '射击': 'text-red-500',
            '竞技': 'text-blue-500',
            'MOBA': 'text-purple-500',
        };
        
        return tagColors[tag] || 'text-gray-600';
    };

    // 获取排名数字的背景色
    const getRankBadgeStyle = (rank) => {
        if (rank === 1) return "bg-orange-500 text-white";
        if (rank === 2) return "bg-gray-300 text-white";
        if (rank === 3) return "bg-amber-700 text-white";
        return "text-gray-500";
    };

    return (
        <div className="">
            <div className="bg-orange-50 rounded-lg p-4">
                {/* 标题栏 */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-orange-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {title}
                    </h2>
                    <Link href="/game/ranking" className="text-gray-500 text-sm hover:text-gray-700 flex items-center">
                        查看更多
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* 游戏排行列表 */}
                <div className="space-y-3">
                    {gameRankList.map((game) => (
                        <Link href={`/game/${game.id}`} key={game.id} className="block">
                            <div className="flex items-center bg-white rounded-lg p-3 hover:shadow-md transition-shadow">
                                {/* 排名 */}
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full ${getRankBadgeStyle(game.rank)} flex items-center justify-center font-bold text-lg mr-3`}>
                                    {game.rank}
                                </div>
                                
                                {/* 游戏封面 */}
                                <div className="relative w-12 h-12 flex-shrink-0 mr-3">
                                    <Image
                                        src={game.cover}
                                        alt={game.title}
                                        fill
                                        className="object-cover rounded-lg"
                                        sizes="48px"
                                    />
                                    {game.badge && (
                                        <div className="absolute -top-1 -left-1 bg-pink-500 text-white text-[10px] px-1 rounded">
                                            B
                                        </div>
                                    )}
                                </div>
                                
                                {/* 游戏信息 */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-base mb-0.5">{game.title}</h3>
                                    <div className="flex items-center">
                                        <span className="text-amber-500 flex items-center mr-2">
                                            <span className="text-xs mr-1">★</span>
                                            <span className="text-sm">{game.rating}</span>
                                        </span>
                                        {game.tags.map((tag, index) => (
                                            <span key={index} className={`text-xs mr-2 ${getTagTextColor(tag)}`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    {game.desc && (
                                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{game.desc}</p>
                                    )}
                                </div>
                                
                                {/* 下载按钮 */}
                                <button className={`flex-shrink-0 ${game.rank <= 3 ? 'bg-pink-500 hover:bg-pink-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} text-white px-5 py-1.5 rounded-md text-sm font-medium transition-colors ml-3`}>
                                    下载
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
