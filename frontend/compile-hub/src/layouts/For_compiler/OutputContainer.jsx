import React, { useContext } from 'react'
import { Context } from '../../context/Context';

const OutputContainer = () => {
    const { output, error, setOutput, setError, isDarkMode } = useContext(Context);
    const HandleClear = () => {
        setOutput("");
        setError("");
    };
    return (
        <div className="h-full mt-2 md:mt-0 md:h-1/2 w-[98%]">
            <div className='border-b border-t border-zinc-300 dark:border-zinc-600 bg-[#FBFBFB] dark:bg-[#2a2730] h-[20%] md:h-[18%] w-full flex items-center justify-between px-4'>
                <p className='font-semibold text-[#757171]'>Output</p>
                <button className='text-[#757171] border border-zinc-300 dark:border-zinc-600 px-4 mr-5 py-1 text-[14px] hover:bg-gray-200 dark:hover:bg-[#37333f]' onClick={HandleClear}>Clear</button>
            </div>
            <div className='h-[82%] w-full bg-white dark:bg-[#28252E]'>
                <textarea
                    name="output"
                    // cols="67"
                    className="border-none outline-none dark:text-white text-black bg-white h-[90%] resize-none dark:bg-[#28252E] ml-4 mt-2 w-full"
                    readOnly
                    style={{ color: isDarkMode ? 'white' : 'inherit' }}
                    defaultValue={output ? output : error}
                />
            </div>
        </div>
    )
}

export default OutputContainer