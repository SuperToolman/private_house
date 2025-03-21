'use client'
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// 动态导入编辑器组件，确保只在客户端加载
const EditorComponent = dynamic(
  () => {
    // 只在客户端导入样式
    if (typeof window !== 'undefined') {
      import('@wangeditor/editor/dist/css/style.css');
    }
    
    return import('@wangeditor/editor-for-react').then(mod => ({
      default: {
        Editor: mod.Editor,
        Toolbar: mod.Toolbar
      }
    }));
  },
  { ssr: false }
);

const toolbarConfig = {
    excludeKeys: [
        'group-video',
        'insertTable',
        'group-image',
        'insertLink',
        'codeBlock',
        'todo'
    ]
}

const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {}
}

export default function RichText({ defaultContent, placeholder, onChange }) {
    const [editor, setEditor] = useState(null);
    const [html, setHtml] = useState(defaultContent || '');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setHtml(defaultContent || '');
    }, [defaultContent]);

    useEffect(() => {
        return () => {
            if (editor == null) return;
            editor.destroy();
            setEditor(null);
        }
    }, [editor]);

    const handleChange = (editor) => {
        setHtml(editor.getHtml());
        onChange?.(editor.getHtml());
    };

    if (!mounted) {
        return <div style={{ border: '1px solid #ccc', height: '350px', background: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>加载编辑器...</div>;
    }

    return (
        <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
            {mounted && EditorComponent && (
                <>
                    <EditorComponent.Toolbar
                        editor={editor}
                        defaultConfig={toolbarConfig}
                        mode="default"
                        style={{ borderBottom: '1px solid #ccc' }}
                    />
                    <EditorComponent.Editor
                        defaultConfig={editorConfig}
                        value={html}
                        onCreated={setEditor}
                        onChange={handleChange}
                        mode="default"
                        style={{ height: '300px', overflowY: 'hidden' }}
                    />
                </>
            )}
        </div>
    )
}
