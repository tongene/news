const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/nigeria/industry/` 
  : "http://localhost:3000/nigeria/industry";

export const metadata = {
 metadataBase: new URL('https://culturays.com'),
  title: "Nigeria’s Manufacturing Industry | Full Resource Hub",
  description:'Explore Nigeria’s industrial base with deep-dives on Aba, outsourcing to China, trade policies, and local manufacturing solutions.',
  alternates: {
    canonical: 'https://culturays.com/nigeria',
 
  },
  openGraph: {
    title: 'Culturays — The Urban Naija News | News in Nigeria, Business, Economy, Nollywood, Netflix Naija', 
    url: 'https://culturays.com/nigeria', 
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
