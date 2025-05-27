'use client'
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Suspense, useState } from "react";   
import { usePathname } from "next/navigation"; 
import ConfirmModal from "./ConfirmModal"
const Header = () => {
  const pathname = usePathname()
const [ barState, setBarState]= useState(false)
const menuClick=()=>{
setBarState(prev=> !prev)  
}

 const navAddress=[
{
  a:"News",
  b:"/news/"

},{
  a:"Latest",
  b:"/news/articles/"

},
 {
  a:"Local",
  b:"/news/local/"

},
 
 {
  a:"Foreign",
  b:"/news/foreign/" 

},
{
  a:"Netflix Naija",
  b:"/naija-wiki/"

},
{
  a:"Events",
  b:"/naija-events/"

},
{
  a:"Forum",
  b:"/forum/"

} 
]
 const [addStyle, setAddStyle]=useState('')  
const handleClick = (id:string)=> { 
  const activeElement = navAddress.filter((item)=> item.a === id )
  if(pathname.includes(addStyle.toLowerCase())){
      activeElement && setAddStyle(id)
  }
 
} 

 return ( 
 <>
 <Suspense> <ConfirmModal /> </Suspense>  
  <header className="flex flex-wrap justify-between w-full relative"> 
<div className="md:m-3 flex mt-6 z-20"> 
<Link href='/'><h1 className="head-forum font-bold text-7xl sm:mb-4 mt-4 my-4 md:mt-11 lg:mt-6 mb-4 mx-4 font-mono"> 
<span className='px-2 head-forum-span-dark dark:head-forum-span-light'>U</span><span className="tightest text-center">rban News</span> 
</h1></Link>
 {pathname.includes('netflix-naija')?<Link href={`/${pathname.split('/')[1]}/${pathname.split('/')[2]}`}><p className="text-xl mt-20 mb-2">{`/${pathname.split('/')[2]}/`}</p></Link>:<Link href={`/${pathname.split('/')[1]}`}><p className="text-xl mt-20 mb-2">{`/${pathname.split('/')[1]}/`}</p></Link>}

</div>

{barState&&
<div className="fixed h-screen z-50 bg-gray-800 w-full top-0 bottom-0 animate-in cursor-pointer bg-opacity-90" onClick={menuClick}>  
<p className="opacity-70 mx-2" >
<FontAwesomeIcon icon={faXmark} className="text-white w-6 h-11 cursor-pointer"/>
</p>
  <nav className="animate-in"> 
{  navAddress.map((xy)=> 
<ul key={xy.b + Math.random()}className="text-white p-3 flex flex-col text-center justify-center items-center h-max"> 
 <li
  className={`p-2 m-1 mx-4 cursor-pointer border-b-2 opacity-80 hover:scale-105 text-lg py-4 w-full ${
    pathname=== xy.b ? 'border-green-700' : {}
  }`}
  onClick={() => handleClick(xy.a)} 
>
 <Link href={xy.b}>{xy.a}</Link>

</li>
</ul> 
)   } 
</nav>  
</div>

}  

<button onClick={menuClick} className="m-1 mx-3 my-3 cursor-pointer md:hidden text-4xl" aria-label="Navigation" type="button">  
<FontAwesomeIcon 
className=""
icon={faBars}
width={35}
height={35} />          
  
</button>  
</header> 
<div className="absolute top-0 w-full md:block hidden z-50"> 
  <nav className="flex justify-center">
     {!barState&&
navAddress.map((xy)=> 
<ul key={xy.b + Math.random()}> 
 <li
  className={`p-2 m-1 mx-4 opacity-80 hover:scale-105 text-lg border-b-4 ${
    pathname=== xy.b  ? 'border-green-700' : {}
  }`}
  onClick={() => handleClick(xy.a)} 
>
 <Link href={xy.b}>{xy.a}</Link>
 
</li>


</ul>

 
)
 
}</nav></div>
</>
 
  )
}

export default Header