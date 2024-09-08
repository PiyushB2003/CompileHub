import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Context} from "./Context.js"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContextProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch('http://localhost:4000/auth/status', {
            credentials: 'include', 
        })
        .then(response => response.json())
        .then(data => {
            if(data.isAuthenticated){
                localStorage.setItem("UserLogged", data.isAuthenticated ? "true": "false")
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
        window.open("http://localhost:4000/auth/google", "_self");
        setIsAuthenticated(true);

    }

    const GoogleLogout = () => {
        localStorage.removeItem("UserLogged");
        window.open("http://localhost:4000/logout", "_self");
    }

    const contextValue = {
        isAuthenticated,
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
