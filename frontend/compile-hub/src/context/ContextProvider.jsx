import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "./Context.js"
import { toast } from 'react-toastify';
import { Boilerplates } from '../utils/BoilerplateCode.js';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const ContextProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [logged, setLogged] = useState(null);
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState(Boilerplates["cpp"]);
    const [error, setError] = useState("");
    const [language, setLanguage] = useState("cpp");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [loggedFromEmail, setLoggedFromEmail] = useState(false);
    const navigate = useNavigate();


    const saveToLocalStorage = (code, input, language) => {
        localStorage.setItem('savedCode', code);
        localStorage.setItem('savedInput', input);
        localStorage.setItem('savedLanguage', language);
    };

    const HandleCodeSubmit = async () => {
        setLoading(true);
        setError('');
        setOutput('');

        try {
            const response = await axios.post('http://localhost:4000/run', {
                code,
                input,
                language,
            });
            console.log(response.data);

            setOutput(response.data.output || response.data.stderr || 'No output');
        } catch (error) {
            setError('Error executing code: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const HandleEditorChange = (value, event) => {
        setCode(value);
        saveToLocalStorage(value, input, language); // Save to localStorage
    };

    const HandleClick = (obj) => {
        setLanguage(obj.language);
        setCode(Boilerplates[obj.language]);
    };

    useEffect(() => {
        const savedCode = localStorage.getItem('savedCode');
        const savedInput = localStorage.getItem('savedInput');
        const savedLanguage = localStorage.getItem('savedLanguage');

        if (savedCode) setCode(savedCode);
        if (savedInput) setInput(savedInput);
        if (savedLanguage) setLanguage(savedLanguage);
    }, []);

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
        code,
        language,
        error,
        output,
        input,
        loading,
        setCode,
        setLanguage,
        setError,
        setOutput,
        setInput,
        setLoading,
        setLoggedFromEmail,
        setAvatar,
        setUserEmail,
        setUserName,
        setLogged,
        setIsAuthenticated,
        GoogleLogin,
        GoogleLogout,
        HandleClick,
        HandleCodeSubmit,
        HandleEditorChange
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}

export { ContextProvider };
