import React, { useEffect, useState } from 'react';
import { Boilerplates } from '../utils/BoilerplateCode';
import { AutoAwesomeIcon, DarkModeIcon, FullscreenRoundedIcon } from '../utils/Icons';
import axios from "axios";
import OutputContainer from '../layouts/For_compiler/OutputContainer';
import InputContainer from '../layouts/For_compiler/InputContainer';
import EditorContainer from '../layouts/For_compiler/EditorContainer';
import EditorHeader from '../layouts/For_compiler/EditorHeader';
import CompilerHeader from '../layouts/For_compiler/CompilerHeader';
import LanguageSelector from '../layouts/For_compiler/LanguageSelector';


const Compiler = () => {

  return (
    <div className='w-screen h-screen'>
      {/* Compiler Header */}
      <CompilerHeader/>

      {/* Main Body */}
      <div className='w-full h-[85%] flex'>
        {/* Language Selector */}
        <LanguageSelector/>

        {/* Code Editor */}
        <div className='h-full w-[56%] border-r border-zinc-300'>
          <EditorHeader/>
          <EditorContainer />
        </div>

        {/* Input and Output Section */}
        <div className='h-full w-2/5'>
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
