'use client';
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState, useMemo } from "react";

export default function VideoCard({ videoEntity }) {
    const cardRef = useRef(null);
    const videoRef = useRef(null);
    const hoverTimeoutRef = useRef(null);
    const [mounted, setMounted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // 使用 useMemo 缓存视频 URL
    const videoUrl = useMemo(() => videoEntity.videoUrl, [videoEntity.videoUrl]);

    // 确保组件只在客户端渲染
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                if (!entry.isIntersecting && videoRef.current) {
                    handleVideoPause();
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
            handleVideoPause();
        };
    }, [mounted]);

    const handleVideoPause = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setIsPlaying(false);
            setIsLoading(false);
        }
    };

    const handleVideoPlay = async () => {
        if (!videoRef.current || !videoUrl || isLoading) return;
        
        setIsLoading(true);
        try {
            await videoRef.current.play();
            setIsPlaying(true);
        } catch (error) {
            console.error('Video playback error:', error);
            setIsPlaying(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMouseEnter = () => {
        if (isVisible && !isLoading) {
            setIsHovered(true);
            // 延迟0.5秒后播放视频
            hoverTimeoutRef.current = setTimeout(() => {
                handleVideoPlay();
            }, 500);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        handleVideoPause();
    };

    // 在服务器端渲染时只显示封面图
    if (!mounted) {
        return (
            <div className="video-card-wrap relative">
                <div className="video-card-cover">
                    <Link href={`/video/${videoEntity.id}`} prefetch={false}>
                        <div className="video-card-cover-img rounded-[10px] overflow-hidden w-full h-full relative">
                            <Image 
                                src={videoEntity.coverUrl} 
                                alt="video-cover" 
                                width={500} 
                                height={500}
                                className="opacity-100"
                                loading="lazy"
                            />
                        </div>
                    </Link>
                    <Link href={`/video/${videoEntity.id}`} prefetch={false}>
                        <div className="hover:text-[#00aeec] transition-colors duration-300 video-card-title text-[13px] text-[#18191c] mt-[10px]">
                            <span>{videoEntity.title}</span>
                        </div>
                    </Link>
                    <div className="video-card-release-time text-[12px] text-[#9499a0] mt-[4px]">
                        <span>{videoEntity.releaseData}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div ref={cardRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="video-card-wrap relative">
                <div className="video-card-cover">
                    <Link href={`/video/${videoEntity.id}`} prefetch={false}>
                        <div className="video-card-cover-img rounded-[10px] overflow-hidden w-full h-full relative">
                            <Image 
                                src={videoEntity.coverUrl} 
                                alt="video-cover" 
                                width={500} 
                                height={500}
                                className={`transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
                                loading="lazy"
                            />
                            {isVisible && videoUrl && (
                                <video
                                    ref={videoRef}
                                    src={videoUrl}
                                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
                                    muted
                                    playsInline
                                    preload="none"
                                />
                            )}
                        </div>
                    </Link>
                    <Link href={`/video/${videoEntity.id}`} prefetch={false}>
                        <div className="hover:text-[#00aeec] transition-colors duration-300 video-card-title text-[13px] text-[#18191c] mt-[10px]">
                            <span>{videoEntity.title}</span>
                        </div>
                    </Link>
                    <div className="video-card-release-time text-[12px] text-[#9499a0] mt-[4px]">
                        <span>{videoEntity.releaseData}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
