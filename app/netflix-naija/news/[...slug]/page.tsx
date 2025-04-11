import NaijaWikiNetflixNewsDetails from "@/components/NetflixNaija/NaijaWikiNetflixNewsDetails" 
import { netflixNewsDets, nextNetflixNews } from "../../netflix-news"  
import SideBar from "@/components/Side" 
import { postsOutline, sidePlusViews } from "@/app/page-data";
import { createClient } from "@/utils/supabase/server";
import { getTop10 } from "@/app/naija-wiki/filmsdata";
import StructuredData from "@/components/StructuredData";
import { NewsArticle, WithContext } from "schema-dts";
const vids = async()=>{  
 
  const wprest = fetch('https://content.culturays.com/graphql',{
    method: 'POST',
    headers:{ 
    'Content-Type':'application/json'
    },
    body: JSON.stringify({
      query: `
       query WPVIDEOS {
      videos { 
    nodes {
      videosGroup {
        videoUrl {
          node {
            title
            slug
            mediaItemUrl
            date
            altText
          }
        }
          related{
          nodes{
          ... on Video{
          id
           title
          slug
          }
         
          }
          }
      }
      content 
      date
      excerpt
      slug
      title
        contentTags{
         nodes{
         slug
         name
         }
         
         } 
         videoCategories{
         nodes{
         slug
         name
         }
         
         }   
      featuredImage{
      node{
      sourceUrl
      altText
      }
      
      }
    }
  }
    }
    `
    })
 
    }) 
    .then(response => response.json())   
    .then(data => data.data.videos.nodes)
    .catch(error => console.error('Error:', error));
   // const response = wprest?.data.videos.nodes 
    return wprest 
 
  }
export async function generateMetadata({ params  }: {
  params: Promise<{ slug: string }>
}, parent:any) { 
  const {slug} =await params 
  const news_details = await netflixNewsDets(slug[0]) 
  const previousImages = (await parent).openGraph?.images || []
  const tags= news_details.contentTags.nodes.map((ex:{name:string})=>ex.name).join(', ')
   
  return {
    title:`Culturays | Naija Wiki News- ${news_details?.title}`,
    description: news_details?.title,
    keywords:tags,
    twitter: {
      card: 'summary_large_image',
      title: news_details?.title,
      description:news_details?.excerpt,    
      images:  [news_details?.featuredImage.node.sourceUrl, ...previousImages],
    },    
    
    openGraph: { 
      images: [news_details?.featuredImage.node.sourceUrl, ...previousImages],
      type: "article",
      publishedTime:news_details?.date
    },
  }
} 
 
const NetflixNaijaNewsDetailsPage = async({params}: {
  params: Promise<{ slug: string }>
},) => {
const {slug} =await params 
const news_details = await netflixNewsDets(slug[0])
const content_videos = await vids();
 const netflix_related =news_details.netflixNewsGroup.netflixNewsRelated?.edges 
 const exitinginrelated= netflix_related?.map((fx:{cursor:string})=>fx.cursor)
 const next_on_netflix_naija = await nextNetflixNews([news_details.id, exitinginrelated].flat())
  const sidebarItems=await sidePlusViews()       
      const news_outline=await postsOutline()
      const naija_wiki =async ()=>{  
       const supabase =await createClient() 
       const { data:cinema_titles , error } = await supabase 
       .from('cinema_titles') 
       .select('*')
       if(error)throw new Error('An Error has occured!')
 return cinema_titles
           
       }   
  const xTitltes= await naija_wiki()
    const coming_titles= xTitltes?.filter((ex)=> ex.genre?.includes('Coming Soon'))  
    const tags= news_details.contentTags.nodes.map((ex:{name:string})=>ex.name).join(', ')
    const replaceHTMLTags=(string:string)=>{
      const regex = /(<([^>]+)>)/gi;
      const newString = string?.replace(regex, "");
      return newString
       }
  const jsonLd:WithContext<NewsArticle> = {
   '@context': 'https://schema.org',
   '@type': 'NewsArticle',
    name: news_details.title,
    headline: news_details.title, 
    description:replaceHTMLTags(news_details?.excerpt) ,
    author: {
      "@type": "Person",
      name: "Christina Ngene",
      url:'https://culturays.com/creator/christina-ngene',

    }, 
    datePublished:new Date(news_details?.date).toDateString(), 
    dateModified: new Date(news_details?.date).toDateString(), 
     mainEntityOfPage: {
      "@type": "WebPage",
      "@id": news_details?.slug,
    },
    url:news_details?.slug,
    image: news_details?.featuredImage.node.sourceUrl ,
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
  <>
  <StructuredData schema={jsonLd} />
    <div className="2xl:flex justify-center m-auto px-4 bg-white">
      
      {news_details.netflixCategories.nodes[0].slug ==="news"?
      <NaijaWikiNetflixNewsDetails
    news_details={news_details}
    content_videos={content_videos}
   next_on_netflix_naija={next_on_netflix_naija}
    /> :<></> } 
    
        <div className="[&_.summary-side]:dark:text-gray-900 h-max dark:text-gray-900 [&_div]:lg:m-auto">
      <SideBar sidebarItems={sidebarItems}
news_outline={news_outline} coming_titles={coming_titles}/> 
      </div>
    </div>
 </>  )
}

export default NetflixNaijaNewsDetailsPage
