
import CharacterQuestion from '@/components/NaijaWiki/CharacterQuestion';
import { Nokora } from 'next/font/google'; 
 
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
? `${process.env.NEXT_PUBLIC_BASE_URL}/naija-wiki` 
: "http://localhost:3000/naija-wiki";

export const metadata = {
metadataBase: new URL(defaultUrl), 
 title:"Culturays | Naija Wiki",  
description: "Find all the favourite Nollywood movie characters here. This page is dedicated to talking about their personalities, the actors that portrayed them and what makes them special and exciting to fan.",
alternates: {
  canonical: 'https://culturays.com/naija-wiki',

},
}; 
 
  const noko =Nokora({
  subsets:['latin'], 
   weight:['300', '400', '700'],
   display: 'swap', 
   })
 
const Layout = ({children}: {
  children: React.ReactNode;
}) => {
   
  return ( 

<div className={ noko.className }>  
{children}
<div className='relative '> 
<CharacterQuestion/> 
</div>

</div>
 )
}

export default Layout
