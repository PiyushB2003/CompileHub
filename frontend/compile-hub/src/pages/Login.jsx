import React, { useContext, useState } from 'react';
import { NavLink } from "react-router-dom";
import TextField from '@mui/material/TextField';
import {
  VisibilityOffRoundedIcon,
  VisibilityRoundedIcon
} from "../utils/Icons.js"
import {Context} from '../context/Context.js';

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {GoogleLogin, GoogleLogout} = useContext(Context);


  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className='w-full'>
        <div className='flex items-start p-5'>
          <NavLink to="/" className='flex items-start'>
            <img src="/images/logo.png" alt="Logo" className='size-8' />
            <span className='text-xl font-bold text-[#00cd9d]'>Compile<span className='text-[#757171]'>Hub</span></span>
          </NavLink>
        </div>
      </div>
      <div className='flex w-full items-center justify-center'>
        <div className="bg-white shadow-lg rounded-lg flex flex-row w-3/4 max-w-4xl">
          <div className="hidden md:flex md:w-1/2 rounded-l-lg bg-blue-100 items-center justify-center p-6">
            <img
              src="/images/auth2_img.png"
              alt="Illustration"
              className="object-contain h-full"
            />
          </div>

          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Welcome to CompileHub!</h2>
            <p className="text-center text-gray-600 mb-4">
              Please log-in to your account and start coding
            </p>

            <form className="space-y-4">
              <div>
                <TextField id="outlined-basic" type='email' name='email' label="Email" variant="outlined" className='w-full' />
              </div>

              <div>
                <div className="relative">
                  <TextField
                    id="outlined-password-input"
                    name='password'
                    label="Password"
                    type={isVisible ? "text" : "password"}
                    className='w-full'
                    autoComplete="current-password"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 cursor-pointer" onClick={() => setIsVisible(curr => !curr)}>
                    {
                      isVisible ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />
                    }
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg transition duration-300 hover:bg-indigo-500"
              >
                Login
              </button>
            </form>

            <p className="text-center text-gray-600 mt-4">
              New on our platform? <NavLink to="/signup" className="text-blue-500 hover:underline">Create an account</NavLink>
            </p>

            <div className="flex items-center justify-center mt-6">
              <span className="w-full border-t border-gray-300"></span>
              <span className="px-4 text-gray-500">or</span>
              <span className="w-full border-t border-gray-300"></span>
            </div>

            <div className="flex justify-center space-x-4 mt-4">
              <button className="bg-white hover:bg-zinc-100 text-black p-3 flex justify-center items-center rounded-lg shadow-md w-full border border-zinc-300 transition duration-300" onClick={GoogleLogin}>
                <img src="/images/google_logo.png" alt="google_icon" className='size-6 mr-5' /> <span>Log in with Google</span>
              </button>

              <button onClick={GoogleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
