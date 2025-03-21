'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function AnimeRankList() {
    const [hoveredIndex, setHoveredIndex] = useState(null)

    const rankList = [
        {
            id: 1,
            title: '我独自升级 第二季',
            subtitle: '暗影君主再临!',
            image: '/images/slides1.jpg',
            score: '9.7',
            link: '/anime/1'
        },
        {
            id: 2,
            title: '坂本日常',
            subtitle: '这个亲手不大喜',
            image: '/images/slides2.jpg',
            score: '8.7',
            link: '/anime/2'
        },
        {
            id: 3,
            title: '恋乐人偶',
            subtitle: 'MyGO送给故事',
            image: '/images/slides3.jpg',
            score: '6.3',
            link: '/anime/3'
        },
        {
            id: 4,
            title: 'Dr. STONE 石纪元',
            subtitle: '穿越百夜，仰望千空',
            image: '/images/slides4.jpg',
            score: '9.9',
            link: '/anime/4'
        },
        {
            id: 5,
            title: '金牌得主',
            subtitle: '教练，我想学滑冰!',
            image: '/images/slides5.jpg',
            score: '9.9',
            link: '/anime/5'
        },
        {
            id: 6,
            title: '香格里拉边境 第二季',
            subtitle: '操作狂打穿最全游戏',
            image: '/images/slides6.jpg',
            score: '9.4',
            link: '/anime/6'
        }
    ]

    return (
        <div className="h-[1900px]">
            {/* 标题栏 */}
            <div className="flex items-center gap-2 mb-4">
                <div className="text-[#ff6b35] text-2xl">🔥</div>
                <div className="text-black text-xl font-medium">番剧热播榜</div>
                <div className="flex-grow"></div>
                <Link href="/rank/all" className="text-black/60 hover:text-black text-sm">
                    查看全部 {'>'}
                </Link>
            </div>

            {/* 列表内容 */}
            <div className="h-[327px] w-full overflow-hidden">
                <div className='flex items-center justify-center h-full w-full'>
                    {rankList.map((item, index) => (
                        <div
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            key={item.id}
                            className={`relative h-full mr-[15px] last:mr-0 transition-all duration-300 ease-in-out ${hoveredIndex === index ? 'flex-grow-[2.5]' : 'flex-grow-[1]'}`}
                            style={{ flexBasis: '0%' }}
                        >
                            <Image 
                                src={item.image} 
                                alt={item.title} 
                                fill
                                className="object-cover rounded-lg"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-white/80 p-2 rounded-b-lg">
                                <div className="flex justify-between items-center">
                                    <div className="text-lg font-bold text-black">{index + 1}</div>
                                    <div className="text-sm text-black">{item.score}</div>
                                </div>
                                <div className="text-sm text-black font-medium truncate">{item.title}</div>
                                <div className="text-xs text-gray-600 truncate">{item.subtitle}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
} 