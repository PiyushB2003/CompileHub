import React, { useContext } from 'react'
import { Context } from '../../context/Context';

const InputContainer = () => {
    const {input, setInput} = useContext(Context);
    const HandleClear = () => {
        setInput("");
    };
    return (
        <div className="h-full md:h-1/2 w-[98%] mt-2 md:mt-0">
            <div className='border-b border-t md:border-t-0 border-zinc-300 dark:border-zinc-600 bg-[#ffffff] dark:bg-[#2a2730] h-[20%] md:h-[18%] w-full flex items-center justify-between px-4'>
                <p className='font-semibold text-[#757171]'>Input</p>
                <button className='text-[#757171] border border-zinc-300 dark:border-zinc-600 px-4 py-1 mr-5 text-[14px] hover:bg-gray-200 dark:hover:bg-[#37333f]' onClick={HandleClear}>Clear</button>
            </div>
            <div className='h-[82%] w-full bg-white dark:bg-[#28252E]'>
                <textarea name="input" className='border-none w-full outline-none h-[90%] ml-4 mt-2 resize-none dark:text-white dark:bg-[#28252E] bg-white text-black' value={input} onChange={(e) => setInput(e.target.value)}></textarea>
            </div>
        </div>
    )
}

export default InputContainer