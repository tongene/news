
import { Open_Sans, Nokora } from 'next/font/google';  

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
? `${process.env.NEXT_PUBLIC_BASE_URL}/netflix-naija/coming-to-netflix/` 
: "http://localhost:3000/netflix-naija/coming-to-netflix/";
 
export const metadata = {
metadataBase: new URL(defaultUrl), 
title:"Urban News | Coming to Netflix Naija",  
description: "All titles Coming to Netflix Naija weekly, monthly and yearly are first published here. The best of Netflix Naija News and movies are all available.",
openGraph: {
  title:  "Urban News | Netflix Naija, News, What's Coming to Netflix",    
    
},
 alternates: {
    canonical:  `https://culturays.com/netflix-naija/coming-to-netflix/`,
 
  }
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
