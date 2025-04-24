"use server"
import {createClient} from "@/utils/supabase/server" 
import {createClient as deleteClient} from "@/utils/supabase/accountDelete" 
import { redirect } from "next/navigation";  
 type UserData={ 
  user:{id:string}, 
  avatar_url:string, 
  email:string, 
  education:string,
  address:string,
  password:string,
  website:string,
  fullname:string,
  about:string
  username:string
}
export async function getProfile(id:string):Promise<{user:{id:string}, avatar_url:string , email:string, education:string,address:string, password:string, website:string, fullname:string, about:string, full_name:string, username:string }>{ 
    "use server" 
    const supabase =await createClient();  
    const {data:currentProfile, error, status}= 
    await supabase.from('profiles')
    .select(`*`)
    .eq('id', id)
    .single()
    if (error && status !== 406) {
        throw error
      }
     
    return currentProfile
  }
 
  export async function deleteProfile(id:string){ 
    "use server" 
    const supabase =await deleteClient();
    const auth_ =await createClient()
    const { error}= await auth_.auth.signOut()
    if (error) {
      throw error
    }
    
    const { error:deleteErr }= 
    await supabase.admin.deleteUser(id)
    if (deleteErr) {
        throw deleteErr
      }
   return redirect('/')
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
export async function updateProfile({ 
    user ,  
    avatar_url, 
    email, 
    education,
    address,
    password,
    website,
    fullname,
    about
  }:{user:{id:string}, avatar_url:string , email:string, education:string,address:string, password:string, website:string, fullname:string, about:string, username:string }
   ) {
 "use server"
const supabase=await createClient() 
      const {data, error } = await supabase.from('profiles').upsert({
        id: user?.id,
        full_name: fullname,  
        avatar_url, 
        email, 
        education,
        address,
        password,
        website,  
        updated_at: new Date().toISOString(),
        about
      })
      //console.log(error)
      if (error) throw error
      console.log('Profile updated!')
 return data
  }