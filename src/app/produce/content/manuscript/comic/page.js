'use client'
import { useState } from 'react'

export default function ComicManuscript() {
    // 状态筛选数据
    const [activeFilter, setActiveFilter] = useState('all')
    const filters = [
        { id: 'all', name: '全部稿件', count: 2 },
        { id: 'reviewing', name: '进行中', count: 0 },
        { id: 'passed', name: '已通过', count: 2 },
        { id: 'rejected', name: '未通过', count: 0 }
    ]

    // 模拟漫画数据
    const comics = [
        {
            id: 1,
            title: '我的游戏冒险',
            category: '日常',
            coverUrl: '/path/to/cover1.jpg',
            pageCount: 12,
            isSerial: true,
            serialNumber: 'EP.1',
            views: 3456,
            likes: 234,
            comments: 45,
            coins: 56,
            favorites: 89,
            shares: 12,
            status: 'passed',
            date: '2024年03月19日 15:30:22'
        },
        {
            id: 2,
            title: '游戏人生：开局一条狗',
            category: '搞笑',
            coverUrl: '/path/to/cover2.jpg',
            pageCount: 8,
            isSerial: true,
            serialNumber: 'EP.5',
            views: 2789,
            likes: 167,
            comments: 34,
            coins: 45,
            favorites: 67,
            shares: 9,
            status: 'passed',
            date: '2024年03月18日 11:15:43'
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-[1200px] mx-auto">
                {/* 状态筛选 */}
                <div className="flex items-center gap-8 mb-6">
                    {filters.map(filter => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`flex items-center gap-2 pb-2 border-b-2 ${
                                activeFilter === filter.id 
                                ? 'border-[#00aeec] text-[#00aeec]' 
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {filter.name}
                            <span className={`text-sm ${
                                activeFilter === filter.id ? 'text-[#00aeec]' : 'text-gray-400'
                            }`}>
                                {filter.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* 排序选项 */}
                <div className="flex justify-end mb-6">
                    <select className="px-4 py-2 border rounded-lg text-sm text-gray-600 bg-white">
                        <option value="time">按照时间排序</option>
                        <option value="views">按照阅读量排序</option>
                        <option value="likes">按照点赞数排序</option>
                        <option value="serial">按照连载顺序排序</option>
                    </select>
                </div>

                {/* 漫画列表 */}
                <div className="space-y-4">
                    {comics.map(comic => (
                        <div key={comic.id} className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex gap-4">
                                {/* 封面图 */}
                                <div className="relative w-48 h-64 bg-gray-200 rounded-lg overflow-hidden">
                                    <div className="absolute top-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                        {comic.serialNumber}
                                    </div>
                                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                        {comic.pageCount} P
                                    </div>
                                </div>

                                {/* 漫画信息 */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-medium">{comic.title}</h3>
                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                            {comic.category}
                                        </span>
                                        {comic.isSerial && (
                                            <span className="px-2 py-0.5 bg-[#00aeec]/10 text-[#00aeec] text-xs rounded">
                                                连载中
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-6 text-sm text-gray-500">
                                        <div className="flex items-center gap-4">
                                            <span>阅读 {comic.views}</span>
                                            <span>点赞 {comic.likes}</span>
                                            <span>评论 {comic.comments}</span>
                                            <span>投币 {comic.coins}</span>
                                            <span>收藏 {comic.favorites}</span>
                                            <span>分享 {comic.shares}</span>
                                        </div>
                                        <span>{comic.date}</span>
                                    </div>
                                </div>

                                {/* 操作按钮 */}
                                <div className="flex items-start gap-2">
                                    <button className="px-3 py-1 text-sm text-[#00aeec] hover:bg-[#00aeec]/5 rounded">
                                        编辑
                                    </button>
                                    <button className="px-3 py-1 text-sm text-[#00aeec] hover:bg-[#00aeec]/5 rounded">
                                        数据
                                    </button>
                                    <button className="px-3 py-1 text-sm text-[#00aeec] hover:bg-[#00aeec]/5 rounded">
                                        续作
                                    </button>
                                    <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-50 rounded">
                                        ⋮
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 分页 */}
                <div className="flex justify-center items-center gap-2 mt-8">
                    <button className="px-4 py-2 bg-[#00aeec] text-white rounded-lg">
                        1
                    </button>
                    <span className="text-gray-500">共1页，到第</span>
                    <input 
                        type="number" 
                        className="w-16 px-2 py-1 border rounded-lg text-center"
                        placeholder="1"
                    />
                    <span className="text-gray-500">页</span>
                </div>
            </div>
        </div>
    )
}

    
