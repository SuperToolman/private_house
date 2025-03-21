export default function TaskList({ tasks, activeTaskId, onTaskClick, onAddVideo, onRetryFailed }) {
    return (
        <div className="mb-6 bg-white rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    <button onClick={onAddVideo} className="text-[#00aeec] hover:text-[#00a1d6]">
                        + 添加视频
                    </button>
                </div>
                <button 
                    onClick={onRetryFailed}
                    className="text-[#00aeec] hover:text-[#00a1d6]"
                >
                    重试失败
                </button>
            </div>
            
            {/* 任务列表 */}
            <div className="space-y-2">
                {tasks.map(task => (
                    <div
                        key={task.id}
                        onClick={() => onTaskClick(task.id)}
                        className={`flex items-center p-3 rounded cursor-pointer ${
                            activeTaskId === task.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                    >
                        <div className="flex-1">
                            <div className="flex items-center">
                                <span className="text-sm mr-2">{task.date}</span>
                                <span className="text-sm text-gray-500">{task.filename}</span>
                            </div>
                            {task.status === 'uploading' && (
                                <div className="mt-2">
                                    <div className="h-1 bg-gray-200 rounded">
                                        <div
                                            className="h-full bg-[#00aeec] rounded"
                                            style={{ width: `${task.progress}%` }}
                                        />
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        已上传: {task.fileInfo.uploaded}/{task.fileInfo.size} 
                                        剩余时间: {task.fileInfo.remainingTime}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="ml-4">
                            <span className={`text-sm ${
                                task.status === 'completed' ? 'text-green-500' : 'text-[#00aeec]'
                            }`}>
                                {task.status === 'completed' ? '上传完成' : '上传中'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 