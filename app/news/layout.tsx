const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/news/` 
  : "http://localhost:3000/news/";

export const metadata = {
  metadataBase: new URL('https://culturays.com'),
  title: "Urban Naija | News",
  description:'This is the medium that caters to the daily needs of legitimate global news. We cover on technology, economics, trade, entertainment, Nollywood, health and society as well as business and environment.',
  alternates: {
    canonical: 'https://culturays.com/news/',
 
  },
  openGraph: {
    title: 'Urban Naija | News in Nigeria, Business, Economy, Nollywood, Netflix Naija', 
      
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
