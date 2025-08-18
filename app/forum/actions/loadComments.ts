'use server' 
import { CommentProps, InitialComments, PostProps } from '@/app/types'
import { createClient } from '@/utils/supabase/server'

const userObj =async()=>{
  const supabase =await createClient();
  const { 
    data: { user }, 
    } = await supabase.auth.getUser();

    return user
}

export const getComments = async (startScroll:number, count:number, post:PostProps) => {

    try{
        const supabase =await createClient() 
        const { data:comments , error } = await supabase 
        .from('comments')
        .select('*')
        .eq('post_id', post.id) 
        .order('created_at', { ascending: false })
        .range(startScroll, startScroll + count - 1) 
         return comments
      }catch(err){
        if(err) return
      }
  
  }
   
  export const getChildComments = async (comment:{id:string}) => {
   
    try{
        const supabase =await createClient() 
        const { data:comments , error } = await supabase 
        .from('comments')
        .select('*')
        .eq('parent_id', comment.id) 
        .single()
       //.range(offset,limit) 
         //revalidatePath('/forum') 
       return comments
      
      }catch(err){
        if(err) return
      }
  
  }
   


  export const commentLike = async(comment:CommentProps ) => {
    const user = await userObj() 
    const supabase =await createClient(); 
    const likeidx = comment?.likes?.findIndex((id)=> String(id)=== String(user?.id))  
    const updLks= comment?.likes?.filter((ex)=> String(ex) !== String(user?.id))

    if(likeidx=== -1){ 
    const {data:comments, error: lkrror } = await supabase
    .from('comments')
    .update({likes: [...comment?.likes??[], user?.id]} )
    .eq('id', comment.id) 
    .select()
    
    if (lkrror) {
    console.error('Error updating likes:', lkrror );
    } 
   return comments 
    } 
     
    if(likeidx !== -1){  
    
    const {data:commentsXX, error } = await supabase
    .from('comments')
    .update({ likes:[...updLks ??[]]})
    .eq('id', comment.id) 
    .select()
    if(error){
    console.log(error)
    }
     
     return commentsXX 
   }
 

   }


   export const commentEdit = async(formData:FormData, comment:CommentProps) => {  
    const title = formData.get('title') as string
    const files = formData.getAll('files')

    //const slug = title?.toLowerCase().replace(/ /g,"-")
   const allFiles=[]
    const supabase =await createClient();
    for (let i = 0; i < files.length; i++) {
    const file=files[i]as File ;
    // const pathname = (await headers()).get("referer");
    if (file) {
        const filePath= `${Date.now()}-${file.name}`;       
        if (file.name && !file.name.includes('undefined')) {         
          allFiles.push(filePath.replace(/ /g, "-").trim());      
          const { error: uploadError } = await supabase.storage
            .from('posts_imgs')
            .upload(filePath.trim().replace(/ /g, "-"), file, { upsert: true });  
           
          if (uploadError) {
            throw new Error('An error has occurred');
          }
        }   
     }
    
  };
  
  
    const { data, error } = await supabase
    .from('comments')
    .update([
    {    
    title,   
     slug:comment?.slug,  
    user_id:comment?.user_id,
    comments:[comment.comments],
    post_id:comment?.post_id,
    parent_id:comment?.parent_id,
    avatar_url:comment?.avatar_url,
    user_name:comment?.user_email,
    likes:comment?.likes,
    files:comment?.files?.concat(allFiles) , 
    },
    
    ])
    .eq('id', comment.id)
    .select()

    if (error) {
    console.log(error) 
    }
   
    return data

    };
  
    
export const deleteComment =async (commentx:CommentProps, scrolledComments:InitialComments[]) => { 
  try{
  const supabase =await createClient();  
    const {data, error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentx.id) 
    if(error){
      throw new Error('Error deleting comment')
    
    }
    const {data:parentDeleted, error:parentError } = await supabase
    .from('comments')
    .delete()
    .eq('parent_id', commentx.id)
    if(parentError){
      throw new Error('Error deleting comment')
    
    }

   const rmId = scrolledComments.filter((te:CommentProps)=> String(te.id)!== String(commentx.id)).map((ex:CommentProps)=> ex.id) 
   
    const {data:updatePost, error:updateError } = await supabase
    .from('posts')
    .update({comments:[...rmId]})
    .eq('id', commentx.post_id)

    if(updateError){
      console.log(updateError)
      throw new Error('Error updating post')
    
    }
    return []
    }catch(err){
    console.log(err)
    }
   
    };
  
 

    export const createCxComment =async (formData: FormData, postId:string, parentId:string|null|number) => { 
    
      const supabase =await createClient();
      const { 
        data: { user }, 
        } = await supabase.auth.getUser(); 
      const title = formData.get('title')as string;
   const slug = title?.toLowerCase().replace(/ /g,"-") 
      const replies = []  
      // const postId = e.currentTarget.getAttribute('id')
      //const postComms=post?.comments?.filter((ex)=> ex.slug!==slug )
      const allFiles=[]
      const files = formData.getAll("files");
      for (let i = 0; i < files.length; i++) {
      const file=files[i]as File ;
      if(file ){
      const filePath = `${Date.now()}-${file.name}`; 
      if (file.name && !file.name.includes('undefined')) {         
        allFiles.push(filePath.replace(/ /g, "-").trim());      
        const { error: uploadError } = await supabase.storage
          .from('posts_imgs')
          .upload(filePath.trim().replace(/ /g, "-"), file, { upsert: true });  
         
        if (uploadError) {
          throw new Error('An error has occurred');
        }
      }  }
      
      };
      try{   
      const { data, error } = await supabase 
      .from('comments')
      .insert([ 
      {    
      title, 
      slug,
      likes:[], 
      comments:[parentId],
      post_id:postId,
      parent_id: parentId ,
      user_id:user?.id,
      files:allFiles, 
      avatar_url: user?.user_metadata.picture,
      user_name:user?.user_metadata.full_name,
      user_email:user?.email,
      }  
      ])
      //.eq('id', post.id)
      .select()
      
      if(error){
       console.log(error)
      }  
     
      // const newComment = data[0] 
       return data
    
      }catch(err){
      console.log(err)
      }
     
   
      }
    