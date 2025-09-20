import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import LatestCollection from './components/LatestCollection'
import BestSeller from './components/BestSeller'
import OurPolicy from './components/OurPolicy'
import NewsLetter from './components/NewsLetterBox'
import Footer from './components/Footer'

function App() {

  return (
    <>
     <div className='w-full min-h-screen'>
        <Header/>
        <Hero/>
        <LatestCollection/>
        <BestSeller/>
        <OurPolicy/>
        <NewsLetter/>
     </div>
        <Footer/>
    </>
  )
}

export default App
