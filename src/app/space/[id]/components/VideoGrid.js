import VideoCardByHeader from "./VideoCardByHeader";
import VideoCard from "./VideoCard";

export default function VideoGrid({ videoItems, gridTitle, isShowBig = false, isMobile }) {
    return (
        <div className="w-full">
            <div className={`video-masterpiece-wrap flex ${isMobile ? 'flex-col items-start' : 'items-center justify-between'} mb-[13px]`}>
                <div className={`left flex ${isMobile ? 'flex-col items-start' : 'items-center'}`}>
                    <div className={`video-masterpiece-title ${isMobile ? 'text-lg' : 'text-[24px]'} text-[#18191c] font-bold flex items-center`}>
                        <span>{gridTitle}</span>
                        {!isShowBig && (
                            <>
                                <span className="mx-[10px] text-[16px] text-[#61666d]">
                                    ·
                                </span>
                                <span className="video-grid-count text-[16px] text-[#61666d]">
                                    {videoItems.length}
                                </span>
                            </>
                        )}
                    </div>
                    {/* 筛选控制器 - 桌面端才显示 */}
                    {
                        !isShowBig && !isMobile && (
                            <div className="video-grid-filter space-x-[10px] ml-[40px]">
                                <button className="video-grid-filter-button bg-[#f6f7f8] text-[14px] text-[#61666d] px-[15px] py-[5px] rounded-[5px]">最新发布</button>
                                <button className="video-grid-filter-button bg-[#f6f7f8] text-[14px] text-[#61666d] px-[15px] py-[5px] rounded-[5px]">最多播放</button>
                                <button className="video-grid-filter-button bg-[#f6f7f8] text-[14px] text-[#61666d] px-[15px] py-[5px] rounded-[5px]">最多点赞</button>
                            </div>
                        )
                    }
                </div>
                <div className={`right flex items-center space-x-[10px] ${isMobile ? 'mt-2' : ''}`}>
                    {
                        !isShowBig && (
                            <>
                                <button className="video-grid-filter-button bg-[#fff] text-[14px] text-[#18191c] px-[15px] py-[5px] rounded-[5px] border border-[#e5e5e5]">
                                    <span>播放全部</span>
                                </button>
                                <button className="video-grid-filter-button bg-[#fff] text-[14px] text-[#18191c] px-[15px] py-[5px] rounded-[5px] border border-[#e5e5e5]">
                                    <span>查看更多</span>
                                </button>
                            </>
                        )
                    }
                </div>
            </div>
            {
                isShowBig ? (
                    <div className={`video-grid-wrap grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
                        {
                            videoItems.map((item, index) => (
                                <VideoCardByHeader key={index} videoEntity={item} isMobile={isMobile} />
                            ))
                        }
                    </div>

                ) : (
                    <div className={`video-grid-wrap grid ${isMobile ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'} gap-4`}>
                        {
                            videoItems.map((item, index) => (
                                <VideoCard key={index} videoEntity={item} isMobile={isMobile} />
                            ))
                        }
                    </div>
                )
            }
            
            {/* 移动端显示小型筛选器 */}
            {
                !isShowBig && isMobile && (
                    <div className="video-grid-filter-mobile mt-4 flex items-center justify-center space-x-2">
                        <button className="video-grid-filter-button bg-[#f6f7f8] text-xs text-[#61666d] px-3 py-1 rounded-[5px]">最新</button>
                        <button className="video-grid-filter-button bg-[#f6f7f8] text-xs text-[#61666d] px-3 py-1 rounded-[5px]">最多播放</button>
                        <button className="video-grid-filter-button bg-[#f6f7f8] text-xs text-[#61666d] px-3 py-1 rounded-[5px]">最多点赞</button>
                    </div>
                )
            }
        </div>
    )
}
