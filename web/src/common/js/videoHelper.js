export default class VideoHelper {
    constructor(file) {
        this.file = file;
    }

    /**
     * 获取视频的时长（秒）
     * @returns {Promise<number>} 返回一个 Promise，解析为视频的时长（秒）
     */
    async getDuration() {
        return new Promise((resolve, reject) => {
            // 创建一个 video 元素
            const video = document.createElement('video');

            // 当视频元数据加载完成后执行的回调函数
            video.onloadedmetadata = function() {
                // 解析 Promise，返回视频的时长（秒）
                resolve(Math.round(this.duration));
            };

            // 当加载视频元数据失败时执行的回调函数
            video.onerror = function() {
                // 拒绝 Promise，并返回一个错误对象
                reject(new Error('Failed to load video metadata'));
            };

            // 设置 video 元素的 src 属性为传入 VideoHelper 对象的文件的 URL
            video.src = URL.createObjectURL(this.file);
        });
    }


    /**
     * 获取视频文件的大小（字节）
     * @returns {Promise<number>} 返回一个 Promise，解析为视频文件的大小（字节）
     */
    async getSize() {
        // 直接返回视频文件的大小（字节）
        return this.file.size;
    }


    /**
     * 从视频文件中截取指定时间点的预览图，并返回预览图的数据 URL 和 Blob 对象
     * @param {number} timeInSeconds - 指定的时间点（秒）
     * @returns {Promise<{dataURL: string, blob: Blob}>} 返回一个 Promise，解析为包含截取的预览图的数据 URL 和 Blob 对象的对象
     */
    async getPreview(timeInSeconds) {
        return new Promise((resolve, reject) => {
            // 创建一个 video 元素
            const video = document.createElement('video');

            // 当视频元数据加载完成后执行的回调函数
            video.onloadedmetadata = function() {
                // 设置视频当前时间为指定时间点
                this.currentTime = timeInSeconds;
            };

            // 当视频跳转到指定时间点后执行的回调函数
            video.onseeked = function() {
                // 创建一个 canvas 元素
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                // 设置 canvas 的大小以匹配视频分辨率
                canvas.width = this.videoWidth;
                canvas.height = this.videoHeight;

                // 在 canvas 上绘制视频帧
                context.drawImage(this, 0, 0, canvas.width, canvas.height);

                // 将 canvas 中的图像数据转换为数据 URL
                const dataURL = canvas.toDataURL('image/webp');

                // 将 canvas 中的图像数据转换为 Blob 对象
                canvas.toBlob(blob => {
                    // 解析 Promise，返回包含截取的预览图的数据 URL 和 Blob 对象的对象
                    resolve({ dataURL, blob });
                }, 'image/webp');
            };

            // 当加载视频元数据失败时执行的回调函数
            video.onerror = function() {
                // 拒绝 Promise，并返回一个错误对象
                reject(new Error('Failed to load video metadata'));
            };

            // 设置 video 元素的 src 属性为传入 VideoHelper 对象的文件的 URL
            video.src = URL.createObjectURL(this.file);
        });
    }

    /**
     * 从视频文件中随机获取指定个数的随机视频进度的截图数组
     * @param {number} count - 指定的截图数量
     * @returns {Promise<string[]>} 返回一个 Promise，解析为包含随机视频进度的截图数据 URL 的数组
     */
    async getRandomPreviews(count) {
        // 获取视频时长
        const maxTime = await this.getDuration();

        const previews = [];
        const timeList = [];

        // 生成随机时间列表
        for (let i = 0; i < count; i++) {
            timeList.push(Math.random() * maxTime);
        }

        // 截取随机时间点的预览图
        for (let time of timeList) {
            const res = await this.getPreview(time);
            previews.push(res);
        }

        return previews;
    }

    // 静态方法，获取视频文件的播放时长
    static getDurationByStatic(file) {
        return new Promise((resolve, reject) => {
            if (!(file instanceof File)) {
                reject(new Error('参数必须是文件类型'));
                return;
            }

            // 创建视频元素
            const video = document.createElement('video');
            const fileURL = URL.createObjectURL(file); // 创建视频文件的临时 URL

            video.src = fileURL;

            // 监听视频元数据加载完成事件，获取视频时长
            video.addEventListener('loadedmetadata', () => {
                const duration = video.duration; // 获取视频的时长，单位是秒
                URL.revokeObjectURL(fileURL); // 释放 URL 对象
                resolve(duration); // 返回视频时长
            });

            // 错误处理
            video.addEventListener('error', (err) => {
                reject(new Error('视频加载失败'));
            });
        });
    }
}
