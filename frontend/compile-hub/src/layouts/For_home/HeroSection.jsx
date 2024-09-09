import React from 'react'
import { CustomizedButtons } from '../../components/CustomizedButtons'
import { ArrowForwardRoundedIcon } from "../../utils/Icons.js"
import { NavLink } from "react-router-dom";

const HeroSection = () => {

  const LanguageData = [
    {
      language_name: "C++",
      language_img_url: "/images/cpp_white.png",
      language_link: "/"
    },
    {
      language_name: "Java",
      language_img_url: "/images/java_white.png",
      language_link: "/"
    },
    {
      language_name: "Python",
      language_img_url: "/images/python_white.png",
      language_link: "/"
    },
    {
      language_name: "JavaScipt",
      language_img_url: "/images/js_white.png",
      language_link: "/"
    },
    {
      language_name: "C",
      language_img_url: "/images/c_white.png",
      language_link: "/"
    }
  ]

  return (
    <>
      <div className='w-full flex px-24 h-[90%] pt-5'>
        <div className='w-1/2 h-full pb-7 flex flex-col justify-center'>
          <div className='text-[#25265e]'>
            <h1 className='text-4xl font-bold my-10'>Start programming <br /> for Free</h1>
            <p className='my-10 text-[17px] pr-20'>
              Harness the power of our online compilers to write, run, and debug code instantly in multiple programming languages. No setup, no hassle - just pure coding at your fingertips.
            </p>

            <div className='my-10'>
              <p className='font-bold text-lg text-[#66678E] mb-2'>Write your first code by clicking below</p>
              <CustomizedButtons />
            </div>
          </div>
        </div>
        <div className='w-1/2'>
          <img src="/images/bg-1.png" alt="hero-img" />
        </div>
      </div>
      <div className='w-full h-[40%] px-24 pt-10 flex'>
        <div className='text-[#25265e] w-1/5 mt-10'>
          <h1 className='text-3xl font-bold'>Choose what to code</h1>
          <p className='mt-5'>Start coding with the best programming languages.</p>
        </div>
        <div className='w-[52%] mx-10 flex flex-wrap'>
          {
            LanguageData.map((obj, index) => {
              return (
                <a href={obj.language_link} key={index} className="w-1/2 transition duration-300 my-3 hover:scale-105 px-2">
                  <div className="flex items-center text-[#25265e] font-semibold w-[272px] py-3 mx-5 pl-5 rounded border border-zinc-300 shadow-lg">
                    <span className="bg-[#17183B] w-9 h-9 rounded-full flex items-center justify-center">
                      <img src={obj.language_img_url} alt={obj.language_name} className="w-6 h-6 object-contain" />
                    </span>
                    <span className="ml-2">
                      {obj.language_name} Programming
                    </span>
                  </div>
                </a>
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