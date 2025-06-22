import NewsLetter from "@/components/NewsLetter";
import Top10 from "@/components/Top10El"; 
 
// import '@styles/globals.css'
// import '@styles/events.css'
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/naija-events/` 
  : "http://localhost:3000/naija-events/";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Urban News| Naija Events",
  description: "Find details of all relevant events, conferences and summits happening throughout Nigeria yearly. From tech to entertainment and everything necessary to forward that career.",
  alternates: {
    canonical: 'https://culturays.com/naija-events/',
  
  },
  openGraph: {
    title: 'Urban News | Naija Events',    
      
  } 
}; 
 
const Layout = ({children}: {
  children: React.ReactNode 
}) => {
  
  return (  

    <div> 
{children} 
<Top10 />  
<div className="flex p-8 lg:px-32"> 
<NewsLetter/>  
</div> 
    </div>
 )
}

export default Layout
