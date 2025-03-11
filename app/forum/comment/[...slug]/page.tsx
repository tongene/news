 
import CommentX from "@/components/forum/Comments";
import { createClient } from "@/utils/supabase/server";   
import { getChildComments } from "../../actions/loadComments";
import { getRelatedPosts } from "../../actions/loadPosts";
import { FakeObj, getNaijaFake1, getNaijaTrends1 } from "@/app/data/trends";
import {type User } from "@supabase/supabase-js";
import { InitialComments, TrendsProps } from "@/app/types";
import type { Metadata, ResolvingMetadata } from 'next'
import { Suspense } from "react";
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export const revalidate=1
export async function generateMetadata(  { params }: Props,
  parent: ResolvingMetadata ): Promise<Metadata> {
    const slug =(await params).slug
  const postView = async () => { 
    const supabase =await createClient();  
    const { data:commented, error} = await supabase
    .from('comments') 
    .select('*') 
    .eq('id', slug.slice(-1) )
    .single()   
    if (error) {
  
    console.error('Error fetching posts:', error );
    return;
    }
    return commented
    }
   const comment  = await postView()  
  const previousImages = (await parent).openGraph?.images || []

  return {
    title:`Culturays Forum - ${comment?.title}`,
    openGraph: {
      images: [comment?.files,...previousImages],
    },
  }
} 
 
const CommentPage =async ({params}: Props) => {
  const supabase =await createClient()    
  const {
  data: { user }, 
  } = await supabase.auth.getUser(); 
  
  const slug =(await params).slug
  const commentView = async () => { 
    const supabase =await createClient();  
    const { data:commented, error} = await supabase
    .from('comments') 
    .select('*') 
    .eq('id', slug.slice(-1) )
    .single() 
    if (error) {
  
    console.error('Error fetching posts:', error );
    return;
    } 
    return commented
    }

 const comment = await commentView() 
 const postView = async () => { 
  const supabase = await createClient();  
  const { data:post, error} = await supabase
  .from('posts')
  .select('*') 
  .eq('id', comment?.post_id)
  .single()
  if (error) {
  console.error('Error fetching posts:', error );
  return;
  }

  return post
  }
 const post = await postView()
 const postsComment = async(): Promise<InitialComments[]> =>{ 
  const supabase = await createClient();  
  const { data:posts, error} = await supabase
  .from('comments')
  .select('*') 
  .eq('post_id', post?.id) 
  if (error) { 
  console.error('Error fetching posts:', error );
  return [];
  }

  return posts 
  }
 const post_comments= await postsComment() ??[]
  // const commentChild =async(): Promise<InitialComments[]>=>{ 
  //   const child_of_child = await getChildComments(comment) 
  //   return child_of_child
  // }
  // const initialChild = await commentChild() 
  const related= await getRelatedPosts(post?.title||post?.article_title)  
  const trends =await getNaijaTrends1()
    const fakeTrend = await getNaijaFake1()
    const today = new Date();
  const todayMonth = today.getMonth();
  const filteredTrends = fakeTrend?.filter((dateStr:FakeObj) => {
    const date = new Date(dateStr.claimDate); 
    const dateMonth = date.getMonth();
    return dateMonth === todayMonth ;
  });
  return ( 
    <div> 
<hr className="shadow-bottomShadow"/>  
 <Suspense> <CommentX 
  comment={comment}  
  postData={post} 
  user={user as User } 
  post_comments={post_comments} 
  related={related}
  trendX={trends}
  filteredTrends={filteredTrends}
  />  </Suspense> 
</div>
  )
}

export default CommentPage
