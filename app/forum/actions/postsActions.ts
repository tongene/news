"use server" 
import { CommentProps, InitialComments, InitialPosts, PostProps, UserPostProps  } from "@/app/types";
import { createClient } from "@/utils/supabase/server" ;
import { PostgrestError } from "@supabase/supabase-js";
import nlp from "compromise/three"; 
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation"; 

const userObj =async()=>{
  const supabase =await createClient();
  const { 
    data: { user }, 
    } = await supabase.auth.getUser();

    return user
}

export const getUserPosts = async (offset:number,limit:number, id:string) => {
  
  try{
    "use server"
    const supabase =await createClient();  
      const { data:posts , error } = await supabase 
      .from('posts')
      .select('*')
      .eq('user_id', id)
     .range(offset,limit)  
     .order('id', { ascending: true })
       //revalidatePath('/forum') 
     return posts
    
    }catch(err){
      if(err) return
    } 
}


const postView = async () => { 
  const headersList = new URL((await headers())?.get('x-url')||'')  
  const params = headersList
    // const searchParams = headersList.get('searchParams')
  const { searchParams } = new URL(headersList);
  const id= searchParams?.get("id")
  const pathname=headersList.pathname 
     
 const confirmParam= searchParams?.get("confirm")
  const supabase =await createClient();  
  const { data:post, error} = await supabase
  .from('posts')
  .select('*') 
  .eq('id', params )
  .single() 
  if (error) {

  console.error('Error fetching posts:', error );
  return;
  }
  return post
  }

export const createPost = async (formData: FormData, titleX:string) => { 
  const supabase =await createClient();
  const user =await userObj()

   const title = formData.get('title') 
   const story = formData.get('story') 
   const family = formData.get('family')
   const work = formData.get('work')
   const school = formData.get('school')  
   const friends = formData.get('friends')
   const folktale = formData.get('folktale')
   const entertainment = formData.get('entertainment')
   const files = formData.getAll("files");
   const slug=(title as string)?.trim()?.toLowerCase().replace(/ /g,"-")
   const storyX =(story as string)?.split(' ').filter((ex:string)=> !ex.includes('#')).join(' ')
  const genre=[{
  family,
  work,
  entertainment,
  school,
  friends,
  folktale
  }]
  const genreList =[] 
  
  const flattenedGenres = genre.flat();
  for (let i = 0; i < flattenedGenres.length; i++) {
    const value = flattenedGenres[i];
    for (const [k, v] of Object.entries(value)) {
      if (v) {
        genreList.push(k);
      }
    }
  }

   if(!title ) return
    const nouns = nlp(story as string).match('#Noun').text();  
    const hashNo =nlp(story as string).hashTags().text()
   //.json({normal:true}) 
   const people = nlp(story as string).people().text()
   const places = nlp(story as string).places().text()
   const adj = nlp(story as string).nouns().adjectives().text()
   const nounDoc = nlp(story as string).people().normalize().text() 
   const allFiles=[]

   for (let i = 0; i < files.length; i++) {
    const file =files[i]as File ;

    if (file) {
      const filePath = `${Date.now()}-${file.name}`;        
      if (file.name && !file.name.includes('undefined')) {
        // allFiles.push('/assets/images/culturays.png'); 
     //return redirect(pathname+'?message=Please choose a valid file!');
        allFiles.push(filePath.replace(/ /g, "-").trim());
        const { error: uploadError } = await supabase.storage
          .from('posts_imgs')
          .upload(filePath.replace(/ /g, "-").trim(), file, { upsert: true });
  
        if (uploadError) { 
          throw new Error('An error has occurred');
        }
      }  

    }
   
    };
 
   const { data, error } = await supabase
   .from('posts')
   .insert([
   {    
   title:titleX?null:title, 
   story:storyX, 
   user_id:user?.id,
   comments:[],
   username:user?.user_metadata.full_name,
   likes:[],
   suggested_tags:[
     nouns, 
     people,
     places, 
     adj ,
     nounDoc 
   ] ,
    tags:[hashNo], 
   files: allFiles, 
   is_approved:false,
   slug,
   avatar_url: user?.user_metadata.picture,
   user_email:user?.email,
    genre: genreList,
    article_title:titleX?titleX:null
   }, 
    
   ])
   .select()
   if (error) {    
    console.log(error) 
    return error.message
    }
    return data 
  
  } 
  

 export const postEdit = async(formData: FormData, post:PostProps| UserPostProps, titleX:string)=> {  
    const title = formData.get('title') as string 
    const story = formData.get('story') as string 
   // const slug=title?.trim()?.toLowerCase().replace(/ /g,"-")
    const storyX = story.split(' ').filter((ex)=> !ex.includes('#')).join(' ')
    const family = formData.get('family')
    const work = formData.get('work')
    const school = formData.get('school')
    const friends = formData.get('friends')
    const folktale = formData.get('folktale')
    const entertainment = formData.get('entertainment')
    const files = formData.getAll("files");
    const genre=[{
    family,
    work,
    entertainment,
    school,
    friends,
    folktale
    }]
    const genreList =[] 
    const allFiles:string[] =[]
    
    for (const [key, value] of genre.flat().entries()) { 
    for(const [k,v] of Object.entries(value) ){
    //console.log(`Key: ${k}, Value: ${v}`); 
    if(v){ 
    const updGnr= post.genre ? post.genre.filter((tx:string) => !tx.includes(k)).flat() : [];
    genreList.push([...updGnr, k] )
    } 
    }
    }
    const gnrItx =genreList.concat(post?.genre?? []).flat().filter( function( item, index, inputArray ) {
    return inputArray.indexOf(item) === index;
    }) 
    
    const supabase =await createClient();
    for (let i = 0; i < files.length; i++) {
    const file=files[i]as File ;
    const pathname = (await headers()).get("referer");
    if (file) {
        const filePath= `${Date.now()}-${file.name}`;
       
        if (file.name && !file.name.includes('undefined')) { 
           // return redirect(pathname+'?message=Please choose a valid file!');   
                       
       allFiles.push(filePath.replace(/ /g, "-").trim());            
             const { error: uploadError } = await supabase.storage
               .from('posts_imgs')
               .upload(filePath.replace(/ /g, "-").trim(), file, { upsert: true });
       
             if (uploadError) {
               throw new Error('An error has occurred');
             } 
        
           }   
     }
    }; 
    allFiles.concat([...(post?.files ?? [])])
 
    const { data, error } = await supabase
    .from('posts')
    .update([
    {
    article_title: titleX?titleX:title,
    title: titleX?titleX:title ,
    story:storyX, 
    slug:post.slug,
    is_approved:true,
    genre:gnrItx,
    user_id:post.user_id, 
    comments:post.comments,
    likes:post.likes,           
    username:post.username,
    suggested_tags:post.suggested_tags ,
    tags:post.tags, 
    files:allFiles.concat([...(post?.files ?? [])]).flat() , 
    avatar_url:post.avatar_url,
    user_email:post.user_email, 
    },
    
    ])
    .eq('id', post.id)
    .select()
    if (error) {
    console.log(error) 
    }
 
    return data 
  
    };
   
    export const postTag = async (post:PostProps |UserPostProps, tagx:string ) => {
      const supabase =await createClient(); 
      const updTags = post?.suggested_tags?.map(tag => tag.split(" ").filter((ex)=> ex!== tagx) ).flat()  ; 
      const { data, error: sugError } = await supabase
      .from('posts')
      .update({ suggested_tags: [...updTags?? []]})
      .eq('id', post?.id) 
      .select()
      if (sugError) {
      console.error('Error updating tags:', sugError.message) 
      } else {
      console.log('Suggested Tag updated successfully.'); 
      } 
     
    
      //////////////////////////////////////////////////////////////////
      
      const oldTags = post?.tags?.filter(tag => tag !== tagx);  
      const {data:updateData, error: updateError } = await supabase 
      .from('posts')
      .update({ tags:[ ...oldTags?? [], tagx]})
      .eq('id', post?.id) 
      .select()
      if (updateError) {
      console.error('Error updating tags:', updateError );
      } else { 
      console.log('Tag updated successfully.' )  
      } 
    
      return {data, updateData} 
     
      };

      export const deleteTag =async (post:PostProps |UserPostProps, tagToDelete:string)=>{
      const supabase =await createClient(); 
      const oldTags = post?.tags?.filter(tag => tag !== tagToDelete);  
      const {data, error: updateError } = await supabase 
      .from('posts')
      .update({ tags:[ ...oldTags??[]]})
      .eq('id', post.id)
      .select()
      if (updateError) {
      console.error('Error deleting tags:', updateError );
      } else { 
      console.log('Tag deleted successfully.'); 
   
      }
  
      return data
      //window.location.reload()
   
      }

      export const postLike = async (post:PostProps |UserPostProps) => { 
        const user = await userObj() 
        const supabase =await createClient(); 
        const likeidx = post?.likes?.findIndex((id)=> String(id)=== String(user?.id))  
        const updLks= post?.likes?.filter((ex)=> String(ex) !== String(user?.id))
 
        if(likeidx=== -1){ 
        const {data:posts, error: lkrror } = await supabase
        .from('posts')
        .update({likes: [...post?.likes??[], user?.id]} )
        .eq('id', post.id) 
        .select()
        
        if (lkrror) {
        console.error('Error updating likes:', lkrror );
        } 
       return posts 
        } 
         
        if(likeidx !== -1){  
        
        const {data:postsXX, error } = await supabase
        .from('posts')
        .update({ likes:[...updLks ??[]]})
        .eq('id', post.id) 
        .select()
        if(error){
        console.log(error)
        }
         
         return postsXX
       }
    
       
        } 
 
         
      export const createComment =async (formData: FormData, postId:string, parentId:string|null) => { 
      const supabase=await createClient()
      const user =await userObj()
        const title = formData.get('title')as string;
        const slug = title?.toLowerCase().replace(/ /g,"-") 
        const replies = []
        const pathname = (await headers()).get("referer");      
        // const postId = e.currentTarget.getAttribute('id')
        //const postComms=post?.comments?.filter((ex)=> ex.slug!==slug )
        const allFiles=[]
        const files = formData.getAll("files");
        for (let i = 0; i < files.length; i++) {
        const file=files[i]as File ;
        if(file){
        const filePath = `${Date.now()}-${file.name}`; 
        if (file.name && !file.name.includes('undefined')) { 
        //allFiles.push('/assets/images/culturays.png'); 
       //return redirect(pathname+'?message=Please choose a valid file!');   
        
        allFiles.push(filePath.replace(/ /g, "-").trim());
       
        const { error: uploadError } = await supabase.storage
          .from('posts_imgs')
          .upload(filePath.trim().replace(/ /g, "-"), file, { upsert: true });  
         
        if (uploadError) {
          throw new Error('An error has occurred');
        }
      }   }
        
        };
   
       const { data, error } = await supabase 
        .from('comments')
        .insert([ 
        {    
        title, 
        slug,
        likes:[],
        comments:[],
        post_id:postId ,
        parent_id: parentId ,
        user_id:user?.id,
        files:allFiles, 
        avatar_url: user?.user_metadata.picture,
        user_name:user?.user_metadata.full_name,
        user_email:user?.email,
        }  
        ])        
        .select()
         
        if(error){
        console.log(error)
        }  
   
       return data 
  
       
        }
      

        export const postDelete =async (postid:string|number) => { 
          try{
            const supabase =await createClient();  
            const { data: commentsData, error: commentsError } = await supabase
            .from('comments')
            .delete()
            .eq('post_id',postid);
          
          if (commentsError) {
            throw new Error('Error deleting comments')
            // console.error('Error deleting comments:', commentsError);
            // return;
          }
          
    
          const { data , error: postError } = await supabase
            .from('posts')
            .delete()
            .eq('id', postid);
          
          if (postError) {
            throw new Error('Error deleting posts')
           
          }
          return []
         // return redirect('/forum')
          }catch(err){
          console.log(err)
          }           
  
          };
      