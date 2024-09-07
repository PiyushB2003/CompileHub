import React from 'react'
import Header from '../layouts/For_home/Header'
import Footer from '../layouts/For_home/Footer'
import {HeroSection} from '../layouts/For_home/HeroSection'

const Home = () => {
    return (
        <>
            <div className='w-screen h-screen min-h-screen'>
                <Header />
                <HeroSection />
                <Footer />
            </div>
        </>
    )
}

export default Home