'use client'
import { useState } from 'react'

export default function Manuscript() {
    // 状态筛选数据
    const [activeFilter, setActiveFilter] = useState('all')
    const filters = [
        { id: 'all', name: '全部稿件', count: 2 },
        { id: 'reviewing', name: '进行中', count: 0 },
        { id: 'passed', name: '已通过', count: 2 },
        { id: 'rejected', name: '未通过', count: 0 }
    ]

    // 模拟视频数据
    const videos = [
        {
            id: 1,
            title: '日常五杀',
            thumbnail: '/path/to/thumbnail1.jpg',
            duration: '00:52',
            views: 111,
            likes: 1,
            comments: 0,
            coins: 0,
            favorites: 0,
            shares: 1,
            status: 'passed',
            date: '2024年04月04日 02:06:32'
        },
        {
            id: 2,
            title: '20230924-011409--0KillStreakAchv-b9c2',
            thumbnail: '/path/to/thumbnail2.jpg',
            duration: '00:31',
            views: 123,
            likes: 3,
            comments: 0,
            coins: 0,
            favorites: 0,
            shares: 0,
            status: 'passed',
            date: '2023年09月28日 20:45:11'
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
                        <option value="views">按照播放量排序</option>
                        <option value="likes">按照点赞数排序</option>
                    </select>
                </div>

                {/* 视频列表 */}
                <div className="space-y-4">
                    {videos.map(video => (
                        <div key={video.id} className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex gap-4">
                                {/* 缩略图 */}
                                <div className="relative w-48 h-28 bg-gray-200 rounded-lg overflow-hidden">
                                    <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                                        {video.duration}
                                    </span>
                                </div>

                                {/* 视频信息 */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-medium mb-2">{video.title}</h3>
                                    <div className="flex items-center gap-6 text-sm text-gray-500">
                                        <div className="flex items-center gap-4">
                                            <span>播放 {video.views}</span>
                                            <span>点赞 {video.likes}</span>
                                            <span>评论 {video.comments}</span>
                                            <span>投币 {video.coins}</span>
                                            <span>收藏 {video.favorites}</span>
                                            <span>分享 {video.shares}</span>
                                        </div>
                                        <span>{video.date}</span>
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
    
