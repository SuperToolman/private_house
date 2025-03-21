import Image from 'next/image';

export default function CoverSelector({ 
    currentCover, 
    coverImages, 
    isCapturing, 
    onCoverSelect, 
    onRefresh 
}) {
    return (
        <div className="flex gap-3">
            {/* 当前封面预览 */}
            <div className="w-[180px] h-[100px] bg-gray-100 rounded overflow-hidden flex-shrink-0">
                {currentCover ? (
                    <Image 
                        src={currentCover} 
                        alt="当前封面"
                        width={180}
                        height={100}
                        className="object-cover"
                        unoptimized // 因为是动态生成的 base64 图片
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        暂无封面
                    </div>
                )}
            </div>

            {/* 从视频中截取的封面 */}
            <div className="flex-1">
                <div className="text-sm text-gray-500 mb-2">从视频中截取</div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {isCapturing ? (
                        <div className="text-sm text-gray-400">截取封面中...</div>
                    ) : coverImages?.length > 0 ? (
                        coverImages.map((cover, index) => (
                            <div 
                                key={index}
                                className={`w-[120px] h-[67px] rounded cursor-pointer overflow-hidden flex-shrink-0 ${
                                    currentCover === cover ? 'ring-2 ring-[#00aeec]' : ''
                                }`}
                                onClick={() => onCoverSelect(cover)}
                            >
                                <Image 
                                    src={cover} 
                                    alt={`封面选项${index + 1}`}
                                    width={120}
                                    height={67}
                                    className="object-cover"
                                    unoptimized // 因为是动态生成的 base64 图片
                                />
                            </div>
                        ))
                    ) : (
                        <div className="text-sm text-gray-400">暂无可选封面</div>
                    )}
                </div>
                <button
                    onClick={onRefresh}
                    className="mt-2 text-sm text-[#00aeec] hover:text-[#00a1d6]"
                >
                    重新截取
                </button>
            </div>
        </div>
    );
} 