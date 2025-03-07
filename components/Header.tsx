'use client'
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Suspense, useEffect, useState } from "react";   
import { usePathname } from "next/navigation"; 
import ConfirmModal from "./ConfirmModal"
const Header = () => {
  const pathname = usePathname()
const [ barState, setBarState]= useState(false)
const menuClick=()=>{
setBarState(prev=> !prev)  
}

 
 return ( 
 <>
 <Suspense> <ConfirmModal /> </Suspense>  
  <header className="flex flex-wrap justify-between w-full relative"> 
<div className="md:m-3 flex mt-6 z-20"> 
<Link href='/'><h1 className="head-forum font-bold text-7xl sm:mb-4 mt-4 my-4 md:mt-11 lg:mt-6 mb-4 mx-4 font-mono tightest"> 
<span className='py-1 px-3 text-7xl head-forum-span-dark dark:head-forum-span-light'>C</span>ulturays 
</h1></Link>
 {pathname.includes('netflix-naija')?<Link href={`/${pathname.split('/')[1]}/${pathname.split('/')[2]}`}><p className="text-xl mt-20 mb-2">{`/${pathname.split('/')[2]}/`}</p></Link>:<Link href={`/${pathname.split('/')[1]}`}><p className="text-xl mt-20 mb-2">{`/${pathname.split('/')[1]}/`}</p></Link>}

</div>

{barState&&
<div className="fixed h-screen z-50 bg-gray-800 w-full top-0 bottom-0 animate-in cursor-pointer bg-opacity-90" onClick={menuClick}>  
<p className="opacity-70 mx-2" >
<FontAwesomeIcon icon={faXmark} className="text-white w-6 h-11 cursor-pointer"/>
</p>
{/* <div className="animate-in">       
<ul className="text-white p-3 flex flex-col text-center justify-center items-center h-max">
<Link href='/news/economy'><li className="p-2 m-1 mx-4 cursor-pointer border-b-2 opacity-80 hover:scale-105 text-lg py-4 w-full">
 Economy
</li></Link> 
<Link href='/news/tech'><li className="p-2 m-1 mx-4 cursor-pointer border-b-2  opacity-80 hover:scale-105 text-lg py-4 w-full">
 Tech
</li>
</Link>
<Link href='/news/business'><li className="p-2 m-1 mx-4 cursor-pointer border-b-2  opacity-80 hover:scale-105 text-lg py-4 w-full">
Business
</li></Link>
<Link href='/news/health'><li className="p-2 m-1 mx-4 cursor-pointer border-b-2  opacity-80 hover:scale-105 text-lg py-4 w-full">
Health
</li></Link>
<Link href='/news/environment'><li className="p-2 m-1 mx-4 cursor-pointer border-b-2 opacity-80 hover:scale-105 text-lg py-4 w-full">
Environment
</li></Link>
<Link href='/news/society'><li className="p-2 m-1 mx-4 cursor-pointer opacity-80 hover:scale-105 text-lg py-4 w-full">
Society
</li></Link>
 
</ul>

</div> */}
</div>

} 

<button onClick={menuClick} className="m-1 mx-3 my-3 cursor-pointer md:hidden text-4xl" type="button">  
<FontAwesomeIcon 
className=""
icon={faBars}
width={35}
height={35} />          
  
</button>  
</header> 
{!barState&&
  <nav className="absolute top-0 w-full md:block hidden">
{/* <div className="m-2">       
<ul className="flex justify-center">
 
<Link href='/news/economy'><li className="p-2 m-1 mx-4 sm:border-b-2 md:border-b-2 opacity-80 hover:scale-105 text-lg w-max">
 Economy
</li></Link>
<Link href='/news/tech'><li className="p-2 m-1 mx-4 sm:border-b-2 md:border-b-2 opacity-80 hover:scale-105 text-lg">
 Tech
</li></Link>
<Link href='/news/business'><li className="p-2 m-1 mx-4 sm:border-b-2 md:border-b-2 opacity-80 hover:scale-105 text-lg">
Business
</li></Link>
<Link href='/news/health'><li className="p-2 m-1 mx-4 sm:border-b-2 md:border-b-2 opacity-80 hover:scale-105 text-lg">
Health
</li></Link>
<Link href='/news/environment'><li className="p-2 m-1 mx-4 sm:border-b-2 md:border-b-2 opacity-80 hover:scale-105 text-lg">
Environment
</li></Link>
<Link href='/news/society'><li className="p-2 m-1 mx-4 sm:border-b-2 md:border-b-2 opacity-80 hover:scale-105 text-lg">
Society
</li></Link> 
</ul>

</div> */}
</nav>
}
</>
 
  )
}

export default Header