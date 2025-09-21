import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import LatestCollection from './components/LatestCollection'
import BestSeller from './components/BestSeller'
import OurPolicy from './components/OurPolicy'
import NewsLetter from './components/NewsLetterBox'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { Routes ,Route} from 'react-router-dom'
import Collection from './pages/Collection'

function App() {

  return (
    <>
      
     <div className='w-full min-h-screen'>
        <Header/>
        <SearchBar/>

        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <LatestCollection />
                <BestSeller />
                <OurPolicy />
                <NewsLetter />
              </>
            }
          />

          <Route
            path="/collection"
            element={
              <>
                <Collection/>
              </>
            }
          />
        </Routes>
     </div>
        <Footer/>
    </>
  )
}

export default App
