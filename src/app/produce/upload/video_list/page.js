'use client'
import { useState, useRef } from 'react';

export default function VideoListPage() {
    // 集合基本信息
    const [collectionType, setCollectionType] = useState('standard'); // 'standard' or 'difference'
    const [collectionTitle, setCollectionTitle] = useState('');
    const [collectionTags, setCollectionTags] = useState([]);
    const [collectionTagInput, setCollectionTagInput] = useState('');
    const [partition, setPartition] = useState('日常');
    const [selectedCollection, setSelectedCollection] = useState('');
    const [newCollection, setNewCollection] = useState('');
    const [isCreatingNewCollection, setIsCreatingNewCollection] = useState(false);

    // 视频列表信息
    const [videos, setVideos] = useState([]);

    // 模拟的集合列表
    const collectionList = [
        { id: 1, title: '我的日常系列1', type: 'standard' },
        { id: 2, title: '游戏差异视频集', type: 'difference' },
        { id: 3, title: '美食探店系列', type: 'standard' },
    ];

    const handleCollectionTagInput = (e) => {
        if (e.key === 'Enter' && collectionTagInput.trim()) {
            e.preventDefault();
            const newTags = collectionTagInput.split(',').map(tag => tag.trim()).filter(tag => tag);
            setCollectionTags([...new Set([...collectionTags, ...newTags])].slice(0, 7));
            setCollectionTagInput('');
        }
    };

    const handleRemoveCollectionTag = (tagToRemove) => {
        setCollectionTags(collectionTags.filter(tag => tag !== tagToRemove));
    };

    const handleVideoIndexChange = (videoId, newIndex) => {
        const updatedVideos = videos.map(video => {
            if (video.id === videoId) {
                return { ...video, index: parseInt(newIndex) };
            }
            return video;
        }).sort((a, b) => a.index - b.index);
        setVideos(updatedVideos);
    };

    const handleVideoTitleChange = (videoId, newTitle) => {
        setVideos(videos.map(video =>
            video.id === videoId ? { ...video, title: newTitle } : video
        ));
    };

    const handleVideoTagsChange = (videoId, newTags) => {
        setVideos(videos.map(video =>
            video.id === videoId ? { ...video, tags: newTags } : video
        ));
    };

    const handleAddVideo = () => {
        const newVideo = {
            id: Date.now(),
            title: '',
            index: videos.length,
            file: null,
            uploadProgress: 0
        };
        setVideos([...videos, newVideo]);
    };

    const handleRemoveVideo = (videoId) => {
        setVideos(videos.filter(video => video.id !== videoId));
    };

    const handleVideoFileSelect = (videoId, file) => {
        if (!file) return;

        // 检查文件类型
        const acceptedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
        if (!acceptedTypes.includes(file.type)) {
            alert('请选择支持的视频格式：MP4, WebM, OGG');
            return;
        }

        setVideos(videos.map(video => {
            if (video.id === videoId) {
                return {
                    ...video,
                    file,
                    // 如果标题为空，使用文件名作为标题
                    title: video.title || file.name.replace(/\.[^/.]+$/, '')
                };
            }
            return video;
        }));
    };

    const handleMoveVideo = (currentIndex, direction) => {
        const newVideos = [...videos];
        const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

        if (newIndex >= 0 && newIndex < videos.length) {
            // 交换位置
            [newVideos[currentIndex], newVideos[newIndex]] = [newVideos[newIndex], newVideos[currentIndex]];
            // 更新索引
            newVideos[currentIndex].index = currentIndex;
            newVideos[newIndex].index = newIndex;
            setVideos(newVideos);
        }
    };

    const handleSubmit = () => {
        if (!collectionTitle.trim()) {
            alert('请输入集合标题');
            return;
        }
        if (collectionTags.length === 0) {
            alert('请为集合添加至少一个标签');
            return;
        }
        if (videos.length === 0) {
            alert('请添加至少一个视频');
            return;
        }
        if (videos.some(video => !video.file)) {
            alert('请为所有视频选择视频文件');
            return;
        }
        if (videos.some(video => !video.title.trim())) {
            alert('请为所有视频填写标题');
            return;
        }

        // 这里模拟提交数据
        console.log('提交集合：', {
            collectionType,
            collectionTitle,
            collectionTags,
            partition,
            collection: isCreatingNewCollection ? newCollection : selectedCollection,
            videos: videos.map(video => ({
                title: video.title,
                fileName: video.file.name,
                fileSize: video.file.size,
                index: video.index
            }))
        });

        // 这里可以添加实际的文件上传逻辑
        videos.forEach(video => {
            // 模拟上传进度
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                if (progress <= 100) {
                    setVideos(prevVideos => prevVideos.map(v =>
                        v.id === video.id ? { ...v, uploadProgress: progress } : v
                    ));
                } else {
                    clearInterval(interval);
                }
            }, 500);
        });
    };

    return (
        <div className="p-8">
            <div className="max-w-[1000px] mx-auto">
                {/* 集合信息表单 */}
                <div className="bg-white rounded-lg p-6 mb-6">
                    <h2 className="text-lg font-medium mb-4">集合信息</h2>
                    <div className="space-y-6">
                        {/* 集合类型 */}
                        <div className="flex">
                            <div className="w-[100px] flex-shrink-0">
                                <label className="text-sm">
                                    <span className="text-red-500">*</span> 集合类型
                                </label>
                            </div>
                            <div className="flex-1">
                                <div className="flex gap-4">
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            checked={collectionType === 'standard'}
                                            onChange={() => setCollectionType('standard')}
                                            className="mr-2"
                                        />
                                        标准集合
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            checked={collectionType === 'difference'}
                                            onChange={() => setCollectionType('difference')}
                                            className="mr-2"
                                        />
                                        差异视频
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* 选择或创建集合 */}
                        <div className="flex">
                            <div className="w-[100px] flex-shrink-0">
                                <label className="text-sm">
                                    <span className="text-red-500">*</span> 选择集合
                                </label>
                            </div>
                            <div className="flex-1">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <select
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded"
                                            value={selectedCollection}
                                            onChange={(e) => {
                                                setSelectedCollection(e.target.value);
                                                setIsCreatingNewCollection(false);
                                            }}
                                            disabled={isCreatingNewCollection}
                                        >
                                            <option value="">选择已有集合</option>
                                            {collectionList
                                                .filter(collection => collection.type === collectionType)
                                                .map(collection => (
                                                    <option key={collection.id} value={collection.id}>
                                                        {collection.title}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        <button
                                            className="px-4 py-2 text-[#00aeec] hover:text-[#00a1d6]"
                                            onClick={() => {
                                                setIsCreatingNewCollection(!isCreatingNewCollection);
                                                setSelectedCollection('');
                                            }}
                                        >
                                            {isCreatingNewCollection ? '选择已有集合' : '创建新集合'}
                                        </button>
                                    </div>
                                    {isCreatingNewCollection && (
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded"
                                            placeholder="请输入新集合名称"
                                            value={newCollection}
                                            onChange={(e) => setNewCollection(e.target.value)}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 集合标题 */}
                        <div className="flex">
                            <div className="w-[100px] flex-shrink-0">
                                <label className="text-sm">
                                    <span className="text-red-500">*</span> 集合标题
                                </label>
                            </div>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                    placeholder="请输入集合标题（建议30字以内）"
                                    maxLength={80}
                                    value={collectionTitle}
                                    onChange={(e) => setCollectionTitle(e.target.value)}
                                />
                                <div className="text-right text-sm text-gray-500 mt-1">
                                    {collectionTitle.length}/80
                                </div>
                            </div>
                        </div>

                        {/* 分区 */}
                        <div className="flex">
                            <div className="w-[100px] flex-shrink-0">
                                <label className="text-sm">
                                    <span className="text-red-500">*</span> 分区
                                </label>
                            </div>
                            <div className="flex-1">
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                    value={partition}
                                    onChange={(e) => setPartition(e.target.value)}
                                >
                                    <option value="日常">日常</option>
                                    <option value="知识">知识</option>
                                    <option value="科技">科技</option>
                                    <option value="游戏">游戏</option>
                                    <option value="动画">动画</option>
                                </select>
                            </div>
                        </div>

                        {/* 集合标签 */}
                        <div className="flex">
                            <div className="w-[100px] flex-shrink-0">
                                <label className="text-sm">
                                    <span className="text-red-500">*</span> 集合标签
                                </label>
                            </div>
                            <div className="flex-1">
                                <div className="space-y-2">
                                    <div className="flex flex-wrap gap-2">
                                        {collectionTags.map(tag => (
                                            <button
                                                key={tag}
                                                className="px-3 py-1 bg-[#00aeec] text-white rounded text-sm"
                                                onClick={() => handleRemoveCollectionTag(tag)}
                                            >
                                                {tag} <span className="text-xs">×</span>
                                            </button>
                                        ))}
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded"
                                        placeholder="按回车添加标签，最多添加7个标签"
                                        value={collectionTagInput}
                                        onChange={(e) => setCollectionTagInput(e.target.value)}
                                        onKeyDown={handleCollectionTagInput}
                                        maxLength={20}
                                    />
                                    <div className="mt-2">
                                        <span className="text-sm text-gray-500">推荐标签：</span>
                                        {['视频集', '系列', '合集', collectionType === 'difference' ? '差异' : '标准'].map(tag => (
                                            <button
                                                key={tag}
                                                className="text-sm text-[#00aeec] ml-2 hover:text-[#00a1d6]"
                                                onClick={() => {
                                                    if (collectionTags.length < 7) {
                                                        setCollectionTags([...new Set([...collectionTags, tag])]);
                                                    }
                                                }}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 视频列表 */}
                <div className="bg-white rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium">视频列表</h2>
                        <button
                            onClick={handleAddVideo}
                            className="px-4 py-2 bg-[#00aeec] text-white rounded hover:bg-[#00a1d6] transition-colors"
                        >
                            添加视频
                        </button>
                    </div>

                    {videos.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            暂无视频，点击上方按钮添加视频
                        </div>
                    ) : (
                        <div className="relative space-y-4">
                            {videos.map((video, idx) => (
                                <div
                                    key={video.id}
                                    className="absolute w-full transition-transform duration-300 ease-in-out"
                                    style={{
                                        transform: `translateY(${idx * (idx === 0 ? 0 : 220)}px)`,
                                        zIndex: videos.length - idx
                                    }}
                                >
                                    <div className="border border-gray-200 rounded-lg p-4 bg-white">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="flex items-center gap-4">
                                                <h3 className="font-medium">视频 {idx + 1}</h3>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleMoveVideo(idx, 'up')}
                                                        disabled={idx === 0}
                                                        className={`p-1 rounded ${idx === 0 ? 'text-gray-300' : 'text-[#00aeec] hover:bg-gray-100'}`}
                                                    >
                                                        <i className="fas fa-arrow-up"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => handleMoveVideo(idx, 'down')}
                                                        disabled={idx === videos.length - 1}
                                                        className={`p-1 rounded ${idx === videos.length - 1 ? 'text-gray-300' : 'text-[#00aeec] hover:bg-gray-100'}`}
                                                    >
                                                        <i className="fas fa-arrow-down"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveVideo(video.id)}
                                                className="text-red-500 hover:text-red-600"
                                            >
                                                删除
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            {/* 视频文件上传 */}
                                            <div className="flex">
                                                <div className="w-[100px] flex-shrink-0">
                                                    <label className="text-sm">
                                                        <span className="text-red-500">*</span> 视频文件
                                                    </label>
                                                </div>
                                                <div className="flex-1">
                                                    <div
                                                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#00aeec] transition-colors"
                                                        onClick={() => document.getElementById(`video-file-${video.id}`).click()}
                                                    >
                                                        <input
                                                            id={`video-file-${video.id}`}
                                                            type="file"
                                                            accept="video/*"
                                                            className="hidden"
                                                            onChange={(e) => handleVideoFileSelect(video.id, e.target.files[0])}
                                                        />
                                                        {video.file ? (
                                                            <div>
                                                                <div>已选择：{video.file.name}</div>
                                                                <div className="text-sm text-gray-500 mt-1">
                                                                    文件大小：{(video.file.size / (1024 * 1024)).toFixed(2)} MB
                                                                </div>
                                                                {video.uploadProgress > 0 && (
                                                                    <div className="mt-2">
                                                                        <div className="h-2 bg-gray-200 rounded">
                                                                            <div
                                                                                className="h-full bg-[#00aeec] rounded"
                                                                                style={{ width: `${video.uploadProgress}%` }}
                                                                            />
                                                                        </div>
                                                                        <div className="text-sm text-gray-500 mt-1">
                                                                            上传进度：{video.uploadProgress}%
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <i className="fas fa-video text-2xl mb-2"></i>
                                                                <div>点击选择视频文件</div>
                                                                <div className="text-sm mt-1 text-gray-500">
                                                                    支持格式：MP4, WebM, OGG
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 视频标题 */}
                                            <div className="flex">
                                                <div className="w-[100px] flex-shrink-0">
                                                    <label className="text-sm">
                                                        <span className="text-red-500">*</span> 标题
                                                    </label>
                                                </div>
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded"
                                                        placeholder="请输入视频标题"
                                                        value={video.title}
                                                        onChange={(e) => handleVideoTitleChange(video.id, e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* 占位元素，确保容器高度正确 */}
                            <div style={{ height: `${videos.length * 220}px` }}></div>
                        </div>
                    )}

                    {/* 提交按钮 */}
                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            onClick={handleSubmit}
                            className="px-8 py-2 bg-[#00aeec] text-white rounded hover:bg-[#00a1d6] transition-colors"
                        >
                            立即投稿
                        </button>
                        <button
                            onClick={() => {
                                setCollectionTitle('');
                                setCollectionTags([]);
                                setCollectionTagInput('');
                                setSelectedCollection('');
                                setNewCollection('');
                                setIsCreatingNewCollection(false);
                                setVideos([]);
                            }}
                            className="px-8 py-2 border border-[#00aeec] text-[#00aeec] rounded hover:bg-[#00aeec] hover:text-white transition-colors"
                        >
                            清空内容
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

    
    

