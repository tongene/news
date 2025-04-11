import Main from '@/components/NaijaWiki/Main'  
import { netflixNews } from '../netflix-naija/netflix-news'
import StructuredData from '@/components/StructuredData';
import { NewsArticle, WebSite, WithContext } from 'schema-dts';

const NaijaWikiPage =async () => {  
  const netflix_News = await netflixNews()
  const replaceHTMLTags=(string:string)=>{
    const regex = /(<([^>]+)>)/gi;
    const newString = string?.replace(regex, "");
    return newString
     } 
     
  const jsonLd: WithContext<NewsArticle>= {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    name:netflix_News[0].title,
    headline:netflix_News[0].title,
    description:replaceHTMLTags(netflix_News[0].excerpt),
    author: {
      '@type': 'Person',
      name: 'Christina Ngene',
      url:'https://culturays.com/creator/christina-ngene',
    },
    datePublished:new Date( netflix_News[0].date).toDateString(),
    dateModified:new Date( netflix_News[0].date).toDateString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://culturays.com/naija-wiki',
    },
    url:'https://culturays.com/naija-wiki/', 
    image: netflix_News[0].featuredImage?.node?.sourceUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Christina Ngene',
      logo: {
        '@type': 'ImageObject',
        url: 'https://culturays.com/assets/images/culturays-no-bg.png',
      },
    },
    keywords:netflix_News[0].contentTags,
  };

return (
<div>
 <StructuredData schema={jsonLd} />
 <Main netflix_News={netflix_News}/> 
 </div>
  )
}

export default NaijaWikiPage