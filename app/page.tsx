import Main from "@/components/Main";    
import MainSlider from "@/components/MainSlider";   
import StructuredData from "@/components/StructuredData";   
import { Suspense } from "react"; 
import { WebSite, WithContext } from "schema-dts";   
const Home=async() =>{ 

function toIsoDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
  return new Date().toDateString();
  }
  return d.toISOString();
}
  const jsonLd:WithContext<WebSite>={
    "@context": "https://schema.org",
    "name":"Urban Naija",
    "@type": "WebSite",
    "alternateName": "Urban Naija News",
    "headline": "Urban Naija News- Covering News in Nigeria, Africa, and Beyond",
    "description": "This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.",
    "url": "https://culturays.com/",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://culturays.com/"
    },
    "inLanguage": "en",
    "image": {
      "@type": "ImageObject",
      "url": "https://culturays.com/opengraph-image.png"
    },
    "datePublished":toIsoDate(new Date().toDateString()) ,
    "dateModified": toIsoDate(new Date().toDateString()),
    "author": {
      "@type": "Organization",
      "name": "Culturays"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ngenet Studio",
      "url": "https://www.culturays.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://culturays.com/culturays-no-bg.png"
      }
    }
  }
  


return (
  <div>
     <StructuredData schema={jsonLd} />  
    
   {/* <Suspense fallback={<div>Loading ...</div>}> */}
   <MainSlider/> 
  <Main />{" "} 
    {/* </Suspense>   */}
  </div>
); 
}
export default Home

