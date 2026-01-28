 
import SideBar from "@/components/Side" 
import ArticleDetail from "@/components/News/ArticleDetail" 
import type { Metadata, ResolvingMetadata } from 'next' 
import { NewsArticle, WithContext } from "schema-dts";
import StructuredData from "@/components/StructuredData"; 
import { returnPost } from "@/utils/resolveFunctions"; 
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { scrapeSilverBird } from "@/app/filmsdata";
import { processSbImages } from "@/utils/processImages";
import { CineType, PostTypeProps } from "@/app/types";
import NewsDetail from "@/components/NewsDetail";
import { CronJob } from "cron";  
 const CULTURAYS_CONTENT_WP = process.env.CULTURAYS_WP
export type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string ]: string | string[] | undefined, variant: string }>
}

 const dailyWiki =async()=>{
        const silverBTitles= await scrapeSilverBird()
        const silverB_titles = silverBTitles.filter((xy)=> xy.title !==undefined).map((ex)=> ex.title)  
        const silverB_urls = silverBTitles.filter((xy)=> xy.titleUrl !==undefined).map((ex)=> ex.titleUrl)
        const silverB_imgs = silverBTitles.filter((xy)=> xy.img_url !==undefined).map((ex)=> ex.img_url)
     const silverB_dur = silverBTitles.filter((xy)=> xy.dur !==undefined).map((ex)=> ex.dur)
        const silverB_gnr = silverBTitles.filter((xy)=> xy.genre !==undefined).map((ex)=> ex.genre)
        const silverB_released = silverBTitles.filter((xy)=> xy.release_date !==undefined).map((ex)=> ex.release_date)
       const minLength = Math.max(silverB_titles.length,silverB_urls.length, silverB_imgs.length, silverB_dur.length, silverB_gnr.length, silverB_released.length);   
      
       const grouped:CineType[] =[]     
       for (let i = 0; i < minLength; i++) {     
         const imgMime = await processSbImages(silverB_imgs[i] as string); 
      
              if(imgMime!== undefined) {
               grouped.push({
                 title: silverB_titles[i]as string,
                 url: silverB_urls[i]as string,
                 img_url: imgMime as string,
                 release_date: silverB_released[i]as string,
                 genre: silverB_gnr[i]as string,
                 dur: silverB_dur[i]as string,
               });
              } 
       } 
        const supabase =await createClient() 
       const { data, error } = await supabase
         .from('cinema_titles')
         .upsert(grouped, { onConflict: 'title' })
         .select();
        
       if (error) {
         console.error('Error inserting items:', error);
       }
      const since = new Date(Date.now() - 24 * 60 * 60 * 5000).toISOString();
   await supabase.from('cinema_titles').delete().lte('created_at', since);
       // return () => clearTimeout(fxnTimeout);
        }  
       
   
async function news_details_all(uri:string){ 
const wprest = fetch('https://content.culturays.com/graphql',{
method: 'POST', 
headers:{
'Content-Type':'application/json'
},
next: { revalidate: 3600 } ,
body: JSON.stringify({
query:`
query NODE($id: ID!, $idType: ContentNodeIdTypeEnum!) {
contentNode(id: $id, idType: $idType){  
    id
    uri
    slug
     ... on Post {
            id
            title
            excerpt
            content
            slug
            date
           postnewsgroup {
        heroImage {
          node {
            altText
            caption
            sourceUrl
          }
        }
        relatedPosts {
          edges {
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
          }
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      tags {
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
          avatar {
            url
          }
        }
      }
          }
    newsGroup {
      related {
      edges{
        node {
          date
          id
          slug
          ... on Article {
            id
            title
            excerpt
            content
            slug
             date
            featuredImage {
              node {
                sourceUrl
                altText
                caption
              }
            }
          }
           
          ... on Business {
            id
            title
              excerpt
            content
            slug
             date
            featuredImage {
              node {
                sourceUrl
                altText
                caption
              }
            }
          }
          ... on Society {
            id
            title
              excerpt
            content
            slug
             date
            featuredImage {
              node {
                sourceUrl
                altText
                caption
              }
            }
          }
          ... on Nollywood {
            id
            title
              excerpt
            content
            slug
             date
            featuredImage {
              node {
                sourceUrl
                altText
                caption
              }
            }
          }
          ... on Health {
            id
            title
              excerpt
            content
            slug
             date
            featuredImage {
              node {
                sourceUrl
                altText
                caption
              }
            }
          }
             ... on Award {
            id
            title
              excerpt
            content
            slug
             date
            featuredImage {
              node {
                sourceUrl
                altText
                caption
              }
            }
          }
             ... on Technology {
            id
            title
              excerpt
            content
            slug
             date
            featuredImage {
              node {
                sourceUrl
                altText
                caption
              }
            }
          }
          ... on Environment {
            id
            title
              excerpt
            content
            slug
             date
            featuredImage {
              node {
                sourceUrl
                altText
                caption
              }
            }
          }
          ... on Economy {
            id
            title
              excerpt
            content
            slug
             date
            featuredImage {
              node {
                sourceUrl
                altText
                caption
              }
            }
          }
        }
      }
}}
    contentTypeName
    __typename
    ... on Article {
        id
      content
      slug
      title
     excerpt
      date
      contentTags {
        nodes {
          slug
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
    
      author {
        node {
          name
          slug
          avatar {
            url
          }
        }
      }
    }
    ... on Technology {
        id
      content 
      slug
      title
     excerpt
      date
      contentTags {
        nodes {
          slug
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
      excerpt
      date
      author {
        node {
          name
          slug
          avatar {
            url
          }
        }
      }
    }
    ... on Society {
       id
      content
      slug
      title
     excerpt
      date
      contentTags {
        nodes {
          slug
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
      excerpt
      date
      author {
        node {
          name
          slug
          avatar {
            url
          }
        }
      }
    }
    ... on Nollywood {
      id
      content
      slug
      title
     excerpt
      date
      contentTags {
        nodes {
          slug
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
      excerpt
      date
      author {
        node {
          name
          slug
          avatar {
            url
          }
        }
      }
    }
    ... on Health {
      id
       content
      slug
      title
     excerpt
      date
      contentTags {
        nodes {
          slug
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
      excerpt
      date
      author {
        node {
          name
          slug
          avatar {
            url
          }
        }
      }
    }
    ... on Environment {
   id
       content
      slug
      title
     excerpt
      date
      contentTags {
        nodes {
          slug
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
      excerpt
      date
      author {
        node {
          name
          slug
          avatar {
            url
          }
        }
      }
    }
    ... on Economy {
     id
      content
      slug
      title
     excerpt
      date
      contentTags {
        nodes {
          slug
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
      excerpt
      date
      author {
        node {
          name
          slug
          avatar {
            url
          }
        }
      }
    }
    ... on Business {
     id
     content
      slug
      title
     excerpt
      date
      contentTags {
        nodes {
          slug
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
      excerpt
      date
      author {
        node {
          name
          slug
          avatar {
            url
         
          }
        }
      }
    }
    ... on Award {
      id
      content
      slug
      title
     excerpt
      date
      contentTags {
        nodes {
          slug
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
      excerpt
      date
      author {
        node {
          name
          slug
          avatar {
            url
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
.then(data =>data.data.contentNode)
       .catch(error => console.error('Error:', error)); 
      //const response = wprest?.data.contentNode
      return wprest
 
}
const resolveContent = async (slug: string)=>{ 
   const rex = await news_details_all(`/${slug}/`); 
   for (const type of ["article", "business", "economy", "nollywood", "award", "technology", "health", "society","environment", "post"]) {
    
 const res = await news_details_all(`/${type}/${slug}/`); 
    if (res?.title) {
      return { ...res, __typename: type };    
    }else return { ...rex, __typename: type };
  }

  return null; 
}

const replaceHTMLTags=(string:string)=>{
  const regex = /(<([^>]+)>)/gi;
  const newString = string?.replace(regex, "");
  return newString
   }
export async function generateMetadata(
  { params , searchParams}: Props,  
  parent: ResolvingMetadata 
): Promise<Metadata> {  
  const slug =(await params).slug
  //  const news_details = await news_details_all(`/${slug}/`); 
  // const news_details= await returnPost(slug[0])  
const news_details = await resolveContent(slug);
const variant = await searchParams;
const isVariant= !!variant.variant 
const previousImages = (await parent).openGraph?.images || [] 
 const keyTags= news_details?.contentTags?.nodes.map((ex:{name:string})=>ex.name).join(', ')
const tags= news_details?.tags?.nodes.map((ex:{name:string})=>ex.name).join(', ')
const twitterImage =
news_details?.featuredImage?.node?.sourceUrl ||
'https://culturays.com/opengraph-image.png';

   return {
    metadataBase: new URL('https://culturays.com'),
    title: `Urban Naija | ${news_details?.title }`,
    description: replaceHTMLTags(news_details?.excerpt) ,
    keywords:(tags||keyTags),
    twitter: {
      card: 'summary_large_image',
      title: news_details?.title,
      description: replaceHTMLTags(news_details?.excerpt),  
      images: twitterImage,
    },
     openGraph: {
      title: `Urban Naija | ${news_details?.title}`,
      description: replaceHTMLTags(news_details?.excerpt)  , 
      url:`https://culturays.com/news/${news_details?.slug}/`,
      siteName: 'Urban Naija',
      images: [{url:news_details?.featuredImage?.node?.sourceUrl, width: 800,
 height: 600, ...previousImages} ],
      type: "article",
    publishedTime:new Date(news_details?.date)?.toISOString() ,
    },
     alternates: {
    canonical:`https://culturays.com/news/${news_details?.slug}/`,
 
  }

  }
 
} 

const ArticleDetailPage = async({params, searchParams}: {
  params: Promise<{ slug: string }>,
   searchParams: { variant?: string };
} ) => { 

  const {slug} =await params 
  const repPath = slug[0].split('-').join(' ')
 const repPathname = repPath.replace(/\//g,' ').toUpperCase() 
   //const news_details = await news_details_all(`/${slug}/`); 
const news_details = await resolveContent(slug);

const keyTags= news_details?.contentTags?.nodes.map((ex:{name:string})=>ex.name).join(', ')
const tags= news_details?.tags?.nodes.map((ex:{name:string})=>ex.name).join(', ')
const jsonLd:WithContext<NewsArticle> = {
   '@context': 'https://schema.org',
   '@type': 'NewsArticle',
     name: news_details?.title,
    headline: replaceHTMLTags(news_details?.excerpt), 
    description: `Daily news trends on Urban News — Find out what everyone is talking about and what's trending in every region across Nigeria." | ${replaceHTMLTags(news_details?.excerpt)}`,
   
    author: {
      "@type": "Person",
      name: "Christina Ngene",
      url:'https://culturays.com/creator/christina-ngene/',
    }, 
    datePublished: new Date(news_details?.date).toISOString() , 
    dateModified:new Date(news_details?.date).toISOString() , 
     mainEntityOfPage: {
      "@type": "WebPage",
    },
    url: `https://culturays.com/${news_details?.slug}/`,
    image: "https://culturays.com/culturays-no-bg.png",
    publisher: {
      "@type": "Organization",
      name: "Christina Ngene",
      logo: {
        "@type": "ImageObject",
        url: "https://culturays.com/culturays-no-bg.png",
      },
    },
     
    keywords:[keyTags, tags],   
  };
 // const referer = (await headers()).get("origin")||'';   
  // const pathname = new URL(referer).pathname;
  //   const headersList =(await headers());
  // const originalUrl =
  //   headersList.get('x-forwarded-uri') ||
  //   headersList.get('x-original-url') ||
  //   '';

 const highlight =await searchParams;
  const isHighlight= highlight.variant === 'highlight'
 CronJob.from({
          cronTime: '10 8 * * *',  
          onTick:dailyWiki(),
          start: true,
          timeZone: 'Africa/Lagos'
         }); 
  return (
     <article> 
     <StructuredData schema={jsonLd} /> 
       {news_details?.contentTypeName ==='post' ? (
        <NewsDetail post={news_details} />
      ) : (
        <ArticleDetail postXPlus={news_details} />
      )}   
    </article> 
    ) 
}

export default ArticleDetailPage
