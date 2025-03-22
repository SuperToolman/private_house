'use client';

import Link from "next/link";
import { useResponsive } from '../../../contexts/ResponsiveContext';

export default function Tag({ tagContent }) {
    const { isMobile, isClient } = useResponsive();
    
    if (!isClient || !tagContent) {
        return null;
    }
    
    return (
        <Link 
            href={`/search?tag=${tagContent}`}
            className={`inline-flex items-center ${isMobile ? 'px-2 py-1 text-xs mb-2' : 'px-3 py-1.5 text-sm'} text-[#61666d] bg-[#f1f2f3] rounded-full cursor-pointer transition-all duration-300 hover:bg-[#e5e5e5] mr-2`}
        >
            <span>{tagContent}</span>
        </Link>
    );
}
