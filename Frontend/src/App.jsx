import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import LatestCollection from './components/LatestCollection'

function App() {

  return (
    <>
     <div className='w-full min-h-screen'>
        <Header/>
        <Hero/>
        <LatestCollection/>
     </div>
    </>
  )
}

export default App
