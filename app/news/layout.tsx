const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/news` 
  : "http://localhost:3000/news";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Culturays | News",
  description:'This is the medium that caters for the daily need of legitimate global news. We cover news about all technological advancements, economic situations and growth, entertainment, Nollywood, health and societal issues as well as business and environment.',
  alternates: {
    canonical: 'https://culturays.com/news',
 
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
