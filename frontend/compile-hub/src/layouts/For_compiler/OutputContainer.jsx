import React, { useContext } from 'react'
import { Context } from '../../context/Context';

const OutputContainer = () => {
    const { output, error, setOutput, setError } = useContext(Context);
    const HandleClear = () => {
        setOutput("");
        setError("");
    };
    return (
        <div className="h-1/2 w-full">
            <div className='border-b border-t border-zinc-300 bg-[#FBFBFB] h-[18%] w-full flex items-center justify-between px-4'>
                <p className='font-semibold text-[#757171]'>Output</p>
                <button className='text-[#757171] border border-zinc-300 px-4 py-1 text-[14px] hover:bg-gray-200' onClick={HandleClear}>Clear</button>
            </div>
            <div className='h-[82%] w-full'>
                <textarea
                    name="output"
                    cols="67"
                    className={`border-none outline-none h-[90%] ml-4 mt-2 ${error ? 'text-red-500' : ''} bg-transparent`}
                    readOnly
                    style={{ color: error ? 'red' : 'inherit' }}
                    defaultValue={output ? output : error}
                />
            </div>
        </div>
    )
}

export default OutputContainer