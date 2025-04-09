import NewOnNetflixDetails from "@/components/NetflixNaija/NetflixNaijaNew/NewOnNetflixDetails"
import { netflixDetails } from "../../netflix-news"
 
import type { Metadata, ResolvingMetadata } from 'next'
const CULTURAYS_CONTENT_WP = process.env.CULTURAYS_WP
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
} 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata 
): Promise<Metadata> { 
  const slug =(await params).slug
  const news_details = await netflixDetails(slug)  
  const previousImages = (await parent).openGraph?.images || [] 
    const tags= news_details.contentTags.nodes.map((ex:{name:string})=>ex.name).join(', ')

  return {
    title:`Culturays | Netflix Naija News - ${news_details?.title}`,
    description:news_details?.excerpt,
    keywords:tags,
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
  } 
} 
async function NewNetflixNaijaDetails ({ params }: Props) {
  const slug =(await params).slug
const new_on_details = await netflixDetails(slug)

return (
    <div> 
  {new_on_details.netflixCategories.nodes[0].slug ==="new-on-netflix"?
      <NewOnNetflixDetails  
      new_on_details={new_on_details}  
      /> :<></> 
      } 
 </div>
  )
}


export default NewNetflixNaijaDetails
 