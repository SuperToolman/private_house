'use client';

import VideoRecommendCard from "./VideoRecommendCard"

export default function VideoRecommendList({recommendList}){
    return (
        <div className="video-recommend-list-wrap">
            <div className="mb-[12px] pb-[12px] border-b-[1px] border-[#e5e5e5]">
                <div className="flex items-center justify-space-between mb-[12px]">
                    <div className="text-[16px] text-[#18191c]">
                        接下来播放
                    </div>
                    <div className="text-[14px] text-[#9499a0] mr-[4px]">
                        自动联播
                    </div>
                </div>
                <VideoRecommendCard key={recommendList[0].id} videoEntity={recommendList[0]} />
            </div>
            <div className="video-recommend-list">
                {
                    recommendList.filter((item,index)=>index !== 0).map((item)=>(
                        <div key={item.id} className="mb-[12px]">
                            <VideoRecommendCard videoEntity={item} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
