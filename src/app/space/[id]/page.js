'use client';
import VideoGrid from './components/VideoGrid';
import { useContext, use } from 'react';
import { SpaceContext } from './layout';
import Link from 'next/link';
import { useResponsive } from '../../contexts/ResponsiveContext';
import SpaceNav from './components/SpaceNav';

export default function SpacePage({ params }) {
    // 使用use钩子正确解析params
    const resolvedParams = use(params);
    const userId = resolvedParams.id;
    
    const spaceInfo = useContext(SpaceContext);
    const { isMobile, isTablet, isClient } = useResponsive();

    // 添加调试日志
    console.log('SpacePage rendered with:', { userId, spaceInfo });

    // 服务端渲染或数据加载中的占位内容
    if (!isClient || !spaceInfo || !spaceInfo.videoItems) {
        console.log('No spaceInfo or videoItems available, or running on server');
        return <div className="w-full h-screen flex items-center justify-center bg-[#f5f5f5]">
            <div className="text-lg text-gray-500">加载中...</div>
        </div>;
    }

    return (
        <div className="space-page">
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} flex-1`}>
                <div className={`countent-left flex-1 space-y-4 ${isMobile ? 'w-full' : ''}`}>
                    {/* 前三个视频 */}
                    <div className={`countent-left-top ${isMobile ? 'px-3 py-3' : 'px-6 py-4'} bg-white rounded-lg shadow-lg`}>
                        <VideoGrid 
                            videoItems={spaceInfo.videoItems.slice(0, 3)} 
                            gridTitle="代表作" 
                            isShowBig={!isMobile} 
                            isMobile={isMobile} 
                        />
                    </div>
                    {/* 除了前三个的所有视频 */}
                    <div className={`countent-left-item ${isMobile ? 'px-3 py-3' : 'px-6 py-4'} bg-white rounded-lg shadow-lg`}>
                        <VideoGrid 
                            videoItems={spaceInfo.videoItems.slice(3)} 
                            gridTitle="视频" 
                            isShowBig={false} 
                            isMobile={isMobile} 
                        />
                    </div>
                </div>
                
                {/* 侧边栏 - 移动端时放到底部 */}
                <div className={`countent-right ${isMobile ? 'w-full mt-4' : isTablet ? 'ml-4 w-[250px] min-w-[250px]' : 'ml-[20px] w-[300px] min-w-[300px]'} space-y-4`}>
                    {/* 移动端显示数据统计 */}
                    {isMobile && (
                        <div className='flex justify-between shadow-lg rounded-lg bg-white px-4 py-3'>
                            <div className="flex flex-col items-center text-[13px]">
                                <span className='text-xs text-gray-500'>关注</span>
                                <span className='text-base font-medium'>{spaceInfo.followCount}</span>
                            </div>
                            <div className="flex flex-col items-center text-[13px]">
                                <span className='text-xs text-gray-500'>粉丝</span>
                                <span className='text-base font-medium'>{spaceInfo.followerCount}</span>
                            </div>
                            <div className="flex flex-col items-center text-[13px]">
                                <span className='text-xs text-gray-500'>获赞</span>
                                <span className='text-base font-medium'>{spaceInfo.likeCount}</span>
                            </div>
                            <div className="flex flex-col items-center text-[13px]">
                                <span className='text-xs text-gray-500'>播放</span>
                                <span className='text-base font-medium'>{spaceInfo.playCount}</span>
                            </div>
                        </div>
                    )}
                    
                    <div className='flex flex-col gap-2 shadow-lg rounded-lg bg-white px-4 py-2'>
                        <h3 className='text-lg font-bold'>个人资料</h3>
                        <div className='flex items-center gap-2'>
                            <i className='iconfont icon-user-id mb-1' style={{ fontSize: '16px' }}></i>
                            <span className='text-[#18191c] text-[14px]'>439004370</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 shadow-lg rounded-lg bg-white px-4 py-2'>
                        <h3 className='text-lg font-bold'>其他平台主页</h3>
                        <Link href="/" className='py-[15px] flex items-center gap-2 text-sm text-gray-500'>
                            <i className='iconfont icon-douyin'></i>
                            <span className='text-[#18191c] text-[16px]'>TikTok</span>
                        </Link>
                        <Link href="/" className='py-[15px] flex items-center gap-2 text-sm text-gray-500'>
                            <i className='iconfont icon-twitter'></i>
                            <span className='text-[#18191c] text-[16px]'>Twitter</span>
                        </Link>
                        <Link href="/" className='py-[15px] flex items-center gap-2 text-sm text-gray-500'>
                            <i className='iconfont icon-weibo'></i>
                            <span className='text-[#18191c] text-[16px]'>微博</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
} 