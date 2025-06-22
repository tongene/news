import NewsLetter from "@/components/NewsLetter"; 
 
export const metadata = { 
  title: "Urban News | Trending",
  description:"Daily news trends on Urban News — Find out what everyone is talking about and what's trending in every region across Nigeria.",
  openGraph: {
    title:  'Urban News | Breaking, Nigeria, Trends, Business, Economy, Tech', 
      
  },
   alternates: {
    canonical:  `https://culturays.com/news/trending/`,
 
  }

};
 
const Layout = ({children}: {
  children: React.ReactNode;
}) => {
  return (  
<div> 
{children} 
 <NewsLetter/>  
 
</div>
 
  )
}

export default Layout
