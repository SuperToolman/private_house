'use client';
import Link from 'next/link';

const RightSidebar = () => {
    return (
        <div className="right-sidebar w-[300px] space-y-4">
            {/* 认证信息 */}
            <div className="bg-white rounded-lg p-4 shadow-lg">
                <div className="flex justify-between items-center">
                    <span className="text-[#18191c]">点此申请bilibili认证 {`>`}</span>
                    <span className="text-[#9499a0] text-sm">获得认证，享受多重认证福利！</span>
                </div>
            </div>

            {/* 创作中心 */}
            <div className="bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <i className="iconfont icon-creative text-[#00aeec] text-xl"></i>
                        <span className="text-[#18191c] ml-2">创作中心</span>
                    </div>
                    <i className="iconfont icon-arrow-right text-[#9499a0]"></i>
                </div>
                <div className="flex justify-between">
                    <Link href="/upload" className="flex items-center text-[#61666d]">
                        <i className="iconfont icon-upload mr-1"></i>
                        <span>视频投稿</span>
                    </Link>
                    <Link href="/manage" className="flex items-center text-[#61666d]">
                        <i className="iconfont icon-manage mr-1"></i>
                        <span>稿件管理</span>
                    </Link>
                </div>
            </div>

            {/* 公告 */}
            <div className="bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[#18191c] font-medium">公告</span>
                </div>
                <div className="text-[#9499a0] text-sm">
                    暂无任何公告
                </div>
            </div>

            {/* 直播间 */}
            <div className="bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[#18191c] font-medium">直播间</span>
                    <Link href="/live" className="text-[#00aeec] text-sm">
                        前往我的直播间 {`>`}
                    </Link>
                </div>
                <div className="text-[#9499a0] text-sm">
                    欢迎回来！期待你的分享和创作，快来直播吧～
                </div>
            </div>
        </div>
    );
};

export default RightSidebar; 