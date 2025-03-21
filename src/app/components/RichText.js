'use client'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import '@wangeditor/editor/dist/css/style.css';
import React, { useEffect, useState } from 'react';

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

    useEffect(() => {
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

    return (
        <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
            <Toolbar
                editor={editor}
                defaultConfig={toolbarConfig}
                mode="default"
                style={{ borderBottom: '1px solid #ccc' }}
            />
            <Editor
                defaultConfig={editorConfig}
                value={html}
                onCreated={setEditor}
                onChange={handleChange}
                mode="default"
                style={{ height: '300px', overflowY: 'hidden' }}
            />
        </div>
    )
}
