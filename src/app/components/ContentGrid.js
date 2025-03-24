'use client';

import { useResponsive } from '../contexts/ResponsiveContext';
import RecommandVideoSwipe from './RecommandVideoSwipe';
import VideoCard from '../../components/common/VideoCard';

export default function ContentGrid({ videos }) {
  const { isMobile, isTablet } = useResponsive();

  return (
    <div className={`grid gap-2.5 ${
      isMobile ? 'grid-cols-2' : 
      isTablet ? 'grid-cols-3' : 
      'grid-cols-5'
    }`}>
      <div className={`${
        isMobile ? 'col-span-2' : 
        isTablet ? 'col-span-1 row-span-2' : 
        'col-span-2 row-span-2'
      } w-full`}>
        <RecommandVideoSwipe />
      </div>
      {videos.map((video, index) => (
        <div key={video.id} className={isMobile && index >= 6 ? 'hidden' : ''}>
          <VideoCard videoEntity = {video} />
        </div>
      ))}
    </div>
  );
} 