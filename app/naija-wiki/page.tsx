import Main from '@/components/NaijaWiki/Main'  
import { netflixNews } from '../netflix-naija/netflix-news'
import StructuredData from '@/components/StructuredData';
import { NewsArticle,  WebPage,  WithContext } from 'schema-dts';

const NaijaWikiPage =async () => {  
  const netflix_News = await netflixNews() 
  const jsonLd:WithContext<WebPage>={
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Culturays",
          "url": "https://culturays.com/naija-wiki",
          "description": "This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.",
          "inLanguage": "en",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Culturays",
            "url": "https://culturays.com/naija-wiki"
          },
          "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": "https://culturays.com/assets/images/opengraph-image.png"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Ngenet Studio",
            "url": "https://www.culturays.com/naija-wiki",
            "logo": {
              "@type": "ImageObject",
              "url": "https://culturays.com/assets/images/culturays-no-bg.png"
            }
          }
        }

return (
<div>
 <StructuredData schema={jsonLd} />
 {/* <Main netflix_News={netflix_News}/>  */}
 <h2>Culturays News</h2>
 </div>
  )
}

export default NaijaWikiPage