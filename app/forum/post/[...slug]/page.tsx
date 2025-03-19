import Post from "@/components/forum/Post"; 
import { createClient } from "@/utils/supabase/server"; 
import { getComments } from "../../actions/loadComments";
import { getRelatedPosts } from "../../actions/loadPosts"; 
import { FakeObj, getNaijaFake1, getNaijaTrends1 } from "@/app/data/trends";
import { type User } from "@supabase/supabase-js";
import { InitialComments } from "@/app/types";
import { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from 'next'
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
    keywords: post.genre,
    openGraph: { 
      images: [post?.files,...previousImages],
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
  const related= await getRelatedPosts(post?.title||post?.article_title)  
     const fakeTrend = await getNaijaFake1()
     const today = new Date();
   const todayMonth = today.getMonth();
   const filteredTrends = fakeTrend?.filter((dateStr:FakeObj) => {
     const date = new Date(dateStr.claimDate);
     const dateDay = date.getDate();  
     const dateMonth = date.getMonth();
     return dateMonth === todayMonth ;
   });

return (
<div> 
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
 