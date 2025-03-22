'use client';

import VideoRecommendCard from "./VideoRecommendCard";
import { useResponsive } from '../../../contexts/ResponsiveContext';

export default function VideoRecommendList({ recommendList, isMobile }) {
    const { isClient } = useResponsive();

    if (!isClient || !recommendList || recommendList.length === 0) {
        return null;
    }

    return (
        <div className="video-recommend-list-wrap">
            <div className={`${isMobile ? 'mb-3 pb-3' : 'mb-[12px] pb-[12px]'} border-b-[1px] border-[#e5e5e5]`}>
                <div className="flex items-center justify-between mb-[12px]">
                    <div className={`${isMobile ? 'text-[15px]' : 'text-[16px]'} text-[#18191c]`}>
                        接下来播放
                    </div>
                    <div className="text-[14px] text-[#9499a0] mr-[4px]">
                        自动联播
                    </div>
                </div>
                <VideoRecommendCard key={recommendList[0].id} videoEntity={recommendList[0]} isMobile={isMobile} />
            </div>
            <div className="video-recommend-list">
                {
                    recommendList.filter((item, index) => index !== 0).map((item) => (
                        <div key={item.id} className={`${isMobile ? 'mb-3' : 'mb-[12px]'}`}>
                            <VideoRecommendCard videoEntity={item} isMobile={isMobile} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
