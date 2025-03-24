'use client';

import { useState, useEffect, use } from 'react';
// import { useParams } from "react-router"
import Image from "next/image"
import VideoPlayer from "@common/VideoPlayer"
import Tag from "./components/Tag"
import VideoComment from "./components/VideoComment"
import VideoRecommendList from "./components/VideoRecommendList"
import Link from 'next/link';
import DanmuList from "./components/DanmuList"
import { useResponsive } from '@contexts/ResponsiveContext';

export default function VideoInfo({ params }) {
    // 使用use钩子解析params
    const resolvedParams = use(params);
    const videoId = resolvedParams.id;

    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [activeTab, setActiveTab] = useState('recommend'); // 'recommend' 或 'comment'
    const { isMobile, isTablet, isClient } = useResponsive();

    const [operationRecord, setOperationRecord] = useState({
        like: true,
        collect: false,
        share: true,
        toubi: false,
    });

    const testVideoObject = {
        title: '公理秘术中单机器人毁了快速匹配！！大招影焰暴击电人爽的一！！',
        user: { id: 1, name: '测试用户', avatarUrl: '/images/testavatar.webp', desc: '测试用户描述' },
        releaseData: '2024-01-01',
        playCount: 1000,
        duration: '10:00',
        dmCount: 71,
        coverUrl: '/images/testcover.webp',
        videoUrl: '/videos/test_video1.mp4',
        id: 1,
        desc: '画师太懂玩家了',
        tagStr: '生活记录,娱乐,美女,搞笑,皮肤,三国杀一将成名',
        commentItems: [
            {
                userItem: {
                    id: 1,
                    name: '李四',
                    avatarUrl: '/images/testavatar.webp',
                },
                id: 1,
                content: '太好看了',
                releaseTime: '2024-01-01 19:19:40',
                likeCount: 1000,
                children: [
                    {
                        userItem: {
                            id: 1,
                            name: '李四',
                            avatarUrl: '/images/testavatar.webp',
                        },
                        id: 4,
                        releaseTime: '2024-01-01 19:29:40',
                        likeCount: 1000,
                        content: '给你唐完了'
                    },
                    {
                        userItem: {
                            id: 1,
                            name: '李四',
                            avatarUrl: '/images/testavatar.webp',
                        },
                        id: 5,
                        releaseTime: '2024-01-01 19:29:40',
                        likeCount: 1000,
                        content: '我看行'
                    }
                ]
            },
            {
                userItem: {
                    id: 2,
                    name: '张三',
                    avatarUrl: '/images/testavatar.webp',
                },
                id: 2,
                content: '太对了哥',
                releaseTime: '2024-01-01 19:19:40',
                likeCount: 1000,
                children: []
            },
            {
                userItem: {
                    id: 3,
                    name: '王五',
                    avatarUrl: '/images/testavatar.webp',
                },
                id: 3,
                content: '技能😋彩妆：每个回合结束，你进行一次判定并将判定牌标记为"彩妆"置入一名女性角色的装备区，（"彩妆"离开对应角色装备区时进入弃牌堆）若判定牌为红色：你与其各摸一张牌，若只有你摸牌，你可将一张手牌标记为"彩妆"置入你的装备区，黑色：其下次造成伤害时可令受到伤害角色回复一点体力（可叠加一次）华衣：每轮结束时，弃置场上所有"彩妆"，并令失去"彩妆"的角色从你开始依次连续摸牌，直到其摸的牌花色数与其弃置的"彩妆"花色数相同，弃置两种颜色"彩妆"的角色可对一名角色造成一点伤害，弃置四种花色"彩妆"的角色可对一名角色连续两次造成一点伤害',
                releaseTime: '2024-01-01 19:19:40',
                likeCount: 1000,
                children: []
            }
        ],
        recommendList: [
            {
                id: 1,
                title: '2024年必看的十大动漫作品推荐',
                coverUrl: '/images/test_videoCard_cover (1).avif',
                user: { id: 1, name: '动漫评论家', avatarUrl: '/images/testavatar.webp', desc: '专业动漫测评' },
                previewUrl: '/videos/test_video1.mp4',
                playCount: 23845,
                duration: '12:36',
                dmCount: 329,
            },
            {
                id: 2,
                title: '最新机械键盘开箱体验：红轴vs茶轴',
                coverUrl: '/images/test_videoCard_cover (2).avif',
                user: { id: 2, name: '科技达人', avatarUrl: '/images/testavatar.webp', desc: '数码产品评测专家' },
                previewUrl: '/videos/test_video3.mp4',
                playCount: 12756,
                duration: '08:42',
                dmCount: 156,
            },
            {
                id: 3,
                title: '三分钟学会这道家常菜，简单又好吃',
                coverUrl: '/images/test_videoCard_cover (3).avif',
                user: { id: 3, name: '家常美食', avatarUrl: '/images/testavatar.webp', desc: '美食烹饪博主' },
                previewUrl: '/videos/test_video2.mp4',
                playCount: 45632,
                duration: '03:15',
                dmCount: 421,
            },
            {
                id: 4,
                title: '游戏区新游推荐：本月值得一试的独立游戏',
                coverUrl: '/images/test_videoCard_cover (4).avif',
                user: { id: 4, name: '游戏玩家', avatarUrl: '/images/testavatar.webp', desc: '独立游戏爱好者' },
                previewUrl: '/videos/test_video2.mp4',
                playCount: 9875,
                duration: '15:20',
                dmCount: 134,
            },
            {
                id: 5,
                title: '这才是正确的学习方法：高效备考指南',
                coverUrl: '/images/test_videoCard_cover (5).avif',
                user: { id: 5, name: '学习达人', avatarUrl: '/images/testavatar.webp', desc: '教育类UP主' },
                playCount: 34521,
                previewUrl: '/videos/test_video2.mp4',
                duration: '11:05',
                dmCount: 267,
            },
            {
                id: 6,
                title: '探索城市摄影的构图技巧与后期处理',
                coverUrl: '/images/test_videoCard_cover (6).avif',
                user: { id: 6, name: '摄影师小王', avatarUrl: '/images/testavatar.webp', desc: '专业摄影师' },
                playCount: 18652,
                previewUrl: '/videos/test_video2.mp4',
                duration: '20:15',
                dmCount: 198,
            },
            {
                id: 7,
                title: '宠物猫咪的日常护理与训练小技巧',
                coverUrl: '/images/test_videoCard_cover (7).avif',
                user: { id: 7, name: '宠物爱好者', avatarUrl: '/images/testavatar.webp', desc: '宠物饲养员' },
                playCount: 29874,
                previewUrl: '/videos/test_video3.mp4',
                duration: '09:30',
                dmCount: 312,
            },
            {
                id: 8,
                title: '这款国产游戏也太好玩了吧！完整通关体验',
                coverUrl: '/images/test_videoCard_cover (8).avif',
                user: { id: 8, name: '游戏主播', avatarUrl: '/images/testavatar.webp', desc: '专业游戏解说' },
                playCount: 52368,
                duration: '25:48',
                previewUrl: '/videos/test_video3.mp4',
                dmCount: 563,
            },
            {
                id: 9,
                title: '三天学会弹吉他：零基础入门教程',
                coverUrl: '/images/test_videoCard_cover (9).avif',
                user: { id: 9, name: '音乐老师', avatarUrl: '/images/testavatar.webp', desc: '专业音乐教育' },
                playCount: 15963,
                duration: '18:22',
                previewUrl: '/videos/test_video3.mp4',
                dmCount: 241,
            },
            {
                id: 10,
                title: '最新动漫周边开箱：限量版手办评测',
                coverUrl: '/images/test_videoCard_cover (10).avif',
                user: { id: 10, name: '二次元达人', avatarUrl: '/images/testavatar.webp', desc: '动漫周边收藏家' },
                playCount: 32147,
                duration: '13:40',
                dmCount: 385,
                previewUrl: '/videos/test_video3.mp4',
            },
        ]
    }

    const damnuList = [
        { id: 1, content: '前排', releaseTime: '2024-01-01 08:12:40', sendTime: '3' },
        { id: 2, content: '这个视频真的太赞了！爱了爱了', releaseTime: '2024-01-02 15:28:33', sendTime: '8' },
        { id: 3, content: '6666', releaseTime: '2024-01-03 19:42:10', sendTime: '12' },
        { id: 4, content: '哈哈哈笑死我了', releaseTime: '2024-01-03 22:15:40', sendTime: '15' },
        { id: 5, content: '什么情况？', releaseTime: '2024-01-04 10:20:55', sendTime: '18' },
        { id: 6, content: '这个剪辑也太神了吧，学到了', releaseTime: '2024-01-05 14:33:22', sendTime: '22' },
        { id: 7, content: 'awsl', releaseTime: '2024-01-06 18:05:17', sendTime: '24' },
        { id: 8, content: '求BGM名字', releaseTime: '2024-01-07 09:48:33', sendTime: '26' },
        { id: 9, content: '感谢UP主的分享！这也太实用了', releaseTime: '2024-01-08 12:24:51', sendTime: '30' },
        { id: 10, content: '好家伙', releaseTime: '2024-01-09 16:39:02', sendTime: '33' },
        { id: 11, content: '这个细节我都没注意到，厉害了我的哥', releaseTime: '2024-01-10 20:11:47', sendTime: '35' },
        { id: 12, content: '前方高能', releaseTime: '2024-01-11 07:30:25', sendTime: '38' },
        { id: 13, content: '我愿称之为经典', releaseTime: '2024-01-12 11:44:19', sendTime: '40' },
        { id: 14, content: '这也太秀了吧', releaseTime: '2024-01-13 15:57:30', sendTime: '42' },
        { id: 15, content: '等等，这是什么操作？！这难道就是传说中的神仙打架吗？我愣住了', releaseTime: '2024-01-14 19:22:08', sendTime: '45' },
        { id: 16, content: '爷青回', releaseTime: '2024-01-15 08:46:53', sendTime: '48' },
        { id: 17, content: '这个镜头也太美了', releaseTime: '2024-01-16 12:59:21', sendTime: '50' },
        { id: 18, content: '我的天呐！！！', releaseTime: '2024-01-17 16:34:40', sendTime: '53' },
        { id: 19, content: '这个转场简直神了', releaseTime: '2024-01-18 20:17:15', sendTime: '56' },
        { id: 20, content: '妙啊', releaseTime: '2024-01-19 09:42:38', sendTime: '59' },
        { id: 21, content: '这就是所谓的实力吗', releaseTime: '2024-01-20 13:26:02', sendTime: '62' },
        { id: 22, content: '这个视频也太顶了吧！！我看了三遍都没看够', releaseTime: '2024-01-21 17:51:59', sendTime: '65' },
        { id: 23, content: '来了来了', releaseTime: '2024-01-22 21:33:27', sendTime: '68' },
        { id: 24, content: '这不科学啊', releaseTime: '2024-01-23 10:48:44', sendTime: '72' },
        { id: 25, content: '我傻了', releaseTime: '2024-01-24 14:20:11', sendTime: '75' },
        { id: 26, content: '这个细节处理的真好，一般人还真发现不了，感谢UP主的用心制作', releaseTime: '2024-01-25 18:37:53', sendTime: '80' },
        { id: 27, content: '可以，这很河狸', releaseTime: '2024-01-26 08:12:19', sendTime: '83' },
        { id: 28, content: '就离谱', releaseTime: '2024-01-27 11:45:06', sendTime: '85' },
        { id: 29, content: '23333', releaseTime: '2024-01-28 15:29:37', sendTime: '87' },
        { id: 30, content: '完结撒花~', releaseTime: '2024-01-29 19:58:24', sendTime: '87' }
    ]

    const handleOperationLike = () => {
        setOperationRecord({ ...operationRecord, like: !operationRecord.like });
    }
    const handleOperationCollect = () => {
        setOperationRecord({ ...operationRecord, collect: !operationRecord.collect });
    }
    const handleOperationShare = () => {
        setOperationRecord({ ...operationRecord, share: !operationRecord.share });
    }
    const handleOperationToubi = () => {
        setOperationRecord({ ...operationRecord, toubi: !operationRecord.toubi });
    }
    
    const inputClassName = `flex-1 px-4 py-2 border rounded-lg h-[50px] transition-colors duration-200 ${(inputValue || isFocused)
        ? 'bg-white border-[#9ccd0]'
        : 'bg-[#f1f2f3] border-none'
        }`;



    // 服务端渲染时返回占位内容，避免hydration错误
    if (!isClient) {
        return <div className="w-full h-screen bg-[#f5f5f5] flex items-center justify-center">
            <div className="text-lg text-gray-500">加载中...</div>
        </div>;
    }

    return (
        <div className={`w-full ${isMobile ? 'px-3' : isTablet ? 'px-5' : 'px-10'} mt-5`}>
            <div className={`${isMobile ? 'flex-col' : 'flex justify-between'} w-full h-full`}>
                {/* 左侧内容 */}
                <div className="flex-1 h-full flex flex-col">
                    {/* 视频信息 */}
                    <div className="mb-5">
                        <div className={`${isMobile ? 'text-lg' : 'text-[22px]'} font-semibold text-[#18191c] mb-[15px]`}>
                            {testVideoObject.title}
                        </div>
                        <div className="flex text-[13px] text-[#9499a0]">
                            <div className="flex items-center justify-center mr-[13px]">
                                <i className="iconfont icon-movie mr-[3px]"></i>
                                <span>{testVideoObject.playCount}</span>
                            </div>
                            <div className="flex items-center mr-[13px]">
                                <i className="iconfont icon-danmu-count mr-[3px]"></i>
                                <span>1000</span>
                            </div>
                            <div className="flex items-center">
                                <span>2024-01-01 19:19:40</span>
                            </div>
                        </div>
                    </div>

                    {/* 播放器 */}
                    <div className="shadow-lg flex-1 w-full h-full bg-black rounded-[10px] overflow-hidden">
                        <VideoPlayer 
                        height="100%" 
                        width="100%" 
                        url={testVideoObject.videoUrl}
                        damnuList={damnuList}
                         />
                    </div>

                    {/* 视频数据 */}
                    <div className="flex text-[#61666d] transition-all duration-300 border-b border-[#e5e5e5]">
                        <div
                            onClick={handleOperationLike}
                            className={`py-[18px] pb-5 ${operationRecord.like ? 'text-[#00aeec]' : 'hover:text-[#00aeec]'} transition-all duration-300 cursor-pointer mr-[45px] flex items-center`}>
                            <i className="iconfont icon-info-dianzhan mr-[5px]" style={{ fontSize: isMobile ? '24px' : '30px' }}></i>
                            <span className="text-sm pt-1">4494</span>
                        </div>
                        <div
                            onClick={handleOperationToubi}
                            className={`py-[18px] pb-5 ${operationRecord.toubi ? 'text-[#00aeec]' : 'hover:text-[#00aeec]'} transition-all duration-300 cursor-pointer mr-[45px] flex items-center`}>
                            <i className="iconfont icon-info-toubi mr-[5px]" style={{ fontSize: isMobile ? '24px' : '30px' }}></i>
                            <span className="text-sm pt-1">4494</span>
                        </div>
                        <div
                            onClick={handleOperationCollect}
                            className={`py-[18px] pb-5 ${operationRecord.collect ? 'text-[#00aeec]' : 'hover:text-[#00aeec]'} transition-all duration-300 cursor-pointer mr-[45px] flex items-center`}>
                            <i className="iconfont icon-info-shouchang mr-[5px]" style={{ fontSize: isMobile ? '24px' : '30px' }}></i>
                            <span className="text-sm pt-1">4494</span>
                        </div>
                        <div
                            onClick={handleOperationShare}
                            className={`py-[18px] pb-5 ${operationRecord.share ? 'text-[#00aeec]' : 'hover:text-[#00aeec]'} transition-all duration-300 cursor-pointer mr-[45px] flex items-center`}>
                            <i className="iconfont icon-info-zhuanfa mr-[5px]" style={{ fontSize: isMobile ? '24px' : '30px' }}></i>
                            <span className="text-sm pt-1">4494</span>
                        </div>
                    </div>

                    {/* 用户信息 - 移动端显示 */}
                    {isMobile && (
                        <div className="flex items-center my-4 border-b border-[#e5e5e5] pb-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                                <Link href={`/space/${testVideoObject.user.id}`}>
                                    <Image
                                        src={testVideoObject.user.avatarUrl}
                                        alt="User avatar"
                                        width={48}
                                        height={48}
                                        className="w-full h-full object-cover"
                                    />
                                </Link>
                            </div>
                            <div className="flex-1">
                                <div className="text-base font-semibold mb-1 text-[#18191c]">
                                    <Link href={`/space/${testVideoObject.user.id}`}>
                                        {testVideoObject.user.name}
                                    </Link>
                                </div>
                                <div className="text-sm text-[#9499a0]">
                                    {testVideoObject.user.desc}
                                </div>
                            </div>
                            <button className="px-4 py-1.5 bg-[#00aeec] text-white rounded-[5px] text-sm flex items-center">
                                <i className="iconfont icon-guanzhu mr-1"></i>
                                <span>关注</span>
                            </button>
                        </div>
                    )}

                    {/* 视频简介 */}
                    <div className="my-[18px]">
                        <span className={`${isMobile ? 'text-sm' : 'text-base'} leading-[26px]`}>
                            {testVideoObject.desc}
                        </span>
                    </div>

                    {/* 标签 */}
                    <div className="flex flex-wrap border-b border-[#e5e5e5] pb-[18px] mb-[18px]">
                        {testVideoObject.tagStr.split(',').map((tag, index) => (
                            <Tag key={index} tagContent={tag} />
                        ))}
                    </div>

                    {/* 移动端选项卡切换 */}
                    {isMobile && (
                        <div className="flex border-b border-[#e5e5e5] mb-4">
                            <button
                                className={`flex-1 py-3 text-center ${activeTab === 'recommend' ? 'text-[#00aeec] border-b-2 border-[#00aeec]' : 'text-[#61666d]'}`}
                                onClick={() => setActiveTab('recommend')}
                            >
                                推荐
                            </button>
                            <button
                                className={`flex-1 py-3 text-center ${activeTab === 'comment' ? 'text-[#00aeec] border-b-2 border-[#00aeec]' : 'text-[#61666d]'}`}
                                onClick={() => setActiveTab('comment')}
                            >
                                评论({testVideoObject.commentItems.length})
                            </button>
                        </div>
                    )}

                    {/* 评论区 - 在移动端根据选项卡显示 */}
                    {(!isMobile || (isMobile && activeTab === 'comment')) && (
                        <div>
                            {!isMobile && (
                                <div className="flex items-center mb-[18px]">
                                    <div className="flex items-center">
                                        <span className='text-[24px] text-[#18191c]'>评论</span>
                                        <span className="ml-2 text-[14px] text-[#9499a0] ml-[15px] mr-[30px] pt-[3px]">{testVideoObject.commentItems.length}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="mr-4 cursor-pointer">最热</span>
                                        <span className="cursor-pointer">最新</span>
                                    </div>
                                </div>
                            )}

                            {/* 评论输入框 */}
                            <div className="flex items-center mb-[18px]">
                                <div className={`${isMobile ? 'w-10 h-10' : 'w-[48px] h-[48px]'} rounded-full overflow-hidden mr-2.5`}>
                                    <Image
                                        src={testVideoObject.user.avatarUrl}
                                        alt="User avatar"
                                        width={isMobile ? 40 : 48}
                                        height={isMobile ? 40 : 48}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="说点什么..."
                                    className={`${inputClassName} ${isMobile ? 'h-[40px] text-sm' : 'h-[50px]'}`}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                />
                                <button className={`${isMobile ? 'px-3 py-1.5 text-sm' : 'px-6 py-2'} bg-[#00aeec] text-white rounded-lg hover:bg-[#0096cc] transition-colors duration-200`}>
                                    发送
                                </button>
                            </div>

                            <VideoComment commentItems={testVideoObject.commentItems} />
                        </div>
                    )}

                    {/* 移动端推荐视频 - 根据选项卡显示 */}
                    {isMobile && activeTab === 'recommend' && (
                        <div className="mb-4">
                            <VideoRecommendList recommendList={testVideoObject.recommendList} isMobile={isMobile} />
                        </div>
                    )}
                </div>

                {/* 右侧内容 - 仅在非移动端显示 */}
                {!isMobile && (
                    <div className={`${isTablet ? 'min-w-[300px] w-[300px]' : 'min-w-[400px] w-[400px]'} h-full ml-5`}>
                        {/* 作者信息 */}
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-2">
                                <Link href={`/space/${testVideoObject.user.id}`}>
                                    <Image
                                        src={testVideoObject.user.avatarUrl}
                                        alt="User avatar"
                                        width={48}
                                        height={48}
                                        className="w-full h-full object-cover"
                                    />
                                </Link>
                            </div>
                            <div className="flex-1">
                                <div className="text-base font-semibold mb-1.5 text-[#18191c]">
                                    <Link href={`/space/${testVideoObject.user.id}`}>
                                        {testVideoObject.user.name}
                                    </Link>
                                </div>
                                <div className="text-sm text-[#9499a0] mt-0.5">
                                    {testVideoObject.user.desc}
                                </div>
                                <div className="mt-1.5 flex w-[230px] h-[30px] bg-[#00aeec] text-white rounded-[5px] text-sm cursor-pointer items-center justify-center transition-colors hover:bg-[#48ceff]">
                                    <i className="iconfont icon-guanzhu"></i>
                                    <span className="mx-1.5">关注</span>
                                    <span>1000</span>
                                </div>
                            </div>
                        </div>

                        {/* 弹幕列表 */}
                        <DanmuList danmuList={damnuList} />

                        {/* 推荐视频 */}
                        <VideoRecommendList recommendList={testVideoObject.recommendList} />
                    </div>
                )}
            </div>
        </div>
    )
}