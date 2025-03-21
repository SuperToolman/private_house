'use client'
import { useState, useRef } from 'react';

export default function MusicUpload() {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [albumType, setAlbumType] = useState('single'); // 'single' or 'album'
    const [selectedAlbum, setSelectedAlbum] = useState('');
    const [newAlbum, setNewAlbum] = useState('');
    const [isCreatingNewAlbum, setIsCreatingNewAlbum] = useState(false);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [partition, setPartition] = useState('流行');
    const fileInputRef = useRef(null);

    // 模拟的合辑列表
    const albumList = [
        { id: 1, title: '我的音乐合辑1' },
        { id: 2, title: '夏日清凉音乐集' },
        { id: 3, title: '轻音乐合集' },
    ];

    // 支持的音频格式
    const supportedFormats = ['.mp3', '.wma', '.flac', '.wav', '.aac', '.m4a', '.ogg'];
    const acceptFormats = supportedFormats.join(',');

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        // 检查文件格式
        const fileExtension = '.' + selectedFile.name.split('.').pop().toLowerCase();
        if (!supportedFormats.includes(fileExtension)) {
            alert('请选择支持的音频格式：' + supportedFormats.join(', '));
            return;
        }

        setFile(selectedFile);
        // 使用文件名（不包含扩展名）作为默认标题
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, ''));
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
        if (!file) {
            alert('请选择要上传的音频文件');
            return;
        }
        if (tags.length === 0) {
            alert('请至少添加一个标签');
            return;
        }
        if (albumType === 'album' && !selectedAlbum && !newAlbum) {
            alert('请选择或创建合辑');
            return;
        }

        // 这里模拟提交数据
        console.log('提交音频：', {
            title,
            file,
            albumType,
            album: albumType === 'album' ? (isCreatingNewAlbum ? newAlbum : selectedAlbum) : null,
            tags,
            partition
        });
    };

    return (
        <div className="p-8">
            <div className="max-w-[1000px] mx-auto">
                <div className="bg-white rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">音频稿件</h2>
                    <div className="space-y-6">
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
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept={acceptFormats}
                                        className="hidden"
                                        onChange={handleFileSelect}
                                    />
                                    <div className="text-gray-500">
                                        {file ? (
                                            <div>
                                                已选择：{file.name}
                                                <div className="text-sm mt-1 text-gray-400">
                                                    文件大小：{(file.size / (1024 * 1024)).toFixed(2)} MB
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <i className="fas fa-music text-2xl mb-2"></i>
                                                <div>点击选择音频文件</div>
                                                <div className="text-sm mt-1">
                                                    支持格式：{supportedFormats.join(', ')}
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
                                    <option value="流行">流行</option>
                                    <option value="摇滚">摇滚</option>
                                    <option value="民谣">民谣</option>
                                    <option value="电子">电子</option>
                                    <option value="古典">古典</option>
                                    <option value="轻音乐">轻音乐</option>
                                </select>
                            </div>
                        </div>

                        {/* 音频类型 */}
                        <div className="flex">
                            <div className="w-[100px] flex-shrink-0">
                                <label className="text-sm">
                                    <span className="text-red-500">*</span> 音频类型
                                </label>
                            </div>
                            <div className="flex-1">
                                <div className="flex gap-4">
                                    <label className="flex items-center cursor-pointer">
                                        <input 
                                            type="radio" 
                                            checked={albumType === 'single'}
                                            onChange={() => setAlbumType('single')}
                                            className="mr-2" 
                                        />
                                        单曲
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <input 
                                            type="radio" 
                                            checked={albumType === 'album'}
                                            onChange={() => setAlbumType('album')}
                                            className="mr-2" 
                                        />
                                        合辑
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* 合辑选项 */}
                        {albumType === 'album' && (
                            <div className="flex">
                                <div className="w-[100px] flex-shrink-0">
                                    <label className="text-sm">
                                        <span className="text-red-500">*</span> 选择合辑
                                    </label>
                                </div>
                                <div className="flex-1">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <select 
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded"
                                                value={selectedAlbum}
                                                onChange={(e) => {
                                                    setSelectedAlbum(e.target.value);
                                                    setIsCreatingNewAlbum(false);
                                                }}
                                                disabled={isCreatingNewAlbum}
                                            >
                                                <option value="">选择已有合辑</option>
                                                {albumList.map(album => (
                                                    <option key={album.id} value={album.id}>
                                                        {album.title}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                className="px-4 py-2 text-[#00aeec] hover:text-[#00a1d6]"
                                                onClick={() => {
                                                    setIsCreatingNewAlbum(!isCreatingNewAlbum);
                                                    setSelectedAlbum('');
                                                }}
                                            >
                                                {isCreatingNewAlbum ? '选择已有合辑' : '创建新合辑'}
                                            </button>
                                        </div>
                                        {isCreatingNewAlbum && (
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                placeholder="请输入新合辑名称"
                                                value={newAlbum}
                                                onChange={(e) => setNewAlbum(e.target.value)}
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
                                        {['音乐', '流行', '摇滚', '电子'].map(tag => (
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
                                    setFile(null);
                                    setTags([]);
                                    setTagInput('');
                                    setSelectedAlbum('');
                                    setNewAlbum('');
                                    setIsCreatingNewAlbum(false);
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

    
    
