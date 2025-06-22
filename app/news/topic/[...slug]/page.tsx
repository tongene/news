 
import { postsOutline, sidePlusViews } from "@/app/page-data";
import { InnerEdges } from "@/app/types";
import NewsDetail from "@/components/NewsDetail" 
import StructuredData from "@/components/StructuredData";
import { createClient } from "@/utils/supabase/server";
import { NewsArticle, WithContext } from "schema-dts";
  async function newsDetailData(slug:string){ 
  
     const wprest =   fetch('https://content.culturays.com/graphql',{
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
      images: [news_details?.featuredImage.node.sourceUrl, ...previousImages],
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
   datePublished:new Date(news_detail?.date).toDateString(), 
   dateModified:new Date(news_detail?.date).toDateString(),
    mainEntityOfPage: {
     "@type": "WebPage",
     "@id": news_detail?.slug,
   },
   url:news_detail?.slug,
   image: news_detail?.featuredImage?.node.sourceUrl ,
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
