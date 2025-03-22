'use client';
import VideoGrid from './components/VideoGrid';
import { useContext } from 'react';
import { SpaceContext } from './layout';
import Link from 'next/link';

export default function SpacePage({ params }) {
    const spaceInfo = useContext(SpaceContext);

    // 添加调试日志
    console.log('SpacePage rendered with:', { params, spaceInfo });

    if (!spaceInfo || !spaceInfo.videoItems) {
        console.log('No spaceInfo or videoItems available');
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-1">
            <div className="countent-left flex-1 space-y-4">
                {/* 前三个视频 */}
                <div className='countent-left-top px-6 py-4 bg-white rounded-lg shadow-lg'>
                    <VideoGrid videoItems={spaceInfo.videoItems.slice(0, 3)} gridTitle="代表作" isShowBig={true} />
                </div>
                {/* 除了前三个的所有视频 */}
                <div className='countent-left-item px-6 py-4 bg-white rounded-lg shadow-lg'>
                    <VideoGrid videoItems={spaceInfo.videoItems.slice(3)} gridTitle="视频" isShowBig={false} />
                </div>
            </div>
            <div className="countent-right ml-[20px] w-[300px] min-w-[300px] space-y-4">
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
    );
} 