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
    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile and Tablet Layout */}
      <div className="lg:hidden">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Image Section - Mobile */}
          <div className="relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden mb-8">
            <img 
              src={hero} 
              alt="Fashion model" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/30" />
          </div>

          {/* Content Section - Mobile */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-px w-8 sm:w-12 bg-gray-800" />
                <span className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-gray-700 font-medium">
                  EXCLUSIVE COLLECTION
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-light text-gray-900 leading-tight">
                Latest
                <span className="block mt-1 sm:mt-2 font-serif italic">Arrivals</span>
              </h1>
              
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-md">
                Discover timeless elegance meets contemporary style in our carefully curated collection
              </p>
            </div>

            <NavLink 
              to="/collection" 
              className="group inline-flex items-center gap-3 text-xs sm:text-sm tracking-wider font-medium text-gray-900 hover:gap-5 transition-all duration-300"
            >
              EXPLORE COLLECTION
              <span className="text-lg sm:text-xl">→</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex relative h-[85vh] items-center overflow-hidden">
        <div className="container mx-auto px-12 relative z-10">
          <div className="max-w-2xl space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-gray-800" />
                <span className="text-xs tracking-[0.3em] text-gray-700 font-medium">
                  EXCLUSIVE COLLECTION
                </span>
              </div>
              
              <h1 className="text-7xl font-light text-gray-900 leading-tight">
                Latest
                <span className="block mt-2 font-serif italic">Arrivals</span>
              </h1>
              
              <p className="text-gray-600 text-lg max-w-md leading-relaxed">
                Discover timeless elegance meets contemporary style in our carefully curated collection
              </p>
            </div>

            <NavLink 
              to="/collection" 
              className="group inline-flex items-center gap-3 text-sm tracking-wider font-medium text-gray-900 hover:gap-5 transition-all duration-300"
            >
              EXPLORE COLLECTION
              <span className="text-xl">→</span>
            </NavLink>
          </div>
        </div>

        {/* Image Section - Desktop */}
        <div className="absolute right-0 top-0 h-full w-1/2">
          <img 
            src={hero} 
            alt="Fashion model" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-100" />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-12 flex items-center gap-6 text-xs text-gray-500 z-10">
          <span>Scroll to explore</span>
          <div className="h-px w-16 bg-gray-300" />
        </div>
      </div>
    </div>
  )
}

export default Hero