import NewOnNetflixDetails from "@/components/NetflixNaija/NetflixNaijaNew/NewOnNetflixDetails"
import { netflixDetails } from "../../netflix-news"
 
import type { Metadata, ResolvingMetadata } from 'next'
import StructuredData from "@/components/StructuredData"
import { NewsArticle, WithContext } from "schema-dts"
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
    title:`Urban Naija | Netflix News - ${news_details?.title}`,
    description:news_details?.excerpt,
    keywords:tags,
    twitter: {
      card: 'summary_large_image',
      title: news_details?.title  ,
      description: news_details?.excerpt ,  
      images:[news_details?.featuredImage.node.sourceUrl, ...previousImages],  
    },
    openGraph: { 
       title:`Urban Naija | Netflix News - ${news_details?.title}`,
      description:news_details?.excerpt,
      url: `https://culturays.com/netflix-naija/new-on-netflix/${slug}/`,
    siteName: 'Urban Naija',
      images: [{url:news_details?.featuredImage.node.sourceUrl, width: 800,
          height: 600, ...previousImages}],
      type: "article",
      publishedTime:news_details?.date
    },
        alternates: {
    canonical:  `https://culturays.com/netflix-naija/new-on-netflix/${slug}/`,
 
  }
  } 
} 
async function NewNetflixNaijaDetails ({ params }: Props) {
  const slug =(await params).slug
const new_on_details = await netflixDetails(slug)
const tags= new_on_details.contentTags.nodes.map((ex:{name:string})=>ex.name).join(', ')

const replaceHTMLTags=(string:string)=>{
  const regex = /(<([^>]+)>)/gi;
  const newString = string?.replace(regex, "");
  return newString
   }

const jsonLd:WithContext<NewsArticle> = {
 '@context': 'https://schema.org',
 '@type': 'NewsArticle',
 name:new_on_details?.title, 
  headline:new_on_details?.title, 
  description:replaceHTMLTags(new_on_details?.excerpt) ,
  author: {
    "@type": "Person",
    name: "Christina Ngene",
    url:'https://culturays.com/creator/christina-ngene/',

  }, 
  datePublished:new Date(new_on_details?.date).toDateString(), 
  dateModified:new Date(new_on_details?.date).toDateString(), 
   mainEntityOfPage: {
    "@type": "WebPage",
    "@id": new_on_details?.slug,
  },
  url:new_on_details?.slug,
  image: new_on_details?.featuredImage.node.sourceUrl ,
  publisher: {
    "@type": "Organization",
    name: "Christina Ngene",
    logo: {
      "@type": "ImageObject",
      url: "https://culturays.com/culturays-no-bg.png",
    },
  },
   
  keywords:tags,   
};

return (
    <div> 
      <StructuredData schema={jsonLd} />
  {new_on_details.netflixCategories.nodes[0].slug ==="new-on-netflix"?
      <NewOnNetflixDetails  
      new_on_details={new_on_details}  
      /> :<></> 
      } 
 </div>
  )
}


export default NewNetflixNaijaDetails
 