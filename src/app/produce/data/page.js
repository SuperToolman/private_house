'use client'
import { useState } from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts'

export default function Data() {
    // 时间范围选择
    const [timeRange, setTimeRange] = useState('近7天')

    // 更新数据概览的测试数据
    const stats = {
        播放量: 234,
        空间访客: 111,
        弹幕数量: 45,
        点赞: 89,
        收藏: 34,
        硬币: 23,
        评论: 12,
        弹幕: 45,
        分享: 8,
        充电: 3
    }

    // 更新图表的测试数据
    const chartData = [
        { date: '03/12', 总播放量: 45, 粉丝播放量: 12 },
        { date: '03/13', 总播放量: 78, 粉丝播放量: 23 },
        { date: '03/14', 总播放量: 134, 粉丝播放量: 45 },
        { date: '03/15', 总播放量: 156, 粉丝播放量: 67 },
        { date: '03/16', 总播放量: 187, 粉丝播放量: 89 },
        { date: '03/17', 总播放量: 211, 粉丝播放量: 98 },
        { date: '03/18', 总播放量: 234, 粉丝播放量: 111 }
    ]

    // 自定义提示框
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border rounded-lg shadow-lg">
                    <p className="text-sm text-gray-600 mb-2">{label}</p>
                    {payload.map((item, index) => (
                        <p key={index} className="text-sm" style={{ color: item.color }}>
                            {item.name}：{item.value}
                        </p>
                    ))}
                </div>
            )
        }
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-[1200px] mx-auto">
                {/* 顶部信息栏 */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <h1 className="text-lg font-medium">核心数据概览</h1>
                        <span className="text-sm text-gray-500">
                            更新至3月18日
                        </span>
                        <button className="text-sm text-[#00aeec]">
                            <i className="fas fa-info-circle mr-1"></i>
                            了解数据
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <select 
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="px-3 py-1 border rounded text-sm"
                        >
                            <option>近7天</option>
                            <option>近30天</option>
                            <option>近90天</option>
                        </select>
                        <button className="text-sm text-[#00aeec]">
                            <i className="fas fa-download mr-1"></i>
                            导出数据
                        </button>
                    </div>
                </div>

                {/* 数据概览卡片 */}
                <div className="grid grid-cols-5 gap-4 mb-8">
                    <div className="bg-gradient-to-r from-pink-400 to-pink-500 rounded-lg p-4 text-white">
                        <div className="text-sm opacity-90 mb-2">播放量</div>
                        <div className="text-2xl font-medium">{stats.播放量}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <div className="text-sm text-gray-500 mb-2">空间访客</div>
                        <div className="text-2xl font-medium">{stats.空间访客}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <div className="text-sm text-gray-500 mb-2">弹幕数量</div>
                        <div className="text-2xl font-medium">{stats.弹幕数量}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <div className="text-sm text-gray-500 mb-2">点赞</div>
                        <div className="text-2xl font-medium">{stats.点赞}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <div className="text-sm text-gray-500 mb-2">收藏</div>
                        <div className="text-2xl font-medium">{stats.收藏}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <div className="text-sm text-gray-500 mb-2">硬币</div>
                        <div className="text-2xl font-medium">{stats.硬币}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <div className="text-sm text-gray-500 mb-2">评论</div>
                        <div className="text-2xl font-medium">{stats.评论}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <div className="text-sm text-gray-500 mb-2">弹幕</div>
                        <div className="text-2xl font-medium">{stats.弹幕}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <div className="text-sm text-gray-500 mb-2">分享</div>
                        <div className="text-2xl font-medium">{stats.分享}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <div className="text-sm text-gray-500 mb-2">充电</div>
                        <div className="text-2xl font-medium">{stats.充电}</div>
                    </div>
                </div>

                {/* 趋势图表 */}
                <div className="bg-white rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-medium">近7天播放量</h2>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-0.5 bg-[#ff6b81]"></span>
                                <span className="text-gray-500">总播放量</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-0.5 bg-[#00aeec]"></span>
                                <span className="text-gray-500">粉丝播放量</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* 图表区域 */}
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={chartData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis 
                                    dataKey="date" 
                                    stroke="#999"
                                    fontSize={12}
                                    tickLine={false}
                                />
                                <YAxis 
                                    stroke="#999"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Line
                                    type="monotone"
                                    dataKey="总播放量"
                                    stroke="#ff6b81"
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: "#ff6b81" }}
                                    activeDot={{ r: 6 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="粉丝播放量"
                                    stroke="#00aeec"
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: "#00aeec" }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 稿件对比表格 */}
                <div className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium">近期稿件对比</h2>
                        <div className="flex items-center gap-2">
                            <button className="text-sm text-gray-500">
                                <i className="fas fa-chart-line mr-1"></i>
                                历史数据
                            </button>
                            <button className="text-sm text-gray-500">
                                <i className="fas fa-table mr-1"></i>
                                自选指标
                            </button>
                            <button className="text-sm text-gray-500">
                                <i className="fas fa-download mr-1"></i>
                                导出
                            </button>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">稿件名称</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">时间</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">播放量</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">游客播放占比</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">粉丝观看率</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">点赞量</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-20 h-12 bg-gray-200 rounded"></div>
                                            <span className="text-sm">日常五杀</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-500">2024年04月04日 02:06:32</td>
                                    <td className="px-4 py-4 text-sm">111</td>
                                    <td className="px-4 py-4 text-sm">100%</td>
                                    <td className="px-4 py-4 text-sm">0%</td>
                                    <td className="px-4 py-4 text-sm">1</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-20 h-12 bg-gray-200 rounded"></div>
                                            <span className="text-sm">20230924-011409-0KillStreakAchv-b9c2</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-500">2023年09月28日 20:45:11</td>
                                    <td className="px-4 py-4 text-sm">123</td>
                                    <td className="px-4 py-4 text-sm">100%</td>
                                    <td className="px-4 py-4 text-sm">0%</td>
                                    <td className="px-4 py-4 text-sm">3</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
