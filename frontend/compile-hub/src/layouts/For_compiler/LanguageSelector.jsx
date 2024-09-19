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
        <div className='border-r hidden border-zinc-300 dark:border-zinc-600 bg-[#EFF2F7] dark:bg-[#28252E] w-[4%] h-full md:flex items-center flex-col'>
            {imageUrls.map((obj, index) => (
                <span
                    key={index}
                    className={`bg-[#EFF2F7] dark:bg-[#312d38] border border-zinc-300 dark:border-zinc-600 mt-2 w-9 h-9 flex items-center justify-center cursor-pointer
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