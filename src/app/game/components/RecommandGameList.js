'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function RecommandGameList() {
    const [recommandGameList] = useState([
        {
            id: 1,
            title: '绝区零（PC版）',
            cover: '/images/test_game_cover (1).webp',
            avatar: '/images/test_game_avatar (1).webp',
            rating: 6,
            ratingText: '3万+',
            tags: ['动作', '末路零'],
            isFeatured: true,
            badgeText: 'PC'
        },
        {
            id: 2,
            title: '芯夺世界',
            cover: '/images/test_game_cover (2).webp',
            avatar: '/images/test_game_avatar (2).webp',
            rating: 8,
            ratingText: '卡牌',
            tags: ['巨大怪', '动漫'],
            badge: '黄B网感'
        },
        {
            id: 3,
            title: '永恒阵临：冥穹',
            cover: '/images/test_game_cover (3).webp',
            avatar: '/images/test_game_avatar (3).webp',
            rating: 8.2,
            ratingText: '卡牌',
            tags: ['东西', '原创'],
            badge: '新游榜第9名'
        },
        {
            id: 4,
            title: '三国：谋定天下',
            cover: '/images/test_game_cover (4).webp',
            avatar: '/images/test_game_avatar (4).webp',
            rating: 9,
            ratingText: '策略',
            tags: ['策略', '职业', '三国'],
            badge: '1万人在玩'
        },
        {
            id: 5,
            title: '高达钢弹之诗',
            cover: '/images/test_game_cover (5).webp',
            avatar: '/images/test_game_avatar (5).webp',
            rating: 7.7,
            ratingText: '卡牌',
            tags: ['IP正版授权', '机甲'],
            badge: '黄B网感'
        },
        {
            id: 6,
            title: '命运圣契',
            cover: '/images/test_game_cover (6).webp',
            avatar: '/images/test_game_avatar (6).webp',
            rating: 8.1,
            ratingText: '卡牌',
            tags: ['轻松', '二次元'],
            badge: '黄B网感'
        },
        {
            id: 7,
            title: '潮汐守望者',
            cover: '/images/test_game_cover (7).webp',
            avatar: '/images/test_game_avatar (7).webp',
            rating: 6.1,
            ratingText: '策略',
            tags: ['策略', '卡通'],
            badge: '新游榜第10名'
        },
        {
            id: 8,
            title: '龙族：卡塔尔之门',
            cover: '/images/test_game_cover (8).webp',
            avatar: '/images/test_game_avatar (8).webp',
            rating: 8.6,
            ratingText: '角色扮演',
            tags: ['高颜值', '二次元'],
            badge: '黄B网感'
        },
        {
            id: 9,
            title: '问剑长生',
            cover: '/images/test_game_cover (9).webp',
            avatar: '/images/test_game_avatar (9).webp',
            rating: 5.3,
            ratingText: '文章',
            tags: ['3D', '修仙', '国风', '剧情'],
        },
        {
            id: 10,
            title: '仙剑世界（PC版）',
            cover: '/images/test_game_cover (10).webp',
            avatar: '/images/test_game_avatar (10).webp',
            rating: 6,
            ratingText: '角色扮演',
            tags: ['仙侠', '开放世界'],
            badgeText: 'PC'
        },
        {
            id: 11,
            title: '龙之谷世界',
            cover: '/images/test_game_cover (11).webp',
            avatar: '/images/test_game_avatar (11).webp',
            rating: 8,
            ratingText: 'MMORPG',
            tags: ['策略', '角色扮演'],
        },
        {
            id: 12,
            title: '江湖如梦',
            cover: '/images/test_game_cover (12).webp',
            avatar: '/images/test_game_avatar (12).webp',
            rating: 7,
            ratingText: '卡牌',
            tags: ['策略', '武侠', '角色扮演'],
        }
    ]);

    // 获取标签背景色
    const getTagBgColor = (tag) => {
        const tagColors = {
            '动作': 'bg-blue-500',
            '末路零': 'bg-indigo-500',
            '卡牌': 'bg-red-500',
            '巨大怪': 'bg-amber-600',
            '动漫': 'bg-pink-500',
            '东西': 'bg-purple-500',
            '原创': 'bg-emerald-500',
            '策略': 'bg-blue-600',
            '职业': 'bg-green-500',
            '三国': 'bg-red-600',
            'IP正版授权': 'bg-yellow-600',
            '机甲': 'bg-sky-500',
            '轻松': 'bg-green-400',
            '二次元': 'bg-pink-400',
            '卡通': 'bg-orange-400',
            '高颜值': 'bg-purple-400',
            '3D': 'bg-indigo-600',
            '修仙': 'bg-amber-500',
            '国风': 'bg-red-400',
            '剧情': 'bg-blue-400',
            '仙侠': 'bg-indigo-500',
            '开放世界': 'bg-emerald-600',
            'MMORPG': 'bg-violet-500',
            '角色扮演': 'bg-orange-500',
            '武侠': 'bg-amber-500',
        };
        
        return tagColors[tag] || 'bg-gray-500';
    };

    return (
        <div className="w-[1584px] mx-auto py-8">
            {/* 标题 */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">热门游戏推荐</h2>
                <Link href="/games" className="text-blue-500 text-sm flex items-center">
                    更多
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            {/* 游戏列表 */}
            <div className="grid grid-cols-6 gap-4">
                {recommandGameList.map((game) => (
                    <Link href={`/game/${game.id}`} key={game.id} className="block group">
                        <div className="game-card relative">
                            {/* PC标识 */}
                            {game.badgeText === 'PC' && (
                                <div className="absolute top-2 right-2 bg-white text-black font-medium px-2 py-0.5 rounded text-xs z-10">
                                    PC
                                </div>
                            )}

                            {/* 封面 */}
                            <div className="relative h-[160px] w-full rounded-lg overflow-hidden mb-2">
                                <Image 
                                    src={game.cover}
                                    alt={game.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="180px"
                                />
                                
                                {/* 游戏徽章 */}
                                {game.badge && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                        <div className="flex items-center">
                                            <span className="text-xs text-white font-medium">{game.badge}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* 游戏信息 */}
                            <div className="flex items-start space-x-2">
                                {/* 头像 */}
                                <div className="relative w-10 h-10 flex-shrink-0">
                                    <Image
                                        src={game.avatar}
                                        alt={`${game.title} avatar`}
                                        fill
                                        className="object-cover rounded-md"
                                        sizes="40px"
                                    />
                                </div>
                                
                                {/* 标题和标签 */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-sm mb-1 text-gray-900 line-clamp-1">{game.title}</h3>
                                    
                                    <div className="flex items-center text-sm text-gray-600 mb-1.5">
                                        <span className="flex items-center text-amber-500">
                                            <span className="text-xs mr-1">★</span>
                                            <span>{game.rating}</span>
                                        </span>
                                        <span className="mx-1 text-gray-300">|</span>
                                        <span className="text-xs text-gray-500">{game.ratingText}</span>
                                    </div>
                                    
                                    {/* 标签 */}
                                    <div className="flex flex-wrap gap-1">
                                        {game.tags.map((tag, index) => (
                                            <span 
                                                key={index} 
                                                className={`text-xs py-0.5 px-1.5 rounded text-white ${getTagBgColor(tag)}`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
