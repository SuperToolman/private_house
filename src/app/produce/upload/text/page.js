'use client'
import { useState } from 'react';
import RichText from '@common/RichText';

export default function TextUpload() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('原创');
    const [partition, setPartition] = useState('日常');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

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
        if (!content.trim()) {
            alert('请输入正文内容');
            return;
        }
        if (tags.length === 0) {
            alert('请至少添加一个标签');
            return;
        }

        const tagString = tags.join(',');
        console.log('提交文章：', {
            title,
            content,
            type,
            partition,
            tags,
            tagString
        });
    };

    return (
        <div className="p-8">
            <div className="max-w-[1000px] mx-auto">
                <div className="bg-white rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">文字稿件</h2>
                    <div className="space-y-6">
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

                        {/* 类型 */}
                        <div className="flex">
                            <div className="w-[100px] flex-shrink-0">
                                <label className="text-sm">
                                    <span className="text-red-500">*</span> 类型
                                </label>
                            </div>
                            <div className="flex-1">
                                <div className="flex gap-4">
                                    <label className="flex items-center cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="type" 
                                            checked={type === '原创'}
                                            onChange={() => setType('原创')}
                                            className="mr-2" 
                                        />
                                        原创
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="type" 
                                            checked={type === '转载'}
                                            onChange={() => setType('转载')}
                                            className="mr-2" 
                                        />
                                        转载
                                    </label>
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

                        {/* 正文 */}
                        <div className="flex">
                            <div className="w-[100px] flex-shrink-0">
                                <label className="text-sm">
                                    <span className="text-red-500">*</span> 正文
                                </label>
                            </div>
                            <div className="flex-1">
                                <RichText 
                                    defaultContent={content}
                                    placeholder="请输入正文内容..."
                                    onChange={setContent}
                                />
                            </div>
                        </div>

                        {/* 标签 */}
                        <div className="flex mt-12">
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
                                        {['日常记录', '生活', '知识分享', '游戏'].map(tag => (
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
                                    setContent('');
                                    setTags([]);
                                    setTagInput('');
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

