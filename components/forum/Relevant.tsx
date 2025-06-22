"use client"
import { InitialPosts, PostProps } from "@/app/types"
import Image from "next/image"
import Link from "next/link" 

const Relevant = ({related, item}:{related:InitialPosts[], item:PostProps}) => { 
  return (
    <div className=' my-8'> 
    <h2 className='text-2xl font-bold text-center border-b-4 py-2 m-auto dark:text-gray-200 text-gray-700'>Relavant Posts</h2>
  <aside className='w-max py-2'>  
  {related.filter((xy)=> xy.title!== item.title).map((ex, i)=> 
 (ex?.files??[][0])&& <div className='border my-1 max-w-xs rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200' key={ex.title + ' ' + i}> 
   <Link href={`/forum/post/${ex.slug}/${ex.id}/`}>
  <Image  
  src={`${process.env.SUPABASE_PUBLIC_POST_IMAGE_URL}${(ex?.files??[][0])}`}  
  width={300} 
  height={220}  
  alt={ex.title as string} 
  /> 
  <p className='m-2 text-lg py-4 text-gray-600 hover:text-gray-800 border-t border-b border-yellow-600 p-2'>{ex.title}</p> 
  </Link> 
  </div>
  )} 
   
  </aside>
  </div>
  )
}

export default Relevant
