 
import React, { ReactNode } from "react"; 
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/forum/` 
  : "http://localhost:3000/forum/";


export const metadata = {
  metadataBase: new URL('https://culturays.com'), 
   title:"Forum",
  //title:{absolute:"Forum"},
  description: "Start or join great conversations!!! This platform also allows you to create topics and have discussions on trending societal issues.",
  alternates: {
    canonical: 'https://culturays.com/forum',
 
  },
  openGraph: { 
    title: 'Culturays — The Urban Naija News | Forum, People, Nigeria',
     url: 'https://culturays.com/forum', 
  images: [
  {
  url: '/opengraph-image.jpg',  
  width: 800,
  height: 600,
  alt: 'Culturays — The Urban Naija News Image & Logo',
  },
    {
          url: '/culturays.png', 
          width: 800,
          height: 600,
          alt: 'Culturays — The Urban Naija News Image & Logo',
        },
        {
          url: '/culturays-no-bg.png', 
          width: 800,
          height: 600,
          alt: 'Culturays — The Urban Naija News Image & Logo',
        },
      ],
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
