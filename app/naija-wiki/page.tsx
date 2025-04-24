import Main from '@/components/NaijaWiki/Main'  
import { netflixNews } from '../netflix-naija/netflix-news'
import StructuredData from '@/components/StructuredData';
import { BlogPosting, NewsArticle,  WebPage,  WithContext } from 'schema-dts';
import { createClient } from '@/utils/supabase/server';
import { newchars } from './newCharHandle';

const NaijaWikiPage =async () => {  
  const netflix_News = await netflixNews()  
const jsonLd:WithContext<BlogPosting>={
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Culturays - Covering News in Nigeria, Africa, and Beyond",
  "description": "This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.",
  "url": "https://culturays.com/naija-wiki",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://culturays.com/naija-wiki"
  },
  "inLanguage": "en",
  "image": {
    "@type": "ImageObject",
    "url": "https://culturays.com/opengraph-image.png"
  },
  "datePublished": "2025-04-15T08:00:00Z",
  "dateModified": "2025-04-15T08:00:00Z",
  "author": {
    "@type": "Organization",
    "name": "Culturays"
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
const naija_wiki =async ()=>{  
        const supabase =await createClient() 
        const { data:cinemaTitles , error } = await supabase 
        .from('cinema_titles')
        .select('*') 
        if(error)throw new Error('An Error has occured!')
     return cinemaTitles   
          
        }
        const cinemaTitles=await naija_wiki()
        const newChars = await newchars()
return (
<div>
 <StructuredData schema={jsonLd} />
 <Main netflix_News={netflix_News} 
 cinemaTitles={cinemaTitles}
 newChars={newChars} /> 
 </div>
  )
}

export default NaijaWikiPage