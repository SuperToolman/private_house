'use client';

import dynamic from 'next/dynamic';
import { useResponsive } from '../../../contexts/ResponsiveContext';
// import "@styles/video_player.less"

// 动态导入ReactPlayer并禁用SSR
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function VideoPlayer({url}){
    const { isMobile, isClient } = useResponsive();
    
    return (
        <div style={{boxShadow:'0 0 10px 0 rgba(0, 0, 0, 0.1)'}}>
            <div className="relative pt-[56.25%]">
                {isClient && (
                    <ReactPlayer 
                        className="absolute top-0 left-0"
                        url={url} 
                        controls
                        width="100%"
                        height="100%"
                        config={{
                            file: {
                                attributes: {
                                    controlsList: 'nodownload'
                                },
                                forceVideo: true
                            }
                        }}
                    />
                )}
            </div>
            <div className={`bg-[#fff] w-full ${isMobile ? 'h-auto py-2' : 'h-[60px] py-[3px]'} px-[5px] items-center flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
                <div className={`${isMobile ? 'mb-2 text-[12px]' : 'mr-[20px] text-[14px]'} text-[#9499a0]`}>
                    <span>2人正在看，以装填71条弹幕</span>
                </div>
                <div className={`flex ${isMobile ? 'w-full' : 'flex-1'} items-center`}>
                    <div className="flex mr-[15px]">
                        <div className="mr-[5px] cursor-pointer">
                            <i className="iconfont icon-danmu text-[#61666d]" style={{fontSize: isMobile ? '20px' : '24px'}}></i>
                        </div>
                        <div className="mr-[5px] cursor-pointer">
                            <i className="iconfont icon-danmushezhi"  style={{fontSize: isMobile ? '20px' : '24px'}}></i>
                        </div>
                    </div>
                    <div className="border-[1px] border-[#e7e7e7] rounded-[5px] flex-1 min-w-[200px] flex">
                        <input 
                            type="text" 
                            placeholder="说点什么..." 
                            className={`flex-1 bg-[#f5f5f5] border-0 box-border text-[#212121] ${isMobile ? 'text-[12px] h-[36px] leading-[36px]' : 'text-[14px] h-[40px] leading-[40px]'} min-w-[100px] px-[5px] w-full z-[12] outline-none`}
                        />
                        <button className={`${isMobile ? 'w-[50px] h-[36px] text-[12px]' : 'w-[60px] h-[40px]'} rounded-[0_5px_5px_0] bg-[#00aeec] text-white hover:bg-[#00a1d6] transition-colors`}>发送</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
