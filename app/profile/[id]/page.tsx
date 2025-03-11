
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";   
 import Profile from "@/components/Profile";
import { getProfile, getUserPosts } from "../profileActions"; 
import { type User } from "@supabase/supabase-js";
import { UserPostProps } from "@/app/types";
import type { Metadata, ResolvingMetadata } from 'next'
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
 
const INITIAL_NUMBER_OF_POSTS = 2 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata 
): Promise<Metadata> { 
  
      const id =(await params).id
      const userDetails= await getProfile(id)
      const previousImages = (await parent).openGraph?.images || [] 
 
  return {
    title:` ${userDetails.fullname || userDetails?.full_name}`,
    openGraph: {
    images: [userDetails.avatar_url, ...previousImages],
    },
  }
}
const UserPage =async({params}: Props) => {
  const id =(await params).id
  const supabase =await createClient()    
  const {
  data: { user }, 
  } = await supabase.auth.getUser();  

  const currentProfile = await getProfile(id)
 
  if(!currentProfile){
    notFound()
  }

  const userItems =async():Promise<UserPostProps[]>=>{ 
    const initialPosts = await getUserPosts(0, INITIAL_NUMBER_OF_POSTS, id)  
    return initialPosts ??[]
  }
  const userPosts = await userItems() 
 
  return (
    <div> 
      <Suspense>  
   <Profile
     profile={currentProfile}
     user={user as User}
     userPosts={userPosts} 
     /> 
    </Suspense></div>
  )
} 

export default UserPage
