import React, { useContext } from 'react'
import { FidgetSpinner } from 'react-loader-spinner';
import { FullscreenExitRoundedIcon, DarkModeIcon, FullscreenRoundedIcon } from '../../utils/Icons';
import { Context } from '../../context/Context';

const EditorHeader = () => {
    const { language, HandleCodeSubmit, loading } = useContext(Context);
    return (
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
                        <FidgetSpinner
                            visible={true}
                            height="30"
                            width="30"
                            ariaLabel="fidget-spinner-loading"
                            backgroundColor='white'
                            ballColors={["#ff0000", "#00ff00", "#FFA500"]}
                        />
                    ) : "Run"}
                </button>
            </div>
        </div>
    )
}

export default EditorHeader