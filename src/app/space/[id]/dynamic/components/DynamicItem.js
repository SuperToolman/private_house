'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const DynamicItem = ({ item }) => {
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

    if (!item) return null;

    // 确保用户信息存在
    const user = item.user || { id: 0, name: '未知用户', avatar: null };
    // 确保内容信息存在
    const content = item.content || {};

    return (
        <div className="dynamic-item">
            <div className="flex items-start">
                <Link href={`/space/${user.id}`} className="shrink-0">
                    <Image
                        src={user.avatar || '/images/default-avatar.webp'}
                        alt={user.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                    />
                </Link>
                <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Link href={`/space/${user.id}`} className="text-[#18191c] font-medium hover:text-[#00aeec]">
                                {user.name}
                            </Link>
                            <span className="text-[#9499a0] text-sm ml-2">{item.createTime || '未知时间'}</span>
                        </div>
                        <div className="text-[#9499a0] cursor-pointer hover:text-[#00aeec]">
                            <i className="iconfont icon-more text-xl"></i>
                        </div>
                    </div>

                    {item.type === 'video' && content && (
                        <div className="mt-3">
                            <Link href={`/video/${content.videoId || item.id}`} className="block">
                                <div className='w-full flex bg-[#f6f7f8] rounded-[10px] border border-[#e3e5e7]'>
                                    <div className="relative w-[236px] h-[132px] rounded-lg overflow-hidden">
                                        <Image
                                            src={content.coverUrl || '/images/default-cover.webp'}
                                            alt={content.title || '视频'}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                                            {content.duration || '00:00'}
                                        </div>
                                    </div>
                                    <div className="ml-3 mt-3 text-[15px] text-[#18191c] hover:text-[#00aeec]">
                                        <div className='text-[15px] text-[#18191c] hover:text-[#00aeec]'>
                                            {content.title || '未知标题'}
                                        </div>
                                        <div className='mt-[6px] text-[13px] text-[#9499a0]'>
                                            {content.desc || ''}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div className="mt-3 flex items-center text-[14px] text-[#9499a0] pt-3">
                                <div className="flex items-center cursor-pointer hover:text-[#00aeec]">
                                    <i className="iconfont icon-info-zhuanfa mr-1"></i>
                                    <span>{content.shareCount || 0}</span>
                                </div>
                                <div className="flex items-center ml-8 cursor-pointer hover:text-[#00aeec]">
                                    <i className="iconfont icon-pinglun mr-1"></i>
                                    <span>{content.commentCount || 0}</span>
                                </div>
                                <div className="flex items-center ml-8 cursor-pointer hover:text-[#00aeec]" onClick={handleLike}>
                                    <i className={`iconfont icon-info-dianzhan mr-1 ${liked ? 'text-[#00aeec]' : ''}`}></i>
                                    <span>{content.likeCount || 0}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {item.type === 'share' && content && (
                        <div className="mt-3">
                            <div className="flex items-center">
                                {[...Array(content.rating || 0)].map((_, index) => (
                                    <i key={index} className="iconfont icon-star text-[#ffa726]"></i>
                                ))}
                                <span className="ml-2">无敌，，</span>
                            </div>
                            <div className="mt-3 bg-[#f6f7f8] p-3 rounded-lg">
                                <div className="text-[#18191c] font-medium">{content.title || '未知内容'}</div>
                                {content.gameInfo && (
                                    <div className="mt-2 text-[14px] text-[#9499a0]">
                                        <span>{content.gameInfo.score || '0.0'}</span>
                                        <span className="mx-2">·</span>
                                        <span>{content.gameInfo.players || '0人评价'}</span>
                                        <span className="mx-2">·</span>
                                        <span>{content.gameInfo.status || '未知状态'}</span>
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 flex items-center text-[14px] text-[#9499a0] pt-3">
                                <div className="flex items-center cursor-pointer hover:text-[#00aeec]">
                                    <i className="iconfont icon-info-zhuanfa mr-1"></i>
                                    <span>{content.shareCount || 0}</span>
                                </div>
                                <div className="flex items-center ml-8 cursor-pointer hover:text-[#00aeec]">
                                    <i className="iconfont icon-pinglun mr-1"></i>
                                    <span>{content.commentCount || 0}</span>
                                </div>
                                <div className="flex items-center ml-8 cursor-pointer hover:text-[#00aeec]" onClick={handleLike}>
                                    <i className={`iconfont icon-info-dianzhan mr-1 ${liked ? 'text-[#00aeec]' : ''}`}></i>
                                    <span>{content.likeCount || 0}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DynamicItem; 