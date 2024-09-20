import React, { useContext, useEffect } from 'react'
import Editor from '@monaco-editor/react';
import { Context } from '../../context/Context'


const dangerousPatterns = {
    javascript: [/eval\(/g, /require\(['"]child_process['"]\)/g],
    python: [/os\.system\(/g, /subprocess\.call/g],
    java: [/Runtime\.getRuntime\(/g, /ProcessBuilder/g],
    c: [/system\(/g, /exec\(/g],
    cpp: [/system\(/g, /exec\(/g],
};

const customTheme = {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
        'editor.background': '#F5F5F5',
    },
};

const EditorContainer = () => {
    const { language, code, HandleEditorChange, isDarkMode } = useContext(Context);

    useEffect(() => {
        window?.monaco?.editor?.defineTheme('myCustomTheme', customTheme);
    }, [])

    const validateCode = (code) => {
        const patterns = dangerousPatterns[language];
        if (patterns) {
            for (const pattern of patterns) {
                if (pattern.test(code)) {
                    return false;
                }
            }
        }
        return true;
    };

    const handleEditorChangeWithValidation = (value) => {
        if (!validateCode(value)) {
            alert('Your code contains dangerous patterns and cannot be submitted.');
            return;
        }
        HandleEditorChange(value);
    };
    return (
        <div className='h-[91%] w-full'>
            <Editor
                height="100%"
                width="100%"
                language={language}
                value={code}
                theme={isDarkMode ? "vs-dark" : "myCustomTheme"}
                options={{ fontFamily: 'Arial, sans-serif', fontSize: 16 }}
                onChange={handleEditorChangeWithValidation}
            />
        </div>
    )
}

export default EditorContainer