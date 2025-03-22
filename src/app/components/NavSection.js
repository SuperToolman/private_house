'use client';

import Link from 'next/link';
import { useResponsive } from '../contexts/ResponsiveContext';
import CategoryNav from './CategoryNav';

export default function NavSection({ categories }) {
  const { isMobile, isTablet } = useResponsive();
  
  return (
    <div className={`${isMobile ? 'h-auto py-3' : 'h-20 my-5'} flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
      {/* 主导航图标 */}
      <div className={`flex ${isMobile ? 'mb-3 justify-center' : 'mr-5'}`}>
        <Link href="/" className={`${isMobile ? 'mr-6' : 'mr-4'} flex flex-col items-center inline-block`}>
          <i className="iconfont icon-channel_dyanmic mb-1.5 icon-large" style={{fontSize: isMobile ? '32px' : '46px'}}></i>
          <span>动态</span>
        </Link>
        <Link href="/" className={`${isMobile ? 'mr-6' : 'mr-4'} flex flex-col items-center inline-block`}>
          <i className="iconfont icon-channel_hot mb-1.5 icon-large" style={{fontSize: isMobile ? '30px' : '44px'}}></i>
          <span>热门</span>
        </Link>
      </div>
      
      {/* 分类导航 - 响应式布局 */}
      <div className={`flex-1 flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
        {/* 使用CategoryNav组件 */}
        <CategoryNav categories={categories} />
        
        {/* 其他导航按钮 */}
        {!isMobile && (
          <div className={`grid ${isTablet ? 'grid-cols-2' : 'grid-flow-col grid-rows-2'} gap-2.5 ${isTablet ? 'w-[100px]' : 'w-[168px]'} flex-shrink-0`}>
            <Link href="/" className="flex items-center justify-end text-gray-600 transition-colors duration-300 hover:text-gray-900">专栏</Link>
            <Link href="/" className="flex items-center justify-end text-gray-600 transition-colors duration-300 hover:text-gray-900">直播</Link>
            <Link href="/" className="flex items-center justify-end text-gray-600 transition-colors duration-300 hover:text-gray-900">相簿</Link>
            <Link href="/" className="flex items-center justify-end text-gray-600 transition-colors duration-300 hover:text-gray-900">会员购</Link>
            <Link href="/" className="flex items-center justify-end text-gray-600 transition-colors duration-300 hover:text-gray-900">赛事</Link>
            <Link href="/" className="flex items-center justify-end text-gray-600 transition-colors duration-300 hover:text-gray-900">会员购</Link>
          </div>
        )}
      </div>
    </div>
  );
} 