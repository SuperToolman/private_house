// 这个组件为VideoCard2为左右布局，推荐列表等。。

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

export default function VideoCard2({ videoEntity, isMobile }) {
    const [isHovering, setIsHovering] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef(null);
    const hoverTimeoutRef = useRef(null);
    const mediaContainerRef = useRef(null);

    // 处理鼠标悬停，添加延迟避免快速划过时不必要的加载
    const handleMouseEnter = () => {
        if (isMobile) return; // 移动设备不触发预览

        hoverTimeoutRef.current = setTimeout(() => {
            setIsHovering(true);
        }, 300);
    };

    // 处理鼠标离开，立即停止预览并重置视频
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

    // 当鼠标悬停且视频已加载时播放视频
    useEffect(() => {
        if (isHovering && videoRef.current && videoLoaded) {
            const playPromise = videoRef.current.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // 自动播放策略阻止时静默失败，不影响用户体验
                    console.log("Video autoplay prevented:", error);
                });
            }
        }
    }, [isHovering, videoLoaded]);

    return (
        <div className="video-recommend-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex">
                <div 
                    ref={mediaContainerRef}
                    className={`${isMobile ? 'w-[120px] h-[70px]' : 'w-[189px] h-[107px]'} mr-[10px] rounded-[7px] overflow-hidden relative`}
                >
                    <Link href={`/video/${videoEntity.id}`}>
                        {/* 封面图始终存在 */}
                        <Image 
                            src={videoEntity.coverUrl} 
                            alt=""
                            className={`w-full h-full object-cover transition-opacity duration-300 ${isHovering && videoLoaded ? 'opacity-0' : 'opacity-100'}`} 
                            width={200} 
                            height={200}
                        />
                        
                        {/* 仅在悬停时加载预览视频 */}
                        {isHovering && videoEntity.previewUrl && (
                            <video 
                                ref={videoRef}
                                className="absolute inset-0 w-full h-full object-cover z-10"
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                onLoadedData={() => setVideoLoaded(true)}
                                onError={() => setVideoLoaded(false)}
                            >
                                <source src={videoEntity.previewUrl || ''} type="video/mp4" />
                            </video>
                        )}
                        
                        {/* 时长指示器 */}
                        {videoEntity.duration && (
                            <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded z-20">
                                {videoEntity.duration}
                            </div>
                        )}
                    </Link>
                </div>
                <div className="flex-1">
                    <div className={`${isMobile ? 'text-[14px]' : 'text-[16px]'} text-[#18191c] font-weight-[500] line-clamp-2`}>
                        <Link href={`/video/${videoEntity.id}`} className="hover:text-[#00aeec] transition-all duration-300 cursor-pointer">
                            {videoEntity.title}
                        </Link>
                    </div>
                    <div className={`${isMobile ? 'text-[12px]' : 'text-[14px]'} text-[#9499a0]`}>
                        <Link href={`/space/${videoEntity.user.id}`} className="hover:text-[#00aeec] transition-all duration-300 cursor-pointer">
                            <i className="iconfont icon-upzhu mr-[3px]" style={{fontSize: isMobile ? '14px' : '16px'}}></i>
                            <span>{videoEntity.user.name}</span>
                        </Link>
                    </div>
                    <div className={`flex ${isMobile ? 'text-[12px]' : 'text-[14px]'} text-[#9499a0]`}>
                        <div className="flex items-center mr-[10px] justify-center space-x-[3px]">
                            <i className="iconfont icon-movie"></i>
                            <span className="mt-[2px]">{videoEntity.playCount}</span>
                        </div>
                        {/* 弹幕数量 */}
                        <div className="flex items-center mr-[10px] justify-center space-x-[3px]">
                            <i className="iconfont icon-danmu-count text-[15px]"></i>
                            <span className="mt-[2px]">{videoEntity.dmCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
