import React from 'react'
import Logo from './Logo'

function Footer() {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-6 mt-8 text-sm text-gray-800'>
    
            <div >
                <Logo className='mb-5 w-32 mx-36'></Logo>
                <p className='w-full sm:w-2/3 text-gray-500'>At Valiant, we curate collections that blend modern elegance with lasting comfort. Shop with confidence knowing every piece is designed to elevate your lifestyle.</p>
            </div>

            <div >
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div >
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91 9893397254</li>
                    <li>valiant@gmal.com</li>
                </ul>
            </div>

        </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center text-gray-800'>Copyright 2025 @valiant.com - All rights Reserved.</p>
            </div>
    
    </div>
  )
}

export default Footer
