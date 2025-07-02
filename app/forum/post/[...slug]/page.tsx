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
import { DiscussionForumPosting, WithContext } from "schema-dts";
 
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
//export const revalidate = 0
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
    title:`Urban Naija | Forum - ${post?.title || post?.article_title?.toUpperCase().replace(/-/g," ")}`,
    keywords: post.genre.join(', '),
    twitter: {
      card: 'summary_large_image',
      title: post?.title || post?.article_title?.toUpperCase().replace(/-/g," "),
      description: post?.title || post?.article_title?.toUpperCase().replace(/-/g," "),  
      images:[`https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/posts_imgs/${post?.files[0]}`,...previousImages],  
    }, 
    openGraph: { 
      url: `https://culturays.com/forum/post/${slug}/${post.id}/`,
      siteName: 'Urban Naija',
      images: [{
      url: post.files,
      width: 800,
      height: 600,
      ...previousImages,  
    } ],
       
      type: "article",
      publishedTime:post?.created_at,

    },
      alternates: {
    canonical:  `https://culturays.com/forum/post/${slug}/`,
 
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
const todayMonth = today.getMonth() 

const filteredTrends = fakeTrend?.filter((item, index, self) =>  index === self.findIndex((t) => t.claimant === item.claimant)) 
.filter((dateStr:FakeObj) => { 

const date = new Date(dateStr.claimDate); 
const dateDay = date.getDate();  
const dateMonth= date.getMonth() ;
return dateMonth=== todayMonth||todayMonth-1===dateMonth||todayMonth-2===dateMonth||todayMonth-3===dateMonth; 
});
const jsonLd:WithContext<DiscussionForumPosting> = {
  '@context': 'https://schema.org',
  '@type': 'DiscussionForumPosting', 
  "@id":`https://culturays.com/post/${slug}/${post.id}/`,
  "headline":post?.title||post?.article_title?.toUpperCase().replace(/-/g," "),
  "author": {
    "@type": "Person",
    "name": post?.user_name
  },
 
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
 