import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

function About() {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
            <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="" />
            <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                <p>At Valiant, we believe shopping should be simple, reliable, and rewarding. Our mission is to bring you quality products at fair prices with a seamless online experience. Whether you’re looking for everyday essentials or something special, Valiant is here to make your shopping journey easy and enjoyable. With a focus on trust, customer satisfaction, and convenience, we’re committed to being more than just a store — we’re your partner in smart shopping.</p>
                <p>What sets Valiant apart is our dedication to you. From carefully curated collections to secure payments and fast delivery, every detail is designed with your convenience in mind. We value transparency, quality, and trust — ensuring that every purchase you make with us feels worthwhile. At Valiant, we’re not just building a store, we’re building a community where shopping meets reliability and satisfaction.</p>
                <b className='text-gray-800'>Our Mission</b>
                <p>At Valiant, our mission is to redefine online shopping by making it effortless, affordable, and trustworthy. We strive to deliver high-quality products with excellent service, while building lasting relationships with our customers. Every step we take is driven by the goal of creating a shopping experience that puts your needs first.</p>
            </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className='text-gray-600'>At Valiant, every product goes through careful selection to ensure you receive only the best. We prioritize durability, reliability, and value in everything we offer.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className='text-gray-600'>We make shopping easy with a smooth, user-friendly platform, secure payments, and fast delivery — so you can shop anytime, anywhere, without hassle.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Support:</b>
            <p className='text-gray-600'>Your satisfaction is our priority. Our dedicated support team is always ready to assist you, ensuring quick responses and reliable solutions to your queries.</p>
        </div>

      </div>

      <NewsLetterBox/>
      
    </div>
  )
}

export default About
