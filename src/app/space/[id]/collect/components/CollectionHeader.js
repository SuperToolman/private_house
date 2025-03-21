'use client';
import Image from 'next/image';

const CollectionHeader = ({ collection }) => {
    return (
        <div className="collection-header bg-white rounded-lg p-4 mb-4 shadow-lg">
            <div className="flex items-center">
                {/* 左侧封面和操作按钮 */}
                <div className="w-[240px] flex-shrink-0">
                    {/* 封面图 */}
                    <div className="relative w-[240px] h-[150px] rounded-lg overflow-hidden">
                        <Image
                            src={collection.firstVideoCover || '/images/testcover.webp'}
                            alt={collection.title || '收藏夹'}
                            fill   
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* 右侧信息 */}
                <div className="flex-1 ml-4">
                    <div className="flex items-center">
                        <h2 className="text-[18px] font-medium text-[#18191c]">
                            {collection.title}
                        </h2>
                        <span className={`ml-2 px-2 py-0.5 rounded text-[12px] ${collection.isPrivate
                                ? 'bg-[#f6f7f8] text-[#9499a0]'
                                : 'bg-[#e3f6ff] text-[#00aeec]'
                            }`}>
                            <i className={`iconfont ${collection.isPrivate ? 'icon-lock' : 'icon-public'} mr-1`}></i>
                            {collection.isPrivate ? '私密' : '公开'}
                        </span>
                    </div>
                    <div className="flex items-center mt-3 text-[14px] text-[#9499a0]">
                        <div className="flex items-center">
                            <i className="iconfont icon-video mr-1"></i>
                            <span>{collection.videoCount}个内容</span>
                        </div>
                        <div className="flex items-center ml-4">
                            <i className="iconfont icon-play-count-fill mr-1"></i>
                            <span>{collection.totalViews}次播放</span>
                        </div>
                        <div className="ml-4">
                            {collection.updateTime}更新
                        </div>
                    </div>
                    <div className="mt-4 text-[14px] text-[#61666d]">
                        {collection.description || '暂无简介'}
                    </div>
                    {/* 操作按钮 */}
                    <div className="flex items-center mt-3 space-x-2 w-full">
                        <button className="w-[100px] flex items-center justify-center h-[32px] bg-[#00aeec] text-white text-[14px] rounded">
                            <i className="iconfont icon-play-fill mr-1"></i>
                            <span>播放全部</span>
                        </button>
                        <button className="bg-white border border-[#e3e5e7] py-[6px] px-[15px] rounded-lg flex items-center justify-center text-[14px] text-[#18191c] hover:bg-[#f5f5f5] transition-colors duration-200">
                            <i className="iconfont icon-info-dianzhan mr-1"></i>
                            <span>点赞</span>
                        </button>
                        <button className="bg-white border border-[#e3e5e7] py-[6px] px-[15px] rounded-lg flex items-center justify-center text-[14px] text-[#18191c] hover:bg-[#f5f5f5] transition-colors duration-200">
                            <i className="iconfont icon-info-shouchang"></i>
                            <span>收藏</span>
                        </button>
                        <button className="bg-white border border-[#e3e5e7] py-[6px] px-[15px] rounded-lg flex items-center justify-center text-[14px] text-[#18191c] hover:bg-[#f5f5f5] transition-colors duration-200">
                            <i className="iconfont icon-info-zhuanfa"></i>
                            <span>转发</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollectionHeader; 