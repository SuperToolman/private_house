'use client';
import Image from 'next/image';
import Link from 'next/link';

const CollectCard = ({ collection }) => {
    return (
        <div className="collect-card bg-white rounded-lg p-4">
            <Link href={`/collect/${collection.id}`} className="block group">
                <div className="flex">
                    {/* 左侧封面（使用收藏夹第一个视频的封面） */}
                    <div className="relative w-[200px] h-[125px] rounded-lg overflow-hidden">
                        <Image
                            src={collection.firstVideoCover}
                            alt={collection.title}
                            width={200}
                            height={125}
                            className="object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <i className="iconfont icon-play-fill text-white text-3xl"></i>
                        </div>
                    </div>

                    {/* 右侧信息 */}
                    <div className="flex-1 ml-4">
                        <div className="flex items-center mb-2">
                            <h3 className="text-[16px] font-medium text-[#18191c] group-hover:text-[#00aeec]">
                                {collection.title}
                            </h3>
                            <span className={`ml-2 px-2 py-0.5 rounded text-[12px] ${
                                collection.isPrivate 
                                    ? 'bg-[#f6f7f8] text-[#9499a0]' 
                                    : 'bg-[#e3f6ff] text-[#00aeec]'
                            }`}>
                                <i className={`iconfont ${collection.isPrivate ? 'icon-lock' : 'icon-public'} mr-1`}></i>
                                {collection.isPrivate ? '私密' : '公开'}
                            </span>
                        </div>
                        <div className="text-[14px] text-[#9499a0] mb-4 line-clamp-1">
                            {collection.description}
                        </div>
                        <div className="flex items-center text-[12px] text-[#9499a0]">
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
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CollectCard; 