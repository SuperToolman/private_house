'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function GameCard({ game }) {
    // 默认游戏数据，当没有传入游戏数据时使用
    const defaultGame = {
        id: 1,
        title: '新月同行',
        cover: '/images/test_game_cover (1).webp',
        avatar: '/images/test_game_avatar (1).webp',
        rating: 8.3,
        tags: ['角色扮演', '策略', '都市', '横版探索', '二次元', '回合制'],
        desc: '总有人要来承担这疯狂世界，我们一起去吧。',
        longDesc: '简介：姐长，欢迎回到现在。现实流失及没前度稳定吗？没关系，再休息一下，我来帮您回忆吧。警察 我们是从魔超级管理局的特战小组：我们站在收管混乱、恐江、怪诞超级的一线；我们以刀锋为名，自称——暂力栈。现在 我们被派往为数不...',
        announcement: '公告：总有人要来承担这疯狂世界，我们一起去吧。',
        screenshots: [
            '/images/test_game_cover (1).webp',
            '/images/test_game_cover (2).webp',
            '/images/test_game_cover (3).webp',
            '/images/test_game_cover (4).webp',
            '/images/test_game_cover (5).webp'
        ]
    };

    // 使用传入的游戏数据或默认数据
    const gameData = game || defaultGame;

    // 获取标签文字颜色
    const getTagTextColor = (tag) => {
        const tagColors = {
            '动作': 'text-blue-600',
            '末路零': 'text-gray-600',
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
            '都市': 'text-teal-600',
            '横版探索': 'text-indigo-500',
            '回合制': 'text-violet-500'
        };
        
        return tagColors[tag] || 'text-gray-600';
    };

    return (
        <div className="w-full h-[285px] flex rounded-lg overflow-hidden">
            {/* 左侧游戏封面 - 改为更大的长方形 */}
            <div className="w-[507px] relative flex-shrink-0 bg-black rounded-lg overflow-hidden">
                <Image 
                    src={gameData.cover}
                    alt={gameData.title}
                    fill
                    className="object-cover w-full h-full"
                    sizes="320px"
                />
                {/* B标识徽章 */}
                {gameData.badge && (
                    <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-1.5 py-0.5 rounded-sm">
                        B
                    </div>
                )}
            </div>
            
            {/* 右侧游戏详情 */}
            <div className="flex-1 pl-5 pr-3 py-3 bg-[#f6f7f8] shadow-lg">
                <div className="flex justify-between items-start">
                    <div className="flex items-start">
                        {/* 游戏头像 - 增大尺寸 */}
                        <div className="relative w-14 h-14 mr-3 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image
                                src={gameData.avatar}
                                alt={`${gameData.title} avatar`}
                                fill
                                className="object-cover"
                                sizes="56px"
                            />
                            {/* 徽章在头像上 */}
                            {gameData.badge && (
                                <div className="absolute top-0 left-0 bg-pink-500 text-white text-xs px-1 py-px">
                                    B
                                </div>
                            )}
                        </div>
                        
                        <div>
                            {/* 游戏标题 - 增大字体 */}
                            <h3 className="font-medium text-lg">{gameData.title}</h3>
                            
                            {/* 评分和标签 */}
                            <div className="flex items-center flex-wrap text-sm mt-1">
                                <div className="flex items-center flex-wrap">
                                    {/* 评分星星 */}
                                    <span className="text-amber-500 mr-2 flex items-center">
                                        <span className="text-lg">★</span>
                                        <span className="ml-0.5">{gameData.rating}</span>
                                    </span>
                                    
                                    {/* 标签用中点分隔 */}
                                    {gameData.tags && gameData.tags.map((tag, index) => (
                                        <span key={index} className={`${getTagTextColor(tag)}`}>
                                            {tag}
                                            {index < gameData.tags.length - 1 ? <span className="mx-1 text-gray-400">·</span> : ''}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* 右侧按钮 - 调整大小 */}
                    <div className="flex gap-2">
                        <button className="bg-gray-100 text-gray-700 h-9 w-9 rounded-md flex items-center justify-center border border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                        </button>
                        <button className="bg-pink-500 text-white px-5 py-2 rounded-md flex items-center justify-center text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            安卓下载
                        </button>
                    </div>
                </div>
                
                {/* 徽章和描述 */}
                <div className="mt-3">
                    {/* B网标识文字版 */}
                    {gameData.badge && (
                        <div className="inline-block bg-pink-100 text-pink-500 text-xs px-2 py-0.5 rounded-sm mb-2">
                            {gameData.badge}
                        </div>
                    )}
                    
                    {/* 游戏短描述 */}
                    {gameData.desc && (
                        <p className="text-sm text-gray-700">{gameData.desc}</p>
                    )}
                    
                    {/* 游戏长描述 */}
                    {gameData.longDesc && (
                        <p className="text-xs text-gray-500 mt-2 line-clamp-2">{gameData.longDesc}</p>
                    )}
                </div>
                
                {/* 公告 */}
                {gameData.announcement && (
                    <div className="mt-3 flex items-start">
                        <span className="text-red-500 flex-shrink-0 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <p className="text-xs text-gray-600 ml-1.5">{gameData.announcement}</p>
                    </div>
                )}
                
                {/* 游戏截图预览 */}
                {gameData.screenshots && gameData.screenshots.length > 0 && (
                    <div className="mt-3 flex gap-2 overflow-x-auto">
                        {gameData.screenshots.map((screenshot, index) => (
                            <div key={index} className="w-[150px] h-[90px] relative flex-shrink-0 rounded overflow-hidden">
                                <Image
                                    src={screenshot}
                                    alt={`${gameData.title} screenshot ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="150px"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
