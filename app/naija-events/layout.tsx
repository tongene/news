import NewsLetter from "@/components/NewsLetter";
 
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/naija-events/` 
  : "http://localhost:3000/naija-events/";

export const metadata = {
  metadataBase: new URL('https://culturays.com'),
  title: "Culturays — The Urban Naija News | Naija Events",
  description: "Find details of all relevant events, conferences and summits happening throughout Nigeria yearly. From tech to entertainment and everything necessary to forward that career.",
  alternates: {
    canonical: 'https://culturays.com/naija-events',
  
  },
  openGraph: {
    title: 'Culturays — The Urban Naija News | Naija Events',    
      
  } 
}; 
 
const Layout = ({children}: {
  children: React.ReactNode 
}) => {
  
  return (  

    <div> 
{children} 

<div className="flex p-8 lg:px-32"> 
<NewsLetter/>  
</div> 
    </div>
 )
}

export default Layout
