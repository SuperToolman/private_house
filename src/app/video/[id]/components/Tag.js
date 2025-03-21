'use client';

import Link from "next/link";

export default function Tag({tagContent}){
    return (
        <Link 
            href={`/search?tag=${tagContent}`}
            className="inline-flex items-center px-3 py-1.5 text-sm text-[#61666d] bg-[#f1f2f3] rounded-full cursor-pointer transition-all duration-300 hover:bg-[#e5e5e5] mr-2"
        >
            <span>{tagContent}</span>
        </Link>
    )
}
