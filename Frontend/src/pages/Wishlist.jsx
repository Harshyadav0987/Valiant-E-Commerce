import React, { useContext, useEffect, useState } from 'react'
import { Heart, X } from 'lucide-react'
import { ValiantContext } from '../context/ValiantContext'
import Title from '../components/Title'
import { Link } from 'react-router-dom'

function Wishlist() {
  const { products, currency, wishlist, removeFromWishlist, navigate } = useContext(ValiantContext)
  const [wishlistData, setWishlistData] = useState([])

  useEffect(() => {
    if (products.length > 0 && wishlist.length > 0) {
      const tempData = wishlist.map(id => {
        return products.find(product => product._id === id);
      }).filter(Boolean); // remove undefined if a product was deleted
      setWishlistData(tempData);
    } else {
      setWishlistData([]);
    }
  }, [wishlist, products])

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='h-8 w-1 bg-gray-900 rounded-full'></div>
            <h1 className='text-4xl font-light text-gray-900 tracking-tight'>
              Your <span className='font-medium'>Wishlist</span>
            </h1>
          </div>
          <p className='text-gray-500 ml-7 font-light'>
            {wishlistData.length} {wishlistData.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        <div>
          {wishlistData.length === 0 ? (
            <div className='bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-200/50 p-16 text-center max-w-2xl mx-auto'>
              <div className='inline-block p-6 bg-gray-50 rounded-full mb-6'>
                <Heart className='w-16 h-16 text-gray-300' />
              </div>
              <h3 className='text-2xl font-light text-gray-900 mb-3 tracking-wide'>
                Your wishlist is empty
              </h3>
              <p className='text-gray-500 mb-8 font-light'>
                Save items you love to review them later
              </p>
              <button 
                onClick={() => navigate('/collection')} 
                className='bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-4 text-sm rounded-xl font-medium tracking-wider uppercase hover:shadow-xl hover:scale-105 transition-all duration-300'
              >
                Start Browsing
              </button>
            </div>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {wishlistData.map((productData, index) => {
                return (
                  <div key={index} className='bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden relative'>
                    
                    <button 
                      onClick={() => removeFromWishlist(productData._id)}
                      className='absolute top-3 right-3 z-10 p-2 bg-white/90 rounded-full text-red-500 shadow-md hover:scale-110 transition-transform'
                      title="Remove from wishlist"
                    >
                      <X className='w-4 h-4' />
                    </button>

                    <Link to={`/product/${productData._id}`} className='block aspect-[4/5] overflow-hidden bg-gray-50 relative'>
                      <img 
                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out' 
                        src={productData.images[0]} 
                        alt={productData.name}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </Link>

                    <div className='p-4 space-y-2'>
                      <h3 className='text-gray-800 font-medium text-sm leading-snug group-hover:text-gray-900 transition-colors line-clamp-2 min-h-[2.5rem]'>
                        {productData.name}
                      </h3>
                      
                      <div className='flex items-center justify-between pt-1'>
                        <p className='text-gray-900 font-bold text-base'>
                          {currency}{productData.price}
                        </p>
                        <Link 
                           to={`/product/${productData._id}`}
                           className='px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors'
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Wishlist
