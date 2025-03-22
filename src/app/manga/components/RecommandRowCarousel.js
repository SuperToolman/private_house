import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import Image from 'next/image';
import Link from 'next/link';
import { Autoplay, Pagination, FreeMode } from 'swiper/modules';
import { useEffect, useState, useRef } from 'react';
import { useResponsive } from '../../contexts/ResponsiveContext';

export default function RecommandRowCarousel() {
    const { isMobile, isTablet } = useResponsive();
    
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

    // 鼠标悬停时减慢速度，移动时加速
    const handleMouseEnter = () => {
        setAutoplaySpeed(8000); // 更慢的速度
        if (swiperRef.current) {
            swiperRef.current.autoplay.stop();
            swiperRef.current.autoplay.start();
        }
    };

    const handleMouseLeave = () => {
        setAutoplaySpeed(4000); // 恢复正常速度
        if (swiperRef.current) {
            swiperRef.current.autoplay.stop();
            swiperRef.current.autoplay.start();
        }
    };

    const CarouselItem = ({ item }) => (
        <Link href={`/manga/${item.id}`} className="block h-full">
            <div className="carousel-item-container h-full">
                <div className="manga-cover-container relative h-full bg-gray-200 group">
                    {/* 图片容器 */}
                    <div className="relative h-full overflow-hidden rounded-md">
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 90vw, 300px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* 渐变遮罩 */}
                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>

                    {/* 文字内容 */}
                    <div className="absolute bottom-0 left-0 p-3 w-full text-white">
                        <h3 className={`font-medium ${isMobile ? 'text-sm' : 'text-base'} line-clamp-1`}>{item.title}</h3>
                        <p className={`mt-1 ${isMobile ? 'text-xs' : 'text-sm'} text-gray-300 line-clamp-1`}>{item.subtitle}</p>
                    </div>
                </div>
            </div>
        </Link>
    );

    return (
        <div className={`mt-6 ${isMobile ? 'mb-3' : 'mb-6'}`}>
            <div 
                className={`relative rounded-lg bg-black/5 ${isMobile ? 'pt-2 pb-6' : 'pt-3 pb-8'}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Swiper
                    modules={[Autoplay, Pagination, FreeMode]}
                    spaceBetween={isMobile ? 8 : 16}
                    slidesPerView={isMobile ? 1.2 : "auto"}
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
                        <SwiperSlide 
                            key={`${item.id}-${index}`} 
                            className="manga-slide"
                            style={{ 
                                width: isMobile ? 'auto' : '300px',
                                height: isMobile ? '180px' : '240px'
                            }}
                        >
                            <CarouselItem item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
