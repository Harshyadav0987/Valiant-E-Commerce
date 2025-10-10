import React from 'react'
import {assets} from "../assets/assets.js"

function navbar() {
  return (
    <div className='flex items-center justify-between py-0.5 px-[4%] bg-white shadow-md'>
      <img className='w-[max(15%,80px)]' src={assets.admin_final} alt="Admin Logo" />
      <button  className="flex flex-col items-center gap-1 rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-gray-100 shadow-sm hover:bg-gray-100 hover:text-gray-800">Logout</button>
    </div>
  )
}

export default navbar

