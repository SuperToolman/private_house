import Link from 'next/link'
import Image from 'next/image'
export default function VideoRecommendCard({videoEntity}){
    return (
        <div className="video-recommend-card">
            <div className="flex">
                <div className="w-[189px] h-[107px] mr-[10px] rounded-[7px] overflow-hidden">
                    <Link href={`/video/${videoEntity.id}`}>
                        <Image src={videoEntity.coverUrl} alt="" className="w-full h-full object-cover" width={200} height={200}/>
                    </Link>
                </div>
                <div className="flex-1">
                    <div className="text-[16px] text-[#18191c] font-weight-[500]">
                        <Link href={`/video/${videoEntity.id}`} className="hover:text-[#00aeec] transition-all duration-300 cursor-pointer">
                            {videoEntity.title}
                        </Link>
                    </div>
                    <div className="text-[14px] text-[#9499a0]">
                        <Link href={`/space/${videoEntity.user.id}`} className="hover:text-[#00aeec] transition-all duration-300 cursor-pointer">
                            <i className="iconfont icon-upzhu mr-[3px]" style={{fontSize: '16px'}}></i>
                            <span>{videoEntity.user.name}</span>
                        </Link>
                    </div>
                    <div className="flex text-[14px] text-[#9499a0]">
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
