
import { Open_Sans, Nokora } from 'next/font/google';  
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
? `${process.env.NEXT_PUBLIC_BASE_URL}/naija-birthdays` 
: "http://localhost:3000/naija-birthdays";
 
export const metadata = {
metadataBase: new URL(defaultUrl), 
 title:"Culturays | Naija Birthdays",  
description: "Look up the birthday dates of high profile Nigerians and celebrate with them - posthumously or alive.",
alternates: {
  canonical: 'https://culturays.com/naija-birthdays',
 
},
}; 

 const openSans = Open_Sans({ 
    subsets: ['latin'], 
    variable:'--font-opensans',
    weight:'300',
    display: 'swap',  
});

  const noko =Nokora({
  subsets:['latin'], 
   weight:['300', '400', '700'],
   display: 'swap', 
   })
 
const Layout = ({children}: {
  children: React.ReactNode;
}) => {
   
  return (
   
<div className={noko.className}>  
  {children} 
</div>
 )
}

export default Layout
