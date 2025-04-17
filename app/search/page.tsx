import Search from "@/components/Search" 
import { searchValues } from "../lib/searches/searches"
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
? `${process.env.NEXT_PUBLIC_BASE_URL}/search` 
: "http://localhost:3000/search";
export const metadata = {
metadataBase: new URL(defaultUrl), 
 title:"Culturays | Search",
 alternates: {
  canonical: 'https://culturays.com/search',

}, 
}; 
const SearchPage = async ({searchParams}: {
  searchParams: Promise<{ name: string }>} ) => {
  const {name}=await searchParams  
 const content = await searchValues(name) 

  return (
    <div>
   <Search name={name} content={content} />  
    </div>
  ) 
} 

export default SearchPage
