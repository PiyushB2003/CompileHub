import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Compiler from './pages/Compiler';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Error from './pages/Error';
import "./index.css";
import { ContextProvider } from './context/ContextProvider';
import RefreshHandler from './components/RefreshHandler';
import Optimise from './pages/Optimise';

function App() {
  function PrivateRoute({ element }) {
    const isLogged = localStorage.getItem("UserLogged");
    if (isLogged) {
      console.log("Navigating to protected route");
      return element;
    } else {
      console.log("Redirecting to login");
      return <Navigate to="/login" />;
    }
  }
  return (
    <>
      <BrowserRouter>
        <ContextProvider>
          <RefreshHandler />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/compiler' element={<PrivateRoute element={<Compiler />} />} />
            <Route path='/optimise' element={<PrivateRoute element={<Optimise />} />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Error />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition:Bounce
          />
        </ContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App;
