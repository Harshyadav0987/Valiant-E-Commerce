import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

function About() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className='relative text-2xl text-center pt-16 pb-8 border-t border-gray-200'>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-50"></div>
        <div className="relative">
          <Title text1={"ABOUT"} text2={"US"} />
          <p className="text-sm text-gray-500 mt-4 max-w-2xl mx-auto px-4">
            Crafting exceptional shopping experiences with integrity and care
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className='my-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row gap-12 items-center'>
          <div className="w-full md:w-1/2 relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
            <img 
              className="relative w-full rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300" 
              src={assets.about_img} 
              alt="About Valiant" 
            />
          </div>
          
          <div className='flex flex-col justify-center gap-8 md:w-1/2'>
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
                At <span className="font-semibold text-gray-800">Valiant</span>, we believe shopping should be simple, reliable, and rewarding. Our mission is to bring you quality products at fair prices with a seamless online experience. Whether you're looking for everyday essentials or something special, Valiant is here to make your shopping journey easy and enjoyable.
              </p>
              
              <p className="text-gray-600 leading-relaxed text-base">
                With a focus on trust, customer satisfaction, and convenience, we're committed to being more than just a store — we're your partner in smart shopping.
              </p>
            </div>

            <div className="border-l-4 border-gray-300 pl-6 py-2 bg-gray-50 rounded-r-lg">
              <p className="text-gray-600 leading-relaxed text-base italic">
                What sets Valiant apart is our dedication to you. From carefully curated collections to secure payments and fast delivery, every detail is designed with your convenience in mind. We value transparency, quality, and trust — ensuring that every purchase you make with us feels worthwhile.
              </p>
            </div>

            <div className="pt-4">
              <h3 className='text-xl font-semibold text-gray-800 mb-4 tracking-wide'>Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-base">
                At Valiant, our mission is to redefine online shopping by making it effortless, affordable, and trustworthy. We strive to deliver high-quality products with excellent service, while building lasting relationships with our customers. Every step we take is driven by the goal of creating a shopping experience that puts your needs first.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='bg-white py-16 mt-12'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className='text-center mb-12'>
            <Title text1={'WHY'} text2={'CHOOSE US'}/>
            <div className="w-24 h-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-20'>
            <div className='group relative border border-gray-200 rounded-2xl px-8 py-12 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50'>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-t-2xl"></div>
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-gray-200 transition-colors">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h4 className='text-lg font-semibold text-gray-800 tracking-wide'>Quality Assurance</h4>
                <p className='text-gray-600 leading-relaxed text-sm'>
                  At Valiant, every product goes through careful selection to ensure you receive only the best. We prioritize durability, reliability, and value in everything we offer.
                </p>
              </div>
            </div>

            <div className='group relative border border-gray-200 rounded-2xl px-8 py-12 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50'>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-t-2xl"></div>
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-gray-200 transition-colors">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h4 className='text-lg font-semibold text-gray-800 tracking-wide'>Convenience</h4>
                <p className='text-gray-600 leading-relaxed text-sm'>
                  We make shopping easy with a smooth, user-friendly platform, secure payments, and fast delivery — so you can shop anytime, anywhere, without hassle.
                </p>
              </div>
            </div>

            <div className='group relative border border-gray-200 rounded-2xl px-8 py-12 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50'>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-t-2xl"></div>
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-gray-200 transition-colors">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <h4 className='text-lg font-semibold text-gray-800 tracking-wide'>Exceptional Customer Support</h4>
                <p className='text-gray-600 leading-relaxed text-sm'>
                  Your satisfaction is our priority. Our dedicated support team is always ready to assist you, ensuring quick responses and reliable solutions to your queries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsLetterBox/>
      </div>
    </div>
  )
}

export default About