import React, { useState, useEffect } from 'react';
import {Context} from "./Context.js"

const ContextProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check authentication status on component mount (could use a backend API for this)
    useEffect(() => {
        // You can make an API call to your backend to check if the user is authenticated
        fetch('http://localhost:4000/auth/status', {
            credentials: 'include', // Include cookies for authentication
        })
        .then(response => response.json())
        .then(data => {
            console.log("Tell me", data.isAuthenticated);
            console.log("before: ", isAuthenticated);
            if(data.isAuthenticated){
                localStorage.setItem("UserLogged", data.isAuthenticated)
            }
            
            
            setIsAuthenticated(data.isAuthenticated);
            console.log("after: ", isAuthenticated);
        })
        .catch(error => {
            console.error('Error checking authentication status:', error);
            setIsAuthenticated(false);
        });
    }, [isAuthenticated]);

    const GoogleLogin = () => {
        window.open("http://localhost:4000/auth/google", "_self");
        setIsAuthenticated(true);
    }

    const GoogleLogout = () => {
        window.open("http://localhost:4000/logout", "_self");
        localStorage.removeItem("UserLogged");
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

export default ContextProvider;
