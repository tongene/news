import NewsLetter from "@/components/NewsLetter"; 
 
export const metadata = { 
  title: "Culturays | Trending",
  description:"Daily news trends on Culturays — Find out what everyone is talking about and what's trending in every region across Nigeria.",
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
