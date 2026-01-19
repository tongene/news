 
import SideBar from "@/components/Side" 
import StructuredData from "@/components/StructuredData";
import { NewsArticle, WithContext } from "schema-dts";
import { InnerEdges } from "@/app/types";
import { netflixNewsDets, nextNetflixNews } from "../../netflix-news";
import NaijaWikiNetflixNewsDetails from "../../../components/NaijaWikiNetflixNewsDetails"; 

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
      const replaceHTMLTags=(string:string)=>{
      const regex = /(<([^>]+)>)/gi;
      const newString = string?.replace(regex, "");
      return newString
       }
export async function generateMetadata({ params  }: {
  params: Promise<{ slug: string }>
}, parent:any) { 
  const {slug} =await params 
  const news_details = await netflixNewsDets(slug[0])
  if(!news_details)return 
  const previousImages = (await parent).openGraph?.images || []
  const tags= news_details?.contentTags.nodes.map((ex:{name:string})=>ex.name).join(', ')
   
  return {
    title:`Urban Naija | Naija Wiki News- ${news_details?.title}`,
    description: news_details?.title,
    keywords:tags,
    twitter: {
      card: 'summary_large_image',
      title: news_details?.title,
      description: replaceHTMLTags(news_details?.excerpt),    
      images:  [news_details?.featuredImage.node.sourceUrl, ...previousImages],
    },    
    
    openGraph: {
      title:`Urban Naija | Naija Wiki News- ${news_details?.title}`,
      description: news_details?.title,
      url: `https://culturays.com/netflix-naija/${slug}/`,
      siteName: 'Urban Naija',
      images: [{url:news_details?.featuredImage.node.sourceUrl,
        width: 800,
          height: 600, ...previousImages}],
      type: "article",
      publishedTime:news_details?.date
    },
     alternates: {
    canonical:  `https://culturays.com/netflix-naija/${slug}/`,
 
  }
  }
} 
 
const NetflixNaijaNewsDetailsPage = async({params}: {
  params: Promise<{ slug: string }>
} ) => {
const {slug} =await params 
const news_details = await netflixNewsDets(slug[0])
if(!news_details)return
const content_videos = await vids();
 const netflix_related =news_details?.netflixNewsGroup.netflixNewsRelated?.edges 
 const exitinginrelated= netflix_related?.map((fx:{cursor:string})=>fx.cursor)
 const next_on_netflix_naija = await nextNetflixNews([news_details.id, exitinginrelated].flat())
  const sidebarItems=await sidePlusViews()  
   const txPlus=sidebarItems.posts?.edges.map((dy:InnerEdges)=>dy.node)    
      const news_outline=await postsOutline()

  //   const coming_titles= xTitltes?.filter((ex)=> ex.genre?.includes('Coming Soon'))  
    const tags= news_details?.contentTags.nodes.map((ex:{name:string})=>ex.name).join(', ')

           function toIsoDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    throw new Error(`Invalid date string: ${dateStr}`);
  }
  return d.toISOString(); 
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
      url:'https://culturays.com/creator/christina-ngene/',

    }, 
    datePublished:toIsoDate(news_details?.date), 
    dateModified:toIsoDate(news_details?.date), 
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
        url: "https://culturays.com/culturays-no-bg.png",
      },
    },
     
    keywords:tags,   
  };
  return (
  <>
  <StructuredData schema={jsonLd} />
    <div className="2xl:flex justify-center px-4 bg-white">
      
      {news_details.netflixCategories.nodes[0].slug ==="news"?
      <NaijaWikiNetflixNewsDetails
    news_details={news_details}
    content_videos={content_videos}
   next_on_netflix_naija={next_on_netflix_naija}
    /> :<></> } 
    
        <div className="[&_.summary-side]:dark:text-gray-900 h-max dark:text-gray-900 [&_div]:lg:m-auto">
      <SideBar  
      sideBarPlus={txPlus}
      outlinePlus={news_outline} /> 
      </div>
    </div>
 </>  )
}

export default NetflixNaijaNewsDetailsPage
