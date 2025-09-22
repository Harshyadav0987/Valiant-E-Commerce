import React from 'react'

function Title({text1,text2}) {
  return (
    <div className='inline-flex pl-2 '>
      <p className='inline-flex gap-2 items-center mb-3 text-gray-500'>{text1} <span className='text-gray-800 font-medium'>{text2}</span></p>
      {/* <p className='w-16 sm:w-20 h-[2px] sm:[2px] bg-gray-800 my-4 ml-2'></p> */}
    </div>
  )
}

export default Title
