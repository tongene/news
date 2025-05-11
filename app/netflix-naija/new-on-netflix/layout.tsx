
import { Open_Sans, Nokora } from 'next/font/google'; 

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
? `${process.env.NEXT_PUBLIC_BASE_URL}/netflix-naija/new-on-netflix` 
: "http://localhost:3000/netflix-naija/new-on-netflix";
 
export const metadata = {
metadataBase: new URL(defaultUrl), 
title:"Urban News | New on Netflix Naija",  
description: "All titles on Netflix Naija weekly, monthly and yearly are first published here. The best of Netflix Naija News and movies are all available.",
openGraph: {
  title:  "Urban News | Netflix Naija News, What's New on Netflix",    
    
}
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
    
<div className={noko.className}>  
  {children} 
{/* <Latests/>  */}
</div>
 )
}

export default Layout
