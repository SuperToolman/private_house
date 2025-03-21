'use client'
import { useState, useRef } from 'react';

export default function ComicUpload() {
    const [uploadType, setUploadType] = useState('folder'); // 'folder' or 'zip'
    const [title, setTitle] = useState('');
    const [comicType, setComicType] = useState('single'); // 'single' or 'series'
    const [selectedSeries, setSelectedSeries] = useState('');
    const [newSeries, setNewSeries] = useState('');
    const [isCreatingNewSeries, setIsCreatingNewSeries] = useState(false);
    const [files, setFiles] = useState(null);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [partition, setPartition] = useState('日常');
    const fileInputRef = useRef(null);
    const folderInputRef = useRef(null);

    // 模拟的连载漫画列表
    const seriesList = [
        { id: 1, title: '我的漫画系列1' },
        { id: 2, title: '热血格斗物语' },
        { id: 3, title: '校园日常物语' },
    ];

    const handleFileSelect = (e) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles.length) return;

        if (uploadType === 'zip') {
            // 检查是否是zip文件
            if (!selectedFiles[0].name.toLowerCase().endsWith('.zip')) {
                alert('请选择ZIP格式的文件');
                return;
            }
            setFiles(selectedFiles[0]);
            setTitle(selectedFiles[0].name.replace('.zip', ''));
        } else {
            setFiles(selectedFiles);
            // 如果是文件夹上传，使用文件夹名称作为标题
            const folderPath = selectedFiles[0].webkitRelativePath;
            const folderName = folderPath.split('/')[0];
            setTitle(folderName);
        }
    };

    const handleTagInput = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            const newTags = tagInput.split(',').map(tag => tag.trim()).filter(tag => tag);
            setTags([...new Set([...tags, ...newTags])].slice(0, 7));
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = () => {
        if (!title.trim()) {
            alert('请输入标题');
            return;
        }
        if (!files) {
            alert('请选择要上传的文件');
            return;
        }
        if (tags.length === 0) {
            alert('请至少添加一个标签');
            return;
        }
        if (comicType === 'series' && !selectedSeries && !newSeries) {
            alert('请选择或创建连载系列');
            return;
        }

        // 这里模拟提交数据
        console.log('提交漫画：', {
            title,
            uploadType,
            comicType,
            series: comicType === 'series' ? (isCreatingNewSeries ? newSeries : selectedSeries) : null,
            files,
            tags,
            partition
        });
    };

    return (
        <div className="p-8">
            <div className="max-w-[1000px] mx-auto">
                <div className="bg-white rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">漫画稿件</h2>
                    <div className="space-y-6">
                        {/* 上传方式 */}
                        <div className="flex">
                            <div className="w-[100px] flex-shrink-0">
                                <label className="text-sm">
                                    <span className="text-red-500">*</span> 上传方式
                                </label>
                            </div>
                            <div className="flex-1">
                                <div className="flex gap-4">
                                    <label className="flex items-center cursor-pointer">
                                        <input 
                                            type="radio" 
                                            checked={uploadType === 'folder'}
                                            onChange={() => setUploadType('folder')}
                                            className="mr-2" 
                                        />
                                        文件夹上传
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <input 
                                            type="radio" 
                                            checked={uploadType === 'zip'}
                                            onChange={() => setUploadType('zip')}
                                            className="mr-2" 
                                        />
                                        压缩包上传
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* 上传区域 */}
                        <div className="flex">
                            <div className="w-[100px] flex-shrink-0">
                                <label className="text-sm">
                                    <span className="text-red-500">*</span> 选择文件
                                </label>
                            </div>
                            <div className="flex-1">
                                <div 
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#00aeec] transition-colors"
                                    onClick={() => {
                                        if (uploadType === 'zip') {
                                            fileInputRef.current?.click();
                                        } else {
                                            folderInputRef.current?.click();
                                        }
                                    }}
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept=".zip"
                                        className="hidden"
                                        onChange={handleFileSelect}
                                    />
                                    <input
                                        type="file"
                                        ref={folderInputRef}
                                        className="hidden"
                                        webkitdirectory=""
                                        directory=""
                                        onChange={handleFileSelect}
                                    />
                                    <div className="text-gray-500">
                                        {files ? (
                                            <div>
                                                已选择：{uploadType === 'zip' ? 
                                                    files.name : 
                                                    `${Array.from(files).length} 个文件`
                                                }
                                            </div>
                                        ) : (
                                            <div>
                                                <i className="fas fa-upload text-2xl mb-2"></i>
                                                <div>点击选择{uploadType === 'zip' ? 'ZIP压缩包' : '文件夹'}</div>
                                                <div className="text-sm mt-1">
                                                    {uploadType === 'zip' ? 
                                                        '支持.zip格式' : 
                                                        '请选择包含漫画图片的文件夹'
                                                    }
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 标题 */}
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
                                    placeholder="请输入标题（建议30字以内）"
                                    maxLength={80}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <div className="text-right text-sm text-gray-500 mt-1">
                                    {title.length}/80
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
                                    <option value="热血">热血</option>
                                    <option value="恋爱">恋爱</option>
                                    <option value="科幻">科幻</option>
                                    <option value="奇幻">奇幻</option>
                                </select>
                            </div>
                        </div>

                        {/* 漫画类型 */}
                        <div className="flex">
                            <div className="w-[100px] flex-shrink-0">
                                <label className="text-sm">
                                    <span className="text-red-500">*</span> 漫画类型
                                </label>
                            </div>
                            <div className="flex-1">
                                <div className="flex gap-4">
                                    <label className="flex items-center cursor-pointer">
                                        <input 
                                            type="radio" 
                                            checked={comicType === 'single'}
                                            onChange={() => setComicType('single')}
                                            className="mr-2" 
                                        />
                                        单行本
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <input 
                                            type="radio" 
                                            checked={comicType === 'series'}
                                            onChange={() => setComicType('series')}
                                            className="mr-2" 
                                        />
                                        连载
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* 连载选项 */}
                        {comicType === 'series' && (
                            <div className="flex">
                                <div className="w-[100px] flex-shrink-0">
                                    <label className="text-sm">
                                        <span className="text-red-500">*</span> 连载系列
                                    </label>
                                </div>
                                <div className="flex-1">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <select 
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded"
                                                value={selectedSeries}
                                                onChange={(e) => {
                                                    setSelectedSeries(e.target.value);
                                                    setIsCreatingNewSeries(false);
                                                }}
                                                disabled={isCreatingNewSeries}
                                            >
                                                <option value="">选择已有系列</option>
                                                {seriesList.map(series => (
                                                    <option key={series.id} value={series.id}>
                                                        {series.title}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                className="px-4 py-2 text-[#00aeec] hover:text-[#00a1d6]"
                                                onClick={() => {
                                                    setIsCreatingNewSeries(!isCreatingNewSeries);
                                                    setSelectedSeries('');
                                                }}
                                            >
                                                {isCreatingNewSeries ? '选择已有系列' : '创建新系列'}
                                            </button>
                                        </div>
                                        {isCreatingNewSeries && (
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                placeholder="请输入新系列名称"
                                                value={newSeries}
                                                onChange={(e) => setNewSeries(e.target.value)}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 标签 */}
                        <div className="flex">
                            <div className="w-[100px] flex-shrink-0">
                                <label className="text-sm">
                                    <span className="text-red-500">*</span> 标签
                                </label>
                            </div>
                            <div className="flex-1">
                                <div className="space-y-2">
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map(tag => (
                                            <button 
                                                key={tag}
                                                className="px-3 py-1 bg-[#00aeec] text-white rounded text-sm"
                                                onClick={() => handleRemoveTag(tag)}
                                            >
                                                {tag} <span className="text-xs">×</span>
                                            </button>
                                        ))}
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded"
                                        placeholder="按回车添加标签，最多添加7个标签"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleTagInput}
                                        maxLength={20}
                                    />
                                    <div className="mt-2">
                                        <span className="text-sm text-gray-500">推荐标签：</span>
                                        {['漫画', '热血', '恋爱', '奇幻'].map(tag => (
                                            <button 
                                                key={tag}
                                                className="text-sm text-[#00aeec] ml-2 hover:text-[#00a1d6]"
                                                onClick={() => {
                                                    if (tags.length < 7) {
                                                        setTags([...new Set([...tags, tag])]);
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

                        {/* 按钮组 */}
                        <div className="flex justify-center gap-4 mt-6">
                            <button 
                                onClick={handleSubmit}
                                className="px-8 py-2 bg-[#00aeec] text-white rounded hover:bg-[#00a1d6] transition-colors"
                            >
                                立即投稿
                            </button>
                            <button 
                                onClick={() => {
                                    setTitle('');
                                    setFiles(null);
                                    setTags([]);
                                    setTagInput('');
                                    setSelectedSeries('');
                                    setNewSeries('');
                                    setIsCreatingNewSeries(false);
                                }}
                                className="px-8 py-2 border border-[#00aeec] text-[#00aeec] rounded hover:bg-[#00aeec] hover:text-white transition-colors"
                            >
                                清空内容
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

    
