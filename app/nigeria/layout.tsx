const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/nigeria/industry/` 
  : "http://localhost:3000/nigeria/industry";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Nigeria’s Manufacturing Industry | Full Resource Hub",
  description:'Explore Nigeria’s industrial base with deep-dives on Aba, outsourcing to China, trade policies, and local manufacturing solutions.',
  alternates: {
    canonical: 'https://culturays.com/nigeria/industry/',
 
  },
  openGraph: {
    title: 'Culturays | News in Nigeria, Business, Economy, Nollywood, Netflix Naija', 
      
  }
};
 
const Layout = ({children}: {
  children: React.ReactNode;
}) => {
  return (  
<div> 
{children} 
</div>

  )
}

export default Layout
