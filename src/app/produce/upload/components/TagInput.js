import React, { useState } from 'react';

export default function TagInput({ 
    tags, 
    onTagAdd, 
    onTagRemove,
    suggestedTags = [
        { name: '生活记录', hot: true },
        { name: '直播', hot: true },
        { name: '记录', hot: false },
        { name: '学习', hot: false }
    ]
}) {
    const [tagInput, setTagInput] = useState('');

    const handleTagInput = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            const newTags = tagInput.split(',').map(tag => tag.trim()).filter(tag => tag);
            onTagAdd(newTags);
            setTagInput('');
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                    <button 
                        key={tag}
                        className="px-3 py-1 bg-[#00aeec] text-white rounded text-sm"
                        onClick={() => onTagRemove(tag)}
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
                {suggestedTags.map(tag => (
                    <button 
                        key={tag.name}
                        className="text-sm text-[#00aeec] ml-2 hover:text-[#00a1d6]"
                        onClick={() => {
                            if (tags.length < 7) {
                                onTagAdd([tag.name]);
                            }
                        }}
                    >
                        {tag.name}
                    </button>
                ))}
            </div>
        </div>
    );
} 