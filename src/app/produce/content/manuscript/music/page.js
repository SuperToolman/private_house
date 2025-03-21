'use client'
import { useState } from 'react'

export default function MusicManuscript() {
    // 状态筛选数据
    const [activeFilter, setActiveFilter] = useState('all')
    const filters = [
        { id: 'all', name: '全部稿件', count: 2 },
        { id: 'reviewing', name: '进行中', count: 0 },
        { id: 'passed', name: '已通过', count: 2 },
        { id: 'rejected', name: '未通过', count: 0 }
    ]

    // 模拟音乐数据
    const musics = [
        {
            id: 1,
            title: '夏日的游戏时光',
            artist: '小明',
            category: '原创音乐',
            coverUrl: '/path/to/cover1.jpg',
            duration: '03:45',
            format: 'MP3',
            quality: '320kbps',
            isOriginal: true,
            hasLyrics: true,
            views: 5678,
            likes: 456,
            comments: 89,
            coins: 67,
            favorites: 123,
            shares: 34,
            status: 'passed',
            date: '2024年03月19日 16:30:22'
        },
        {
            id: 2,
            title: '游戏战斗曲 - Boss战',
            artist: '小红',
            category: '游戏音乐',
            coverUrl: '/path/to/cover2.jpg',
            duration: '04:12',
            format: 'FLAC',
            quality: '无损',
            isOriginal: true,
            hasLyrics: false,
            views: 3456,
            likes: 234,
            comments: 45,
            coins: 56,
            favorites: 89,
            shares: 23,
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
                        <option value="views">按照播放量排序</option>
                        <option value="likes">按照点赞数排序</option>
                        <option value="duration">按照时长排序</option>
                    </select>
                </div>

                {/* 音乐列表 */}
                <div className="space-y-4">
                    {musics.map(music => (
                        <div key={music.id} className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex gap-4">
                                {/* 封面图 */}
                                <div className="relative w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
                                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                        {music.duration}
                                    </div>
                                </div>

                                {/* 音乐信息 */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-medium">{music.title}</h3>
                                        <span className="text-sm text-gray-500">- {music.artist}</span>
                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                            {music.category}
                                        </span>
                                        {music.isOriginal && (
                                            <span className="px-2 py-0.5 bg-[#00aeec]/10 text-[#00aeec] text-xs rounded">
                                                原创
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4 mb-2 text-sm text-gray-500">
                                        <span>格式：{music.format}</span>
                                        <span>音质：{music.quality}</span>
                                        {music.hasLyrics && <span>包含歌词</span>}
                                    </div>
                                    <div className="flex items-center gap-6 text-sm text-gray-500">
                                        <div className="flex items-center gap-4">
                                            <span>播放 {music.views}</span>
                                            <span>点赞 {music.likes}</span>
                                            <span>评论 {music.comments}</span>
                                            <span>投币 {music.coins}</span>
                                            <span>收藏 {music.favorites}</span>
                                            <span>分享 {music.shares}</span>
                                        </div>
                                        <span>{music.date}</span>
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
                                        歌词
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

    
    
