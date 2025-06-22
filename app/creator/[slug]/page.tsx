import {userItem} from '../../data/usershandle'
import Creator from '@/components/Creator'  
import type { Metadata, ResolvingMetadata } from 'next'

  type CreatorProps={
    name:string 
    avatar:{url:string } 
 }  
 type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
  export async function generateMetadata({ params }: Props,
    parent: ResolvingMetadata 
   ): Promise<Metadata> { 
    const slug =(await params).slug
    const user_detailsPromise: Promise<CreatorProps> = userItem(slug);
    const user_details = await user_detailsPromise;
    const previousImages = (await parent).openGraph?.images || []
    return {
      title:`Urban Naija News | Creator -`,
      openGraph: { 
        images: [user_details?.avatar.url,...previousImages],
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