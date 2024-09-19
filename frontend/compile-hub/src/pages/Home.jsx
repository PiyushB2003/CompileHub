import React, { useContext } from 'react'
import Header from '../layouts/For_home/Header'
import Footer from '../layouts/For_home/Footer'
import {HeroSection} from '../layouts/For_home/HeroSection'
import { Context } from '../context/Context'

const Home = () => {
    const {GoogleLogout} = useContext(Context);
    return (
        <>
            <div className='w-screen h-screen min-h-screen bg-white dark:bg-[#28252E]'>
                <Header />
                <HeroSection />
                <Footer />
            </div>
        </>
    )
}

export default Home