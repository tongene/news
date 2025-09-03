  
import { InnerEdges } from "@/app/types";
import NewsDetail from "@/components/NewsDetail" 
import StructuredData from "@/components/StructuredData"; 
import { NewsArticle, WithContext } from "schema-dts";

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
  async function newsDetailData(slug:string){ 
  
  const wprest = fetch('https://content.culturays.com/graphql',{
  method: 'POST', 
  headers:{
  'Content-Type':'application/json' 
  },
  body: JSON.stringify({
  query:`
  query NODE($id: ID!, $idType: PostIdType!) {
  post(id: $id, idType: $idType) {
       author {
      node {
        name
        slug
        avatar{
        url
        }
      }
    }
    content
    date
    excerpt
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
    featuredImage {
      node {
        altText
        sourceUrl
        caption
      }
    }
    id
    slug    
    title
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
  
  } 
    }  
  ` ,
  variables:{
  id: slug,
  idType: 'SLUG' 
  }
  
  })
  
  }).then(response => response.json())
  .then(data => data.data.post)   
         .catch(error => console.error('Error:', error)); 
        // const response = wprest?.data.post
         return wprest
    
  }
const readNextContent = async(notIn:string[])=>{  
    const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{ 
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query: `query NEXTCONTENT($notIn:[ID]) {
       contentNodes(first:50, where: {notIn: $notIn}){
   nodes {
      contentTypeName
      id
      ... on Article {
        id
        title
        slug
        date
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
    }`
    ,variables:{notIn:notIn} })
      
      }).then(response => response.json())   
      .then(data => data.data.contentNodes.nodes )
      .catch(error => console.error('Error:', error));
   //  const response = wprest?.data.contentNodes.nodes 
    return wprest
 
  
  } 


export async function generateMetadata({ params }: {
  params: Promise<{ slug: string }>
}, parent:any) { 
  const {slug} =await params  
  const news_details= await newsDetailData(slug[0])
  const previousImages = (await parent).openGraph?.images || []
  const tags= news_details.tags.nodes.map((ex:{name:string})=>ex.name).join(', ')
   
  return {
    title:`Urban Naija | News - ${news_details?.title}`,
       description:news_details?.excerpt,
      keywords:tags,
       twitter: { 
        title: news_details?.title ,
        description: news_details?.excerpt ,  
        images:[news_details?.featuredImage.node.sourceUrl, ...previousImages],  
      }, 
    openGraph: { 
      title:`Urban Naija | News - ${news_details?.title}`,
      description:news_details?.excerpt,
       url: `https://culturays.com/news/topic/${slug}/`,
      siteName: 'Urban Naija',
      images: [{url:news_details?.featuredImage.node.sourceUrl, width: 800,
       height: 600, ...previousImages}],
      type: "article",
      publishedTime:news_details?.date 
    },
     alternates: {
    canonical:  `https://culturays.com/news/topic/${slug}/`,
 
  },
  }
}    

const NewsDetailPage = async ({params}: {
  params: Promise<{ slug: string }>
}) => {
const {slug} =await params  
  const news_detail= await newsDetailData(slug[0]) 

  const tags= news_detail.tags.nodes.map((ex:{name:string})=>ex.name).join(', ')
  const news_related = news_detail?.postnewsgroup.relatedPosts?.edges
const exitinginrelated= news_related?.map((fx:{cursor:string})=>fx.cursor)??[]
const next_naija_news = await readNextContent([news_detail.id,exitinginrelated].flat())
const sidebarItems=await sidePlusViews()  
const txPlus=sidebarItems.posts?.edges.map((dy:InnerEdges)=>dy.node)          
const news_outline=await postsOutline()
//      const naija_wiki =async ()=>{  
//       const supabase =await createClient() 
//       const { data:cinema_titles , error } = await supabase 
//       .from('cinema_titles') 
//       .select('*')
//       if(error)throw new Error('An Error has occured!')
// return cinema_titles
          
//       }   
//  const xTitltes= await naija_wiki()
//    const coming_titles= xTitltes?.filter((ex)=> ex.genre?.includes('Coming Soon'))
   const replaceHTMLTags=(string:string)=>{
    const regex = /(<([^>]+)>)/gi;
    const newString = string?.replace(regex, "");
    return newString
     }
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
  name: news_detail?.title, 
   headline: news_detail?.title, 
   description: replaceHTMLTags(news_detail?.excerpt),
   author: {
     "@type": "Person",
     name: "Christina Ngene",
     url:'https://culturays.com/creator/christina-ngene/',
   }, 
   datePublished:toIsoDate(news_detail?.date) , 
   dateModified:toIsoDate(news_detail?.date) ,
    mainEntityOfPage: {
     "@type": "WebPage",
     "@id": news_detail?.slug,
   },
   url:`https://culturays.com/news/topic/${slug}/`,
   image: news_detail?.featuredImage?.node.sourceUrl ,
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
      <NewsDetail
      post={news_detail}
      next_naija_news={next_naija_news}
      sidebarItems={txPlus}
      news_outline={news_outline}  
      />  
    </div>
  ) 
}

export default NewsDetailPage
