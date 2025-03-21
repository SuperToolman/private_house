import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function RecommandHeader() {
    const [layout, setLayout] = useState([]);
    
    // 模拟推荐漫画数据 - 数量可能不固定
    const recommendedManga = [
        { id: 1, title: '碧蓝之海', image: '/images/test_manga_cover (1).webp', author: '小山佐保姆', tag: '校园恋爱' },
        { id: 2, title: '女神家的慕琴', image: '/images/test_manga_cover (2).webp', author: '水中仙浮', tag: '恋爱' },
        { id: 3, title: '夏衣·伊人·梦河', image: '/images/test_manga_cover (3).webp', author: '百合巷', tag: '古风' },
        { id: 4, title: '男女恋爱的我们', image: '/images/test_manga_cover (4).webp', author: '长琴青', tag: '校园恋爱' },
        { id: 5, title: '私奔女友的秘密', image: '/images/test_manga_cover (5).webp', author: '茶叶薯子', tag: '爱情' },
        { id: 6, title: '如此温柔的灯游戏', image: '/images/test_manga_cover (6).webp', author: '梨子红梅', tag: '悬疑' },
        { id: 7, title: '跨界流星雨', image: '/images/test_manga_cover (7).webp', author: '彩灯路', tag: '奇幻' },
        { id: 8, title: '非人哉', image: '/images/test_manga_cover (8).webp', author: '一汪空气', tag: '搞笑' },
        { id: 9, title: '君临世界', image: '/images/test_manga_cover (9).webp', author: '水墨轩', tag: '冒险' },
        { id: 10, title: '我的自我', image: '/images/test_manga_cover (10).webp', author: '红叶飘飘', tag: '生活' },
        { id: 11, title: '追求梦想', image: '/images/test_manga_cover (11).webp', author: '流星雨', tag: '励志' },
        { id: 12, title: '魔法世界', image: '/images/test_manga_cover (12).webp', author: '彩虹门', tag: '奇幻' },
        { id: 13, title: '城市猎人', image: '/images/test_manga_cover (13).webp', author: '夜行者', tag: '悬疑' },
        { id: 14, title: '夏日恋歌', image: '/images/test_manga_cover (14).webp', author: '阳光树', tag: '恋爱' },
        { id: 15, title: '巨龙传说', image: '/images/test_manga_cover (15).webp', author: '火山石', tag: '冒险' },
        { id: 16, title: '青春记忆', image: '/images/test_manga_cover (16).webp', author: '时光机', tag: '校园' },
        { id: 17, title: '未来战士', image: '/images/test_manga_cover (17).webp', author: '星际航', tag: '科幻' },
        { id: 18, title: '古代传奇', image: '/images/test_manga_cover (18).webp', author: '历史者', tag: '古风' },
        { id: 19, title: '幽灵公寓', image: '/images/test_manga_cover (19).webp', author: '阴影', tag: '恐怖' },
        { id: 20, title: '厨神争霸', image: '/images/test_manga_cover (20).webp', author: '美食家', tag: '美食' },
        { id: 21, title: '赛车英雄', image: '/images/test_manga_cover (21).webp', author: '速度之王', tag: '竞技' },
    ];

    // 生成一个随机布局
    useEffect(() => {
        generateRandomLayout();
    }, []);

    // 计算单元格大小 - 以适应398px高度
    const GRID_HEIGHT = 398; // 固定容器高度
    const ROW_HEIGHT = 90; // 单行高度 (略微减小以增加行数)
    const MAX_ROWS = Math.floor(GRID_HEIGHT / ROW_HEIGHT); // 最大行数
    const GAP_SIZE = 6; // 间隙大小减小，使布局更紧凑

    // 生成随机布局的函数
    const generateRandomLayout = () => {
        // 获取实际可用的数据
        const availableItems = [...recommendedManga];
        const newLayout = [];
        
        // 创建网格模板 - 每行12个单元格
        const grid = Array(MAX_ROWS).fill().map(() => Array(12).fill(0));
        
        // 计算大卡片数量 - 数据量少时增加大卡片比例
        const itemCount = availableItems.length;
        let largeItemCount;
        
        if (itemCount <= 6) {
            // 如果数据很少，让大部分都是大卡片
            largeItemCount = Math.max(2, Math.floor(itemCount * 0.7));
        } else if (itemCount <= 12) {
            // 适中数据量，保持约40%的大卡片比例
            largeItemCount = Math.floor(itemCount * 0.4);
        } else {
            // 数据充足时，控制大卡片比例在30%左右
            largeItemCount = Math.floor(itemCount * 0.3);
        }
        
        // 限制最大数量
        largeItemCount = Math.min(5, largeItemCount);
        
        // 多样化卡片大小，以提高填充效率
        const cardSizes = [
            { cols: 3, rows: 2, weight: 2 },  // 横向大卡
            { cols: 2, rows: 2, weight: 3 },  // 方形卡片
            { cols: 2, rows: 3, weight: 1 },  // 纵向大卡
            { cols: 4, rows: 2, weight: 1 },  // 超宽卡片 (适合少数据)
            { cols: 6, rows: 2, weight: itemCount <= 8 ? 1 : 0 }, // 半屏宽卡片 (仅在极少数据时使用)
        ];
        
        // 根据权重创建尺寸池
        const sizePool = [];
        cardSizes.forEach(size => {
            for (let i = 0; i < size.weight; i++) {
                sizePool.push(size);
            }
        });
        
        // 填充开始：优先考虑放置大型卡片在视觉重要位置
        // 1. 左上角大卡片
        if (availableItems.length > 0 && grid[0][0] === 0) {
            const manga = availableItems.shift();
            const size = { cols: 3, rows: 2 };
            
            for (let r = 0; r < size.rows; r++) {
                for (let c = 0; c < size.cols; c++) {
                    if (r < MAX_ROWS && c < 12) {
                        grid[r][c] = 1;
                    }
                }
            }
            
            newLayout.push({
                manga: manga,
                colStart: 1,
                rowStart: 1,
                colSpan: size.cols,
                rowSpan: size.rows,
                isHot: true, // 保证至少一个热门
            });
        }
        
        // 2. 右侧大卡片 (在数据少时)
        if (availableItems.length > 0 && itemCount <= 10 && grid[0][9] === 0) {
            const manga = availableItems.shift();
            const size = { cols: 3, rows: 2 };
            
            for (let r = 0; r < size.rows; r++) {
                for (let c = 0; c < size.cols; c++) {
                    if (r < MAX_ROWS && c + 9 < 12) {
                        grid[r][c + 9] = 1;
                    }
                }
            }
            
            newLayout.push({
                manga: manga,
                colStart: 10,
                rowStart: 1,
                colSpan: size.cols,
                rowSpan: size.rows,
                isHot: Math.random() > 0.5,
            });
        }
        
        // 随机放置剩余的大型卡片
        const remainingLargeCount = largeItemCount - newLayout.length;
        
        for (let i = 0; i < remainingLargeCount && availableItems.length > 0; i++) {
            const randomItemIndex = Math.floor(Math.random() * availableItems.length);
            const manga = availableItems.splice(randomItemIndex, 1)[0];
            
            // 随机选择卡片尺寸
            const randomSizeIndex = Math.floor(Math.random() * sizePool.length);
            const size = {...sizePool[randomSizeIndex]};
            
            // 排除超出容器高度的尺寸
            if (size.rows > MAX_ROWS) {
                size.rows = 2;
            }
            
            // 寻找可以放置大型卡片的位置
            let placed = false;
            let attempts = 0;
            
            while (!placed && attempts < 150) {
                const startRow = Math.floor(Math.random() * (MAX_ROWS - size.rows + 1));
                const startCol = Math.floor(Math.random() * (12 - size.cols + 1));
                
                // 检查这个位置是否可用
                let canPlace = true;
                for (let r = 0; r < size.rows; r++) {
                    for (let c = 0; c < size.cols; c++) {
                        if (startRow + r >= MAX_ROWS || startCol + c >= 12 || grid[startRow + r][startCol + c] === 1) {
                            canPlace = false;
                            break;
                        }
                    }
                    if (!canPlace) break;
                }
                
                // 如果可以放置，则标记位置为已占用
                if (canPlace) {
                    for (let r = 0; r < size.rows; r++) {
                        for (let c = 0; c < size.cols; c++) {
                            grid[startRow + r][startCol + c] = 1;
                        }
                    }
                    
                    newLayout.push({
                        manga: manga,
                        colStart: startCol + 1,
                        rowStart: startRow + 1, 
                        colSpan: size.cols,
                        rowSpan: size.rows,
                        isHot: Math.random() > 0.6, // 大卡片有40%概率为热门
                    });
                    
                    placed = true;
                }
                
                attempts++;
            }
            
            // 如果无法放置，则作为小卡片处理
            if (!placed) {
                availableItems.push(manga);
            }
        }
        
        // 尝试放置宽条形卡片 (2行1高)
        if (availableItems.length > 0 && itemCount >= 10) {
            const possibleRows = [1, 3]; // 在第1行或第3行放置
            
            for (const rowStart of possibleRows) {
                if (rowStart + 1 <= MAX_ROWS) {
                    // 检查是否有足够的连续空间
                    let maxConsecutiveEmpty = 0;
                    let currentConsecutive = 0;
                    let startCol = -1;
                    
                    for (let c = 0; c < 12; c++) {
                        if (grid[rowStart-1][c] === 0 && (rowStart >= MAX_ROWS || grid[rowStart][c] === 0)) {
                            if (currentConsecutive === 0) {
                                startCol = c;
                            }
                            currentConsecutive++;
                        } else {
                            if (currentConsecutive > maxConsecutiveEmpty) {
                                maxConsecutiveEmpty = currentConsecutive;
                            }
                            currentConsecutive = 0;
                        }
                    }
                    
                    // 如果有足够空间放置一个宽卡片
                    if (maxConsecutiveEmpty >= 4 && availableItems.length > 0) {
                        const manga = availableItems.shift();
                        const wideColSpan = Math.min(maxConsecutiveEmpty, 6); // 最宽6格
                        
                        for (let c = 0; c < wideColSpan; c++) {
                            grid[rowStart-1][startCol + c] = 1;
                            if (rowStart < MAX_ROWS) {
                                grid[rowStart][startCol + c] = 1;
                            }
                        }
                        
                        newLayout.push({
                            manga: manga,
                            colStart: startCol + 1,
                            rowStart: rowStart,
                            colSpan: wideColSpan,
                            rowSpan: 1,
                            isHot: Math.random() > 0.5,
                        });
                    }
                }
            }
        }
        
        // 放置剩余小型卡片 (1x1)，优先填充顶部行
        for (let r = 0; r < MAX_ROWS; r++) {
            for (let c = 0; c < 12; c++) {
                if (grid[r][c] === 0 && availableItems.length > 0) {
                    const manga = availableItems.shift();
                    grid[r][c] = 1;
                    
                    newLayout.push({
                        manga: manga,
                        colStart: c + 1,
                        rowStart: r + 1,
                        colSpan: 1,
                        rowSpan: 1,
                        isHot: Math.random() > 0.8, // 20%概率为热门
                    });
                }
            }
        }
        
        // 如果还有剩余数据，尝试挤压放置
        if (availableItems.length > 0) {
            // 寻找任何可能的空隙
            for (let r = 0; r < MAX_ROWS; r++) {
                for (let c = 0; c < 12; c++) {
                    if (grid[r][c] === 0 && availableItems.length > 0) {
                        const manga = availableItems.shift();
                        grid[r][c] = 1;
                        
                        newLayout.push({
                            manga: manga,
                            colStart: c + 1,
                            rowStart: r + 1,
                            colSpan: 1,
                            rowSpan: 1,
                            isHot: Math.random() > 0.8,
                        });
                    }
                }
            }
        }
        
        setLayout(newLayout);
    };

    return (
        <div className="w-full mb-8">
            {/* 使用CSS Grid布局实现随机排列 - 高度固定为398px */}
            <div 
                className="grid grid-cols-12 gap-1" 
                style={{ 
                    // height: '398px',
                    gridTemplateRows: `repeat(${MAX_ROWS}, ${ROW_HEIGHT}px)`,
                }}
            >
                {layout.map((item, index) => (
                    <div 
                        key={`${item.manga.id}-${index}`}
                        style={{
                            gridColumnStart: item.colStart,
                            gridColumnEnd: `span ${item.colSpan}`,
                            gridRowStart: item.rowStart,
                            gridRowEnd: `span ${item.rowSpan}`,
                        }}
                        className="relative overflow-hidden"
                    >
                        <MangaItem 
                            manga={item.manga} 
                            isHot={item.isHot} 
                            isLarge={item.colSpan > 1 || item.rowSpan > 1}
                        />
                    </div>
                ))}
            </div>
            
            {/* 添加刷新布局按钮 - 仅用于测试 */}
            {/* <button 
                onClick={generateRandomLayout}
                className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm"
            >
                刷新布局
            </button> */}
        </div>
    );
}

// 抽取成单独的组件，方便复用
function MangaItem({ manga, isLarge = false, isHot = false }) {
    return (
        <div 
            className="relative w-full h-full rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
        >
            <Link href={`/manga/${manga.id}`}>
                <div className="w-full h-full relative group">
                    {/* 占位图片 */}
                    <div className="absolute inset-0 bg-gray-200 animate-pulse">
                        {/* 图片加载前的占位 */}
                    </div>
                    
                    {/* 图片 */}
                    <Image
                        src={manga.image || '/images/manga-placeholder.jpg'}
                        alt={manga.title}
                        fill
                        className="object-cover"
                        sizes={isLarge ? '33vw' : '16vw'}
                    />
                    
                    {/* 渐变遮罩 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* 漫画信息 */}
                    <div className="absolute bottom-0 left-0 p-3 w-full text-white">
                        <h3 className={`font-medium ${isLarge ? 'text-xl' : 'text-sm'} line-clamp-1`}>
                            {manga.title}
                        </h3>
                        {isLarge && (
                            <div className="mt-1 text-sm text-gray-300">
                                <span>{manga.author}</span>
                                <span className="mx-2">·</span>
                                <span>{manga.tag}</span>
                            </div>
                        )}
                    </div>
                    
                    {/* 热门标签 */}
                    {isHot && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                            热门
                        </div>
                    )}
                </div>
            </Link>
        </div>
    );
}
