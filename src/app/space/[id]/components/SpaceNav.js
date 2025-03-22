'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { SpaceContext } from '../layout';
import { usePathname } from 'next/navigation';

export default function SpaceNav({ userId, isMobile, isTablet }) {
    const spaceInfo = useContext(SpaceContext);
    const pathname = usePathname();

    const navItems = [
        { 
            id: 'home', 
            name: '主页', 
            path: `/space/${userId}`,
            icon: 'icon-home', 
            color: '#0e8350' 
        },
        { 
            id: 'dynamic', 
            name: '动态', 
            path: `/space/${userId}/dynamic`,
            icon: 'icon-header_dyanmic', 
            color: '#ff6699' 
        },
        { 
            id: 'submit', 
            name: '投稿', 
            path: `/space/${userId}/submit`,
            icon: 'icon-tv', 
            color: '#00aeec' 
        },
        { 
            id: 'collection', 
            name: '合集', 
            path: `/space/${userId}/collection`,
            icon: 'icon-heji', 
            color: '#40c5f1' 
        },
        { 
            id: 'collect', 
            name: '收藏', 
            path: `/space/${userId}/collect`,
            icon: 'icon-header_shoucang', 
            color: '#ffb027' 
        }
    ];

    // 检查当前路径是否匹配导航项
    const isActive = (path) => pathname === path;

    if (isMobile) {
        // 移动端导航
        return (
            <div className="bg-white shadow mb-4 overflow-x-auto">
                <div className="flex items-center justify-center py-2 px-2 space-x-4 min-w-max">
                    {navItems.map((item) => (
                        <Link 
                            key={item.id}
                            href={item.path}
                            className={`flex flex-col items-center text-center px-3 py-1 rounded-lg ${
                                isActive(item.path) 
                                    ? 'bg-gray-100' 
                                    : 'hover:bg-gray-50'
                            }`}
                        >
                            <i 
                                className={`iconfont ${item.icon}`} 
                                style={{ 
                                    fontSize: '18px', 
                                    color: isActive(item.path) ? item.color : '#666' 
                                }}
                            ></i>
                            <span 
                                style={{
                                    color: isActive(item.path) ? item.color : '#666'
                                }}
                                className="text-xs"
                            >
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    // 桌面端导航
    return (
        <div className='flex flex-1 items-center justify-between mx-auto w-full px-6 py-3 rounded-[50px] bg-white shadow-lg mb-6'>
            <div className="flex items-center space-x-6 font-semibold">
                {navItems.map((item) => (
                    <Link 
                        key={item.id}
                        href={item.path}
                        className="group flex items-center cursor-pointer"
                    >
                        <i 
                            className={`iconfont ${item.icon} mr-1`} 
                            style={{ 
                                fontSize: '20px', 
                                color: isActive(item.path) ? item.color : '#666' 
                            }}
                        ></i>
                        <span 
                            style={{
                                color: isActive(item.path) ? item.color : '#666',
                                transition: 'color 0.3s'
                            }}
                            className="text-base nav-text"
                            data-hover-color={item.color}
                        >
                            {item.name}
                        </span>
                        <style jsx>{`
                            .nav-text:hover {
                                color: ${item.color};
                            }
                        `}</style>
                    </Link>
                ))}
            </div>

            {!isTablet && (
                <div className="flex items-center text-[#000] space-x-6">
                    <div className="flex flex-col items-center text-[13px] cursor-pointer hover:text-[#00aeec] transition-colors duration-300">
                        <span className='text-xs text-gray-500'>关注</span>
                        <span className='text-base font-medium'>{spaceInfo.followCount}</span>
                    </div>
                    <div className="flex flex-col items-center text-[13px] cursor-pointer hover:text-[#00aeec] transition-colors duration-300">
                        <span className='text-xs text-gray-500'>粉丝数</span>
                        <span className='text-base font-medium'>{spaceInfo.followerCount}</span>
                    </div>
                    <div className="flex flex-col items-center text-[13px] cursor-pointer hover:text-[#00aeec] transition-colors duration-300">
                        <span className='text-xs text-gray-500'>获赞数</span>
                        <span className='text-base font-medium'>{spaceInfo.likeCount}</span>
                    </div>
                    <div className="flex flex-col items-center text-[13px] cursor-pointer hover:text-[#00aeec] transition-colors duration-300">
                        <span className='text-xs text-gray-500'>播放数</span>
                        <span className='text-base font-medium'>{spaceInfo.playCount}</span>
                    </div>
                </div>
            )}
        </div>
    );
} 