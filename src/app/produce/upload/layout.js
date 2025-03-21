'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function UploadLayout({ children }) {
    const pathname = usePathname();
    const currentPath = pathname.split('/').pop();
    console.log(currentPath);
    return (
        <div className='flex flex-col gap-4 mt-[20px] py-[20px]'>
            {/* 稿件类型选择 */}
            <div className="nav-list w-full flex justify-center items-center space-x-7 border-b border-gray-200">
                <Link
                    href="/produce/upload/"
                    className={`border-b-2 border-transparent nav-list-item hover:text-brand-pink ${currentPath === 'upload' ? 'text-brand-pink border-brand-pink border-b-2 border-b-brand-pink' : ''}`}>
                    <span>视频管理</span>
                </Link>
                <Link
                    href="/produce/upload/video_list"
                    className={`border-b-2 border-transparent nav-list-item hover:text-brand-pink ${currentPath === 'video_list' ? 'text-brand-pink border-brand-pink border-b-2 border-b-brand-pink' : ''}`}>
                    <span>视频集合管理</span>
                </Link>
                <Link
                    href="/produce/upload/text"
                    className={`border-b-2 border-transparent nav-list-item hover:text-brand-pink ${currentPath === 'text' ? 'text-brand-pink border-brand-pink border-b-2 border-b-brand-pink' : ''}`}>
                    <span>文字稿件</span>
                </Link>
                <Link
                    href="/produce/upload/comic"
                    className={`border-b-2 border-transparent nav-list-item hover:text-brand-pink ${currentPath === 'comic' ? 'text-brand-pink border-brand-pink border-b-2 border-b-brand-pink' : ''}`}>
                    <span>漫画稿件</span>
                </Link>
                <Link
                    href="/produce/upload/music"
                    className={`border-b-2 border-transparent nav-list-item hover:text-brand-pink ${currentPath === 'music' ? 'text-brand-pink border-brand-pink border-b-2 border-b-brand-pink' : ''}`}>
                    <span>音乐稿件</span>
                </Link>
            </div>

            {/* 稿件类型内容 */}
            <div className="">
                {children}
            </div>
        </div>
    )
}
