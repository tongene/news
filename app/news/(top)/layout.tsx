 
import NewsLetter from "@/components/NewsLetter"; 
 
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
