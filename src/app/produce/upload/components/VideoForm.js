import CoverSelector from './CoverSelector';
import TagInput from './TagInput';

export default function VideoForm({
    task,
    onUpdate,
    isCapturing,
    onRefreshCovers,
    onSubmitSingle,
    onSubmitAll
}) {
    const handleInputChange = (field, value) => {
        onUpdate({ ...task, [field]: value });
    };

    const handleTagAdd = (newTags) => {
        const updatedTags = [...new Set([...task.tags, ...newTags])].slice(0, 7);
        handleInputChange('tags', updatedTags);
    };

    const handleTagRemove = (tagToRemove) => {
        handleInputChange('tags', task.tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">基本设置</h2>
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
                            placeholder="请输入标题"
                            maxLength={80}
                            value={task.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                        />
                        <div className="text-right text-sm text-gray-500 mt-1">
                            {task.title.length}/80
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
                                    checked={task.type === '自制'}
                                    onChange={() => handleInputChange('type', '自制')}
                                    className="mr-2" 
                                />
                                自制
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="type" 
                                    checked={task.type === '转载'}
                                    onChange={() => handleInputChange('type', '转载')}
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
                            value={task.partition}
                            onChange={(e) => handleInputChange('partition', e.target.value)}
                        >
                            <option value="游戏">游戏</option>
                            <option value="生活">生活</option>
                            <option value="娱乐">娱乐</option>
                            <option value="动画">动画</option>
                            <option value="音乐">音乐</option>
                        </select>
                    </div>
                </div>

                {/* 封面 */}
                <div className="flex">
                    <div className="w-[100px] flex-shrink-0">
                        <label className="text-sm">
                            <span className="text-red-500">*</span> 封面
                        </label>
                    </div>
                    <div className="flex-1">
                        <CoverSelector
                            currentCover={task.cover}
                            coverImages={task.coverImages}
                            isCapturing={isCapturing}
                            onCoverSelect={(cover) => handleInputChange('cover', cover)}
                            onRefresh={onRefreshCovers}
                        />
                    </div>
                </div>

                {/* 标签 */}
                <div className="flex">
                    <div className="w-[100px] flex-shrink-0">
                        <label className="text-sm">
                            <span className="text-red-500">*</span> 标签
                        </label>
                    </div>
                    <div className="flex-1">
                        <TagInput
                            tags={task.tags}
                            onTagAdd={handleTagAdd}
                            onTagRemove={handleTagRemove}
                        />
                    </div>
                </div>

                {/* 简介 */}
                <div className="flex">
                    <div className="w-[100px] flex-shrink-0">
                        <label className="text-sm">简介</label>
                    </div>
                    <div className="flex-1">
                        <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded min-h-[100px]"
                            placeholder="填写更全面的相关信息，让更多人找到你的视频吧"
                            value={task.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                        />
                        <div className="text-right text-sm text-gray-500 mt-1">
                            {task.description?.length || 0}/2000
                        </div>
                    </div>
                </div>

                {/* 参与话题 */}
                <div className="flex">
                    <div className="w-[100px] flex-shrink-0">
                        <label className="text-sm">参与话题</label>
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-wrap gap-2">
                            <button className="px-4 py-1 bg-pink-50 text-pink-500 rounded-full text-sm">
                                推荐宝藏游戏 热门
                            </button>
                            <button className="px-4 py-1 bg-pink-50 text-pink-500 rounded-full text-sm">
                                欢迎回归天美旗舰重装上线 热门
                            </button>
                            <button className="px-4 py-1 bg-pink-50 text-pink-500 rounded-full text-sm">
                                万物皆可玩 热门
                            </button>
                        </div>
                        <div className="mt-2">
                            <button className="text-sm text-[#00aeec] hover:text-[#00a1d6]">
                                搜索更多话题 &gt;
                            </button>
                        </div>
                    </div>
                </div>

                {/* 按钮组 */}
                <div className="flex justify-center gap-4 mt-6">
                    <button 
                        onClick={onSubmitSingle}
                        className="px-8 py-2 bg-[#00aeec] text-white rounded hover:bg-[#00a1d6] transition-colors"
                    >
                        立即投稿
                    </button>
                    <button 
                        onClick={onSubmitAll}
                        className="px-8 py-2 border border-[#00aeec] text-[#00aeec] rounded hover:bg-[#00aeec] hover:text-white transition-colors"
                    >
                        投稿全部
                    </button>
                </div>
            </div>
        </div>
    );
} 