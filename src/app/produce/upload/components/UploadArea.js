import Image from 'next/image';

export default function UploadArea({ onUpload }) {
    const handleUploadClick = (e) => {
        e.stopPropagation();
        if (onUpload) {
            onUpload();
        }
    };

    return (
        <div 
            className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer"
            onClick={handleUploadClick}
            onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const file = e.dataTransfer.files?.[0];
                if (file && onUpload) {
                    const event = { target: { files: [file] } };
                    onUpload(event);
                }
            }}
        >
            <Image
                src="/images/upload-icon.png"
                alt="上传图标"
                width={84}
                height={84}
            />
            <p className="mt-4 text-gray-500">拖拽视频到此处可以上传</p>
            <button
                onClick={handleUploadClick}
                className="mt-4 px-8 py-2 bg-[#00aeec] text-white rounded hover:bg-[#00a1d6] transition-colors"
            >
                上传视频
            </button>
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-400">
                    <i className="iconfont icon-box-shangchuan mr-2"></i>
                    推荐使用bilibili投稿工具
                </p>
                <button 
                    className="mt-2 text-sm text-[#00aeec] hover:text-[#00a1d6]"
                    onClick={(e) => e.stopPropagation()}
                >
                    立即安装
                </button>
            </div>
        </div>
    );
} 