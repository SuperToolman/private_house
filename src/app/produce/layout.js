'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import ProduceNavigation from './components/ProduceNavigation';
export default function ProduceLayout({ children }) {
    const currentPath = usePathname();
    const router = useRouter();

    return (
        <div className="flex">
            <ProduceNavigation />
            <div className="w-[calc(100%-400px)] flex-1 h-[100vh] bg-[#F8F8F8]">
                <div className="content bg-white mx-[250px] h-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
