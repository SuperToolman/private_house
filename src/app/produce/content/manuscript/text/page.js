'use client'
import { useState } from 'react'

export default function TextManuscript() {
    // 状态筛选数据
    const [activeFilter, setActiveFilter] = useState('all')
    const filters = [
        { id: 'all', name: '全部稿件', count: 2 },
        { id: 'reviewing', name: '进行中', count: 0 },
        { id: 'passed', name: '已通过', count: 2 },
        { id: 'rejected', name: '未通过', count: 0 }
    ]

    // 模拟文章数据
    const articles = [
        {
            id: 1,
            title: '如何提高游戏技巧：从入门到精通',
            category: '游戏攻略',
            coverUrl: '/path/to/cover1.jpg',
            wordCount: 3500,
            views: 1256,
            likes: 89,
            comments: 23,
            coins: 12,
            favorites: 45,
            shares: 8,
            status: 'passed',
            date: '2024年03月19日 14:30:22'
        },
        {
            id: 2,
            title: '2024年最值得期待的游戏大作盘点',
            category: '游戏资讯',
            coverUrl: '/path/to/cover2.jpg',
            wordCount: 2800,
            views: 2341,
            likes: 156,
            comments: 45,
            coins: 34,
            favorites: 78,
            shares: 15,
            status: 'passed',
            date: '2024年03月18日 10:15:43'
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
                    </select>
                </div>

                {/* 文章列表 */}
                <div className="space-y-4">
                    {articles.map(article => (
                        <div key={article.id} className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex gap-4">
                                {/* 封面图 */}
                                <div className="relative w-48 h-32 bg-gray-200 rounded-lg overflow-hidden">
                                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                                        {article.wordCount} 字
                                    </div>
                                </div>

                                {/* 文章信息 */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-medium">{article.title}</h3>
                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                            {article.category}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-6 text-sm text-gray-500">
                                        <div className="flex items-center gap-4">
                                            <span>阅读 {article.views}</span>
                                            <span>点赞 {article.likes}</span>
                                            <span>评论 {article.comments}</span>
                                            <span>投币 {article.coins}</span>
                                            <span>收藏 {article.favorites}</span>
                                            <span>分享 {article.shares}</span>
                                        </div>
                                        <span>{article.date}</span>
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

