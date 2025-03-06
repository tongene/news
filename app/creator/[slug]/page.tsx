// import {userItem} from '../../data/usershandle'
// import Creator from '@/components/Creator' 
// import type { Metadata, ResolvingMetadata } from 'next'
// const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
//   ? `${process.env.NEXT_PUBLIC_BASE_URL}/creator` 
//   : "http://localhost:3000/creator";
  
//   type CreatorProps={
//     name:string 
//     avatar:{url:string } 
//  }  
//  type Props = {
//   params: Promise<{ slug: string }>
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
// }
//   export async function generateMetadata(  { params }: Props,
//     parent: ResolvingMetadata 
//    ): Promise<Metadata> { 
//     const slug =(await params).slug
//     const user_detailsPromise: Promise<CreatorProps> = userItem(slug);
//     const user_details = await user_detailsPromise;
//     const previousImages = (await parent).openGraph?.images || []
//     return {
//       title:`Culturays | Creator - ${user_details?.name}`,
//       openGraph: { 
//         images: [user_details?.avatar.url,...previousImages],
//       },
//     }
//   }  
function CreatorPage() {
 
  return (
<div> 
  {/* <Creator />  */}
</div> 
  )
}

export default CreatorPage