import ComingToNetflixNaija from "@/components/NetflixNaija/NetflixNaijaComing/ComingToNetflixNaija"
import { netflixNews, newsbyComingtoCategory } from "../netflix-news"  
import { NewsArticle, WithContext } from "schema-dts"
import StructuredData from "@/components/StructuredData"
 
const ComingToNetflixNaijaPage = async() => {
const coming_to_netflix_naija = await newsbyComingtoCategory([]) 
const netflixNaija=coming_to_netflix_naija.map((xy:{node:{naijaOnNetflix:{edges:[]} }})=> xy.node.naijaOnNetflix.edges).flat()
const category_children=coming_to_netflix_naija.map((ex:{node:{children:{edges:[]} }})=> ex.node.children.edges).flat()
const coming_to_netflix_class= category_children.filter((ex:{node:{slug:string}})=> ex.node.slug==='coming-to-netflix-class').map((fx:{node:{naijaOnNetflix:{edges:[]}} })=> fx.node.naijaOnNetflix.edges).flat()  
const coming_to_netflix_category =category_children.filter((ex:{node:{slug:string}})=> ex.node.slug==='category-coming-to-netflix').map((fx:{node:{naijaOnNetflix:{edges:[]}} })=> fx.node.naijaOnNetflix.edges).flat() 
const netflix_news_data = await netflixNews()
const coming_to_netflix_grouped =netflixNaija.concat(coming_to_netflix_class).concat(coming_to_netflix_category) 
 
const jsonLd: WithContext<NewsArticle>= {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  name:"What's Coming to Netflix Naija",
  headline:"What's Coming to Netflix Naija",
  description:"All titles Coming to Netflix Naija weekly, monthly and yearly are first published here. The best of Netflix Naija News and movies are all available.",
  author: {
    '@type': 'Person',
    name: 'Christina Ngene',
    url:'https://culturays.com/creator/christina-ngene/',
  },
  datePublished:new Date().toDateString(),
  dateModified:new Date().toDateString(),
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://culturays.com/netflix-naija/coming-to-netflix/',
  },
  url:'https://culturays.com/netflix-naija/coming-to-netflix/', 
  image: coming_to_netflix_grouped[0].featuredImage?.node?.sourceUrl,
  publisher: {
    '@type': 'Organization',
    name: 'Christina Ngene',
    logo: {
      '@type': 'ImageObject',
      url: 'https://culturays.com/culturays-no-bg.png',
    },
  },
  keywords:'Netflix Naija'
};

  return (
   <div>
    <StructuredData schema={jsonLd} />
 <ComingToNetflixNaija  
  netflix_news_data={netflix_news_data}
 coming_to_netflix_naija=
 {coming_to_netflix_naija} 
 coming_to_netflix_grouped={coming_to_netflix_grouped}
 />  
    </div>
  )
}

export default ComingToNetflixNaijaPage

 
  
