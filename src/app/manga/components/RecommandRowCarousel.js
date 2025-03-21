import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import Image from 'next/image';
import Link from 'next/link';
import { Autoplay, Pagination, FreeMode } from 'swiper/modules';
import { useEffect, useState, useRef } from 'react';

export default function RecommandRowCarousel() {
    // 模拟轮播图数据
    const carouselItems = [
        { id: 1, title: '碧蓝之海', image: '/images/test_manga_cover (1).webp', subtitle: '夏日冒险即将开始' },
        { id: 2, title: '女神家的慕琴', image: '/images/test_manga_cover (2).webp', subtitle: '遇见你是最美的意外' },
        { id: 3, title: '夏衣·伊人·梦河', image: '/images/test_manga_cover (3).webp', subtitle: '古风爱情传说' },
        { id: 4, title: '男女恋爱的我们', image: '/images/test_manga_cover (4).webp', subtitle: '青春校园浪漫故事' },
        { id: 5, title: '私奔女友的秘密', image: '/images/test_manga_cover (5).webp', subtitle: '神秘背后的真相' },
        { id: 6, title: '如此温柔的灯游戏', image: '/images/test_manga_cover (6).webp', subtitle: '在黑暗中寻找光明' },
        { id: 7, title: '魔法世界', image: '/images/test_manga_cover (12).webp', subtitle: '探索未知的奇幻旅程' },
        { id: 8, title: '城市猎人', image: '/images/test_manga_cover (13).webp', subtitle: '都市中的神秘冒险' },
    ];

    // 固定轮播图尺寸
    const [autoplaySpeed, setAutoplaySpeed] = useState(4000);
    const swiperRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setAutoplaySpeed(5000);
            } else if (window.innerWidth < 768) {
                setAutoplaySpeed(4500);
            } else if (window.innerWidth < 1024) {
                setAutoplaySpeed(4000);
            } else {
                setAutoplaySpeed(3500);
            }
        };

        // 初始设置
        handleResize();

        // 监听窗口大小变化
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 鼠标悬停/离开处理
    const handleMouseEnter = () => {
        if (swiperRef.current && swiperRef.current.autoplay) {
            swiperRef.current.autoplay.stop();
        }
    };

    const handleMouseLeave = () => {
        if (swiperRef.current && swiperRef.current.autoplay) {
            swiperRef.current.autoplay.start();
        }
    };

    return (
        <div className="w-full mb-12">
            {/* 设置CSS变量确保匀速移动和固定尺寸 */}
            <style jsx global>{`
                :root {
                    --swiper-wrapper-transition-timing-function: linear !important;
                }
                
                .continuous-carousel .swiper-wrapper {
                    transition-timing-function: linear !important;
                }
                
                .manga-slide {
                    width: 219px !important;
                    height: 288px !important;
                }
            `}</style>
            
            {/* 轮播容器，包含鼠标事件监听 */}
            <div 
                className="carousel-wrapper" 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Swiper
                    modules={[Autoplay, Pagination, FreeMode]}
                    spaceBetween={16}
                    slidesPerView="auto"
                    loop={true}
                    speed={autoplaySpeed} // 控制速度
                    autoplay={{
                        delay: 0, // 无延迟
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false, // 禁用内置的暂停，使用我们自己的事件处理
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper; // 存储Swiper实例引用
                    }}
                    className="w-full overflow-hidden carousel-container continuous-carousel"
                >
                    {/* 复制多份数据，确保滚动更流畅 */}
                    {[...carouselItems, ...carouselItems, ...carouselItems].map((item, index) => (
                        <SwiperSlide key={`${item.id}-${index}`} className="manga-slide">
                            <CarouselItem item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

function CarouselItem({ item }) {
    return (
        <Link href={`/manga/${item.id}`} className="block w-full h-full relative group">
            <div className="w-full h-full relative overflow-hidden rounded-lg">
                {/* 背景图片 */}
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="219px"
                    priority
                />
                
                {/* 渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80"></div>
                
                {/* 标题和描述 - 调整以适应较小的卡片尺寸 */}
                <div className="absolute bottom-0 left-0 p-3 w-full text-white">
                    <h3 className="text-lg font-bold mb-1 line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-gray-200 line-clamp-2">{item.subtitle}</p>
                </div>
                
                {/* 透明悬浮按钮 - 调整大小以适应卡片尺寸 */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium">
                        立即阅读
                    </div>
                </div>
            </div>
        </Link>
    );
}
