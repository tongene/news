'use server' 
import { createClient } from '@/utils/supabase/server'
export const getPosts = async (offset:number, limit:number ) => {
  try{
    const supabase =await createClient() 
    const { data:posts , error } = await supabase 
    .from('posts')
    .select('*')
    .range(offset,limit)
    .order('id', { ascending: true })
     //revalidatePath('/forum')
    if(error) throw new Error('No Data Returned')
   return posts
  
  }catch(err){
    if(err) return
  }

}
export const postsItems =async(startScroll:number, count:number)=>{

  const supabase =await createClient() 
  const { data:apiP , error } = await supabase 
  .from('posts')
  .select('*')
  //.is('article_title', null)
  .order('id', { ascending: true })
  .range(startScroll, startScroll + count - 1) 
  if(error) return 
     return apiP  
  }
 
export async function getRelatedPosts(keyword:string) {
 
const cleanKey= keyword
const textSearch1= cleanKey?.split(' ')[0] 
const textSearch2= cleanKey?.split(' ')[1]  
const textSearch3= cleanKey?.split(' ')[2] 
const textSearch4= cleanKey?.split(' ')[3]  
const supabase =await createClient()
const { data, error } = await supabase
  .from('posts')
  .select('*') 
  .ilike('title', `%${textSearch1}%`) 
  if (error) {
    return [] 
    // console.error(error)
    //  throw new Error('No Data Returned')
  }
  
  return data
} 

