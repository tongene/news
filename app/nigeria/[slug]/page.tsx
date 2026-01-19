import React from 'react' 
import { notFound } from 'next/navigation'; 
import type { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { fetchContent } from '../pages-action';
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
const replaceHTMLTags=(string:string)=>{
  const regex = /(<([^>]+)>)/gi;
  const newString = string?.replace(regex, "");
  return newString
   }
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata 
): Promise<Metadata> {
  const {slug} = await params  
  const page= await fetchContent(slug) 
  const previousImages = (await parent).openGraph?.images || [] 

  return {
    title: `Urban Naija | ${page?.title}`,
    description: replaceHTMLTags(page?.excerpt) ,
    keywords:["Nigeria", "Industry", "China", "Aba", "Nnewi", "News", "Manufacturing", "Production", "Trade", "Tariffs", "Farming", "Products", "Market", "Balogun", "Lagos", "Food", "Export", "Import", "Mining", "Factory", "Ajaokuta", "Steel", "Fabric", "Transport", "Tax", "Africa", "ECOWAS"],
    twitter: {
      card: 'summary_large_image',
      title: page?.title  ,
      description: replaceHTMLTags(page?.excerpt),  
      images:[page?.featuredImage.node.sourceUrl, ...previousImages],  
    },
     openGraph: {
      title: `Urban Naija | ${page?.title}`,
      description: replaceHTMLTags(page?.excerpt), 
      url: `https://culturays.com/nigeria/${page.slug}/`,
      siteName: 'Urban Naija',
      images: [{url:page?.featuredImage.node.sourceUrl, width: 800,
          height: 600, ...previousImages}],
      type: "article",
      publishedTime:page?.date,
    },
     alternates: {
    canonical:  `https://culturays.com/nigeria/${page.slug}/`,
 
  },
  } 
}
export default async function ManufacturingPag({params}: {
  params: Promise<{ slug: string }>
})  {
  // or use `cache: 'no-store'` for SSR
   const {slug} = await params  
  const page= await fetchContent(slug)  
  if (!page) return notFound();

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <p className='shadow-2xl border p-4 w-max'>
      <Link href='/nigeria/'><FontAwesomeIcon icon={faAngleLeft} /> </Link></p>
    <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
     <div dangerouslySetInnerHTML={{__html:page?.excerpt}}className='py-4 text-lg italic'/> 
   <div className='relative'> <div dangerouslySetInnerHTML={{__html:page?.featuredImage?.node?.caption}} className="absolute top-0 left-6 p-4 leading-6 shadow-xl font-mono max-w-xl"/> 
    <hr className='my-2 h-0.5 bg-gray-400'/></div> 
      <Image
    src={page?.featuredImage?.node?.sourceUrl} 
    width={1200}
    height={675}
    alt={page?.featuredImage?.node?.altText} 
    priority={true}
    />
    
     <div
        className="prose [&_p]:py-2 [&_iframe]:w-1/2 [&_figure>figcaption]:italic [&_figure>figcaption]:py-2 [&_figure>figcaption]:text-sm text-lg leading-9 [&_.wp-block-image>figure>img]:border-2 [&_figure>figcaption]:italic [&_figure>figcaption]:py-2 [&_figure>figcaption]:text-sm [&_figure>figcaption]:text-center [&_img]:max-w-xs [&_img]:sm:max-w-sm [&_img]:md:max-w-2xl [&_img]:max-h-96 [&_img]:m-auto [&_.wp-block-image>figure>img]:border-black [&>h3]:text-2xl [&>h3]:font-bold [&>h2]:text-2xl [&>h5]:font-bold [&>h5]:text-xl [&>h2]:font-bold [&>h4]:text-2xl [&>h4]:font-bold [&_p>a]:hover:bg-green-900 [&_p>a]:text-green-600 py-0.5 [&>h5]:py-8 [&>h4]:py-8 [&>h2]:py-8 [&>h2]:my-6 [&>h3]:py-8 [&>h2]:bg-gray-700 [&>h3]:bg-gray-700 [&>h4]:bg-gray-700 [&>h2]:text-gray-200 [&>h3]:text-gray-200 [&>h4]:text-gray-200 [&>h2]:px-3 [&>h3]:px-3 [&>h4]:px-3 [&_img]:m-auto [&_.wp-block-media-text]:sm:flex [&_.wp-block-media-text]:border [&_.wp-block-media-text>div>p]:px-2 [&_.wp-block-media-text>figure>img]:max-w-72 [&_.wp-block-media-text>figure>img]:py-4 [&_.wp-block-media-text>figure>img]:px-2 [hr]:h-4 [&>hr]:border-gray-500 [&>hr]:h-11"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </main>
  );
}
