// import hero from '/Hero.png'
// import { assets } from '../assets/assets'

// function Hero() {
//   return (
//     <div className='flex flex-col sm:flex-row border border- border-gray-300 bg-gray-100' >
//         {/* Hero left side */}
//         <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 ' >
//             <div className='text-gray-800 '>
//                 <div className='flex items-center gap-2 '>
//                     <p className='w-8 md:w-11 h-[2px] bg-gray-800'></p>
//                     <p className=' font-semibold text-sm md:text-base'> OUR BEST SELLERS</p>
//                 </div>
//                 <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
//                 <div className='flex items-center gap-2'>
//                     <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
//                     <p className='w-8 md:w-11 h-[2px] bg-gray-800'></p>
//                 </div>
//             </div>
//         </div>
//         {/* left side ends here */}

//         {/* Hero right side */}
//         <div className='sm:w-1/2'>
//             <img className="w-full h-full" src={hero} alt="" />
//         </div>
//         {/* right side ends here */}
//     </div>
//   )
// }

// export default Hero

import { NavLink } from 'react-router-dom'
import hero from '/Hero.png'

function Hero() {
  return (
    <div className="relative h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 z-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-gray-800" />
                <span className="text-xs tracking-[0.3em] text-gray-700 font-medium">EXCLUSIVE COLLECTION</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-light text-gray-900 leading-tight">
                Latest
                <span className="block mt-2 font-serif italic">Arrivals</span>
              </h1>
              
              <p className="text-gray-600 text-lg max-w-md leading-relaxed">
                Discover timeless elegance meets contemporary style in our carefully curated collection
              </p>
            </div>

            <NavLink to="/collection" className="group flex items-center gap-3 text-sm tracking-wider font-medium text-gray-900 hover:gap-5 transition-all duration-300">
              EXPLORE COLLECTION
              <span className="text-xl">→</span>
            </NavLink>
          </div>

          <div className="relative lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2">
            <div className="relative h-[500px] lg:h-full">
              <img 
                src={hero} 
                alt="Fashion model" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-50 lg:to-gray-100" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 lg:left-12 flex items-center gap-6 text-xs text-gray-500">
        <span>Scroll to explore</span>
        <div className="h-px w-16 bg-gray-300" />
      </div>
    </div>
  )
}

export default Hero