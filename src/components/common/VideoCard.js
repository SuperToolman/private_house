'use client';

import Link from "next/link"
import Image from "next/image"
import { useResponsive } from "@contexts/ResponsiveContext";
import { useState, useRef, useEffect } from "react";

export default function VideoCard({ videoEntity = {
    title: "默认标题",
    user: { id: 1, name: "默认用户" },
    coverUrl: "/images/default-cover.jpg",
    previewUrl: "", // 预览视频的URL
    releaseData: "2024-01-01",
    playCount: 0,
    duration: "00:00",
    id: 1
} }) {
    const { isMobile } = useResponsive();
    const [isHovering, setIsHovering] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef(null);
    const hoverTimeoutRef = useRef(null);
    const mediaContainerRef = useRef(null);

    // 处理鼠标悬停
    const handleMouseEnter = () => {
        if (isMobile) return; // 移动设备不触发预览
        
        // 延迟200ms后加载视频，避免鼠标快速划过时不必要的加载
        hoverTimeoutRef.current = setTimeout(() => {
            setIsHovering(true);
        }, 200);
    };

    // 处理鼠标离开
    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        setIsHovering(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    // 当视频元素存在且悬停时播放视频
    useEffect(() => {
        if (isHovering && videoRef.current && videoLoaded) {
            videoRef.current.play().catch(e => console.log("视频自动播放失败:", e));
        }
    }, [isHovering, videoLoaded]);

    return (
        <div 
            className="flex flex-col w-full h-full" 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link href={`/video/${videoEntity.id}`}>
                <div 
                    ref={mediaContainerRef}
                    className={`w-full h-full rounded-lg overflow-hidden mb-2 relative ${isMobile ? 'aspect-video' : ''}`}
                >
                    {/* 始终显示封面图 */}
                    <Image
                        src={videoEntity.coverUrl}
                        alt={videoEntity.title}
                        width={0}
                        height={0}
                        sizes={isMobile ? "(max-width: 768px) 100vw" : "20vw"}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${isHovering && videoLoaded ? 'opacity-0' : 'opacity-100'}`}
                        style={{ width: '100%', height: '100%' }}
                        loading="lazy"
                    />
                    
                    {/* 当鼠标悬停时加载预览视频 */}
                    {(isHovering && videoEntity.previewUrl) && (
                        <video className="absolute inset-0 w-full h-full object-cover rounded-lg"
                            ref={videoRef}
                            muted
                            loop
                            playsInline
                            onLoadedData={() => setVideoLoaded(true)}
                            onError={() => setVideoLoaded(false)}
                        >
                            <source src={videoEntity.previewUrl} type="video/mp4" />
                        </video>
                    )}
                    
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                        {videoEntity.duration}
                    </div>
                </div>
            </Link>
            
            {/* 标题 */}
            <Link href={`/video/${videoEntity.id}`}>
                <div className={`pr-7 ${isMobile ? 'text-sm leading-5 min-h-[36px]' : 'text-[15px] leading-[22px] min-h-[44px]'} mb-2 line-clamp-2 break-all transition-colors duration-300 cursor-pointer hover:text-[#00AEEC]`}>
                    {videoEntity.title}
                </div>
            </Link>

            {/* 卡片信息 */}
            <Link href={`/space/${videoEntity.user.id || 'default'}`}>
                <div className={`flex items-center text-[#9499a0] ${isMobile ? 'text-xs' : 'text-[13px]'} transition-colors duration-300 cursor-pointer hover:text-[#00AEEC]`}>
                    <div className="flex items-center">
                        <i className="iconfont icon-upzhu mr-[3px]"></i>
                        <span className={isMobile ? "text-[10px]" : "text-xs"}>{videoEntity.user.name || "默认用户"}</span>
                    </div>
                    <div className="mx-[7px]">·</div>
                    <div>{videoEntity.releaseData}</div>
                </div>
            </Link>
        </div>
    )
}
