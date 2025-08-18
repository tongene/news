 
import SideBar from "@/components/Side" 
import ArticleDetail from "@/components/News/ArticleDetail" 
import type { Metadata, ResolvingMetadata } from 'next' 
import { NewsArticle, WithContext } from "schema-dts";
import StructuredData from "@/components/StructuredData";
import { InnerEdges } from "@/app/types";
import NewsDetail from "@/components/NewsDetail"; 
 
const CULTURAYS_CONTENT_WP = process.env.CULTURAYS_WP
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
async function news_details_all(uri:string){ 
const wprest = fetch('https://content.culturays.com/graphql',{
method: 'POST', 
headers:{
'Content-Type':'application/json'
},
body: JSON.stringify({
query:`
query NODE($id: ID!, $idType: ContentNodeIdTypeEnum!) {
contentNode(id: $id, idType: $idType) {  
    id
    uri 
    contentTypeName 
     __typename
 ... on Post {
      id
      title
      slug
      excerpt
      content
         postnewsgroup { 
       heroImage {
        node {
          altText
          caption
          sourceUrl
        }
      } 
  relatedPosts {
  edges{
  cursor
  node {
  ... on Post {
  id
  content  
  title
   slug
   date
   content 
   excerpt
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
     sourceUrl
       altText
      }
   } 
     tags{
      nodes{
       id
      name
      slug
      }
      }
   categories{
      nodes{
      name
      slug
      }
      }
  }
   }  } }
   
  }
    categories{
      nodes{
      name
      slug
      }
      }
      tags{
                  nodes {
                    name
                    slug
                  }
                }
      
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
          avatar{
          url
          }
        }
      }
    }


      ... on Business {
      id
      title
      slug
      excerpt
      content
      contentTags{
                  nodes {
                    name
                    slug
                  }
                }
      newsGroup {
        related {
          edges {
            node {
              date
              id
              ... on Business {
                id
                content
                title
                slug
                 contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                businessCategories {
                  nodes {
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    altText
                    caption
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
          avatar{
          url
          }
        }
      }
    }
    ... on Award {
      id
      title
      slug
      excerpt
      content
         contentTags{
                  nodes {
                    name
                    slug
                  }
                }
      newsGroup {
        related {
          edges {
            node {
              date
              id
              ... on Award {
                id
                content
                title
                slug
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                awardCategories {
                  nodes {
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    altText
                    caption
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
            avatar{
          url
          }
        }
      }
    }
    ... on Nollywood {
      id
      title
      slug
      excerpt
      content
         contentTags{
                  nodes {
                    name
                    slug
                  }
                }
      newsGroup {
        related {
          edges {
            node {
              date
              id
              ... on Nollywood {
                id
                content
                title
                slug
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                nollywoodCategories {
                  nodes {
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    altText
                    caption
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
            avatar{
          url
          }
        }
      }
    }

    ... on Article {
      id
      title
      slug
      excerpt
      content
         contentTags{
                  nodes {
                    name
                    slug
                  }
                }
      newsGroup {
        related {
          edges {
            node {
              date
              id
              ... on Article {
                id
                content
                title
                slug
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                articlesCategories {
                  nodes {
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    altText
                    caption
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
            avatar{
          url
          }
        }
      }
    }
    ... on Economy {
      id
      title
      slug
      excerpt
      content
         contentTags{
                  nodes {
                    name
                    slug
                  }
                }
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
            avatar{
          url
          }
        }
      }
      newsGroup {
        related {
          edges {
            node {
              date
              id
              ... on Economy {
                id
                content
                title
                slug
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                economyCategories {
                  nodes {
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    altText
                    caption
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
    }
    ... on Environment {
      id
      title
      slug
      excerpt
      content
         contentTags{
                  nodes {
                    name
                    slug
                  }
                }
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
            avatar{
          url
          }
        }
      }
      newsGroup {
        related {
          edges {
            node {
              date
              id
              ... on Environment {
                id
                content
                title
                slug
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                environmentCategories {
                  nodes {
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    altText
                    caption
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
    }
    ... on Society {
      id
      title
      slug
      excerpt
      content
         contentTags{
                  nodes {
                    name
                    slug
                  }
                }
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
            avatar{
          url
          }
        }
      }
      newsGroup {
        related {
          edges {
            node {
              date
              id
              ... on Society {
                id
                content
                title
                slug
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                societyCategories {
                  nodes {
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    altText
                    caption
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
    }
    ... on Health {
      id
      title
      slug
      excerpt
      content
         contentTags{
                  nodes {
                    name
                    slug
                  }
                }
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
            avatar{
          url
          }
        }
      }
      newsGroup {
        related {
          edges {
            node {
              date
              id
              ... on Health {
                id
                content
                title
                slug
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                healthCategories {
                  nodes {
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    altText
                    caption
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
    }
    ... on Technology {
      id
      title
      slug
      excerpt
      content
         contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                     techCategories {
                  nodes {
                    name
                    slug
                  }
                }
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
          avatar{
          url
          }
        }
      }
      newsGroup {
        related {
          edges {
            node {
              date
              id
              ... on Technology {
                id
                content
                title
                slug
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                      techCategories {
                  nodes {
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    altText
                    caption
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
    } 

  }
}   
` ,
variables:{
id: uri,
idType: 'URI' 
}

})

}).then(response => response.json())    
.then(data => data.data.contentNode) 
       .catch(error => console.error('Error:', error)); 
      //const response = wprest?.data.contentNode
      return wprest
 
}
const readNextContent = async(notIn:string[])=>{ 
  
  const wprest = fetch('https://content.culturays.com/graphql',{
    method: 'POST',
    headers:{ 
    'Content-Type':'application/json'
    },
    body: JSON.stringify({
      query: 
      `query NEXTCONTENT($notIn:[ID]){
  contentNodes(first:50, where: {notIn:$notIn}){
 nodes {
    ... on Article {
      id
      title
      slug
      date
      contentTypeName
      contentTags {
        nodes {
          name
          slug
        }
      }
      author {
        node {
          name
          slug
        }
      }
    }
    ... on Award {
      id
      title
      slug
      date
      contentTypeName
      contentTags {
        nodes {
          name
          slug
        }
      }
      author {
        node {
          name
          slug
        }
      }
    }
    ... on Business {
      id
      title
      slug
      date
      contentTypeName
      contentTags {
        nodes {
          name
          slug
        }
      }
      author {
        node {
          name
          slug
        }
   }   }
      ... on Economy {
        id
        title
        slug
        date
        contentTypeName
        contentTags {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
            slug
          }
        }
      }
      ... on Technology {
        id
        title
        slug
        date
        contentTypeName
        contentTags {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
            slug
          }
        }
      }
      ... on Health {
        id
        title
        slug
        date
        contentTypeName
        contentTags {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
            slug
          }
        }
      }
      ... on Society {
        id
        title
        slug
        date
        contentTypeName
        contentTags {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
            slug
          }
        }
      }
      ... on Environment {
        id
        title
        slug
        date
        contentTypeName
        contentTags {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
            slug
          }
        }
      }
      ... on Nollywood {
        id
        title
        slug
        date
        contentTypeName
        contentTags {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
            slug
          }
        }
      }
    
    
  }
}
  }`, variables:{notIn:notIn}
  })
    
    }).then(response => response.json())   
    .then(data => data.data.contentNodes.nodes )
    .catch(error => console.error('Error:', error));
 //  const response = wprest?.data.contentNodes.nodes 
  return wprest
} 


const readNextPosts = async(notIn:string[])=>{  
  const wprest = fetch('https://content.culturays.com/graphql',{
    method: 'POST',
    headers:{ 
    'Content-Type':'application/json'
    },
    body: JSON.stringify({
      query: `query NEXTCONTENT($notIn:[ID]) {
     contentNodes(where: {notIn:$notIn}){
 nodes {  
      ... on Post {
        id
        title
        slug
        date
        tags {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
            slug
          }
        }
      }
    
  }
}
  }`, variables:{
    notIn:notIn
  }
 })
    
    }).then(response => response.json())   
    .then(data => data.data.contentNodes.nodes )
    .catch(error => console.error('Error:', error));
 //  const response = wprest?.data.contentNodes.nodes 
  return wprest
} 
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata 
): Promise<Metadata> {  
  const slug =(await params).slug 
  async function resolveContent(slug: string) {
  for (const type of ["article", "business", "economy", "nollywood", "award", "technology", "health", "society","environment"]) {
    const res = await news_details_all(`${CULTURAYS_CONTENT_WP}/${type}/${slug}/`);
    if (res?.title) {
      return { ...res, __typename: type };
    }
  }
  return null;
}
 const newsXdetail = await resolveContent(slug[0]); 
  const news_details= await news_details_all(`${CULTURAYS_CONTENT_WP}/${slug[0]}/`)
  const previousImages = (await parent).openGraph?.images || []
  const tags= news_details?.tags?.nodes.map((ex:{name:string})=>ex.name).join(', ')
  const keyTags= newsXdetail?.contentTags?.nodes.map((ex:{name:string})=>ex.name).join(', ')
  return !newsXdetail?{
    title: `Urban Naija | ${news_details?.title}`,
    description:news_details?.excerpt,
    keywords:tags,
    twitter: {
      card: 'summary_large_image',
      title: news_details?.title  ,
      description: news_details?.excerpt ,  
      images:[news_details?.featuredImage?.node?.sourceUrl, ...previousImages],  
    },
     openGraph: {
      title: `Urban Naija | ${news_details?.title}`,
      description:news_details?.excerpt, 
      url: `https://culturays.com/news/${news_details?.contentTypeName}/${slug}/`,
      siteName: 'Urban Naija',
      images: [{url:news_details?.featuredImage?.node?.sourceUrl, width: 800,
          height: 600, ...previousImages}],
      type: "article",
      publishedTime:news_details?.date,
    },
     alternates: {
    canonical:  `https://culturays.com/news/${news_details?.contentTypeName}/${slug}/`,
 
  },
  }: {
    title: `Urban Naija | ${newsXdetail?.title}`,
    description:newsXdetail?.excerpt,
    keywords:keyTags,
    twitter: {
      card: 'summary_large_image',
      title: newsXdetail?.title  ,
      description: newsXdetail?.excerpt ,  
      images:[newsXdetail?.featuredImage?.node?.sourceUrl, ...previousImages],  
    },
     openGraph: {
      title: `Urban Naija | ${newsXdetail?.title}`,
      description:newsXdetail?.excerpt, 
      url: `https://culturays.com/news/${newsXdetail?.contentTypeName}/${slug}/`,
      siteName: 'Urban Naija',
      images: [{url:newsXdetail?.featuredImage?.node?.sourceUrl, width: 800,
          height: 600, ...previousImages}],
      type: "article",
      publishedTime:newsXdetail?.date,
    },
     alternates: {
    canonical:  `https://culturays.com/news/${newsXdetail?.contentTypeName}/${slug}/`,
 
  },
  }
} 
 
const ArticleDetailPage = async ({params}: Props) => {
const slug =(await params).slug  
async function resolveContent(slug: string) {
  for (const type of ["article", "business", "economy", "nollywood", "award", "technology", "health", "society","environment"]) { 
    const res = await news_details_all(`${CULTURAYS_CONTENT_WP}/${type}/${slug}/`);
    if (res?.title) {
      return { ...res, __typename: type };
    }
  }
  return null;
}
const newsXdetail = await resolveContent(slug[0]); 
const news_detail= await news_details_all(`${CULTURAYS_CONTENT_WP}/${slug[0]}/`)
const news_related = newsXdetail?.newsGroup?.related?.edges.map((tx:{node:{id:string}})=> tx.node.id)

const sidebarItems=await sidePlusViews()
const txPlus=sidebarItems.posts?.edges.map((dy:InnerEdges)=>dy.node)       
const news_outline=await postsOutline()     

   const tags= news_detail?.contentTags?.nodes.map((ex:{name:string})=>ex.name).join(', ')
    const keyTags= newsXdetail?.contentTags?.nodes.map((ex:{name:string})=>ex.name).join(', ')
   const replaceHTMLTags=(string:string)=>{
    const regex = /(<([^>]+)>)/gi;
    const newString = string?.replace(regex, "");
    return newString
     }
   const jsonLd:WithContext<NewsArticle> = {
     '@context': 'https://schema.org',
     '@type': 'NewsArticle',
      name: news_detail?.title||newsXdetail?.title,
      headline:news_detail?.title||newsXdetail?.title, 
      description:replaceHTMLTags(news_detail?.excerpt||newsXdetail?.excerpt) ,
      author: {
        "@type": "Person",
        name: "Christina Ngene",
        url:'https://culturays.com/creator/christina-ngene/',
      }, 
      datePublished: new Date(news_detail?.date||newsXdetail?.date).toDateString(), 
      dateModified: new Date(news_detail?.date||newsXdetail?.date).toDateString(), 
       mainEntityOfPage: {
        "@type": "WebPage",
        "@id": news_detail?.slug||newsXdetail?.slug,
      },
      url:`https://culturays.com/news/${news_detail?.slug}` || `https://culturays.com/news/${newsXdetail?.slug}`, 
      image: news_detail?.featuredImage?.node?.sourceUrl ||newsXdetail?.featuredImage?.node?.sourceUrl,
      publisher: {
        "@type": "Organization",
        name: "Christina Ngene",
        logo: {
          "@type": "ImageObject",
          url: "https://culturays.com/culturays-no-bg.png",
        },
      },
       
      keywords:tags || keyTags,    
      
};
const post_related = news_detail?.postnewsgroup.relatedPosts?.edges
const exitingPosts= post_related?.map((fx:{cursor:string})=>fx.cursor)??[]
const next_top_news = await readNextContent([newsXdetail?.id, news_related, exitingPosts].flat())
const next_x_news = await readNextPosts([news_detail?.id, news_related, exitingPosts].flat())

if(!news_detail &&!newsXdetail)return <p>Content not found.</p>
 
  return (
     <> 
  <StructuredData schema={jsonLd} /> 
  {!newsXdetail&&news_detail&&( 
         <NewsDetail
            post={news_detail}
            next_naija_news={next_x_news}
            sidebarItems={txPlus}
            news_outline={news_outline}  
            />  )}
       {newsXdetail&&!news_detail&&( 
         <div className="bg-gray-50">     
    <div className="lg:flex justify-center m-auto px-4 bg-white" style={{maxWidth:'1450px' }}>
    <ArticleDetail 
      news_detail={newsXdetail} 
      next_top_news={next_top_news}
      />  
       <div className="[&_h2]:dark:text-gray-900 dark:text-gray-900 h-max">
    <SideBar 
       sidebarItems={txPlus}
        news_outline={news_outline} 
        />   
      </div>
      </div>
 </div> )}
 </>  ) 
}

export default ArticleDetailPage
