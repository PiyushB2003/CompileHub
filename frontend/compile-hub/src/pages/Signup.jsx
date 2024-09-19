import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import {
  VisibilityOffRoundedIcon,
  VisibilityRoundedIcon
} from "../utils/Icons.js"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../context/Context.js';

const Signup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {GoogleLogin} = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let isConflict = false;

    if (!name || !email || !password) {
      isConflict = true;
      toast.error("All fields are required");
    } else if (name.length < 3) {
      isConflict = true;
      toast.error("Name length must be at least 3 characters");
    } else if (password.length < 8) {
      isConflict = true;
      toast.error("Password length must be at least 8 characters");
    }

    if (!isConflict) {
      axios.post(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/signup`, { name, email, password })
        .then(result => {
          if (result.data.success) {
            toast.success(result.data.message);
            navigate("/login");
          }
        })
        .catch(err => {
          if (err.response && err.response.status === 409) {
            toast.error("This email is already registered. Please log in or use another email.");
          } else if (isConflict === false) {
            toast.error("An error occurred during signup. Please try again.");
          }
          console.error("Signup error: ", err);
          throw err;
        });
    }
  };
  return (
    <div className="min-h-[110vh] flex flex-col items-center bg-gray-100 dark:bg-[#28252E]">
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

          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Your Adventure Begins Here!</h2>
            <p className="text-center text-gray-600 mb-4 ">
              Please sign-up and getting enter into compilation
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <TextField
                  id="outlined-basic"
                  name='name'
                  type='text'
                  label="Your name"
                  variant="outlined"
                  className='w-full'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  // id="outlined-basic"
                  name='email'
                  type='email'
                  label="Email"
                  variant="outlined"
                  className='w-full'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                Get started
              </button>
            </form>

            <p className="text-center text-gray-600 mt-4">
              Already have an account? <NavLink to="/login" className="text-blue-500 hover:underline">Log in</NavLink>
            </p>

            <div className="flex items-center justify-center mt-6">
              <span className="w-full border-t border-gray-300"></span>
              <span className="px-4 text-gray-500">or</span>
              <span className="w-full border-t border-gray-300"></span>
            </div>

            <div className="flex justify-center space-x-4 mt-4">
              <button className="bg-white hover:bg-zinc-100 text-black p-3 flex justify-center items-center rounded-lg shadow-md w-full border border-zinc-300 transition duration-300" onClick={GoogleLogin}>
                <img src="/images/google_logo.png" alt="google_icon" className='size-6 mr-5' /> <span>Sign up with Google</span>
              </button>
            </div>
          </div>
          <div className="hidden md:flex rounded-r-lg md:w-1/2 bg-blue-100 items-center justify-center p-6">
            <img
              src="/images/auth_img.png"
              alt="Illustration"
              className="object-contain h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
