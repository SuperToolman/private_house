'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function GameRankList({title="热门游戏榜", iconName, backgroundColor, isMobile}) {
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

    // 计算排名Badge样式
    const getRankBadgeStyle = (rank) => {
        switch(rank) {
            case 1: return 'bg-amber-500 text-white';
            case 2: return 'bg-gray-300 text-gray-800';
            case 3: return 'bg-amber-700 text-white';
            default: return 'bg-gray-100 text-gray-500';
        }
    };

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
            '二次元': 'text-pink-600'
        };
        
        return tagColors[tag] || 'text-gray-600';
    };

    // 移动端显示较少的游戏
    const visibleGames = isMobile ? gameRankList.slice(0, 3) : gameRankList;

    return (
        <div className={`game-rank-list rounded-lg bg-gray-50 p-4 ${isMobile ? 'mt-4' : 'mt-8'}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold flex items-center`}>
                    {iconName && <i className={`iconfont icon-${iconName} mr-1 ${backgroundColor || 'text-blue-500'}`}></i>}
                    {title}
                </h3>
                <Link href="/game/rank" className="text-blue-500 text-sm flex items-center">
                    更多
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
            
            <div className="space-y-3">
                {visibleGames.map((game) => (
                    <Link href={`/game/${game.id}`} key={game.id} className="block">
                        <div className={`flex items-center bg-white rounded-lg ${isMobile ? 'p-2' : 'p-3'} hover:shadow-md transition-shadow`}>
                            {/* 排名 */}
                            <div className={`flex-shrink-0 ${isMobile ? 'w-6 h-6 text-base' : 'w-8 h-8 text-lg'} rounded-full ${getRankBadgeStyle(game.rank)} flex items-center justify-center font-bold mr-2`}>
                                {game.rank}
                            </div>
                            
                            {/* 游戏封面 */}
                            <div className={`relative ${isMobile ? 'w-10 h-10' : 'w-12 h-12'} flex-shrink-0 mr-3`}>
                                <Image
                                    src={game.cover}
                                    alt={game.title}
                                    fill
                                    className="object-cover rounded-lg"
                                    sizes={isMobile ? '40px' : '48px'}
                                />
                                {game.badge && (
                                    <div className="absolute -top-1 -left-1 bg-pink-500 text-white text-[10px] px-1 rounded">
                                        B
                                    </div>
                                )}
                            </div>
                            
                            {/* 游戏信息 */}
                            <div className="flex-1 min-w-0">
                                <h3 className={`font-medium ${isMobile ? 'text-sm' : 'text-base'} mb-0.5`}>{game.title}</h3>
                                <div className="flex items-center">
                                    <span className="text-amber-500 flex items-center mr-2">
                                        <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} mr-0.5`}>★</span>
                                        <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>{game.rating}</span>
                                    </span>
                                    {/* 移动端只显示一个标签 */}
                                    {game.tags.slice(0, isMobile ? 1 : game.tags.length).map((tag, index) => (
                                        <span key={index} className={`${isMobile ? 'text-[10px]' : 'text-xs'} mr-2 ${getTagTextColor(tag)}`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                {game.desc && !isMobile && (
                                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{game.desc}</p>
                                )}
                            </div>
                            
                            {/* 下载按钮 */}
                            <button className={`flex-shrink-0 ${game.rank <= 3 ? 'bg-pink-500 hover:bg-pink-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} text-white ${isMobile ? 'px-3 py-1 text-xs' : 'px-5 py-1.5 text-sm'} rounded-md font-medium transition-colors ml-2`}>
                                下载
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
