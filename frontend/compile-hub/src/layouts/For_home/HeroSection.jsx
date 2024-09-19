import React, { useContext } from 'react'
import { CustomizedButtons } from '../../components/CustomizedButtons'
import { ArrowForwardRoundedIcon } from "../../utils/Icons.js"
import { NavLink } from "react-router-dom";
import { Context } from '../../context/Context.js';
import { Boilerplates } from '../../utils/BoilerplateCode.js';


const LanguageData = [
  {
    language_name: "C++",
    language_code: "cpp",
    language_img_url: "/images/cpp_white.png",
    language_link: "/compiler"
  },
  {
    language_name: "Java",
    language_code: "java",
    language_img_url: "/images/java_white.png",
    language_link: "/compiler"
  },
  {
    language_name: "Python",
    language_code: "python",
    language_img_url: "/images/python_white.png",
    language_link: "/compiler"
  },
  {
    language_name: "JavaScipt",
    language_code: "javascript",
    language_img_url: "/images/js_white.png",
    language_link: "/compiler"
  },
  {
    language_name: "C",
    language_code: "c",
    language_img_url: "/images/c_white.png",
    language_link: "/compiler"
  }
]

const HeroSection = () => {
  const { setLanguage, setCode } = useContext(Context);

  return (
    <>
      <div className='w-full flex md:px-10 bg-white dark:bg-[#28252E] md:mt-20 lg:px-24 mt-28 lg:mt-0 px-5 h-[90%] md:pt-5 md:flex-row flex-col'>
        <div className='w-full pt-10 md:w-1/2 h-full pb-7 flex flex-col justify-center'>
          <div className='text-[#25265e]'>
            <h1 className='text-3xl md:text-4xl dark:text-white font-bold my-7 md:my-10'>Start programming <br /> for Free</h1>
            <p className='my-7 md:my-10 text-[17px] md:pr-20 dark:text-[#66678E]'>
              Harness the power of our online compilers to write, run, and debug code instantly in multiple programming languages. No setup, no hassle - just pure coding at your fingertips.
            </p>

            <div className='md:my-10'>
              <p className='font-bold text-lg text-[#66678E] mb-2'>Write your first code by clicking below</p>
              <CustomizedButtons />
            </div>
          </div>
        </div>
        <div className='w-full flex justify-center md:justify-normal md:w-1/2'>
          <img src="/images/bg-1.png" alt="hero-img" />
        </div>
      </div>
      <div className='w-full bg-white dark:bg-[#28252E] sm:pt-40 md:h-[40%] mt-56  h-[180%] md:px-10 lg:px-24 md:pt-10 flex flex-col items-center justify-center md:flex-row'>
        <div className='text-[#25265e] lg:w-1/5 w-full lg:px-5 lg:mt-10'>
          <h1 className='text-2xl md:text-3xl font-bold md:text-left text-center md:pl-0 dark:text-white'>Choose what to code</h1>
          <p className='mt-5 hidden md:flex dark:text-[#66678E]'>Start coding with the best programming languages.</p>
        </div>
        <div className='md:w-[52%] w-full md:mx-10 flex flex-col md:flex-row md:flex-wrap justify-center bg-white dark:bg-[#28252E]'>
          {
            LanguageData.map((obj, index) => {
              return (
                <NavLink
                  to={obj.language_link}
                  key={obj.language_code}
                  className="w-auto transition duration-300 my-3 hover:scale-105 px-2 mx-auto" // Replace w-1/2 with w-auto and add mx-auto
                  onClick={() => {
                    setLanguage(obj.language_code);
                    setCode(Boilerplates[obj.language_code]);
                  }}
                >
                  <div className="flex items-center text-[#25265e] dark:text-[#66678E] font-semibold w-[272px] py-3 mx-5 md:mx-0 pl-5 rounded border border-zinc-300 dark:border-zinc-600 shadow-lg">
                    <span className="bg-[#17183B] dark:bg-[#423d4d] w-9 h-9 rounded-full flex items-center justify-center">
                      <img src={obj.language_img_url} alt={obj.language_name} className="w-6 h-6 object-contain" />
                    </span>
                    <span className="ml-2">
                      {obj.language_name} Programming
                    </span>
                  </div>
                </NavLink>
              );
            })
          }
          <NavLink to="/compiler" className="w-auto my-3  hover:scale-105 px-2 mx-auto"> {/* Replace w-1/2 with w-auto */}
            <div className="flex items-center text-blue-500 font-semibold w-[272px] py-[18px] mx-5 pl-7 rounded border border-zinc-300 dark:border-zinc-600 shadow-lg">
              <span>
                View in Compiler <ArrowForwardRoundedIcon />
              </span>
            </div>
          </NavLink>
        </div>
      </div>

    </>

  )
}

export { HeroSection }