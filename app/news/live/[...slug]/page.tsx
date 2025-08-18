import SideBar from "@/components/Side" 
import LiveNews from "@/components/LiveNews" 
import type { Metadata, ResolvingMetadata } from 'next' 
import { Suspense } from "react"  
import { liveNewsFeed } from "../live"
import { NewsArticle, WithContext } from "schema-dts"
import StructuredData from "@/components/StructuredData"
import { InnerEdges } from "@/app/types"
const CULTURAYS_CONTENT_WP = process.env.CULTURAYS_WP

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
    async function sidePlusViews(){
  
           const res= fetch('https://content.culturays.com/graphql',{ 
              method: "POST",
               headers: {
                   'Content-Type':'application/json'
                  },
              body: JSON.stringify({
                query:`
                query WPPOSTS { 
             posts(first: 10, where: {categoryName: "Latest"}) { 
           pageInfo {
        endCursor
      }
         edges{ 
            node{
             
            categories {
                  nodes {
                    name
                    slug
                  }
                } 
       }
          } }} 
               ` 
              
              }) 
            }).then((res) => res.json() )
            .then((data) => data.data ) 
           .catch((err) => console.log("err", err)) 
           const dataView= await res
    const postX = dataView.posts?.pageInfo?.endCursor 
if(!postX)return
      const wpx = fetch('https://content.culturays.com/graphql',{     
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS($after: String) {                  
             posts(first:4 ,after:$after, where: {categoryName: "Latest"}) {
                pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
           } 
        } 
         `, variables:{
          after:postX 
         }
        
        })
        })
        .then(response => response.json() )  
        .then(data => data.data.posts ) 
        .catch(error => console.error('Error:', error));  

    const latestPosts= await wpx  
  const latestStr=latestPosts?.pageInfo?.endCursor 

     const wprest = fetch('https://content.culturays.com/graphql', { 
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS {                  
             posts(first:4 ,after:"${latestStr}", where: {categoryName: "Latest"}) {
                pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
                edges{
               cursor
              node{
               id
                title
                  slug
                  tags {
                    nodes {
                    id
                      name
                      slug
                    }
                  }
                  
                   categories {
                    nodes {
                      name
                      slug
                    }
                  }
                excerpt
                  date
                   author {
                 node {
                firstName
                lastName
                name
                slug
                description
              }
            }
                  featuredImage {
                    node {
                      altText
                      sourceUrl
                    }
                  }
       
         }
           }  } 
        } 
         ` 
        
        })
        , 
        }).then(response => response.json()) 
        .then(data => data.data) 
        .catch(error => console.error('Error:', error)); 
      // const response = wprest?.data?.posts?.edges
   
    return wprest
  } 
     const postsOutline =async()=>{
    
    const wprest = fetch('https://content.culturays.com/graphql',{
           method: 'POST',
           headers:{
               'Content-Type':'application/json'
           },
           body: JSON.stringify({
             query:`
             query OUTLINEPOST{
         outlines(first: 1) {
       nodes {
         content
         featuredImage{
         node{
         sourceUrl
         altText
         }
         }
         outlineGroup {
           outlineVideos {
             node {
               altText
               caption
               date
               title
                mediaItemUrl
               slug
             }
           }
         }
       }
           } } ` 
           
           })
           
           }).then(response => response.json())
           .then(data => data.data?.outlines?.nodes)        
           .catch(error => console.error('Error:', error));
           //const response = wprest?.data?.outlines?.nodes 
           return wprest
  } 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata 
): Promise<Metadata> {  
  const slug=(await params).slug
  const news_details= await liveNewsFeed(slug[0])
  const previousImages = (await parent).openGraph?.images || []
 const tags= news_details.contentTags.nodes.map((ex:{name:string})=>ex.name).join(', ') 

  return {
    title: `Urban Naija | Live News ${news_details?.title||'' } `,
    description:news_details?.excerpt,
    keywords: tags,
     twitter: {
      card: 'summary_large_image',
      title: news_details?.title  ,
      description: news_details?.excerpt ,  
      images:[news_details?.featuredImage.node.sourceUrl, ...previousImages],  
    },
    openGraph: {
      title: `Urban Naija | Live News ${news_details?.title||'' } `, 
       url: `https://culturays.com/news/live/${slug}/`,
      siteName: 'Urban Naija',
      images: [{url:news_details?.featuredImage.node.sourceUrl, width: 800,
       height: 600, ...previousImages}],
      description:news_details?.excerpt,
      type: "article",
      publishedTime: news_details?.date,

    },
     alternates: {
    canonical:  `https://culturays.com/news/live/${slug}/`,
 
  },
  } 
} 

const LiveNewsPage = async ({params}: Props) => {
const slug =(await params).slug
 const news= await liveNewsFeed(slug[0])

  const sidebarItems=await sidePlusViews() 
    const txPlus=sidebarItems.posts?.edges.map((dy:InnerEdges)=>dy.node)   
      const news_outline=await postsOutline()
//       const naija_wiki =async ()=>{  
//        const supabase =await createClient() 
//        const { data:cinema_titles , error } = await supabase 
//        .from('cinema_titles') 
//        .select('*')
//        if(error)throw new Error('An Error has occured!')
//  return cinema_titles
           
//        }   
//   const xTitltes= await naija_wiki()
//     const coming_titles= xTitltes?.filter((ex)=> ex.genre?.includes('Coming Soon')) 
   const tags= news.contentTags.nodes.map((ex:{name:string})=>ex.name).join(', ')
   const replaceHTMLTags=(string:string)=>{
    const regex = /(<([^>]+)>)/gi;
    const newString = string?.replace(regex, "");
    return newString
     }
   const jsonLd:WithContext<NewsArticle> = {
     '@context': 'https://schema.org',
     '@type': 'NewsArticle',
     name:news?.title, 
      headline: news?.title, 
      description: replaceHTMLTags(news?.excerpt) ,
      author: {
        "@type": "Person",
        name: "Christina Ngene",
        url:'https://culturays.com/creator/christina-ngene/',
      }, 
      datePublished: new Date(news?.date).toDateString(), 
      dateModified:  new Date(news?.date).toDateString(), 
       mainEntityOfPage: {
        "@type": "WebPage",
        "@id": news?.slug,
      },
      url:`https://culturays.com/news/live/${news.slug}/`,
      image: news?.featuredImage.node.sourceUrl ,
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
      <>
     <StructuredData schema={jsonLd} />
     {  news?.title&&
    <div className="bg-gray-50">     
    <div className="lg:flex justify-center m-auto px-4 bg-white" style={{maxWidth:'1450px'}}>
        <Suspense><LiveNews 
         news={news}  
      /></Suspense> 
       <div className="[&_.summary-side]:dark:text-gray-900 h-max dark:text-gray-900">
      <SideBar 
      sidebarItems={txPlus}
      news_outline={news_outline} /> 
      </div>
      </div>
 </div>}
  </> ) 
}

export default LiveNewsPage
 
 