import React, { useContext, useState } from 'react'
import { Context } from '../../context/Context'
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import AccountMenu from "../../components/AccountMenu";
import { AutoAwesomeIcon } from '../../utils/Icons';
import BasicPopover from '../../components/BasicPopover';

const CompilerHeader = () => {
    const { language } = useContext(Context);
    const logged = localStorage.getItem("UserLogged");
    return (
        <div className='w-full h-[15%] flex items-center justify-between border-b border-zinc-300 px-12'>
            <div>
                <NavLink to="/">
                    <span className='flex'>
                        <img src="/images/logo.png" alt="Logo" className='size-8' />
                        <span className='text-xl font-bold text-[#00cd9d]'>Compile<span className='text-[#757171]'>Hub</span></span>
                    </span>
                </NavLink>
                <span className='ml-1 text-[#757171] font-semibold'>
                    {language === "cpp" ? "C++" : language.charAt(0).toUpperCase() + language.slice(1)} Compiler
                </span>
            </div>
            <div className='flex items-center'>
                {/* <NavLink to={`/optimise?text=${encodeURIComponent(optimiseText)}`} target='_blank'> */}
                {/* <Button variant="outlined" onClick={GetOptimisedCode}>
                    <span className='font-semibold flex items-center capitalize text-[16px]'> <span><AutoAwesomeIcon /> <span className='ml-1'>Optimisation <span className=' lowercase'>tips with</span> AI</span> </span> </span>
                </Button> */}
                <BasicPopover />
                {/* </NavLink> */}
                {logged && <div className='ml-2'><AccountMenu /></div>}
            </div>
        </div>
    )
}

export default CompilerHeader