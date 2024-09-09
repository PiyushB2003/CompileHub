import React, { useContext } from 'react'
import BasicMenu from '../../components/BasicMenu'
import Button from '@mui/material/Button'
import CustomizedSwitches from '../../components/CustomizedSwitches'
import { NavLink } from "react-router-dom"
import { Context } from '../../context/Context'
import AccountMenu from '../../components/AccountMenu'

const Header = () => {
  const { isAuthenticated } = useContext(Context);
  return (
    <>
      <div className='fixed top-0 left-0 w-full h-[10%] shadow-md px-24 flex items-center justify-between bg-white z-50'>
        <div className='flex items-center'>
          <div className='flex items-center'>
            <img src="/images/logo.png" alt="Logo" className='size-8' />
            <span className='text-xl font-bold text-[#00cd9d]'>Compile<span className='text-[#757171]'>Hub</span></span>
          </div>
          <NavLink to="/compiler" className="ml-10">
            <div className='font-semibold trasition duration-300 cursor-pointer hover:text-[#00cd9d]'>
              Compiler
            </div>
          </NavLink>
          <div className='mx-10'>
            <BasicMenu />
          </div>
        </div>
        <div className='flex items-center'>
          {
            isAuthenticated ? <div className='mx-10'>
              <AccountMenu />
            </div> : <div className='mx-10'>
              <NavLink to="/login">
                <Button variant="outlined"><span className='font-semibold capitalize text-[16px]'>Log In</span></Button>
              </NavLink>
            </div>
          }

          <div>
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
