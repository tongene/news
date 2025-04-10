import Post from "@/components/forum/Post"; 
import { createClient } from "@/utils/supabase/server"; 
import { getComments } from "../../actions/loadComments";
import { getRelatedPosts } from "../../actions/loadPosts"; 
import { FakeObj, getNaijaFake1, getNaijaTrends1 } from "@/app/data/trends";
import { type User } from "@supabase/supabase-js";
import { InitialComments } from "@/app/types";
import { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from 'next'
import StructuredData from "@/components/StructuredData";
import { BlogPosting, WithContext } from "schema-dts";
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export const revalidate = 0
const INITIAL_NUMBER_OF_POSTS =2
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata ): Promise<Metadata> {
    const slug =(await params).slug
  const postView = async () => { 
    const supabase =await createClient();  
    const { data:post, error} = await supabase
    .from('posts')
    .select('*') 
    .eq('id', slug.slice(-1) )
    .single() 
    if (error) {
  
    console.error('Error fetching posts:', error );
    return;
    }
    return post
    }
   const post = await postView()  
  const previousImages = (await parent).openGraph?.images || []
    
  return {
    title:`Culturays Forum - ${post?.title || post?.article_title?.toUpperCase().replace(/-/g," ")}`,
    keywords: post.genre.join(', '),
    twitter: {
      card: 'summary_large_image',
      title: post?.title || post?.article_title?.toUpperCase().replace(/-/g," "),
      description: post?.title || post?.article_title?.toUpperCase().replace(/-/g," "),  
      images:[`https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/posts_imgs/${post?.files[0]}`,...previousImages],  
    }, 
    openGraph: { 
      images: [post?.files,...previousImages],
      type: "article",
      publishedTime:post?.created_at,

    },
  }
}  
   
 
const PostPage =async ({params}: Props) => {
  const supabase =await createClient()    
  const {
  data: { user } , 
  } = await supabase.auth.getUser(); 
  
  const slug =(await params).slug
 
const postView = async () => { 
  const supabase =await createClient();  
  const { data:post, error} = await supabase
  .from('posts')
  .select('*') 
  .eq('id', slug.slice(-1) )
  .single()

  if (error) {
  console.error('Error fetching posts:', error );
  return;
  }
  return post
  }
 const post = await postView()

  const commentView = async () => { 
    const supabase =await createClient();  
    const { data:comments, error} = await supabase
    .from('comments') 
    .select('*') 
    .eq('post_id', post?.id)
    .order('created_at',  { ascending: false })
   
    if (error) {  
    console.error('Error fetching comments:', error );
    return;
    }
    
    return comments
    } 
 
const comments =(await commentView()||[]) 
const commentItems =async(): Promise<InitialComments[]>=>{ 
  const initialPostComms = await getComments(0, INITIAL_NUMBER_OF_POSTS, post)  
  return initialPostComms ?? []
} 
const initiaComms = await commentItems() 
const trends =await getNaijaTrends1() 
  const related= await getRelatedPosts(post?.title||post?.article_title?.toUpperCase().replace(/-/g," "))  
  await getNaijaFake1()
  const getFacts=async()=>{
    const { data, error } = await supabase
  .from('fact_check') 
  .select('*') 
  .range(0, 10)
if(error){
  console.log(error?.message)
}

return data ??[]
}
 
  const fakeTrend = await getFacts() 
  const today = new Date();
const todayMonth = today.getMonth() ;
const filteredTrends = fakeTrend?.filter((dateStr:FakeObj) => {
  const date = new Date(dateStr.claimDate);
  const dateDay = date.getDate();  
  const dateMonth = date.getMonth() ;
  return dateMonth <= todayMonth ;
});;
const tags= post.suggestedTags.map((ex:string)=>ex ) 
const tags1= post?.tags.map((ex:string)=>ex ) 
const tagged=tags1?.concat(tags)
const jsonLd:WithContext<BlogPosting> = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  name:post?.title||post?.article_title?.toUpperCase().replace(/-/g," "),
   headline: post?.title||post?.article_title?.toUpperCase().replace(/-/g," "), 
   description:post?.title||post?.article_title?.toUpperCase().replace(/-/g," "),
   author: {
     "@type": "Person",
     name: "Christina Ngene",
     url:`https://culturays.com/profile/${post?.id}`,
   }, 
   datePublished: post?.created_at.toLocaleDateString('en-NG', {timeZone: 'Africa/Lagos'}), 
   dateModified: post?.created_at.toLocaleDateString('en-NG', {timeZone: 'Africa/Lagos'}),
    mainEntityOfPage: {
     "@type": "WebPage",
     "@id": post?.slug,
   },
   url:post?.slug,
   image: post?.avatar_url,
   publisher: {
     "@type": "Organization",
     name: "Christina Ngene",
     logo: {
       "@type": "ImageObject",
       url: "https://culturays.com/assets/images/culturays-no-bg.png",
     },
   },
    
   keywords:tagged.join(', '),    
   
 };
 

return (
<div> 
<StructuredData schema={jsonLd} />
 <Suspense> <Post  
  postData={post} 
  initiaComms={initiaComms}
  comments={comments}  
  user={user as User} 
  trendX={trends} 
  related={related}
  filteredTrends={filteredTrends}
/>  </Suspense>
</div> 
  )
}

export default PostPage
 