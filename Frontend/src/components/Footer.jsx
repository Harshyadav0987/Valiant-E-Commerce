// import React from 'react'
import Logo from './Logo'

// function Footer() {
//   return (
//     <div>
//       <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-6 mt-8 text-sm text-gray-800'>
    
//             <div >
//                 <Logo className='mb-5 w-32 mx-36'></Logo>
//                 <p className='w-full sm:w-2/3 text-gray-500'>At Valiant, we curate collections that blend modern elegance with lasting comfort. Shop with confidence knowing every piece is designed to elevate your lifestyle.</p>
//             </div>

//             <div >
//                 <p className='text-xl font-medium mb-5'>COMPANY</p>
//                 <ul className='flex flex-col gap-1 text-gray-600'>
//                     <li>Home</li>
//                     <li>About Us</li>
//                     <li>Delivery</li>
//                     <li>Privacy Policy</li>
//                 </ul>
//             </div>

//             <div >
//                 <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
//                 <ul className='flex flex-col gap-1 text-gray-600'>
//                     <li>+91 9893397254</li>
//                     <li>valiant@gmal.com</li>
//                 </ul>
//             </div>

//         </div>
//             <div>
//                 <hr />
//                 <p className='py-5 text-sm text-center text-gray-800'>Copyright 2025 @valiant.com - All rights Reserved.</p>
//             </div>
    
//     </div>
//   )
// }

// export default Footer

import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* <h3 className="text-2xl font-light tracking-wider text-gray-900">
              VALIANT
            </h3> */}
            <Logo className='mb-5 w-32 mx-36 text-2xl font-light tracking-wider text-gray-900'/>
            <p className="text-gray-600 leading-relaxed max-w-md">
              At Valiant, we curate collections that blend modern elegance with lasting comfort. Shop with confidence knowing every piece is designed to elevate your lifestyle.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-900 flex items-center justify-center transition-colors duration-300 group">
                <span className="text-gray-700 group-hover:text-white transition-colors">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-900 flex items-center justify-center transition-colors duration-300 group">
                <span className="text-gray-700 group-hover:text-white transition-colors">in</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-900 flex items-center justify-center transition-colors duration-300 group">
                <span className="text-gray-700 group-hover:text-white transition-colors">f</span>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-medium tracking-wider text-gray-900 uppercase">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Delivery
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-sm font-medium tracking-wider text-gray-900 uppercase">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+919893397254" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  +91 9893397254
                </a>
              </li>
              <li>
                <a href="mailto:valiant@gmail.com" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  valiant@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-6">
          <p className="text-center text-sm text-gray-500">
            © 2025 Valiant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer