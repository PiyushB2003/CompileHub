import React, { useContext, useEffect } from 'react'
import Editor from '@monaco-editor/react';
import { Context } from '../../context/Context'

const customTheme = {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
        'editor.background': '#F5F5F5',
    },
};

const EditorContainer = () => {
    const { language, code, HandleEditorChange } = useContext(Context);

    useEffect(() => {
        window?.monaco?.editor?.defineTheme('myCustomTheme', customTheme);
    }, [])
    return (
        <div className='h-[91%] w-full'>
            <Editor
                height="100%"
                language={language}
                value={code}
                theme="myCustomTheme"
                options={{ fontFamily: 'Arial, sans-serif', fontSize: 16 }}
                onChange={HandleEditorChange}
            />
        </div>
    )
}

export default EditorContainer