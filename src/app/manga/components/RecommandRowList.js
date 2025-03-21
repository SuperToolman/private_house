import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function RecommandRowList() {
    const [currentPage, setCurrentPage] = useState(0);
    
    // 更新漫画数据以匹配图片
    const mangaData = [
        [
            { 
                id: 1, 
                title: '入间同学入魔了！', 
                image: '/images/test_manga_cover (1).webp', 
                tags: ['冒险', '奇幻'],
                hotCount: 112 
            },
            { 
                id: 2, 
                title: '反派师尊的我带着徒弟们翻身了', 
                image: '/images/test_manga_cover (2).webp', 
                tags: ['穿越', '恋爱天'],
                hotCount: 65 
            },
            { 
                id: 3, 
                title: '香格里拉边境~举作猎人与青鸟的诅咒~', 
                image: '/images/test_manga_cover (3).webp', 
                tags: ['战斗', '学生'],
                hotCount: 92 
            },
            { 
                id: 4, 
                title: '我的假女友正全力防御她的百合FLAG', 
                image: '/images/test_manga_cover (4).webp', 
                tags: ['恋爱', '修罗场'],
                hotCount: 44 
            },
            { 
                id: 5, 
                title: '金田一少年事件簿', 
                image: '/images/test_manga_cover (1).webp', 
                tags: ['推理', '学生'],
                hotCount: 38 
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

    return (
        <div className="w-[1160px] mx-auto py-6">
            {/* 漫画列表容器 */}
            <div className="relative">
                {/* 漫画卡片列表 */}
                <div className="flex justify-between overflow-hidden transition-all duration-300 ease-in-out">
                    {mangaData[currentPage].map((manga) => (
                        <Link href={`/manga/${manga.id}`} key={manga.id} className="block">
                            <div className="manga-card w-[210px] rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
                                <div className="relative h-[280px] w-full">
                                    <Image 
                                        src={manga.image}
                                        alt={manga.title}
                                        fill
                                        className="object-cover"
                                        sizes="210px"
                                    />
                                    {/* 标签显示 */}
                                    <div className="absolute left-2 top-2 flex gap-1 flex-wrap">
                                        {manga.tags.map((tag, index) => (
                                            <span 
                                                key={index} 
                                                className={`text-xs py-0.5 px-2 rounded text-white ${getTagBgColor(tag)}`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="px-2 py-3 bg-white">
                                    <h3 className="font-medium text-sm mb-1.5 line-clamp-1 text-gray-800">{manga.title}</h3>
                                    <div className="flex items-center text-xs text-orange-500">
                                        <span className="mr-1">{manga.hotCount}</span>
                                        <span>人热议中</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                
                {/* 左箭头 - 仅在第二页显示 */}
                {currentPage === 1 && (
                    <button 
                        onClick={handlePrevPage}
                        className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 border border-gray-200"
                        aria-label="上一页"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}
                
                {/* 右箭头 - 仅在第一页显示 */}
                {currentPage === 0 && (
                    <button 
                        onClick={handleNextPage}
                        className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 border border-gray-200"
                        aria-label="下一页"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
            </div>
            
            {/* 页码指示器 */}
            <div className="flex justify-center mt-4 gap-2">
                <button 
                    className={`w-2 h-2 rounded-full ${currentPage === 0 ? 'bg-blue-600' : 'bg-gray-300'}`}
                    onClick={handlePrevPage}
                    aria-label="第一页"
                ></button>
                <button 
                    className={`w-2 h-2 rounded-full ${currentPage === 1 ? 'bg-blue-600' : 'bg-gray-300'}`}
                    onClick={handleNextPage}
                    aria-label="第二页"
                ></button>
            </div>
        </div>
    );
}