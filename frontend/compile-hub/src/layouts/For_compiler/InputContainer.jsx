import React, { useContext } from 'react'
import { Context } from '../../context/Context';

const InputContainer = () => {
    const {input, setInput} = useContext(Context);
    const HandleClear = () => {
        setInput("");
    };
    return (
        <div className="h-full md:h-1/2 w-full mt-2 md:mt-0">
            <div className='border-b border-t md:border-t-0 border-zinc-300 bg-[#FBFBFB] h-[20%] md:h-[18%] w-full flex items-center justify-between px-4'>
                <p className='font-semibold text-[#757171]'>Input</p>
                <button className='text-[#757171] border border-zinc-300 px-4 py-1 text-[14px] hover:bg-gray-200' onClick={HandleClear}>Clear</button>
            </div>
            <div className='h-[82%] w-full'>
                <textarea name="input" cols="67" className='border-none outline-none h-[90%] ml-4 mt-2 resize-none' value={input} onChange={(e) => setInput(e.target.value)}></textarea>
            </div>
        </div>
    )
}

export default InputContainer