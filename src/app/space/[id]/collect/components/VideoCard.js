'use client';
import Image from 'next/image';
import Link from 'next/link';

const VideoCard = ({ video }) => {
    return (
        <div className="video-card">
            <Link href={`/video/${video.id}`} className="block group">
                {/* 封面 */}
                <div className="relative rounded-lg overflow-hidden">
                    <Image
                        src={video.coverUrl || '/images/testcover.webp'}
                        alt={video.title || '视频'}
                        width={224}
                        height={140}
                        className="w-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                        {video.duration}
                    </div>
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <i className="iconfont icon-play-fill text-white text-3xl"></i>
                    </div>
                </div>

                {/* 视频信息 */}
                <div className="mt-3">
                    <div className="text-[14px] text-[#18191c] line-clamp-2 group-hover:text-[#00aeec]">
                        {video.title}
                    </div>
                    <div className="mt-2 flex items-center text-[12px] text-[#9499a0]">
                        <div className="flex items-center">
                            <i className="iconfont icon-play-count-fill mr-1"></i>
                            <span>{video.views}</span>
                        </div>
                        <div className="flex items-center ml-3">
                            <i className="iconfont icon-danmu mr-1"></i>
                            <span>{video.danmu}</span>
                        </div>
                        <div className="ml-3">
                            收藏于{video.collectTime}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default VideoCard; 