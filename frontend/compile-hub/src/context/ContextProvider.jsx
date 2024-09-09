import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Context} from "./Context.js"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContextProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [logged, setLogged] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/auth/status`, {
            credentials: 'include', 
        })
        .then(response => response.json())
        .then(data => {
            if(data.isAuthenticated){
                localStorage.setItem("UserLogged", data.isAuthenticated ? "true": "false")
                setLogged("true");
                navigate("/compiler");
            }
            setIsAuthenticated(data.isAuthenticated);
        })
        .catch(error => {
            console.error('Error checking authentication status:', error);
            setIsAuthenticated(false);
        });
    },[isAuthenticated]);

    const GoogleLogin = () => {
        window.open(`${import.meta.env.VITE_BACKEND_HOST_URL}/auth/google`, "_self");
        toast.success("Logged In successful");
        setIsAuthenticated(true);
    }

    const GoogleLogout = () => {
        localStorage.removeItem("UserLogged");
        window.open(`${import.meta.env.VITE_BACKEND_HOST_URL}/logout`, "_self");
        toast.success("Logged out successful");
        setIsAuthenticated(false);
    }

    const contextValue = {
        isAuthenticated,
        logged,
        setLogged,
        setIsAuthenticated,
        GoogleLogin,
        GoogleLogout,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}

export {ContextProvider};
