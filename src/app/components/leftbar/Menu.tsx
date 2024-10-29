import Image from 'next/image'
import React from 'react'

const Menu = () => {
  return (
    <div className='px-2 py-4 bg-white shadow-md rounded-sm'>
        <ul className='flex flex-col gap-4 px-1'>
            <li className='flex gap-4 items-center cursor-pointer hover:bg-gray-400 p-1 rounded-sm group transition-all ease-in-out'><Image src='/Addimage.png' alt='imges' width={16} height={16}/><span className='text-[.78rem] text-gray-600 group-hover:text-white transition-all ease-in-out'>My Posts</span></li>
            <li className='flex gap-4 items-center cursor-pointer hover:bg-gray-400 p-1 rounded-sm group transition-all ease-in-out'><Image src='/activity.png' alt='imges' width={16} height={16}/><span className='text-[.78rem] text-gray-600 group-hover:text-white transition-all ease-in-out'>Activity</span></li>
            <li className='flex gap-4 items-center cursor-pointer hover:bg-gray-400 p-1 rounded-sm group transition-all ease-in-out'><Image src='/market.png' alt='imges' width={16} height={16}/><span className='text-[.78rem] text-gray-600 group-hover:text-white transition-all ease-in-out'>Marketplace</span></li>
            <li className='flex gap-4 items-center cursor-pointer hover:bg-gray-400 p-1 rounded-sm group transition-all ease-in-out'><Image src='/events.png' alt='imges' width={16} height={16}/><span className='text-[.78rem] text-gray-600 group-hover:text-white transition-all ease-in-out'>Events</span></li>
            <li className='flex gap-4 items-center cursor-pointer hover:bg-gray-400 p-1 rounded-sm group transition-all ease-in-out'><Image src='/albums.png' alt='imges' width={16} height={16}/><span className='text-[.78rem] text-gray-600 group-hover:text-white transition-all ease-in-out'>Albums</span></li>
            <li className='flex gap-4 items-center cursor-pointer hover:bg-gray-400 p-1 rounded-sm group transition-all ease-in-out'><Image src='/Addvideo.png' alt='imges' width={16} height={16}/><span className='text-[.78rem] text-gray-600 group-hover:text-white transition-all ease-in-out'>Videos</span></li>
            <li className='flex gap-4 items-center cursor-pointer hover:bg-gray-400 p-1 rounded-sm group transition-all ease-in-out'><Image src='/news.png' alt='imges' width={16} height={16}/><span className='text-[.78rem] text-gray-600 group-hover:text-white transition-all ease-in-out'>News</span></li>
            <li className='flex gap-4 items-center cursor-pointer hover:bg-gray-400 p-1 rounded-sm group transition-all ease-in-out'><Image src='/courses.png' alt='imges' width={16} height={16}/><span className='text-[.78rem] text-gray-600 group-hover:text-white transition-all ease-in-out'>Courses</span></li>
            <li className='flex gap-4 items-center cursor-pointer hover:bg-gray-400 p-1 rounded-sm group transition-all ease-in-out'><Image src='/settings.png' alt='imges' width={16} height={16}/><span className='text-[.78rem] text-gray-600 group-hover:text-white transition-all ease-in-out'>Setting</span></li>
            <li className='flex gap-4 items-center cursor-pointer hover:bg-gray-400 p-1 rounded-sm group transition-all ease-in-out'><Image src='/lists.png' alt='imges' width={16} height={16}/><span className='text-[.78rem] text-gray-600 group-hover:text-white transition-all ease-in-out'>Lists</span></li>
        </ul>
    </div>
  )
}

export default Menu