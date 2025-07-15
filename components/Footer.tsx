
import { ThemeSwitcher } from "./theme-switcher" 
import Image from "next/image";
import Link from "next/link";
import ContactUs from "./ContactUs";

const Footer = async() => {

  return (
    <footer className="bg-culturaysBg p-4 text-white flex flex-col justify-between w-full border-t border-t-foreground/10 dark:bg-gray-300 dark:text-gray-900">
   <div className="font-bold"> 
 <Link href='/' prefetch={false}><Image
className="rounded-full cursor-pointer bg-white"
width={50}
height={50}
src={'/culturays-no-bg.png'}  
alt='Culturays Logo Image'/> 
<h2 className="cursor-pointer text-4xl my-1 font-bold hover:text-gray-500">  
Urban Naija News</h2></Link>
<ul> 
<li className="text list-disc p-3 mx-11 hover:text-gray-500 "><Link href='/news/'aria-label="News">News</Link></li>
<li className="text list-disc p-3 mx-11 hover:text-gray-500"><Link href='/forum/'>Forum</Link></li>  
 
<li className="text list-disc p-3 mx-11 hover:text-gray-500"><Link href='/naija-wiki/'>Naija Wiki</Link></li> 
<li className="text list-disc p-3 mx-11 hover:text-gray-500 "><Link href='/naija-events/'>Naija Events</Link></li> 
<li className="text list-disc p-3 mx-11 hover:text-gray-500 "><Link href='/naija-birthdays/'>Naija Birthdays</Link> </li>  
</ul> 
  <ContactUs />  

</div>  
 <div className="m-auto font-bold"> 
<Link href= "/privacy-policy/" >
<p className="p-1 hover:opacity-70 text-center">Privacy Policy </p>
</Link> 
<Link href="/about/">
<p className="p-1 hover:opacity-70 text-center ">About</p></Link> 
 
<Link href="/">
<p className="p-1" > 
Copyright{" "}
© Ngenet Studio, 2024
</p>
</Link>
   <p className="mt-8 text-sm text-gray-500">
  Learn more about <Link href="/nigeria/" className="text-blue-600 underline">Topics we cover</Link>.
</p>
</div>  
<ThemeSwitcher /> 
</footer>

)
}

export default Footer