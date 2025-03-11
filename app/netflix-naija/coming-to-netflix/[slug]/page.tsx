import ToNetflixDetails from "@/components/NetflixNaija/NetflixNaijaComing/ComingToNetflixDetails"
import {netflixDetails, netflixNews, newsbyComingtoCategory} from "../../netflix-news" 
import CategoryComingDetails from "@/components/NetflixNaija/NetflixNaijaComing/CategoryComingDetails"
import ComingToNetflixClassDetails from "@/components/NetflixNaija/NetflixNaijaComing/ComingToNetflixClassDetails"
 
export async function generateMetadata({ params }: {
  params: Promise<{ slug: string }>
}, parent:any) { 
  const {slug} =await params 
  const news_details = await netflixDetails(slug)  
  const previousImages = (await parent).openGraph?.images || []
   
  return {
    title:`Culturays | Netflix Naija News - ${news_details?.title}`,
    openGraph: {  
      images: [news_details?.featuredImage.node.sourceUrl],
    },
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

   return ( 
     <div>  
  
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