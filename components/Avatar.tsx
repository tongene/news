'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client' 
export default function Avatar({ url, size, alternativeUrl }:{url:string, size:number, alternativeUrl:string}) {
  const supabase = createClient()
  const [avatarUrl, setAvatarUrl] = useState(url)
 
  useEffect(() => {
    async function downloadImage(path:string) { 
      try {
        const { data, error } = await supabase.storage.from('profile_avatars').download(path)
        if (error) {
          throw error
        }
       
        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (url) downloadImage(url)
  }, [url, supabase]) 
  return (
    <> 
    {avatarUrl ? (
    <div className='h-screen w-screen'>
      
    <div 
    className='h-screen w-screen' 
    style={{
      backgroundImage: `url(${avatarUrl||alternativeUrl})`, 
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '',  
      backgroundColor: 'transparent',
      backgroundSize: 'cover', 
    }} 
  />
  <div className='relative h-full w-full bottom-full my-3 sm:my-1 lg:my-1'> 
      <div 
    className="absolute rounded-bl-full border w-3/4 h-1/2 sm:h-4/5 left-1/3 lg:left-1/2 xl:h-full" 
    style={{
      backgroundImage: `url(${avatarUrl|| alternativeUrl})`, 
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover', 
    }} 
  />   
     </div>
   </div> ) : (
      <div className="" style={{ height: size, width: size }} />
    )}  
  </>
  )
}

