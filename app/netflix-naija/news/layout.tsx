  
import Top10 from '@/components/Top10El';

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
? `${process.env.NEXT_PUBLIC_BASE_URL}/naija-wiki/` 
: "http://localhost:3000/naija-wiki/";
export const metadata = {
metadataBase: new URL(defaultUrl), 
 title:"Urban News | Netflix Naija",  
description: "All titles Coming to or on Netflix Naija weekly, monthly and yearly are first published here. The best of Netflix Naija News and movies are all available.",
alternates: {
  canonical: 'https://culturays.com/naija-wiki',
 
},
openGraph: {
  title:  "Urban News | Naija Wiki, Netflix Naija News",    
    
}
}; 
const Layout = ({children}: {
  children: React.ReactNode;
}) => {
   
  return (  
<div>  
  {children}
  <Top10 /> 
  {/* <NewsLetter/>  */}
</div>
 )
}

export default Layout
