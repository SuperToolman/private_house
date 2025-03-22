import Image from "next/image";
import Link from "next/link";
import RecommandVideoSwipe from "./components/RecommandVideoSwipe";
import VideoCard from "./components/VideoCard";

export default function Home() {
  // 视频测试数据列表 - 16条数据
  const testVideos = [
    {
      id: 1,
      title: '公理秘术中单机器人毁了快速匹配！大招影焰暴击电人爽的一！',
      user: { id: 1, name: '电竞小王子' },
      releaseData: '2024-03-21',
      playCount: 23567,
      duration: '10:23',
      coverUrl: '/images/test_videoCard_cover (1).avif'
    },
    {
      id: 2,
      title: '挑战24小时不睡觉玩原神！最后竟然抽到了...',
      user: { id: 2, name: '游戏达人' },
      releaseData: '2024-03-20',
      playCount: 156789,
      duration: '18:45',
      coverUrl: '/images/test_videoCard_cover (2).avif'
    },
    {
      id: 3,
      title: '这才是真正的日式烤肉，一口下去满嘴流油！',
      user: { id: 3, name: '美食猎人' },
      releaseData: '2024-03-19',
      playCount: 89752,
      duration: '08:32',
      coverUrl: '/images/test_videoCard_cover (3).avif'
    },
    {
      id: 4,
      title: '当我第五次尝试通关只狼后发生的事情...',
      user: { id: 4, name: '魂系玩家' },
      releaseData: '2024-03-18',
      playCount: 45678,
      duration: '15:20',
      coverUrl: '/images/test_videoCard_cover (4).avif'
    },
    {
      id: 5,
      title: '八重神子角色解析，这些隐藏技巧99%的玩家不知道',
      user: { id: 5, name: '原神攻略' },
      releaseData: '2024-03-17',
      playCount: 112345,
      duration: '12:50',
      coverUrl: '/images/test_videoCard_cover (5).avif'
    },
    {
      id: 6,
      title: '自制超强GTX4090散热器，温度直降30度！',
      user: { id: 6, name: '硬件研究所' },
      releaseData: '2024-03-16',
      playCount: 67890,
      duration: '14:32',
      coverUrl: '/images/test_videoCard_cover (6).avif'
    },
    {
      id: 7,
      title: '2024最值得期待的十部动画，第一名居然是它！',
      user: { id: 7, name: '动漫档案馆' },
      releaseData: '2024-03-15',
      playCount: 234567,
      duration: '16:49',
      coverUrl: '/images/test_videoCard_cover (7).avif'
    },
    {
      id: 8,
      title: '三分钟学会卷发技巧，再也不用去理发店',
      user: { id: 8, name: '美妆达人' },
      releaseData: '2024-03-14',
      playCount: 98765,
      duration: '03:28',
      coverUrl: '/images/test_videoCard_cover (8).avif'
    },
    {
      id: 9,
      title: '街头篮球实战技巧，让你成为场上的焦点',
      user: { id: 9, name: '篮球教练' },
      releaseData: '2024-03-13',
      playCount: 54321,
      duration: '09:15',
      coverUrl: '/images/test_videoCard_cover (9).avif'
    },
    {
      id: 10,
      title: '这些平价耳机音质竟然超越万元设备？实测对比',
      user: { id: 10, name: '音频测评' },
      releaseData: '2024-03-12',
      playCount: 87654,
      duration: '11:22',
      coverUrl: '/images/test_videoCard_cover (10).avif'
    },
    {
      id: 11,
      title: '一人食简易料理，十分钟搞定一周午餐',
      user: { id: 11, name: '独居美食家' },
      releaseData: '2024-03-11',
      playCount: 123456,
      duration: '07:46',
      coverUrl: '/images/test_videoCard_cover (11).avif'
    },
    {
      id: 12,
      title: '我用AI生成了一部完整动画，结果惊人',
      user: { id: 12, name: 'AI创作者' },
      releaseData: '2024-03-10',
      playCount: 345678,
      duration: '13:37',
      coverUrl: '/images/test_videoCard_cover (12).avif'
    },
    {
      id: 13,
      title: '这才是CS2职业选手的真实水平，一枪爆头',
      user: { id: 13, name: '电竞解说' },
      releaseData: '2024-03-09',
      playCount: 76543,
      duration: '09:58',
      coverUrl: '/images/test_videoCard_cover (13).avif'
    },
    {
      id: 14,
      title: '探秘日本工匠文化，百年家族的坚守与传承',
      user: { id: 14, name: '文化记录者' },
      releaseData: '2024-03-08',
      playCount: 55555,
      duration: '20:15',
      coverUrl: '/images/test_videoCard_cover (14).avif'
    },
    {
      id: 15,
      title: '三天学会吉他弹唱，从零基础到能秀技',
      user: { id: 15, name: '音乐老师' },
      releaseData: '2024-03-07',
      playCount: 88888,
      duration: '17:23',
      coverUrl: '/images/test_videoCard_cover (15).avif'
    },
    {
      id: 16,
      title: '当we遇上edg，最精彩的团战集锦',
      user: { id: 16, name: 'LPL官方' },
      releaseData: '2024-03-06',
      playCount: 999999,
      duration: '08:51',
      coverUrl: '/images/test_videoCard_cover (16).avif'
    }
  ];

  // 模拟分区数据
  const categories = [
    { id: 0, name: '全部' },
    { id: 1, name: '番剧' },
    { id: 2, name: '国创' },
    { id: 3, name: '综艺' },
    { id: 4, name: '动画' },
    { id: 5, name: '鬼畜' },
    { id: 6, name: '音乐' },
    { id: 7, name: '舞蹈' },
    { id: 8, name: '游戏' },
    { id: 9, name: '科技' },
    { id: 10, name: '数码' },
    { id: 11, name: '生活' },
    { id: 12, name: '美食' },
    { id: 13, name: '动物' },
    { id: 14, name: '鬼畜' },
    { id: 15, name: '时尚' },
    { id: 16, name: '娱乐' },
    { id: 17, name: '影视' },
    { id: 18, name: '纪录' },
    { id: 19, name: '军事' },
    { id: 20, name: '历史' },
    { id: 21, name: '汽车' },
    { id: 22, name: '电竞' },
    { id: 23, name: '运动' }
  ];

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
              {categories.map((category) => (
                <Link 
                  key={category.id} 
                  href={`/category/${category.id}`}
                  className="inline-block w-full h-full border border-gray-200 rounded-md bg-gray-50 text-gray-600 text-center transition-colors duration-300 hover:text-gray-900 hover:bg-gray-200 flex flex-col items-center justify-center"
                >
                  <span>{category.name}</span>
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
          {testVideos.map((video) => (
            <div key={video.id}>
              <VideoCard {...video} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
