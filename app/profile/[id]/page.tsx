
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";   
 import Profile from "@/components/Profile";
import { getProfile, getUserPosts } from "../profileActions"; 
import { type User } from "@supabase/supabase-js";
import { UserPostProps } from "@/app/types";
import type { Metadata, ResolvingMetadata } from 'next'
import { Suspense } from "react";
import StructuredData from "@/components/StructuredData";
import { ProfilePage, WithContext } from "schema-dts";

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
    title:`Urban Naija | ${userDetails.fullname || userDetails?.full_name}`,
     description:userDetails?.about,
     keywords:[`${userDetails.fullname || userDetails?.full_name}`],
          twitter: {
      card: 'summary_large_image',
    description:userDetails?.about,
      title:`${userDetails.fullname || userDetails?.full_name}`,
      images:[userDetails.avatar_url, ...previousImages],  
    },
    openGraph: {
    images: [userDetails.avatar_url, ...previousImages],
    },
     alternates: {
    canonical:  `https://culturays.com/profile/${id}/`,
 
  }
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

  
  const jsonLd:WithContext<ProfilePage> = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: `${currentProfile?.fullname || currentProfile?.full_name}`, 
     headline: `${currentProfile?.fullname || currentProfile?.full_name}`, 
     description:currentProfile?.about , 
     url:`https://culturays.com/profile/${id}/`,
     mainEntity: {
      "@type": "Person",
      name:`Urban Naija | ${currentProfile.fullname || currentProfile?.full_name} - Profile`,     
      image: currentProfile.avatar_url,
      ////  //use later
      // jobTitle: "Editor-in-Chief",      
      // worksFor: {
      //   "@type": "Organization",
      //   name: "Culturays"
      // },
      // sameAs: [
      //   "https://twitter.com/ChristinaNgene",
      //   "https://www.linkedin.com/in/christinangene"
      // ]
     
    },
     
      mainEntityOfPage: {
       "@type": "WebPage",
       "@id":`https://culturays.com/profile/${id}/`, 
     },

     image:currentProfile.avatar_url, 
     keywords:[`${currentProfile.fullname || currentProfile?.full_name}`],    
     
   };
  
  return (
    <div>
      <StructuredData schema={jsonLd} />
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
