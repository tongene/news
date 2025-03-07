import AboutUs from "@/components/AboutUs"  
import { usersList } from "../data/usershandle";

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/about` 
  : "http://localhost:3000/about";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"About",  
    
}; 

const AboutUsPage =async () => {
const listedUsers= await usersList()
   return (  
 <AboutUs  
 listedUsers={listedUsers}
/>  

)
}

export default AboutUsPage