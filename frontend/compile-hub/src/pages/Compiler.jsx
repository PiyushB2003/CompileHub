import React, { useContext, useEffect, useState } from 'react';
import { Boilerplates } from '../utils/BoilerplateCode';
import { AutoAwesomeIcon, DarkModeIcon, FullscreenRoundedIcon } from '../utils/Icons';
import axios from "axios";
import OutputContainer from '../layouts/For_compiler/OutputContainer';
import InputContainer from '../layouts/For_compiler/InputContainer';
import EditorContainer from '../layouts/For_compiler/EditorContainer';
import EditorHeader from '../layouts/For_compiler/EditorHeader';
import CompilerHeader from '../layouts/For_compiler/CompilerHeader';
import LanguageSelector from '../layouts/For_compiler/LanguageSelector';
import { Context } from '../context/Context';


const Compiler = () => {
  const {setIsDarkMode} = useContext(Context);
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, [setIsDarkMode]);

  return (
    <div className='w-screen h-screen'>
      {/* Compiler Header */}
      <CompilerHeader />

      {/* Main Body */}
      <div className='w-full h-[85%] flex flex-col md:flex-row'>
        {/* Language Selector */}
        <LanguageSelector />

        {/* Code Editor */}
        <div className='h-full w-full md:w-[56%] border-r border-zinc-300 dark:border-zinc-600'>
          <EditorHeader />
          <EditorContainer />
        </div>

        {/* Input and Output Section */}
        <div className='h-full w-full md:w-2/5'>
          {/* Input Section */}
          <InputContainer />

          {/* Output Section */}
          <OutputContainer />
        </div>
      </div>
    </div>
  );
};

export default Compiler;
