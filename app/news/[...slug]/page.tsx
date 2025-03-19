 
import SideBar from "@/components/Side" 
import ArticleDetail from "@/components/News/ArticleDetail" 
import type { Metadata, ResolvingMetadata } from 'next'
import { postsOutline, sidePlusViews } from "@/app/page-data";
import { createClient } from "@/utils/supabase/server";
 
const CULTURAYS_CONTENT_WP = process.env.CULTURAYS_WP

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
      query: `query NEXTCONTENT($notIn:[ID]) {
     contentNodes(where: {notIn: $notIn}){
 nodes {
    contentTypeName
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
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata 
): Promise<Metadata> {  
  const slug =(await params).slug
  const news_details= await news_details_all(`${CULTURAYS_CONTENT_WP}/${slug[0]}/${slug[1]}/`)
  const previousImages = (await parent).openGraph?.images || []
  const tags= news_details.contentTags.nodes.map((ex:{name:string})=>ex.name)
  return {
    title: `${news_details?.title}`,
    keywords:tags,
    openGraph: {
      images: [news_details?.featuredImage.node.sourceUrl,...previousImages],
    },
  } 
} 

const ArticleDetailPage = async ({params}: Props) => {
const slug =(await params).slug
 const news_detail= await news_details_all(`${CULTURAYS_CONTENT_WP}/${slug[0]}/${slug[1]}/`)
 const news_related = news_detail?.newsGroup.related?.edges.map((tx:{node:{id:string}})=> tx.node.id)
 
 const exitinginrelated= news_related?.map((fx:{cursor:string})=>fx.cursor)??[]
 const next_top_news = await readNextContent([news_detail.id, news_related ].flat())
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

  return ( 
    <div className="bg-gray-50">     
    <div className="lg:flex justify-center m-auto px-4 bg-white" style={{maxWidth:'1450px' }}>
        <ArticleDetail 
      news_detail={news_detail} 
      next_top_news={next_top_news}
      />    
       <div className="[&_h2]:dark:text-gray-900 dark:text-gray-900 h-max">
       <SideBar sidebarItems={sidebarItems}
        news_outline={news_outline} coming_titles={coming_titles}/>  
      </div>
      </div>
 </div>
  ) 
}

export default ArticleDetailPage
