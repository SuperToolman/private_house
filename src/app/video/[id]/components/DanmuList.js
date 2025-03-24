// 弹幕列表
'use client';

import { useState } from 'react';

export default function DanmuList({ danmuList }) {
    const [sortBy, setSortBy] = useState('sendTime'); // 默认按照视频中的时间点排序
    const [sortOrder, setSortOrder] = useState('asc'); // 默认升序

    // 处理排序点击
    const handleSortClick = (field) => {
        if (sortBy === field) {
            // 如果点击当前排序字段，切换排序方向
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // 切换排序字段，重置为默认排序方向
            setSortBy(field);
            setSortOrder(field === 'sendTime' ? 'asc' : 'desc'); // sendTime默认升序，releaseTime默认降序
        }
    };

    // 格式化时间显示为 MM:SS 格式，正确处理超过60秒的情况
    const formatTimeString = (timeStr) => {
        if (!timeStr) return '00:00';
        
        let totalSeconds;
        if (timeStr.includes(':')) {
            const [minutes, seconds] = timeStr.split(':').map(Number);
            totalSeconds = minutes * 60 + seconds;
        } else {
            totalSeconds = Number(timeStr) || 0;
        }
        
        // 转换为分:秒格式
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // 解析发送日期为可比较的格式
    const parseReleaseDate = (dateStr) => {
        if (!dateStr) return new Date(0);
        return new Date(dateStr);
    };

    // 解析视频时间点为秒数，用于排序
    const parseVideoTime = (timeStr) => {
        if (!timeStr) return 0;
        if (timeStr.includes(':')) {
            const [minutes, seconds] = timeStr.split(':').map(Number);
            return minutes * 60 + seconds;
        }
        return Number(timeStr) || 0;
    };

    // 排序弹幕列表
    const sortedDanmuList = [...danmuList].sort((a, b) => {
        let comparison = 0;

        if (sortBy === 'sendTime') {
            comparison = parseVideoTime(a.sendTime) - parseVideoTime(b.sendTime);
        } else {
            comparison = parseReleaseDate(b.releaseTime) - parseReleaseDate(a.releaseTime);
        }

        // 根据排序方向调整结果
        return sortOrder === 'asc' ? comparison : -comparison;
    });

    // 格式化发布日期显示
    const formatReleaseDate = (dateStr) => {
        if (!dateStr) return '';

        // 处理采用短格式的日期 (MM-DD HH:MM)
        if (dateStr.includes('-')) {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;

            return `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        }

        return dateStr;
    };

    // 渲染排序指示器
    const renderSortIndicator = (field) => {
        if (sortBy !== field) return null;

        return (
            <span className="ml-1 text-blue-500">
                {sortOrder === 'asc' ? '↑' : '↓'}
            </span>
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-sm mt-4">
            <div className="w-full">
                <div className="w-full h-11 rounded-[5px] bg-[#f1f2f3] flex items-center px-4">
                    <div className="text-base font-semibold text-[#18191c]">
                        弹幕列表
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto" style={{ maxHeight: '700px', overflowY: 'auto' }}>
                <table className="w-full table-auto">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider sticky top-0 z-10">
                        <tr>
                            <th
                                className="px-4 py-2 text-left w-24 cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                                onClick={() => handleSortClick('sendTime')}
                            >
                                <div className="flex items-center">
                                    <span>时间</span>
                                    {renderSortIndicator('sendTime')}
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left">弹幕内容</th>
                            <th
                                className="px-4 py-2 text-right w-36 cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                                onClick={() => handleSortClick('releaseTime')}
                            >
                                <div className="flex items-center justify-end">
                                    <span>发送时间</span>
                                    {renderSortIndicator('releaseTime')}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {sortedDanmuList.map((danmu) => (
                            <tr key={danmu.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-xs text-gray-600 whitespace-nowrap">
                                    {formatTimeString(danmu.sendTime)}
                                </td>
                                <td className="px-4 py-2 text-xs text-gray-800">
                                    <div className="truncate max-w-[200px]" title={danmu.content}>
                                        {danmu.content}
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-xs text-gray-500 text-right whitespace-nowrap">
                                    {formatReleaseDate(danmu.releaseTime)}
                                </td>
                            </tr>
                        ))}

                        {sortedDanmuList.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-4 py-8 text-center text-gray-500 text-xs">
                                    暂无弹幕数据
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
