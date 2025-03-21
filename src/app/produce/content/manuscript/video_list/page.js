'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function VideoList() {
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [collections, setCollections] = useState([
        {
            id: 1,
            title: '游戏精彩时刻',
            description: '收录各种游戏精彩操作和有趣瞬间',
            coverUrl: '/path/to/cover1.jpg',
            videoCount: 5,
            totalViews: 2345,
            updateTime: '2024-03-19'
        },
        {
            id: 2,
            title: '日常记录',
            description: '记录生活中的点点滴滴',
            coverUrl: '/path/to/cover2.jpg',
            videoCount: 3,
            totalViews: 1234,
            updateTime: '2024-03-18'
        }
    ])

    // 创建新集合
    const [newCollection, setNewCollection] = useState({
        title: '',
        description: ''
    })

    const handleCreate = () => {
        if (!newCollection.title.trim()) {
            alert('请输入集合标题')
            return
        }

        const collection = {
            id: collections.length + 1,
            ...newCollection,
            coverUrl: '/path/to/default-cover.jpg',
            videoCount: 0,
            totalViews: 0,
            updateTime: new Date().toISOString().split('T')[0]
        }

        setCollections([...collections, collection])
        setNewCollection({ title: '', description: '' })
        setShowCreateModal(false)
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-[1200px] mx-auto">
                {/* 顶部操作栏 */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-medium">视频集合</h1>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-4 py-2 bg-[#00aeec] text-white rounded-lg hover:bg-[#00aeec]/90"
                    >
                        创建新集合
                    </button>
                </div>

                {/* 集合列表 */}
                <div className="grid grid-cols-3 gap-6">
                    {collections.map(collection => (
                        <div key={collection.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                            {/* 封面图 */}
                            <div className="relative h-40 bg-gray-200">
                                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                    {collection.videoCount} 个视频
                                </div>
                            </div>
                            
                            {/* 集合信息 */}
                            <div className="p-4">
                                <h3 className="text-lg font-medium mb-2">{collection.title}</h3>
                                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                    {collection.description}
                                </p>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>播放 {collection.totalViews}</span>
                                    <span>更新于 {collection.updateTime}</span>
                                </div>
                            </div>

                            {/* 操作按钮 */}
                            <div className="border-t px-4 py-3 flex justify-end gap-2">
                                <button className="px-3 py-1 text-sm text-[#00aeec] hover:bg-[#00aeec]/5 rounded">
                                    编辑
                                </button>
                                <button className="px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded">
                                    删除
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 创建集合弹窗 */}
                {showCreateModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-white rounded-lg w-[500px] p-6">
                            <h2 className="text-xl font-medium mb-6">创建新集合</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">
                                        集合标题
                                    </label>
                                    <input
                                        type="text"
                                        value={newCollection.title}
                                        onChange={e => setNewCollection({
                                            ...newCollection,
                                            title: e.target.value
                                        })}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        placeholder="请输入集合标题"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">
                                        集合简介
                                    </label>
                                    <textarea
                                        value={newCollection.description}
                                        onChange={e => setNewCollection({
                                            ...newCollection,
                                            description: e.target.value
                                        })}
                                        className="w-full px-3 py-2 border rounded-lg h-24 resize-none"
                                        placeholder="请输入集合简介"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 text-gray-500 hover:bg-gray-50 rounded-lg"
                                >
                                    取消
                                </button>
                                <button
                                    onClick={handleCreate}
                                    className="px-4 py-2 bg-[#00aeec] text-white rounded-lg hover:bg-[#00aeec]/90"
                                >
                                    创建
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

    
    

