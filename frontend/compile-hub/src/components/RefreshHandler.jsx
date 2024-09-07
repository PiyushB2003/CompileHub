import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Context } from '../context/Context'

const RefreshHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        if (localStorage.getItem("UserLogged")) {
            if (location.pathname === "/login" || location.pathname === "/signup") {
                navigate("/compiler", { replace: false })
            }
        }
    }, [location, navigate])
    return (
        null
    )
}

export default RefreshHandler