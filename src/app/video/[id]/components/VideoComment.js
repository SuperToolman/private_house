import Image from "next/image"
import { useResponsive } from '../../../contexts/ResponsiveContext';

export default function VideoComment({ commentItems }) {
    const { isMobile, isClient } = useResponsive();
    
    if (!isClient || !commentItems || commentItems.length === 0) {
        return null;
    }
    
    return (
        <div className="space-y-2.5">
            {commentItems.map((item) => (
                <div className="flex mb-2.5" key={item.id}>
                    {/* 发言者头像 */}
                    <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-full overflow-hidden ${isMobile ? 'mr-3' : 'mr-[15px]'}`}>
                        <Image 
                            src={item.userItem.avatarUrl} 
                            alt="User avatar" 
                            width={isMobile ? 40 : 48}
                            height={isMobile ? 40 : 48}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* 发言内容 */}
                    <div className="flex-1 space-y-2.5 pb-2.5 mb-2.5 border-b border-[#e5e5e5]">
                        <div className={`${isMobile ? 'text-[12px]' : 'text-[13px]'} text-[#61666d] h-[30px] flex items-center`}>
                            {item.userItem.name}
                        </div>
                        <div className={`${isMobile ? 'text-[14px]' : 'text-[15px]'} text-[#18191C]`}>
                            {item.content}
                        </div>
                        {/* 评论数据 */}
                        <div className={`flex ${isMobile ? 'text-[12px]' : 'text-[13px]'} text-[#9499a0]`}>
                            <div className="mr-5">{item.releaseTime}</div>
                            <div>{item.likeCount}</div>
                        </div>
                        {/* 子评论 */}
                        <div className="mt-2.5">
                            {item.children && item.children.length > 0 && (
                                <VideoComment commentItems={item.children}/>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
