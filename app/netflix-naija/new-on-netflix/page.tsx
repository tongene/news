 
 
import NewlyRealeasedNetflixNaija from "@/components/NetflixNaija/NetflixNaijaNew/NewlyReleasedNetflixNaija"
import { addedOnCategory, netflixNews, newsbyNewOnCategory } from "../netflix-news"   
import StructuredData from "@/components/StructuredData"
import { NewsArticle, WithContext } from "schema-dts"
async function New_On_Netflix() {
 const new_on_netflix_naija = await newsbyNewOnCategory([])
 const added_on_netflix_naija =await addedOnCategory()
  const netflix_news_data = await netflixNews() 
 const made_in_africa = added_on_netflix_naija.addedCategories.edges.filter((xy:{node:{name:string}})=> xy?.node.name === 'Made in Africa').flat()
 const non_africa = added_on_netflix_naija.addedCategories.edges.filter((xy:{node:{name:string}})=> xy?.node.name !== 'Made in Africa').flat()
 const netflixNaija=new_on_netflix_naija.map((xy:{node:{naijaOnNetflix:{edges:[]}}})=> xy.node.naijaOnNetflix.edges).flat()
 
 const jsonLd: WithContext<NewsArticle>= {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  name:'New on Netflix Naija',
  headline:'New on Netflix Naija',
  description:"All titles on Netflix Naija weekly, monthly and yearly are first published here. The best of Netflix Naija News and movies are all available.",
  author: {
    '@type': 'Person',
    name: 'Christina Ngene',
    url:'https://culturays.com/creator/christina-ngene/',
  },
  datePublished:new Date().toDateString(),
  dateModified:new Date().toDateString(),
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://culturays.com/netflix-naija/new-on-netflix/',
  },
  url:'https://culturays.com/netflix-naija/new-on-netflix/', 
  image: netflixNaija[0].featuredImage?.node?.sourceUrl,
  publisher: {
    '@type': 'Organization',
    name: 'Christina Ngene',
    logo: {
      '@type': 'ImageObject',
      url: 'https://culturays.com/culturays-no-bg.png',
    },
  },
  keywords:'Netflix Naija',
};

 return (      
  <> 
   <StructuredData schema={jsonLd} />
  <NewlyRealeasedNetflixNaija
 netflix_news_data={netflix_news_data}
  added_on_netflix_naija={added_on_netflix_naija}
  new_on_netflix_naija={new_on_netflix_naija} 
  made_in_africa={made_in_africa}
  non_africa={non_africa}
  />   
 </>
  )
}
 
export default New_On_Netflix
 
 