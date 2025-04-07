
import { Open_Sans, Nokora } from 'next/font/google';  
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
? `${process.env.NEXT_PUBLIC_BASE_URL}/live` 
: "http://localhost:3000/live";
 
export const metadata = {
metadataBase: new URL(defaultUrl), 
 title:"Culturays | Live",  
description: "Live News on Culturays.",
alternates: {
  canonical: 'https://culturays.com/live',
 
},
openGraph: {
  title: 'Culturays | Live News, Nigeria',    
    
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
