import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom"
import { AutoAwesomeIcon, DarkModeIcon, FullscreenRoundedIcon } from '../utils/Icons';
import Editor from '@monaco-editor/react';
import { Boilerplates } from '../utils/BoilerplateCode';


const customTheme = {
  base: 'vs', // or 'vs', depending on your preference
  inherit: true,
  rules: [],
  colors: {
    'editor.background': '#F5F5F5', // Set the background color here
    // 'editor.foreground': '#000000',
    // 'editorCursor.foreground': '#8B0000',
    // 'editor.lineHighlightBackground': '#0000FF20',
    // 'editor.selectionBackground': '#88000030',
    // 'editor.inactiveSelectionBackground': '#88000015',
  }
};

const Compiler = () => {
  const [language, setLanguage] = useState("cpp");
  const languageRef = useRef(null);

  const imageUrls = [
    {
      url: "/images/cpp_white.png",
      language: "cpp"
    },
    {
      url: "/images/java_white.png",
      language: "java"
    },
    {
      url: "/images/python_white.png",
      language: "python"
    },
    {
      url: "/images/js_white.png",
      language: "javascript"
    },
    {
      url: "/images/c_white.png",
      language: "c"
    }
  ];

  const HandleClick = (obj) => {
    languageRef.current = obj.language;
    setLanguage(obj.language);
  };

  useEffect(() => {
    if (languageRef.current) {
      console.log('Selected language:', languageRef.current);  // Access the language stored in ref
    }
  }, [language]);
  useEffect(() => {
    window?.monaco?.editor?.defineTheme('myCustomTheme', customTheme);
  }, []);

  return (
    <div className='w-screen h-screen'>
      <div className='w-full h-[15%] flex items-center justify-between border-b border-zinc-300 px-12'>
        <div>
          <NavLink to="/">
            <span className='flex'>
              <img src="/images/logo.png" alt="Logo" className='size-8' />
              <span className='text-xl font-bold text-[#00cd9d]'>Compile<span className='text-[#757171]'>Hub</span></span>
            </span>
          </NavLink>

          <span className='ml-1 text-[#757171] font-semibold'>
            {language === "cpp" ? "C++" : language.charAt(0).toUpperCase() + language.slice(1)} Compiler
          </span>
        </div>
        <div>
          <Button variant="outlined"><span className='font-semibold flex items-center capitalize text-[16px]'><AutoAwesomeIcon /> <span className='ml-1'>Optimise code with AI</span></span></Button>
        </div>
      </div>
      <div className='w-full h-[85%] flex'>
        <div className='border-r border-zinc-300 bg-[#EFF2F7] w-[4%] h-full flex items-center flex-col'>
          {
            imageUrls.map((obj, index) => (
              <span
                className={`bg-[#EFF2F7] border border-zinc-300 mt-2 w-9 h-9 flex items-center justify-center cursor-pointer
                  ${language === obj.language ? 'bg-blue-700' : ''}  // Blue background if active
                `}
                key={index}
                onClick={() => HandleClick(obj)}
              >
                <img src={obj.url} alt="language logo" className={`w-6 h-6 object-contain 
                  ${language === obj.language ? 'filter-none' : 'grayscale-[100%] brightness-[60%]'}
                `} />
              </span>
            ))
          }
        </div>
        <div className='h-full w-[56%] border-r border-zinc-300'>
          <div className='bg-[#FBFBFB] w-full border-b flex items-center justify-between border-zinc-300 h-[9%]'>
            <div className='h-full'>
              <span className='h-full bg-[#F5F5F5] text-[#757171] font-semibold flex items-center px-5'>
                {
                  language === "java" ? `Main.${language}` : (`main.${language === 'cpp' ? 'cpp' : language === 'javascript' ? 'js' : language}`)
                }

              </span>
            </div>
            <div className='h-full flex items-center'>
              <button className=' border border-zinc-300 p-1 mx-2 text-[#757171]'>
                <FullscreenRoundedIcon className='scale-110' />
              </button>
              <button className='border border-zinc-300 p-1 mx-2 text-[#757171]'>
                <DarkModeIcon className=' scale-90' />
              </button>
              <button className='bg-[#0556F3] hover:bg-[#0047D1] transition duration-300 text-white ml-2 mr-4 font-semibold py-1 px-4 border border-[#0556F3] hover:border-[#0047D1]'>
                Run
              </button>
            </div>
          </div>
          <div className='h-[91%] w-full'>
            <Editor
              height="100%"
              language={language}
              value={Boilerplates[language]}
              theme="myCustomTheme"
              options={{
                fontFamily: 'Arial, sans-serif',
                fontSize: 16,
              }}
            />
          </div>
        </div>
        <div className='h-full w-2/5'>
          <div className='border-b border-zinc-300 bg-[#FBFBFB] h-[9%] w-full flex items-center justify-between px-4'>
            <p className='font-semibold text-[#757171]'>Output</p>
            <button className='border border-zinc-300 py-1 px-4 text-[#757171] font-semibold'>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compiler;
