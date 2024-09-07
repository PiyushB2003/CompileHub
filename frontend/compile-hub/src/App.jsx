import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Home from './pages/Home';
import Compiler from './pages/Compiler ';
import Signup from './pages/Signup';
import Login from './pages/Login ';
import Error from './pages/Error';
import "./index.css";
import { Context } from './context/Context';
import ContextProvider from './context/ContextProvider';
import RefreshHandler from './components/RefreshHandler';

function App() {
  function PrivateRoute({ element }) {
    if(localStorage.getItem("UserLogged")){
      return element
    }else{
      return <Navigate to="/login" />
    }
  }
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <RefreshHandler />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/compiler' element={<PrivateRoute element={<Compiler />} />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </>
  )
}

export default App;
