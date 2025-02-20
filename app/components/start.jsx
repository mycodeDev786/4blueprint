
import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useRef } from 'react'

const Navbar = () => {
    const sideMenuRef= useRef();
    const openMenu= ()=> {
        sideMenuRef.current.style.transform = ' translateX(-16rem)'
    }
    const closeMenu= ()=> {
        sideMenuRef.current.style.transform = ' translateX(16rem)'
    }
  return (
    <>
    <div className='fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] '>
    <Image src={assets.logo} alt='' className='w-full'/>
   </div>
   <nav className='w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex item-center
    justify-between  z-50  '>

    <a href="#top">
   <Image src={assets.logo} alt='' className='w-28  cursor-pointer mr-14'/>
    </a>
    <ul className='hidden md:flex flex-nowrap items-center gap-6 lg:gap-8 rounded-full px-12 py-3'>
    <li> <a href='#top' className='font-Ovo whitespace-nowrap'> Home</a></li>
    <li> <a href='#allrecipies' className='font-Ovo whitespace-nowrap'> All Recipes</a></li>
    <li> <a href='#faq' className='font-Ovo whitespace-nowrap'> Frequently Asked Questions</a></li>
    <li> <a href='#support' className='font-Ovo whitespace-nowrap'> Customer Support</a></li>
   
    <li className="flex-shrink-0 min-w-max">
        <input 
            type="text" 
            placeholder="Search..." 
            className="px-4 py-1.3 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </li>
    <li className="flex-shrink-0 ">
        <a href="#login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Login / Signup
        </a>
    </li>
</ul>

<button className='block md:hidden ml-3'  onClick={openMenu}>
        <Image src={assets.menu_black} alt='' className='w-6'/> 
        </button>

  {/*     mobile  menu */}

  <ul ref={sideMenuRef} className=' flex md:hidden flex-col gap-4 py-20 px-10 fixed
    -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 dark:bg-darkHover dark:text-white'>
        <div className=' absolute right-6 top-6' >

        <Image src={assets.close_black} alt='' className='w-5 cursor-pointer'/>
        </div>
        
        <li> <a href='#top' className='font-Ovo whitespace-nowrap'> Home</a></li>
    <li> <a href='#about' className='font-Ovo whitespace-nowrap'> All Recipes</a></li>
    <li> <a href='#services' className='font-Ovo whitespace-nowrap'> Frequently Asked Questions</a></li>
    <li> <a href='#work' className='font-Ovo whitespace-nowrap'> Customer Support</a></li>
    <li className="flex-shrink-0 min-w-max">
        <input 
            type="text" 
            placeholder="Search..." 
            className="px-4 py-1.3 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </li>
    <li className="flex-shrink-0 ">
        <a href="#login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Login / Signup
        </a>
    </li>
       </ul>
    </nav>




    
    </>
  )
}

export default Navbar
