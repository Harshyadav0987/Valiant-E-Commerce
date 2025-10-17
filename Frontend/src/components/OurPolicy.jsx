// import React from 'react'
// import { assets } from '../assets/assets'
// import { ShoppingBag, ArrowRight, Package, Shield, Headphones } from 'lucide-react';


// function OurPolicy() {
//   return (
//     <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs md:text-base text-gray-800'>
//       <div>
//         <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
//         <p className='font-semibold'>Easy Return/Exchange Policy</p>
//         <p className='text-gray-500'>We offer hassle free return/exchange policy</p>
//       </div>

//       <div>
//         <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
//         <p className='font-semibold'>7 Days Return/Exchange Policy</p>
//         <p className='text-gray-500'>We provide 7 days return/exhange policy</p>
//       </div>

//       <div>
//         <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
//         <p className='font-semibold'>Best Customer Support</p>
//         <p className='text-gray-500'>We provide 24/7 customer support</p>
//       </div>
//     </div>
//   )
// }

// export default OurPolicy

import React from 'react'
import { assets } from '../assets/assets'

function OurPolicy() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          <div className="text-center space-y-5 group">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 group-hover:bg-gray-900 transition-colors duration-300">
              <img src={assets.exchange_icon} className='w-7 h-7 group-hover:brightness-0 group-hover:invert transition-all duration-300' alt="" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 tracking-wide">
              Effortless Returns
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Hassle-free returns and exchanges designed around your convenience
            </p>
          </div>

          <div className="text-center space-y-5 group">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 group-hover:bg-gray-900 transition-colors duration-300">
              <img src={assets.quality_icon} className='w-7 h-7 group-hover:brightness-0 group-hover:invert transition-all duration-300' alt="" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 tracking-wide">
              7-Day Guarantee
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Full week to ensure your complete satisfaction with every purchase
            </p>
          </div>

          <div className="text-center space-y-5 group">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 group-hover:bg-gray-900 transition-colors duration-300">
              <img src={assets.support_img} className='w-7 h-7 group-hover:brightness-0 group-hover:invert transition-all duration-300' alt="" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 tracking-wide">
              Premium Support
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Dedicated assistance available whenever you need us, 24/7
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurPolicy