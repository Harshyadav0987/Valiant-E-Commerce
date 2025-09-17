import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'

function App() {

  return (
    <>
     <div className='w-full min-h-screen'>
        <Header/>
        <Hero/>
     </div>
    </>
  )
}

export default App
