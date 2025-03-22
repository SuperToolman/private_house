import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useResponsive } from '../../contexts/ResponsiveContext';

export default function RecommandRowList() {
    const { isMobile, isTablet } = useResponsive();
    const [currentPage, setCurrentPage] = useState(0);
    
    // 更新漫画数据以匹配图片
    const mangaData = [
        [
            { 
                id: 1, 
                title: '碧蓝之海', 
                image: '/images/test_manga_cover (1).webp', 
                tags: ['冒险', '奇幻'],
                hotCount: 247 
            },
            { 
                id: 2, 
                title: '女神家的慕琴',
                image: '/images/test_manga_cover (2).webp', 
                tags: ['穿越', '恋爱'],
                hotCount: 183 
            },
            { 
                id: 3, 
                title: '夏衣·伊人·梦河', 
                image: '/images/test_manga_cover (3).webp', 
                tags: ['恋爱', '修罗场'],
                hotCount: 145 
            },
            { 
                id: 4, 
                title: '男女恋爱的我们', 
                image: '/images/test_manga_cover (4).webp', 
                tags: ['战斗', '学生'],
                hotCount: 132 
            },
            { 
                id: 5, 
                title: '私奔女友的秘密', 
                image: '/images/test_manga_cover (1).webp', 
                tags: ['推理', '热血'],
                hotCount: 125 
            }
        ],
        [
            { 
                id: 6, 
                title: '咒术回战', 
                image: '/images/test_manga_cover (2).webp', 
                tags: ['奇幻', '战斗'],
                hotCount: 156 
            },
            { 
                id: 7, 
                title: '间谍过家家', 
                image: '/images/test_manga_cover (3).webp', 
                tags: ['喜剧', '冒险'],
                hotCount: 85 
            },
            { 
                id: 8, 
                title: '海贼王', 
                image: '/images/test_manga_cover (4).webp', 
                tags: ['冒险', '热血'],
                hotCount: 132 
            },
            { 
                id: 9, 
                title: '进击的巨人', 
                image: '/images/test_manga_cover (1).webp', 
                tags: ['悬疑', '战斗'],
                hotCount: 78 
            },
            { 
                id: 10, 
                title: '鬼灭之刃', 
                image: '/images/test_manga_cover (2).webp', 
                tags: ['战斗', '历史'],
                hotCount: 113 
            }
        ]
    ];

    // 获取标签背景色
    const getTagBgColor = (tag) => {
        const tagColors = {
            '冒险': 'bg-blue-500',
            '奇幻': 'bg-indigo-500',
            '穿越': 'bg-purple-500',
            '恋爱天': 'bg-pink-500',
            '恋爱': 'bg-rose-500',
            '修罗场': 'bg-violet-500',
            '战斗': 'bg-red-500',
            '学生': 'bg-indigo-500',
            '推理': 'bg-teal-500',
            '热血': 'bg-orange-500',
            '喜剧': 'bg-green-500',
            '悬疑': 'bg-yellow-600',
            '历史': 'bg-blue-600'
        };
        
        return tagColors[tag] || 'bg-gray-500';
    };

    // 翻页处理函数
    const handlePrevPage = () => {
        setCurrentPage(0);
    };

    const handleNextPage = () => {
        setCurrentPage(1);
    };

    // 根据设备类型计算要展示的漫画数量
    const displayCount = isMobile ? 3 : isTablet ? 4 : 5;
    const currentPageData = mangaData[currentPage].slice(0, displayCount);

    return (
        <div className={`mt-6 ${isMobile ? 'mb-4' : 'mb-8'}`}>
            <div className="flex flex-wrap">
                {currentPageData.map((manga, index) => (
                    <div 
                        key={manga.id} 
                        className={`
                            ${isMobile 
                                ? 'w-1/3 px-1 mb-3' 
                                : isTablet 
                                    ? 'w-1/4 px-2 mb-4' 
                                    : 'w-1/5 px-2 mb-4'
                            }
                        `}
                    >
                        <div className="bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
                            <Link href={`/manga/${manga.id}`} className="block">
                                {/* 漫画封面 */}
                                <div className={`relative ${isMobile ? 'h-40' : 'h-52'} overflow-hidden`}>
                                    <Image
                                        src={manga.image}
                                        alt={manga.title}
                                        fill
                                        className="object-cover transition-transform duration-500 hover:scale-105"
                                        sizes={isMobile ? '33vw' : isTablet ? '25vw' : '20vw'}
                                    />
                                </div>
                                
                                {/* 漫画信息 */}
                                <div className={`p-2 ${isMobile ? 'pt-1' : 'pt-3'}`}>
                                    <h3 className={`text-gray-800 line-clamp-1 font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
                                        {manga.title}
                                    </h3>
                                    
                                    {/* 标签 */}
                                    <div className={`flex mt-1 ${isMobile ? 'space-x-1' : 'space-x-2'}`}>
                                        {manga.tags.map((tag, tagIndex) => (
                                            <span 
                                                key={tagIndex} 
                                                className={`${getTagBgColor(tag)} text-white rounded-sm ${isMobile ? 'px-1 text-[8px]' : 'px-1.5 py-0.5 text-xs'}`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    {/* 热度 */}
                                    <div className={`flex items-center mt-1 text-gray-500 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
                                        <i className="fas fa-fire text-orange-500 mr-1"></i>
                                        <span>{manga.hotCount}热度</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* 分页按钮 */}
            <div className={`flex justify-center mt-4 ${isMobile ? 'space-x-3' : 'space-x-4'}`}>
                <button 
                    onClick={handlePrevPage}
                    className={`
                        ${currentPage === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} 
                        text-white ${isMobile ? 'px-3 py-1 text-xs' : 'px-4 py-2'} rounded-md transition-colors
                    `}
                    disabled={currentPage === 0}
                >
                    上一页
                </button>
                
                <button 
                    onClick={handleNextPage}
                    className={`
                        ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} 
                        text-white ${isMobile ? 'px-3 py-1 text-xs' : 'px-4 py-2'} rounded-md transition-colors
                    `}
                    disabled={currentPage === 1}
                >
                    下一页
                </button>
            </div>
        </div>
    );
}