import hero from '/Hero.png'

function Hero() {
  return (
    <div className='flex flex-col sm:flex-row border border- border-gray-300 bg-gray-100' >
        {/* Hero left side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 ' >
            <div className='text-gray-800 '>
                <div className='flex items-center gap-2 '>
                    <p className='w-8 md:w-11 h-[2px] bg-gray-800'></p>
                    <p className=' font-semibold text-sm md:text-base'> OUR BEST SELLERS</p>
                </div>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                    <p className='w-8 md:w-11 h-[2px] bg-gray-800'></p>
                </div>
            </div>
        </div>
        {/* Right side ends here */}

        {/* Hero left side */}
        <div className='sm:w-1/2'>
            <img className="w-full h-full" src={hero} alt="" />
        </div>
        {/* left side ends here */}
    </div>
  )
}

export default Hero
