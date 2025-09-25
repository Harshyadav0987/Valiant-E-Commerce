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
import Product from './pages/Product'
import { ToastContainer, toast } from 'react-toastify';
import Cart from './pages/Cart'


function App() {

  return (
    <>
    
      
     <div className='w-full min-h-screen'>
        <ToastContainer/>
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

          <Route
            path={`/product/:productId`}
            element={
              <>
                <Product/>
              </>
            }
          />
          <Route
            path={`/cart`}
            element={
              <>
                <Cart/>
              </>
            }
          />
          {/* <Route
            path={`/place-order`}
            element={
              <>
                <PlaceOrderPage/>
              </>
            }
          /> */}
        </Routes>
     </div>
        <Footer/>
    </>
  )
}

export default App
