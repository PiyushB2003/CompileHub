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
      <div className='w-full flex md:px-24 mt-28 md:mt-0 px-5 h-[90%] md:pt-5 md:flex-row flex-col'>
        <div className='w-full md:w-1/2 h-full pb-7 flex flex-col justify-center'>
          <div className='text-[#25265e]'>
            <h1 className='text-3xl md:text-4xl font-bold my-7 md:my-10'>Start programming <br /> for Free</h1>
            <p className='my-7 md:my-10 text-[17px] md:pr-20'>
              Harness the power of our online compilers to write, run, and debug code instantly in multiple programming languages. No setup, no hassle - just pure coding at your fingertips.
            </p>

            <div className='md:my-10'>
              <p className='font-bold text-lg text-[#66678E] mb-2'>Write your first code by clicking below</p>
              <CustomizedButtons />
            </div>
          </div>
        </div>
        <div className='w-full md:w-1/2'>
          <img src="/images/bg-1.png" alt="hero-img" />
        </div>
      </div>
      <div className='w-full md:h-[40%] mt-56 md:mt-0 h-full md:px-24 pt-10 flex flex-col md:flex-row'>
        <div className='text-[#25265e] md:w-1/5 w-full px-5 mt-10'>
          <h1 className='text-2xl md:text-3xl font-bold'>Choose what to code</h1>
          <p className='mt-5 hidden md:flex'>Start coding with the best programming languages.</p>
        </div>
        <div className='md:w-[52%] w-full md:mx-10 flex flex-col md:flex-row md:flex-wrap'>
          {
            LanguageData.map((obj, index) => {
              return (
                <NavLink
                  to={obj.language_link}
                  key={obj.language_code}  // Ensure the key is unique
                  className="w-1/2 transition duration-300 my-3 hover:scale-105 px-2"
                  onClick={() => {
                    setLanguage(obj.language_code);
                    setCode(Boilerplates[obj.language_code])
                  }}
                >
                  <div className="flex items-center text-[#25265e] font-semibold w-[272px] py-3 mx-5 pl-5 rounded border border-zinc-300 shadow-lg">
                    <span className="bg-[#17183B] w-9 h-9 rounded-full flex items-center justify-center">
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
          <NavLink to="/compiler" className="w-1/2 my-3 hover:scale-105 px-2">
            <div className="flex items-center text-blue-500 font-semibold w-[272px] py-[18px] mx-5 pl-7 rounded border border-zinc-300 shadow-lg">
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