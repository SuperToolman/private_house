'use client'; // 标记这是一个客户端组件，允许使用浏览器API和React hooks

import { createContext, useContext, useState, useEffect } from 'react';

/**
 * 创建响应式上下文
 * 用于在整个应用中共享屏幕尺寸信息，避免在每个组件中重复检测屏幕尺寸
 * 初始值为null，将在Provider中被填充
 */
const ResponsiveContext = createContext(null);

/**
 * 响应式上下文提供者组件
 * 
 * 该组件负责：
 * 1. 检测屏幕尺寸变化
 * 2. 将屏幕尺寸信息通过Context API提供给子组件
 * 3. 处理窗口大小变化事件的监听和清理
 * 
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件，将能够访问响应式上下文
 * @returns {JSX.Element} 上下文提供者包装的子组件
 */
export function ResponsiveProvider({ children }) {
  // 存储屏幕尺寸状态
  const [screenSize, setScreenSize] = useState({
    isMobile: false,   // 移动设备 (< 768px)
    isTablet: false,   // 平板设备 (>= 768px 且 < 1024px)
    isDesktop: false,  // 桌面设备 (>= 1024px)
  });
  
  // 使用useEffect处理副作用：监听窗口大小变化
  useEffect(() => {
    /**
     * 处理窗口大小变化的函数
     * 根据当前窗口宽度更新屏幕尺寸状态
     */
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 768,                    // 小于768px为移动设备
        isTablet: width >= 768 && width < 1024,   // 768px-1024px为平板设备
        isDesktop: width >= 1024,                 // 大于等于1024px为桌面设备
      });
    };
    
    // 组件挂载时立即执行一次尺寸检测
    handleResize();
    
    // 添加窗口大小变化事件监听器
    window.addEventListener('resize', handleResize);
    
    // 组件卸载时移除事件监听器，防止内存泄漏
    return () => window.removeEventListener('resize', handleResize);
  }, []); // 空依赖数组表示此效果仅在组件挂载和卸载时运行
  
  // 将屏幕尺寸状态提供给所有子组件
  return (
    <ResponsiveContext.Provider value={screenSize}>
      {children}
    </ResponsiveContext.Provider>
  );
}

/**
 * 自定义Hook：使用响应式上下文
 * 
 * 可在任何函数组件中使用此Hook获取当前屏幕尺寸信息
 * 例如：const { isMobile, isTablet, isDesktop } = useResponsive();
 * 
 * @returns {Object} 包含屏幕尺寸信息的对象 { isMobile, isTablet, isDesktop }
 * @throws {Error} 如果在ResponsiveProvider外部使用会抛出错误
 */
export const useResponsive = () => useContext(ResponsiveContext); 