import React, { useEffect, useState } from 'react';
import { FidgetSpinner } from 'react-loader-spinner';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Boilerplates } from '../utils/BoilerplateCode';
import AccountMenu from '../components/AccountMenu';
import { MakeSubmission } from '../services/Service';
import { AutoAwesomeIcon, DarkModeIcon, FullscreenRoundedIcon } from '../utils/Icons';
import axios from "axios";

const customTheme = {
  base: 'vs',
  inherit: true,
  rules: [],
  colors: {
    'editor.background': '#F5F5F5',
  },
};

const Compiler = () => {
  const [code, setCode] = useState(Boilerplates["cpp"]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [loading, setLoading] = useState(false);
  const logged = localStorage.getItem("UserLogged");

  const imageUrls = [
    { url: "/images/cpp_white.png", language: "cpp" },
    { url: "/images/java_white.png", language: "java" },
    { url: "/images/python_white.png", language: "python" },
    { url: "/images/js_white.png", language: "javascript" },
    { url: "/images/c_white.png", language: "c" }
  ];

  const HandleClick = (obj) => {
    setLanguage(obj.language);
    setCode(Boilerplates[obj.language]);  // Load the boilerplate for the selected language
  };

  const HandleEditorChange = (value, event) => {
    setCode(value);
  };

  const callBack = ({ apiStatus, data, message }) => {
    if (apiStatus === "loading") {
      setLoading(true);
    } else if (apiStatus === "error") {
      setLoading(false);
      console.error("Error: ", message);
      setOutput("Something went wrong!");
    } else {
      setLoading(false);
      if (data.status.id === 3) {
        setOutput(atob(data.stdout));
      } else {
        setOutput(atob(data.stderr));
      }
    }
  };

  const HandleCodeSubmit = async () => {
    // MakeSubmission({
    //   code,
    //   language,  // Use the updated language state here
    //   callBack,
    //   stdin: input,
    // });

    setLoading(true);
    setError('');
    setOutput('');

    try {
      const response = await axios.post('http://localhost:4000/run', {
        code,
        language,
      });
      console.log(response.data);
      
      setOutput(response.data.output || response.data.stderr || 'No output');
    } catch (error) {
      setError('Error executing code: ' + error.message);
    } finally {
      setLoading(false);
    }

  };

  const HandleClear = () => {
    setOutput("");
  };

  useEffect(() => {
    window?.monaco?.editor?.defineTheme('myCustomTheme', customTheme);
  }, []);

  return (
    <div className='w-screen h-screen'>
      {/* Header */}
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
        <div className='flex items-center'>
          <Button variant="outlined">
            <span className='font-semibold flex items-center capitalize text-[16px]'><AutoAwesomeIcon /> <span className='ml-1'>Optimise code with AI</span></span>
          </Button>
          {logged && <div className='ml-2'><AccountMenu /></div>}
        </div>
      </div>

      {/* Main Body */}
      <div className='w-full h-[85%] flex'>
        {/* Language Selector */}
        <div className='border-r border-zinc-300 bg-[#EFF2F7] w-[4%] h-full flex items-center flex-col'>
          {imageUrls.map((obj, index) => (
            <span
              key={index}
              className={`bg-[#EFF2F7] border border-zinc-300 mt-2 w-9 h-9 flex items-center justify-center cursor-pointer
                ${language === obj.language ? 'bg-blue-700' : ''}  // Blue background if active
              `}
              onClick={() => HandleClick(obj)}
            >
              <img
                src={obj.url}
                alt={`${obj.language} logo`}
                className={`w-6 h-6 object-contain 
                  ${language === obj.language ? 'filter-none' : 'grayscale-[100%] brightness-[60%]'}
                `}
              />
            </span>
          ))}
        </div>

        {/* Code Editor */}
        <div className='h-full w-[56%] border-r border-zinc-300'>
          <div className='bg-[#FBFBFB] w-full border-b flex items-center justify-between border-zinc-300 h-[9%]'>
            <div className='h-full'>
              <span className='h-full bg-[#F5F5F5] text-[#757171] font-semibold flex items-center px-5'>
                {language === "java" ? `Main.${language}` : `main.${language}`}
              </span>
            </div>
            <div className='h-full flex items-center'>
              <button className='border border-zinc-300 p-1 mx-2 text-[#757171]'><FullscreenRoundedIcon className='scale-110' /></button>
              <button className='border border-zinc-300 p-1 mx-2 text-[#757171]'><DarkModeIcon className='scale-90' /></button>
              <button className='bg-[#0556F3] hover:bg-[#0047D1] transition duration-300 text-white ml-2 mr-4 font-semibold w-20 h-9 flex items-center justify-center border border-[#0556F3] hover:border-[#0047D1]' onClick={HandleCodeSubmit}>
                {loading ? (
                  <FidgetSpinner visible={true} height="30" width="30" ariaLabel="fidget-spinner-loading" backgroundColor='white' />
                ) : "Run"}
              </button>
            </div>
          </div>

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
        </div>

        {/* Input and Output Section */}
        <div className='h-full w-2/5'>
          {/* Input Section */}
          <div className="h-1/2 w-full">
            <div className='border-b border-zinc-300 bg-[#FBFBFB] h-[18%] w-full flex items-center justify-between px-4'>
              <p className='font-semibold text-[#757171]'>Input</p>
            </div>
            <div className='h-[82%] w-full'>
              <textarea name="input" cols="67" className='border-none outline-none h-[90%] ml-4 mt-2 resize-none' value={input} onChange={(e) => setInput(e.target.value)}></textarea>
            </div>
          </div>

          {/* Output Section */}
          <div className="h-1/2 w-full">
            <div className='border-b border-t border-zinc-300 bg-[#FBFBFB] h-[18%] w-full flex items-center justify-between px-4'>
              <p className='font-semibold text-[#757171]'>Output</p>
              <button className='text-[#757171] border border-zinc-300 px-4 py-1 text-[14px] hover:bg-gray-200' onClick={HandleClear}>Clear</button>
            </div>
            <div className='h-[82%] w-full'>
              <textarea name="output" cols="67" className='border-none outline-none h-[90%] ml-4 mt-2' value={output ? output : error}></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compiler;
