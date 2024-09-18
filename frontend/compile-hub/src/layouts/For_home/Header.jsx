import React from 'react'
import BasicMenu from '../../components/BasicMenu'
import Button from '@mui/material/Button'
import CustomizedSwitches from '../../components/CustomizedSwitches'
import { NavLink } from "react-router-dom"
import AccountMenu from '../../components/AccountMenu'
import TemporaryDrawer from '../../components/TemporaryDrawer'

const Header = () => {
  const logged = localStorage.getItem("UserLogged");
  return (
    <>
      <div className='fixed top-0 left-0 w-full h-[10%] shadow-md md:px-10 lg:px-24 flex items-center justify-evenly md:justify-between bg-white z-50'>
        <div className='flex items-center md:hidden'>
          <span>
            <TemporaryDrawer />
          </span>
        </div>
        <div className='flex items-center'>
          <a href="/" className='flex items-center'>
            <div className='flex items-center'>
              <img src="/images/logo.png" alt="Logo" className='size-8' />
              <span className='text-xl font-bold text-[#00cd9d]'>Compile<span className='text-[#757171]'>Hub</span></span>
            </div>
          </a>
          <NavLink to="/compiler" className="ml-10 hidden md:flex">
            <div className='font-semibold trasition duration-300 cursor-pointer hover:text-[#00cd9d]'>
              Compiler
            </div>
          </NavLink>
          <div className='mx-10 hidden md:flex'>
            <BasicMenu />
          </div>
        </div>
        <div className='flex items-center'>
          {
            logged ? <div className='md:mx-10'>
              <AccountMenu />
            </div> : <div className='md:mx-10'>
              <NavLink to="/login">
                <Button variant="outlined" className="w-18 md:w-0 text-sm"><span className='font-semibold capitalize text-[16px]'>Log In</span></Button>
              </NavLink>
            </div>
          }

          <div className='hidden md:flex'>
            <span>
              <CustomizedSwitches />
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
