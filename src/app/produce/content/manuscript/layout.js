'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function ManuscriptLayout({ children }) {
    const pathname = usePathname();
    const currentPath = pathname.split('/').pop();
    console.log(currentPath);
    return (
        <div>
            {/* 稿件类型选择 */}
            <div className="nav-list w-full flex justify-center items-center space-x-7 border-b border-gray-200">
                <Link
                    href="/produce/content/manuscript/"
                    className={`border-b-2 border-transparent nav-list-item hover:text-brand-pink ${currentPath === 'manuscript' ? 'text-brand-pink border-brand-pink' : ''}`}>
                    <span>视频管理</span>
                </Link>
                <Link
                    href="/produce/content/manuscript/video_list"
                    className={`border-b-2 border-transparent nav-list-item hover:text-brand-pink ${currentPath === 'video_list' ? 'text-brand-pink border-brand-pink' : ''}`}>
                    <span>视频集合管理</span>
                </Link>
                <Link
                    href="/produce/content/manuscript/text"
                    className={`border-b-2 border-transparent nav-list-item hover:text-brand-pink ${currentPath === 'text' ? 'text-brand-pink border-brand-pink' : ''}`}>
                    <span>文字稿件</span>
                </Link>
                <Link
                    href="/produce/content/manuscript/comic"
                    className={`border-b-2 border-transparent nav-list-item hover:text-brand-pink ${currentPath === 'comic' ? 'text-brand-pink border-brand-pink' : ''}`}>
                    <span>漫画稿件</span>
                </Link>
                <Link
                    href="/produce/content/manuscript/music"
                    className={`border-b-2 border-transparent nav-list-item hover:text-brand-pink ${currentPath === 'music' ? 'text-brand-pink border-brand-pink' : ''}`}>
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

