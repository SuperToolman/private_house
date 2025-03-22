'use client';

import { use, useState } from 'react';
// import { useParams } from "react-router"
import Image from "next/image"
import VideoPlayer from "./components/VideoPlayer"
import Tag from "./components/Tag"
import VideoComment from "./components/VideoComment"
import VideoRecommendList from "./components/VideoRecommendList"
import Link from 'next/link';

export default function VideoInfo({ params }) {
    const { id } = use(params);
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const inputClassName = `flex-1 px-4 py-2 border rounded-lg h-[50px] transition-colors duration-200 ${(inputValue || isFocused)
        ? 'bg-white border-[#9ccd0]'
        : 'bg-[#f1f2f3] border-none'
        }`;

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
                playCount: 23845,
                duration: '12:36',
                dmCount: 329,
            },
            {
                id: 2,
                title: '最新机械键盘开箱体验：红轴vs茶轴',
                coverUrl: '/images/test_videoCard_cover (2).avif',
                user: { id: 2, name: '科技达人', avatarUrl: '/images/testavatar.webp', desc: '数码产品评测专家' },
                playCount: 12756,
                duration: '08:42',
                dmCount: 156,
            },
            {
                id: 3,
                title: '三分钟学会这道家常菜，简单又好吃',
                coverUrl: '/images/test_videoCard_cover (3).avif',
                user: { id: 3, name: '家常美食', avatarUrl: '/images/testavatar.webp', desc: '美食烹饪博主' },
                playCount: 45632,
                duration: '03:15',
                dmCount: 421,
            },
            {
                id: 4,
                title: '游戏区新游推荐：本月值得一试的独立游戏',
                coverUrl: '/images/test_videoCard_cover (4).avif',
                user: { id: 4, name: '游戏玩家', avatarUrl: '/images/testavatar.webp', desc: '独立游戏爱好者' },
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
                duration: '11:05',
                dmCount: 267,
            },
            {
                id: 6,
                title: '探索城市摄影的构图技巧与后期处理',
                coverUrl: '/images/test_videoCard_cover (6).avif',
                user: { id: 6, name: '摄影师小王', avatarUrl: '/images/testavatar.webp', desc: '专业摄影师' },
                playCount: 18652,
                duration: '20:15',
                dmCount: 198,
            },
            {
                id: 7,
                title: '宠物猫咪的日常护理与训练小技巧',
                coverUrl: '/images/test_videoCard_cover (7).avif',
                user: { id: 7, name: '宠物爱好者', avatarUrl: '/images/testavatar.webp', desc: '宠物饲养员' },
                playCount: 29874,
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
                dmCount: 563,
            },
            {
                id: 9,
                title: '三天学会弹吉他：零基础入门教程',
                coverUrl: '/images/test_videoCard_cover (9).avif',
                user: { id: 9, name: '音乐老师', avatarUrl: '/images/testavatar.webp', desc: '专业音乐教育' },
                playCount: 15963,
                duration: '18:22',
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
            },
        ]
    }

    return (
        <div className="w-full px-10 mt-5">
            <div className="flex justify-between w-full h-full">
                {/* 左侧内容 */}
                <div className="flex-1 h-full flex flex-col">
                    {/* 视频信息 */}
                    <div className="mb-5">
                        <div className="text-[22px] font-semibold text-[#18191c] mb-[15px]">
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
                        <VideoPlayer height="100%" width="100%" url={testVideoObject.videoUrl} />
                    </div>

                    {/* 视频数据 */}
                    <div className="flex text-[#61666d] transition-all duration-300 border-b border-[#e5e5e5]">
                        <div className="py-[18px] pb-5 hover:text-[#00aeec] transition-all duration-300 cursor-pointer mr-[45px] flex items-center">
                            <i className="iconfont icon-info-dianzhan mr-[5px]" style={{ fontSize: '30px' }}></i>
                            <span className="text-sm pt-1">4494</span>
                        </div>
                        <div className="py-[18px] pb-5 hover:text-[#00aeec] transition-all duration-300 cursor-pointer mr-[45px] flex items-center">
                            <i className="iconfont icon-info-toubi mr-[5px]" style={{ fontSize: '30px' }}></i>
                            <span className="text-sm pt-1">4494</span>
                        </div>
                        <div className="py-[18px] pb-5 hover:text-[#00aeec] transition-all duration-300 cursor-pointer mr-[45px] flex items-center">
                            <i className="iconfont icon-info-shouchang mr-[5px]" style={{ fontSize: '30px' }}></i>
                            <span className="text-sm pt-1">4494</span>
                        </div>
                        <div className="py-[18px] pb-5 hover:text-[#00aeec] transition-all duration-300 cursor-pointer mr-[45px] flex items-center">
                            <i className="iconfont icon-info-zhuanfa mr-[5px]" style={{ fontSize: '30px' }}></i>
                            <span className="text-sm pt-1">4494</span>
                        </div>
                    </div>

                    {/* 视频简介 */}
                    <div className="my-[18px]">
                        <span className="text-base leading-[26px]">
                            {testVideoObject.desc}
                        </span>
                    </div>

                    {/* 标签 */}
                    <div className="flex border-b border-[#e5e5e5] pb-[18px] mb-[18px]">
                        {testVideoObject.tagStr.split(',').map((tag, index) => (
                            <Tag key={index} tagContent={tag} />
                        ))}
                    </div>

                    {/* 评论 */}
                    <div>
                        <div className="flex items-center mb-[18px]">
                            <div className="flex items-center">
                                <span className='text-[24px] text-[#18191c]'>评论</span>
                                <span className="ml-2 text-[14px] text-[#9499a0] ml-[15px] mr-[30px]  pt-[3px]">74</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-4 cursor-pointer">最热</span>
                                <span className="cursor-pointer">最新</span>
                            </div>
                        </div>

                        {/* 评论输入框 */}
                        <div className="flex items-center mb-[18px]">
                            <div className="w-[48px] h-[48px] rounded-full overflow-hidden mr-2.5">
                                <Image
                                    src={testVideoObject.user.avatarUrl}
                                    alt="User avatar"
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="说点什么..."
                                className={inputClassName}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                            <button className="px-6 py-2 bg-[#00aeec] text-white rounded-lg hover:bg-[#0096cc] transition-colors duration-200">
                                发送
                            </button>
                        </div>

                        <VideoComment commentItems={testVideoObject.commentItems} />
                    </div>
                </div>

                {/* 右侧内容 */}
                <div className="min-w-[400px] w-[400px] h-full ml-5">
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
                    <div className="my-[15px] mb-5 w-full">
                        <div className="w-full h-11 rounded-[5px] bg-[#f1f2f3] flex items-center px-4">
                            <div className="text-base font-semibold text-[#18191c]">
                                弹幕列表
                            </div>
                        </div>
                    </div>

                    {/* 推荐视频 */}
                    <VideoRecommendList recommendList={testVideoObject.recommendList} />
                </div>
            </div>
        </div>
    )
}