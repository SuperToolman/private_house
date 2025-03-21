import Image from "next/image";
import Link from "next/link";
import RecommandVideoSwipe from "./components/RecommandVideoSwipe";
import VideoCard from "./components/VideoCard";

export default function Home() {
  // 视频集合测试数组(标题、用户实体（姓名）、发布日期、播放量、视频时长)
  const testVideoObject = {
    title: '公理秘术中单机器人毁了快速匹配！！大招影焰暴击电人爽的一！！',
    user: { id: 1, name: '测试用户' },
    releaseData: '2024-01-01',
    playCount: 1000,
    duration: '10:00',
    coverUrl: '/images/testcover.webp',
    videoUrl: 'http://localhost:9080/GM99%E4%BC%A0%E6%95%99%E5%A3%ABqw%E5%94%90%E7%8E%A7.mp4',
    id: 1
  }

  return (
    <>
      <div className="w-full h-[175.5px] bg-gray-100"></div>
      <div className="w-full h-full px-[140px] flex flex-col">
        {/* 菜单导航栏 */}
        <div className="h-20 my-5 flex">
          <div className="flex mr-5">
            <Link href="/" className="mr-4 flex flex-col items-center inline-block">
              <i className="iconfont icon-channel_dyanmic mb-1.5 icon-large" style={{fontSize:'46px'}}></i>
              <span>动态</span>
            </Link>
            <Link href="/" className="mr-4 flex flex-col items-center inline-block">
              <i className="iconfont icon-channel_hot mb-1.5 icon-large" style={{fontSize:'44px'}}></i>
              <span>热门</span>
            </Link>
          </div>
          <div className="flex-1 flex">
            <div className="flex-1 grid grid-flow-col grid-cols-12 grid-rows-2 gap-2.5 pr-8 mr-4 border-r border-gray-200">
              {Array.from({ length: 24 }).map((_, index) => (
                <Link 
                  key={index} 
                  href="/" 
                  className="inline-block w-full h-full border border-gray-200 rounded-md bg-gray-50 text-gray-600 text-center transition-colors duration-300 hover:text-gray-900 hover:bg-gray-200 flex flex-col items-center justify-center"
                >
                  <i className="iconfont icon-channel_dynamic text-[46px] mb-1.5"></i>
                  <span>测试</span>
                </Link>
              ))}
            </div>
            <div className="grid grid-flow-col grid-rows-2 gap-2.5 w-[168px] flex-shrink-0">
              <Link href="/" className="flex items-center justify-end text-gray-600 transition-colors duration-300 hover:text-gray-900">专栏</Link>
              <Link href="/" className="flex items-center justify-end text-gray-600 transition-colors duration-300 hover:text-gray-900">直播</Link>
              <Link href="/" className="flex items-center justify-end text-gray-600 transition-colors duration-300 hover:text-gray-900">相簿</Link>
              <Link href="/" className="flex items-center justify-end text-gray-600 transition-colors duration-300 hover:text-gray-900">会员购</Link>
              <Link href="/" className="flex items-center justify-end text-gray-600 transition-colors duration-300 hover:text-gray-900">赛事</Link>
              <Link href="/" className="flex items-center justify-end text-gray-600 transition-colors duration-300 hover:text-gray-900">会员购</Link>
            </div>
          </div>
        </div>

        {/* 轮播图与推荐视频 */}
        <div className="grid grid-cols-5 gap-2.5">
          <div className="col-span-2 row-span-2 w-full h-full">
            <RecommandVideoSwipe />
          </div>
          {Array.from({ length: 16 }).map((_, index) => (
            <div key={index}>
              <VideoCard {...testVideoObject} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
