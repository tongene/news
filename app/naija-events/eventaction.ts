import { createClient } from "@/utils/supabase/server";
import { type User } from "@supabase/supabase-js";
import { EventsProps } from "../types";

export const addEventTitle = async (formData:FormData) => {
    const supabase =await createClient();
    const { 
      data: { user }, 
      } = await supabase.auth.getUser();
    try {
   
  const title = formData.get('title') as string
  const file= formData.get('file')
  const date= formData.get('date');
  const location= formData.get('location');
  const description= formData.get('description') as string
  const genre= formData.get('genre');
  const artist= formData.get('artist');
  const excerpt=description.split(' ').slice(0,10).join(' ')
  const slug=title.toLowerCase().replace(/ /g,"-").trim()
  const supabase =await createClient();
  if (!file ) {
        throw new Error('Select an image to upload.')
      } 
  const filePath=[] as File []
    // const file =event.target.files[0]
//     if(file ){
//   const files = file?.name.split('.').pop()
//   const file_Path = `${(user as User).id}-${Math.random()}.${files}`
//  filePath.push(file_Path)
//   const { error: uploadError } = await supabase.storage.from('event_avatars').upload(file_Path, file,{upsert: true})
//   if (uploadError) {
//     throw uploadError
//   }
  
//   }
  
  const { data, error } = await supabase
  .from('events')
  .insert([
  { title,
  date,
  location,
  is_pending: true,
  user_id:user?.id,
  event_file:filePath,
  slug ,
  description,
  genre,
  excerpt:excerpt +  '...',
  artist:artist 
  },
  ])
  .select(); 
  
    if (error) {
        console.log(error);
      }
    }
  
    catch (err) {
    console.log(err);
    } 
  }
  export const updateEventTitle = async (formData:FormData, eventEdit:EventsProps) => { 
    const supabase =await createClient();
    const { 
      data: { user }, 
      } = await supabase.auth.getUser();
    try { 
    const title = formData.get('title') as string;
    const date= formData.get('date');
    const location= formData.get('location');
    const description= formData.get('description') as string
    const genre= formData.get('genre');
    const excerpt= description.split(' ').slice(0,10).join(' ')
    const slug=title.toLowerCase().replace(/ /g,"-").trim()
    const file= formData.get('file')
    const supabase =await createClient();
    if (!file ) {
      throw new Error('Select an image to upload.')
    } 
  
 
  const filePath=[]as File []
//     if(file){
//   const files = file?.name.split('.').pop()
//   const file_Path = `${(user as User).id}-${Math.random()}.${files}`
//  filePath.push(file_Path)
//   const { error: uploadError } = await supabase.storage.from('event_avatars').upload(file_Path, file,{upsert: true})
//   if (uploadError) {
//     throw uploadError
//   }
  
//   }
   
    const { data, error } = await supabase
    .from('events')
    .update([
    {
    title,
    date,
    location,
    is_pending: false,
    user_id:user?.id,
    slug,
    description,
    genre,
    excerpt,
    file:filePath
    },
    ])
    .eq('id', eventEdit.id)
    .select();
  
    if (error) {
    console.log(error);
    }
    }
  
    catch (err) {
    console.log(err);
    } 
  
    }