// import React from 'react'

// function NewsLetterBox() {
//   const onSubmitHandler=(event)=>{
//     event.preventDefault();
//   };
  
//   return (
//     <div className='text-center'>
//         <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off </p>
//         <p className='text-gray-500 mt-3'>Be part of an exclusive community — unlock 20% off today and discover fashion crafted for you.</p>
//         <form onSubmit={onSubmitHandler} action="" className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 '>
//           <input type="email" name="" id="" placeholder='Enter your email' className='w-full sm:flex-1 outline-none '/>
//           <button type='submit' className='flex flex-col items-center gap-1 rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-gray-100 shadow-sm hover:bg-gray-100 hover:text-gray-800'>SUBSCRIBE</button>
//         </form>
//     </div>
//   )
// }

// export default NewsLetterBox;
import React, { useState } from 'react'

function NewsLetterBox() {
  const [email, setEmail] = useState('');
  
  const onSubmitHandler=(event)=>{
    event.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };
  
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-gray-300" />
              <span className="text-xs tracking-[0.3em] text-gray-500 uppercase">Newsletter</span>
              <div className="h-px w-8 bg-gray-300" />
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900">
              Subscribe & Save <span className="font-serif italic">20%</span>
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Become part of an exclusive community. Enjoy 20% off your first order and be the first to discover new collections.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:bg-white transition-all"
            />
            <button
              onClick={onSubmitHandler}
              className="px-8 py-4 bg-gray-900 text-white font-medium tracking-wider hover:bg-gray-800 transition-colors duration-300"
            >
              SUBSCRIBE
            </button>
          </div>

          <p className="text-xs text-gray-500">
            By subscribing, you agree to our Privacy Policy and Terms of Service
          </p>
        </div>
      </div>
    </section>
  )
}

export default NewsLetterBox;