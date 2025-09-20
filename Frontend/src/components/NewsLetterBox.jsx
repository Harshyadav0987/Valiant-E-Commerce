import React from 'react'

function NewsLetterBox() {
  const onSubmitHandler=(event)=>{
    event.preventDefault();
  };
  
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off </p>
        <p className='text-gray-500 mt-3'>Be part of an exclusive community — unlock 20% off today and discover fashion crafted for you.</p>
        <form onSubmit={onSubmitHandler} action="" className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 '>
          <input type="email" name="" id="" placeholder='Enter your email' className='w-full sm:flex-1 outline-none '/>
          <button type='submit' className='flex flex-col items-center gap-1 rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-gray-100 shadow-sm hover:bg-gray-100 hover:text-gray-800'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterBox;