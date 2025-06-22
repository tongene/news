 
import React, { ReactNode } from "react"; 
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/forum/` 
  : "http://localhost:3000/forum/";


export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Forum",
  //title:{absolute:"Forum"},
  description: "Start or join great conversations!!! This platform also allows you to create topics and have discussions on trending societal issues.",
  alternates: {
    canonical: 'https://culturays.com/forum/',
 
  },
  openGraph: { 
    title: 'Urban Naija | Forum, People, Nigeria'   
},

};  
interface Props {
  children?: ReactNode 
}
const Layout = ({children}:Props) => {
  return (  
<div >   
{children}  
</div> 
 )
}

export default Layout
