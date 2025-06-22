import ToNetflixDetails from "@/components/NetflixNaija/NetflixNaijaComing/ComingToNetflixDetails"
import {netflixDetails, netflixNews, newsbyComingtoCategory} from "../../netflix-news" 
import CategoryComingDetails from "@/components/NetflixNaija/NetflixNaijaComing/CategoryComingDetails"
import ComingToNetflixClassDetails from "@/components/NetflixNaija/NetflixNaijaComing/ComingToNetflixClassDetails"
import StructuredData from "@/components/StructuredData"
import { NewsArticle, WithContext } from "schema-dts"
 
export async function generateMetadata({ params }: {
  params: Promise<{ slug: string }>
}, parent:any) { 
  const {slug} =await params 
  const news_details = await netflixDetails(slug)  
  const previousImages = (await parent).openGraph?.images || []
  const tags= news_details.contentTags.nodes.map((ex:{name:string})=>ex.name).join(', ')

  return {
    title:`Urban Naija | Netflix Naija News - ${news_details?.title}`,
    keywords:tags,
    description:news_details?.excerpt,
    twitter: {
      card: 'summary_large_image',
      title: news_details?.title  ,
      description: news_details?.excerpt ,  
      images:[news_details?.featuredImage.node.sourceUrl, ...previousImages],  
    },
    openGraph: {  
      images: [news_details?.featuredImage.node.sourceUrl, ...previousImages],
      type: "article",
      publishedTime:news_details?.date
    },
    alternates: {
    canonical:  `https://culturays.com/netflix-naija/coming-to-netflix/${slug}/`,
 
  }
  }
} 
 async function To_Netflix_Details ({ params }: {
  params: Promise<{ slug: string }> 
}) {
  const {slug} = await params 
const coming_to_netflix_details = await netflixDetails(slug) 
const netflix_news =await netflixNews()
const netflix_related = coming_to_netflix_details?.netflixNewsGroup?.netflixComingRelated?.edges
const exitinginrelated= netflix_related?.map((fx:{cursor:string})=>fx.cursor)??[] 
const coming_to_netflix_naija = await newsbyComingtoCategory(exitinginrelated?.concat(coming_to_netflix_details.id).flat())  
const tags= coming_to_netflix_details.contentTags.nodes.map((ex:{name:string})=>ex.name).join(', ')
const replaceHTMLTags=(string:string)=>{
  const regex = /(<([^>]+)>)/gi;
  const newString = string?.replace(regex, "");
  return newString
   }
const jsonLd:WithContext<NewsArticle> = {
 '@context': 'https://schema.org',
 '@type': 'NewsArticle',
 name:coming_to_netflix_details?.title, 
 headline:coming_to_netflix_details?.title, 
  description:replaceHTMLTags( coming_to_netflix_details?.excerpt),
  author: {
    "@type": "Person",
    name: "Christina Ngene",
    url:'https://culturays.com/creator/christina-ngene/',
  }, 
  datePublished: new Date(coming_to_netflix_details?.date).toDateString(), 
  dateModified:new Date(coming_to_netflix_details?.date).toDateString(), 
   mainEntityOfPage: {
    "@type": "WebPage",
    "@id": coming_to_netflix_details?.slug,
  },
  url:coming_to_netflix_details?.slug,
  image: coming_to_netflix_details?.featuredImage.node.sourceUrl ,
  publisher: {
    "@type": "Organization",
    name: "Christina Ngene",
    logo: {
      "@type": "ImageObject",
      url: "https://culturays.com/assets/images/culturays-no-bg.png",
    },
  },
   
  keywords:tags,   
};
 
   return ( 
     <div>  
   <StructuredData schema={jsonLd} />
       {coming_to_netflix_details.netflixCategories.nodes[0].slug ==="coming-to-netflix" ?
     <ToNetflixDetails
    netflix_news={netflix_news}
    coming_to_netflix_details={coming_to_netflix_details}
    coming_to_netflix_naija={coming_to_netflix_naija}
    netflix_related={netflix_related}
   
    />:coming_to_netflix_details.netflixCategories.nodes[0].slug ==="category-coming-to-netflix" ?(
    <CategoryComingDetails
    netflix_news={netflix_news}
    coming_to_netflix_details={coming_to_netflix_details}
    coming_to_netflix_naija={coming_to_netflix_naija}
    netflix_related={netflix_related}
    />
    ):coming_to_netflix_details.netflixCategories.nodes[0].slug ==="coming-to-netflix-class"?(
     <ComingToNetflixClassDetails
     netflix_news={netflix_news}
     coming_to_netflix_details={coming_to_netflix_details}
     coming_to_netflix_naija={coming_to_netflix_naija}
     netflix_related={netflix_related}
     />
    ): (
  <></>)
  } 
  </div>
   )
 }


 export default To_Netflix_Details