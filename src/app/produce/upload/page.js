'use client'
import { useState, useRef, useEffect } from 'react';
import UploadArea from './components/UploadArea';
import TaskList from './components/TaskList';
import VideoForm from './components/VideoForm';

// 视频投稿
export default function Upload() {
    const fileInputRef = useRef(null);
    const [uploadTasks, setUploadTasks] = useState([]);
    const [activeTaskId, setActiveTaskId] = useState(null);
    const [selectedTags, setSelectedTags] = useState(['生活记录']);
    const [videoInfo, setVideoInfo] = useState({
        title: '',
        cover: '',
        type: '自制',
        partition: '游戏',
        tags: [],
        description: ''
    });
    const videoRef = useRef(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [tagInput, setTagInput] = useState('');

    // 每个任务的数据结构
    const initialTaskData = {
        title: '',
        cover: '',
        coverImages: [],
        type: '自制',
        partition: '游戏',
        tags: [],
        description: '',
        progress: 0,
        status: 'uploading', // uploading, completed, error
        fileInfo: {
            size: '832.3MB',
            uploaded: '9.0MB',
            remainingTime: '4.45秒'
        }
    };

    const handleUploadClick = () => {
        // 触发隐藏的文件输入框的点击事件
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const captureVideoFrames = async (file, taskId) => {
        setIsCapturing(true);
        const video = document.createElement('video');
        video.src = URL.createObjectURL(file);
        
        return new Promise((resolve, reject) => {
            video.onloadeddata = async () => {
                const frames = [];
                const duration = video.duration;
                
                try {
                    const timePoints = Array.from({length: 5}, () => 
                        Math.floor(Math.random() * duration)
                    );

                    for (let time of timePoints) {
                        video.currentTime = time;
                        await new Promise(resolve => video.onseeked = resolve);
                        
                        const canvas = document.createElement('canvas');
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                        frames.push(canvas.toDataURL('image/jpeg'));
                    }

                    setUploadTasks(tasks =>
                        tasks.map(task =>
                            task.id === taskId
                                ? { 
                                    ...task, 
                                    coverImages: frames,
                                    cover: frames[0]
                                }
                                : task
                        )
                    );

                    setIsCapturing(false);
                    URL.revokeObjectURL(video.src);
                    resolve();
                } catch (error) {
                    setIsCapturing(false);
                    reject(error);
                }
            };

            video.onerror = () => {
                setIsCapturing(false);
                reject(new Error('视频加载失败'));
            };
        });
    };

    const refreshCovers = () => {
        const task = uploadTasks.find(t => t.id === activeTaskId);
        if (task && videoRef.current) {
            captureVideoFrames(videoRef.current, activeTaskId);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target?.files?.[0];
        if (!file) return;

        videoRef.current = file;
        const fileName = file.name.replace(/\.[^/.]+$/, "");
        const newTaskId = Date.now();

        const newTask = {
            id: newTaskId,
            date: new Date().toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' }),
            filename: file.name,
            ...initialTaskData,
            title: fileName,
            coverImages: [],
            fileInfo: {
                size: `${(file.size / (1024 * 1024)).toFixed(1)}MB`,
                uploaded: '0MB',
                remainingTime: '计算中...'
            }
        };
        
        setUploadTasks([...uploadTasks, newTask]);
        setActiveTaskId(newTaskId);
        captureVideoFrames(file, newTaskId);
        simulateUploadProgress(newTaskId);
    };

    const simulateUploadProgress = (taskId) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            setUploadTasks(tasks => 
                tasks.map(task => 
                    task.id === taskId 
                        ? { ...task, progress: progress }
                        : task
                )
            );
            if (progress >= 100) {
                clearInterval(interval);
                setUploadTasks(tasks =>
                    tasks.map(task =>
                        task.id === taskId
                            ? { ...task, status: 'completed' }
                            : task
                    )
                );
            }
        }, 50);
    };

    const handleTaskClick = (taskId) => {
        setActiveTaskId(taskId);
    };

    const handleTaskUpdate = (updatedTask) => {
        setUploadTasks(tasks =>
            tasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
    };

    const handleSubmitSingle = () => {
        const task = uploadTasks.find(t => t.id === activeTaskId);
        if (!task) return;

        if (!task.title.trim()) {
            alert('请输入标题');
            return;
        }
        if (!task.cover) {
            alert('请选择封面');
            return;
        }
        if (task.tags.length === 0) {
            alert('请至少添加一个标签');
            return;
        }

        const tagString = task.tags.join(',');
        console.log('提交单个视频：', {
            ...task,
            tagString
        });
    };

    const handleSubmitAll = () => {
        const invalidTasks = uploadTasks.filter(task => {
            return !task.title.trim() || !task.cover || task.tags.length === 0;
        });

        if (invalidTasks.length > 0) {
            alert('部分视频信息未填写完整，请检查');
            return;
        }

        console.log('提交所有视频：', uploadTasks.map(task => ({
            ...task,
            tagString: task.tags.join(',')
        })));
    };

    useEffect(() => {
        return () => {
            if (videoRef.current) {
                URL.revokeObjectURL(videoRef.current);
            }
        };
    }, []);

    const activeTask = uploadTasks.find(task => task.id === activeTaskId);

    const handleTagClick = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else if (selectedTags.length < 3) {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const suggestedTags = [
        { name: '生活记录', hot: true },
        { name: '直播', hot: true },
        { name: '记录', hot: false },
        { name: '学习', hot: false }
    ];

    const handleTagInput = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault(); // 阻止回车默认行为

            // 按逗号分割输入的标签
            const newTags = tagInput.split(',').map(tag => tag.trim()).filter(tag => tag);

            // 更新当前任务的标签
            setUploadTasks(tasks =>
                tasks.map(task =>
                    task.id === activeTaskId
                        ? {
                            ...task,
                            tags: [...new Set([...task.tags, ...newTags])].slice(0, 7) // 去重并限制最多7个标签
                        }
                        : task
                )
            );

            // 清空输入框
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setUploadTasks(tasks =>
            tasks.map(task =>
                task.id === activeTaskId
                    ? {
                        ...task,
                        tags: task.tags.filter(tag => tag !== tagToRemove)
                    }
                    : task
            )
        );
    };

    return (
        <div className="p-8">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="video/*"
                className="hidden"
            />

            {uploadTasks.length === 0 ? (
                <UploadArea onUpload={handleUploadClick} />
            ) : (
                <div className="max-w-[1000px] mx-auto">
                    <TaskList
                        tasks={uploadTasks}
                        activeTaskId={activeTaskId}
                        onTaskClick={handleTaskClick}
                        onAddVideo={handleUploadClick}
                        onRetryFailed={() => {}}
                    />

                    {activeTask && (
                        <VideoForm
                            task={activeTask}
                            onUpdate={handleTaskUpdate}
                            isCapturing={isCapturing}
                            onRefreshCovers={refreshCovers}
                            onSubmitSingle={handleSubmitSingle}
                            onSubmitAll={handleSubmitAll}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
