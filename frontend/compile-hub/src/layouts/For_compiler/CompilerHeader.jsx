import React, { useContext } from 'react'
import { Context } from '../../context/Context'
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import AccountMenu from "../../components/AccountMenu";
import { AutoAwesomeIcon } from '../../utils/Icons';

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
                <Button variant="outlined">
                    <span className='font-semibold flex items-center capitalize text-[16px]'><AutoAwesomeIcon /> <span className='ml-1'>Optimise code with AI</span></span>
                </Button>
                {logged && <div className='ml-2'><AccountMenu /></div>}
            </div>
        </div>
    )
}

export default CompilerHeader