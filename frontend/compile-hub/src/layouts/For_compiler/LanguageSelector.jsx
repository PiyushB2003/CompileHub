import React, { useContext } from 'react'
import { Context } from '../../context/Context';

const LanguageSelector = () => {
    const { HandleClick, language } = useContext(Context);
    const imageUrls = [
        { url: "/images/cpp_white.png", language: "cpp" },
        { url: "/images/java_white.png", language: "java" },
        { url: "/images/python_white.png", language: "python" },
        { url: "/images/js_white.png", language: "javascript" },
        { url: "/images/c_white.png", language: "c" }
    ];
    return (
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
    )
}

export default LanguageSelector