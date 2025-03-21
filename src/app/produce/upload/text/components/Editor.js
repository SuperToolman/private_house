'use client';
import { useEffect, useRef, useState } from 'react';

export default function Editor({ value, onChange }) {
    const editorRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleInput = () => {
        if (editorRef.current) {
            const content = editorRef.current.innerHTML;
            onChange?.(content);
        }
    };

    const execCommand = (command, value = null) => {
        if (typeof document !== 'undefined') {
            document.execCommand(command, false, value);
            handleInput();
        }
    };

    if (!isMounted) {
        return <div className="min-h-[300px] bg-gray-50 animate-pulse rounded-lg" />;
    }

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
            {/* 工具栏 */}
            <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-2">
                <button
                    onClick={() => execCommand('bold')}
                    className="px-2 py-1 hover:bg-gray-200 rounded"
                    title="加粗"
                >
                    <i className="fas fa-bold"></i>
                </button>
                <button
                    onClick={() => execCommand('italic')}
                    className="px-2 py-1 hover:bg-gray-200 rounded"
                    title="斜体"
                >
                    <i className="fas fa-italic"></i>
                </button>
                <button
                    onClick={() => execCommand('underline')}
                    className="px-2 py-1 hover:bg-gray-200 rounded"
                    title="下划线"
                >
                    <i className="fas fa-underline"></i>
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                <button
                    onClick={() => execCommand('justifyLeft')}
                    className="px-2 py-1 hover:bg-gray-200 rounded"
                    title="左对齐"
                >
                    <i className="fas fa-align-left"></i>
                </button>
                <button
                    onClick={() => execCommand('justifyCenter')}
                    className="px-2 py-1 hover:bg-gray-200 rounded"
                    title="居中对齐"
                >
                    <i className="fas fa-align-center"></i>
                </button>
                <button
                    onClick={() => execCommand('justifyRight')}
                    className="px-2 py-1 hover:bg-gray-200 rounded"
                    title="右对齐"
                >
                    <i className="fas fa-align-right"></i>
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                <button
                    onClick={() => execCommand('insertOrderedList')}
                    className="px-2 py-1 hover:bg-gray-200 rounded"
                    title="有序列表"
                >
                    <i className="fas fa-list-ol"></i>
                </button>
                <button
                    onClick={() => execCommand('insertUnorderedList')}
                    className="px-2 py-1 hover:bg-gray-200 rounded"
                    title="无序列表"
                >
                    <i className="fas fa-list-ul"></i>
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                <select
                    onChange={(e) => execCommand('formatBlock', e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded bg-white"
                >
                    <option value="p">正文</option>
                    <option value="h1">标题1</option>
                    <option value="h2">标题2</option>
                    <option value="h3">标题3</option>
                    <option value="h4">标题4</option>
                </select>
            </div>

            {/* 编辑区域 */}
            <div
                ref={editorRef}
                className="min-h-[300px] p-4 focus:outline-none"
                contentEditable
                onInput={handleInput}
                dangerouslySetInnerHTML={{ __html: value }}
            />
        </div>
    );
} 