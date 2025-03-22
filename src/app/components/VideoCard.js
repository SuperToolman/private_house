'use client';

import Link from "next/link"
import Image from "next/image"
import { useResponsive } from "../contexts/ResponsiveContext";

export default function VideoCard({
    title = "默认标题",
    user = { id: 1, name: "默认用户" },
    coverUrl = "/images/default-cover.jpg",
    releaseData = "2024-01-01",
    playCount = 0,
    duration = "00:00",
    id = 1
}) {
    const { isMobile } = useResponsive();

    return (
        <div className="flex flex-col w-full h-full">
            <Link href={`/video/${user.id}`}>
                <div className={`w-full h-full rounded-lg overflow-hidden mb-2 relative ${isMobile ? 'aspect-video' : ''}`}>
                    <Image 
                        src={coverUrl} 
                        alt={title} 
                        width={0}
                        height={0}
                        sizes={isMobile ? "(max-width: 768px) 100vw" : "20vw"}
                        className="w-full h-full object-cover"
                        style={{ width: '100%', height: 'auto' }}
                        loading="lazy"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                        {duration}
                    </div>
                </div>
            </Link>
            
            <Link href={`/video/${id}`}>
                <div className={`pr-7 ${isMobile ? 'text-sm leading-5 min-h-[36px]' : 'text-[15px] leading-[22px] min-h-[44px]'} mb-2 line-clamp-2 break-all transition-colors duration-300 cursor-pointer hover:text-[#00AEEC]`}>
                    {title}
                </div>
            </Link>

            <Link href={`/space/${user?.id || 'default'}`}>
                <div className={`flex items-center text-[#9499a0] ${isMobile ? 'text-xs' : 'text-[13px]'} transition-colors duration-300 cursor-pointer hover:text-[#00AEEC]`}>
                    <div className="flex items-center">
                        <i className="iconfont icon-upzhu mr-[3px]"></i>
                        <span className={isMobile ? "text-[10px]" : "text-xs"}>{user?.name || "默认用户"}</span>
                    </div>
                    <div className="mx-[7px]">·</div>
                    <div>{releaseData}</div>
                </div>
            </Link>
        </div>
    )
}
