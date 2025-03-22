'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [basePath, setBasePath] = useState('');
  
  useEffect(() => {
    // 在客户端确定当前环境的基础路径
    const isProduction = window.location.hostname !== 'localhost';
    setBasePath(isProduction ? '/private_house' : '');
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="text-6xl font-bold text-[#ff6b35] mb-4">404</h1>
      <h2 className="text-2xl font-medium mb-6">页面未找到</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        您要查找的页面不存在或已被移动。
      </p>
      <Link 
        href={basePath || '/'} 
        className="px-6 py-3 bg-[#00aeec] text-white rounded-lg hover:bg-[#00a1d6] transition-colors"
      >
        返回首页
      </Link>
    </div>
  )
} 