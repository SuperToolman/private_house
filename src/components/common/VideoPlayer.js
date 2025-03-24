'use client';

import dynamic from 'next/dynamic';
import { useResponsive } from '@contexts/ResponsiveContext';
import Danmaku from 'rc-danmaku';
import { useRef, useEffect, useState, useCallback } from 'react';

// import "@styles/video_player.less"

// 动态导入ReactPlayer并禁用SSR
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function VideoPlayer({ url, damnuList = [] }) {
    const { isMobile, isClient } = useResponsive();
    const danmakuInsRef = useRef(null);
    const playerRef = useRef(null);
    const danmakuContainerRef = useRef(null);
    const [damnuText, setDamnuText] = useState('');
    const [isReady, setIsReady] = useState(false);
    const [playerDuration, setPlayerDuration] = useState(0);
    const [playerCurrentTime, setPlayerCurrentTime] = useState(0);
    const scheduledDanmakuRef = useRef(new Map());
    const [isShowEndedContent, setIsShowEndedContent] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);  // 控制播放状态

    // 发送弹幕的处理函数 - 使用useCallback避免不必要的重渲染
    const handleSendDanmu = useCallback(() => {
        if (danmakuInsRef.current && damnuText.trim()) {
            console.log('发送弹幕:', damnuText);
            // 发送弹幕并指定颜色和字体大小
            try {
                danmakuInsRef.current.push(damnuText, {
                    color: getRandomColor(),
                    fontSize: isMobile ? 16 : 20
                });
                setDamnuText(''); // 清空输入框
            } catch (error) {
                console.error('发送弹幕失败:', error);
            }
        } else {
            console.log('弹幕未发送:', {
                instance: !!danmakuInsRef.current,
                text: damnuText.trim()
            });
        }
    }, [damnuText, isMobile]);

    // 随机生成弹幕颜色
    const getRandomColor = useCallback(() => {
        const colors = ['#FFF', '#00a1d6', '#FE0302', '#FFAA02', '#FFD302', '#00CD00', '#0097DD', '#CC0273'];
        return colors[Math.floor(Math.random() * colors.length)];
    }, []);

    // 处理按Enter发送弹幕
    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            handleSendDanmu();
        }
    }, [handleSendDanmu]);

    // 播放器准备就绪的回调
    const handlePlayerReady = useCallback(() => {
        console.log('播放器已就绪');
        setIsShowEndedContent(false);
        setTimeout(() => {
            setIsReady(true);
        }, 500); // 给播放器额外时间完全渲染
    }, []);

    // 视频暂停事件处理 - 只更新状态，不直接操作DOM
    const handlePause = useCallback(() => {
        console.log('视频暂停');
        setIsPlaying(false);
    }, []);

    // 视频播放事件处理 - 只更新状态，不直接操作DOM
    const handlePlay = useCallback(() => {
        console.log('视频播放');
        setIsPlaying(true);
    }, []);

    // 使用useEffect处理暂停/播放状态变化，避免在渲染期间直接操作DOM
    useEffect(() => {
        if (!danmakuInsRef.current) return;
        
        try {
            if (isPlaying) {
                danmakuInsRef.current.resume();
            } else {
                danmakuInsRef.current.pause();
            }
        } catch (error) {
            console.error('弹幕暂停/恢复失败:', error);
        }
    }, [isPlaying]);

    // 处理视频播放进度更新
    const handleProgress = useCallback((state) => {
        setPlayerCurrentTime(state.playedSeconds);
    }, []);
    
    // 处理视频时长加载完成
    const handleDuration = useCallback((duration) => {
        setPlayerDuration(duration);
        console.log('视频总时长:', duration);
    }, []);

    const handleEnded = useCallback(() => {
        console.log('视频结束');
        setIsShowEndedContent(true);
    }, []);

    // 根据sendTime发送弹幕
    const processDanmakuQueue = useCallback((currentTime) => {
        if (!danmakuInsRef.current || damnuList.length === 0) return;

        damnuList.forEach(danmu => {
            // 如果已经加入调度队列，跳过
            if (scheduledDanmakuRef.current.has(danmu.id)) return;

            const sendTimeInSeconds = typeof danmu.sendTime === 'number'
                ? danmu.sendTime
                : parseFloat(danmu.sendTime);

            // 仅处理还未发送且时间在5秒内的弹幕
            if (sendTimeInSeconds > currentTime && sendTimeInSeconds <= currentTime + 5) {
                const timeUntilSend = (sendTimeInSeconds - currentTime) * 1000;

                // 将弹幕添加到调度队列
                const timerId = setTimeout(() => {
                    if (danmakuInsRef.current) {
                        try {
                            danmakuInsRef.current.push(danmu.content, {
                                color: danmu.color || getRandomColor(),
                                fontSize: isMobile ? 16 : 20
                            });
                            console.log(`定时弹幕已发送: ${danmu.content}, 时间: ${sendTimeInSeconds}s`);
                        } catch (error) {
                            console.error('发送定时弹幕失败:', error);
                        }
                        
                        // 发送后从调度队列移除
                        scheduledDanmakuRef.current.delete(danmu.id);
                    }
                }, timeUntilSend);

                // 存储定时器ID以便清理
                scheduledDanmakuRef.current.set(danmu.id, timerId);
            }
        });
    }, [damnuList, getRandomColor, isMobile]);

    // 监控播放时间变化，处理弹幕队列
    useEffect(() => {
        processDanmakuQueue(playerCurrentTime);
    }, [playerCurrentTime, processDanmakuQueue]);

    // 初始化弹幕系统
    useEffect(() => {
        // 确保在客户端环境和播放器已挂载后初始化弹幕
        if (isClient && isReady && danmakuContainerRef.current) {
            // 先确认是否已有实例，如果有则销毁
            if (danmakuInsRef.current) {
                try {
                    danmakuInsRef.current.destroy();
                } catch (error) {
                    console.error('销毁弹幕实例失败:', error);
                }
                danmakuInsRef.current = null;
            }

            console.log('初始化弹幕...', danmakuContainerRef.current);

            try {
                // 添加延迟，确保React渲染完成后再初始化弹幕
                const timeoutId = setTimeout(() => {
                    try {
                        // 直接使用ref而不是选择器
                        const danmakuIns = new Danmaku(danmakuContainerRef.current, {
                            rowHeight: isMobile ? 30 : 40, // 弹幕轨道高度
                            speed: 150, // 弹幕速度
                            opacity: 1, // 弹幕透明度提高到1确保可见
                            maxRow: 0, // 自动计算轨道数
                            minGapWidth: 20, // 弹幕之间的最小间隔
                            onBulletIn() {
                                console.log('弹幕进入');
                            },
                            onBulletOut() {
                                console.log('弹幕离开');
                            },
                            onQueueRunOut() {
                                console.log('弹幕队列清空');
                            },
                        });

                        danmakuInsRef.current = danmakuIns;
                        console.log('弹幕初始化成功');

                        // 发送一条测试弹幕
                        setTimeout(() => {
                            if (danmakuInsRef.current) {
                                try {
                                    danmakuIns.push('测试弹幕已启动', {
                                        color: '#FF0000',
                                        fontSize: isMobile ? 20 : 28
                                    });
                                    console.log('测试弹幕已发送');
                                } catch (error) {
                                    console.error('发送测试弹幕失败:', error);
                                }
                            }
                        }, 1000);
                    } catch (error) {
                        console.error('弹幕初始化失败:', error);
                    }
                }, 100);

                // 清理延迟定时器
                return () => clearTimeout(timeoutId);
            } catch (error) {
                console.error('弹幕初始化准备阶段失败:', error);
            }
        }
        
        // 组件卸载时清理
        return () => {
            if (danmakuInsRef.current) {
                try {
                    danmakuInsRef.current.destroy();
                } catch (error) {
                    console.error('清理弹幕实例失败:', error);
                }
            }
            
            // 清理所有定时器
            scheduledDanmakuRef.current.forEach(timerId => {
                clearTimeout(timerId);
            });
            scheduledDanmakuRef.current.clear();
        };
    }, [isClient, isReady, isMobile]);

    // 发送所有现有弹幕（用于测试）
    const sendAllExistingDanmaku = useCallback(() => {
        if (!danmakuInsRef.current || damnuList.length === 0) return;
        
        damnuList.forEach((danmu, index) => {
            setTimeout(() => {
                if (danmakuInsRef.current) {
                    try {
                        danmakuInsRef.current.push(danmu.content, {
                            color: danmu.color || getRandomColor(),
                            fontSize: isMobile ? 16 : 20
                        });
                    } catch (error) {
                        console.error('批量发送弹幕失败:', error);
                    }
                }
            }, index * 300); // 每隔300ms发送一条，避免拥挤
        });
        
        console.log(`已安排发送全部${damnuList.length}条弹幕`);
    }, [damnuList, getRandomColor, isMobile]);

    return (
        <div style={{ boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)' }}>
            {/* 视频播放器和弹幕容器 */}
            {/* pt-[56.25%] */}
            <div className="relative h-[750px] bg-black">
                {isClient && (
                    <>
                        <ReactPlayer
                            ref={playerRef}
                            className="absolute top-0 left-0"
                            url={url || "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"}
                            controls
                            width="100%"
                            height="100%"
                            playing={isPlaying} // 使用状态控制播放
                            muted={true} // 添加静音以允许自动播放
                            playsinline={true} // 支持iOS内联播放
                            onError={(e) => console.error("视频播放错误:", e)}
                            onEnded={handleEnded} //视频结束事件
                            onPause={handlePause} //视频暂停事件
                            onPlay={handlePlay} //视频播放事件
                            onReady={handlePlayerReady} //视频准备就绪事件
                            onProgress={handleProgress} //视频播放进度事件
                            onDuration={handleDuration} //视频时长事件
                            progressInterval={500} // 更新播放进度的间隔（毫秒）
                            config={{
                                file: {
                                    attributes: {
                                        controlsList: 'nodownload'
                                    },
                                    forceVideo: true
                                }
                            }}
                        />

                        {/* 弹幕层 - 重要：这里使用ref替代类选择器 */}
                        <div
                            ref={danmakuContainerRef}
                            className="text-[#fff] absolute top-0 left-0 w-full h-full z-50 pointer-events-none overflow-hidden"
                            style={{
                                display: isShowEndedContent ? 'none' : 'block',
                                backgroundColor: 'transparent',
                                zIndex: 999  // 确保高于视频控件
                            }}
                        />
                        <div
                            className="text-[#fff] absolute top-0 left-0 w-full h-full z-50 pointer-events-none overflow-hidden"
                            style={{
                                display: isShowEndedContent ? 'block' : 'none',
                                backgroundColor: 'transparent',
                                zIndex: 999  // 确保高于视频控件
                            }}
                        >
                            <div className="w-full h-full flex items-center justify-center">
                                视频已结束
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* 弹幕控制栏 */}
            <div className={`bg-[#fff] w-full ${isMobile ? 'h-auto py-2' : 'h-[60px] py-[3px]'} px-[5px] items-center flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
                <div className={`${isMobile ? 'mb-2 text-[12px]' : 'mr-[20px] text-[14px]'} text-[#9499a0]`}>
                    <span>2人正在看，已装填{damnuList.length}条弹幕</span>
                </div>
                <div className={`flex ${isMobile ? 'w-full' : 'flex-1'} items-center`}>
                    <div className="flex mr-[15px]">
                        <div className="mr-[5px] cursor-pointer" onClick={sendAllExistingDanmaku} title="测试：立即发送所有弹幕">
                            <i className="iconfont icon-danmu text-[#61666d]" style={{ fontSize: isMobile ? '20px' : '24px' }}></i>
                        </div>
                        <div className="mr-[5px] cursor-pointer">
                            <i className="iconfont icon-danmushezhi" style={{ fontSize: isMobile ? '20px' : '24px' }}></i>
                        </div>
                    </div>
                    <div className="border-[1px] border-[#e7e7e7] rounded-[5px] flex-1 min-w-[200px] flex">
                        <input
                            onChange={(e) => setDamnuText(e.target.value)}
                            value={damnuText}
                            type="text"
                            placeholder="说点什么..."
                            onKeyPress={handleKeyPress}
                            className={`flex-1 bg-[#f5f5f5] border-0 box-border text-[#212121] ${isMobile ? 'text-[12px] h-[36px] leading-[36px]' : 'text-[14px] h-[40px] leading-[40px]'} min-w-[100px] px-[5px] w-full z-[12] outline-none`}
                        />
                        <button
                            onClick={handleSendDanmu}
                            className={`${isMobile ? 'w-[50px] h-[36px] text-[12px]' : 'w-[60px] h-[40px]'} rounded-[0_5px_5px_0] bg-[#00aeec] text-white hover:bg-[#00a1d6] transition-colors`}>
                            发送
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
