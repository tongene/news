 
import CommentX from "@/components/forum/Comments";
import { createClient } from "@/utils/supabase/server";   
import { getChildComments } from "../../actions/loadComments";
import { getRelatedPosts } from "../../actions/loadPosts";
import { FakeObj, getNaijaFake1, getNaijaTrends1 } from "@/app/data/trends";
import {type User } from "@supabase/supabase-js";
import { InitialComments } from "@/app/types";
import type { Metadata, ResolvingMetadata } from 'next'
import { Suspense } from "react";
import StructuredData from "@/components/StructuredData";
import { BlogPosting, DiscussionForumPosting, WithContext } from "schema-dts";
type Props = {
  params: Promise<{ id: number }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
//export const revalidate=1
export async function generateMetadata(  { params }: Props,
  parent: ResolvingMetadata ): Promise<Metadata> {
  const id =(await params).id
  const postView = async () => { 
    const supabase =await createClient();  
    const { data:commented, error} = await supabase
    .from('comments') 
    .select('*') 
    .eq('id', id)
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
    title:`Urban Naija |Forum - ${comment?.title}`,
     description: comment?.title,
      openGraph: {     
      title:`Urban Naija News | Creator`,
      description: comment?.title,
      url:`https://culturays.com/forum/comment/${comment.id}/`,
      type: "article",
      publishedTime:comment?.created_at, 
      siteName: 'Urban Naija News', 
      images: [{url:`https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/posts_imgs/${comment?.files[0]}`,
        ...previousImages,
          width: 800,
          height: 600
        }],
      },
      twitter:{
      card: 'summary_large_image',
      title: comment?.title,
      description: comment?.title,
      images: [comment?.files[0]],
   },
    alternates: {
    canonical:  `https://culturays.com/forum/comment/${comment.id}/`,
 
  },
  }
} 
 
const CommentPage =async ({params}: Props) => {
  const supabase =await createClient()    
  const {
  data: { user }, 
  } = await supabase.auth.getUser(); 
  
  const id =(await params).id
  const commentView = async () => { 
    const supabase =await createClient();  
    const { data:commented, error} = await supabase
    .from('comments') 
    .select('*') 
    .eq('id', id )
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
  "@id":`https://culturays.com/comment/${comment.id}/`,
  "headline":comment?.title ,
  "author": {
    "@type": "Person",
    "name": comment?.user_name
  },
 
 };
  return ( 
    <div> 
      <StructuredData schema={jsonLd} />
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