import {userItem} from '../../data/usershandle'
import Creator from '@/components/Creator'  
import type { Metadata, ResolvingMetadata } from 'next'

  type CreatorProps={
    name:string 
    avatar:{url:string}
    description:string 
 }  
 type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
  export async function generateMetadata({ params }: Props,
    parent: ResolvingMetadata 
   ): Promise<Metadata> { 
    const {slug} =await params 
    const user_detailsPromise: Promise<CreatorProps> = userItem(slug);
    const user_details = await user_detailsPromise;
    const previousImages = (await parent).openGraph?.images || []
    return {
      title:`Urban Naija News | Creator`,
      description: user_details?.description,
      openGraph: {     
      title:`Urban Naija News | Creator`,
      description: user_details?.description,
      url: `https://culturays.com/creator/${slug}`,
      siteName: 'Urban Naija News', 
      type: 'article', 
        images: [{url:user_details?.avatar.url,...previousImages,
          width: 800,
          height: 600,}],
      },
      twitter:{
      card: 'summary_large_image',
      title: user_details.name,
      description: user_details.description,
      images: [user_details.avatar.url],
   },
    alternates: {
  canonical: `https://culturays.com/creator/${user_details?.name}/`,

},
 }
  }  
function CreatorPage() {
 
  return (
<div> 
   <Creator />  
</div> 
  )
}

export default CreatorPage