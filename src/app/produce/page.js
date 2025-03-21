'use client'
import Link from 'next/link';

export default function Produce() {
    // 模拟数据
    const stats = {
        totalViews: 12580,
        totalLikes: 856,
        totalComments: 234,
        totalFollowers: 567
    };

    const recentWorks = [
        { id: 1, title: '我的第一个视频', type: '视频', views: 1200, likes: 89, date: '2024-03-18' },
        { id: 2, title: '日常记录', type: '文章', views: 450, likes: 45, date: '2024-03-17' },
        { id: 3, title: '游戏实况第一期', type: '视频', views: 780, likes: 67, date: '2024-03-16' }
    ];

    const quickLinks = [
        { title: '视频投稿', icon: 'fas fa-video', path: '/produce/upload/', color: 'bg-[#00aeec]' },
        { title: '文章创作', icon: 'fas fa-pen-nib', path: '/produce/upload/text', color: 'bg-[#00b578]' },
        { title: '音频上传', icon: 'fas fa-music', path: '/produce/upload/music', color: 'bg-[#ff6b6b]' },
        { title: '漫画投稿', icon: 'fas fa-book-open', path: '/produce/upload/comic', color: 'bg-[#845ef7]' }
    ];

    const tools = [
        { title: '视频集合', desc: '创建和管理视频集合', icon: 'fas fa-layer-group', path: '/produce/upload/video_list' },
        { title: '数据分析', desc: '查看作品数据分析', icon: 'fas fa-chart-line', path: '/produce/analysis' },
        { title: '草稿箱', desc: '管理未发布的作品', icon: 'fas fa-inbox', path: '/produce/drafts' },
        { title: '素材库', desc: '管理你的创作素材', icon: 'fas fa-images', path: '/produce/resources' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-[1200px] mx-auto p-8">
                {/* 欢迎区域 */}
                <div className="bg-gradient-to-r from-[#00aeec] to-[#00a1d6] rounded-lg p-8 text-white mb-8">
                    <h1 className="text-2xl font-medium mb-2">创作中心</h1>
                    <p className="opacity-90">在这里开始你的创作之旅</p>
                </div>

                {/* 数据概览 */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="text-gray-500 mb-2">总播放量</div>
                        <div className="text-2xl font-medium">{stats.totalViews.toLocaleString()}</div>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="text-gray-500 mb-2">获赞数</div>
                        <div className="text-2xl font-medium">{stats.totalLikes.toLocaleString()}</div>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="text-gray-500 mb-2">评论数</div>
                        <div className="text-2xl font-medium">{stats.totalComments.toLocaleString()}</div>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="text-gray-500 mb-2">粉丝数</div>
                        <div className="text-2xl font-medium">{stats.totalFollowers.toLocaleString()}</div>
                    </div>
                </div>

                {/* 快速入口 */}
                <h2 className="text-lg font-medium mb-4">快速创作</h2>
                <div className="grid grid-cols-4 gap-4 mb-8">
                    {quickLinks.map(link => (
                        <Link 
                            key={link.title} 
                            href={link.path}
                            className={`${link.color} rounded-lg p-6 text-white hover:opacity-90 transition-opacity`}
                        >
                            <i className={`${link.icon} text-2xl mb-2`}></i>
                            <div className="font-medium">{link.title}</div>
                        </Link>
                    ))}
                </div>

                {/* 创作工具 */}
                <h2 className="text-lg font-medium mb-4">创作工具</h2>
                <div className="grid grid-cols-4 gap-4 mb-8">
                    {tools.map(tool => (
                        <Link 
                            key={tool.title} 
                            href={tool.path}
                            className="bg-white rounded-lg p-6 shadow-sm hover:shadow transition-shadow"
                        >
                            <i className={`${tool.icon} text-2xl text-[#00aeec] mb-2`}></i>
                            <div className="font-medium mb-1">{tool.title}</div>
                            <div className="text-sm text-gray-500">{tool.desc}</div>
                        </Link>
                    ))}
                </div>

                {/* 最近作品 */}
                <h2 className="text-lg font-medium mb-4">最近作品</h2>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">标题</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">类型</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">播放</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">点赞</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">发布日期</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {recentWorks.map(work => (
                                <tr key={work.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900">{work.title}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{work.type}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{work.views}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{work.likes}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{work.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
