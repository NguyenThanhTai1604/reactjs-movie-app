import React from 'react'

export default function Header() {
  return (
    <div className='p-4 bg-black flex items-center justify-between'>
      <div className='flex items-center space-x-4'>
        <h1 className='text-[30px] uppercase font-bold text-red-700'>Movie</h1>
        <nav className='flex items-center space-x-4'>
          <a href='#' className='text-white'>Home</a>
          <a href='#' className='text-white'>About</a>
          <a href='#' className='text-white'>Contact</a>
        </nav>
      </div>

      <div className='flex space-x-4 items-center'>
        <input type='text' placeholder='Search' className='p-2 bg-white text-black'></input>
        <button className='p-1 text-white bg-red-600'>Search</button>
      </div>
    </div>
  )
}
