import React, { useContext } from 'react'
import Header from '../layouts/For_home/Header'
import Footer from '../layouts/For_home/Footer'
import {HeroSection} from '../layouts/For_home/HeroSection'
import { Context } from '../context/Context'

const Home = () => {
    const {GoogleLogout} = useContext(Context);
    return (
        <>
            <div className='w-screen h-screen min-h-screen'>
                <Header />
                <HeroSection />
                <Footer />
                <button onClick={GoogleLogout}>Log out</button>
            </div>
        </>
    )
}

export default Home