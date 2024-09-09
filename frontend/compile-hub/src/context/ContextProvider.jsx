import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "./Context.js"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContextProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [logged, setLogged] = useState(null);
    const [loggedFromEmail, setLoggedFromEmail] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/auth/status`, {
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (data.isAuthenticated) {
                    localStorage.setItem("UserLogged", data.isAuthenticated ? "true" : "false")
                    setAvatar(data.user.avatar);
                    setUserEmail(data.user.email);
                    setUserName(data.user.name);
                    setLogged("true");
                    navigate("/compiler");
                }
                setIsAuthenticated(data.isAuthenticated);
            })
            .catch(error => {
                console.error('Error checking authentication status:', error);
                setIsAuthenticated(false);
            });
    }, [isAuthenticated]);

    useEffect(() => {
        const token = localStorage.getItem("UserLogged");
        if (token) {
            setIsAuthenticated(true);  // Update based on stored token
        }
    }, []);

    useEffect(() => {
        const isLogged = localStorage.getItem("UserLogged");
        if (isLogged) {
            setUserName(localStorage.getItem("loggedInUser"));
            setUserEmail(localStorage.getItem("loggedInUserEmail"));
            setLoggedFromEmail(true);
        }
    }, []);

    const GoogleLogin = () => {
        window.open(`${import.meta.env.VITE_BACKEND_HOST_URL}/auth/google`, "_self");
        // toast.success("Logged In successful");
        setIsAuthenticated(true);
    }

    const GoogleLogout = () => {
        localStorage.removeItem("UserLogged");
        window.open(`${import.meta.env.VITE_BACKEND_HOST_URL}/logout`, "_self");
        setAvatar("");
        setUserEmail("");
        setUserName("");
        toast.success("Logged out successful");
        setLoggedFromEmail(false);
        setIsAuthenticated(false);
    }

    const contextValue = {
        isAuthenticated,
        logged,
        userName,
        userEmail,
        avatar,
        loggedFromEmail,
        setLoggedFromEmail,
        setAvatar,
        setUserEmail,
        setUserName,
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

export { ContextProvider };
