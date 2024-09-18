import React, { useContext } from 'react';
import { Context } from '../../context/Context';
import { NavLink } from 'react-router-dom';
import AccountMenu from "../../components/AccountMenu";
import BasicPopover from '../../components/BasicPopover';
import TemporaryDrawer from '../../components/TemporaryDrawer';
import TemporaryDrawerCompiler from '../../components/TemporaryDrawerCompiler';

const CompilerHeader = () => {
    const { language } = useContext(Context);
    const logged = localStorage.getItem("UserLogged");
    return (
        <div className='w-full h-[15%] flex items-center justify-between border-b border-zinc-300 md:px-12'>
            <div className='hidden md:flex flex-col'>
                <NavLink to="/">
                    <span className='flex'>
                        <img src="/images/logo.png" alt="Logo" className='size-6 md:size-8' />
                        <span className=' text-[16px] md:text-xl font-bold text-[#00cd9d]'>Compile<span className='text-[#757171]'>Hub</span></span>
                    </span>
                </NavLink>
                <span className='ml-1 text-[#757171] text-xs md:text-base font-semibold'>
                    {language === "cpp" ? "C++" : language.charAt(0).toUpperCase() + language.slice(1)} Compiler
                </span>
            </div>
            <div className='md:hidden'>
                <span>
                    <TemporaryDrawerCompiler />
                </span>
            </div>
            <div className='flex items-center'>
                <BasicPopover />
                <span className='hidden md:flex'>
                    {logged && <div className='ml-2'><AccountMenu /></div>}
                </span>
            </div>
        </div>
    )
}

export default CompilerHeader