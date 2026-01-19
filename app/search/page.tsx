import Search from "@/components/Search" 
import { searchValues } from "../lib/searches/searches"
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
? `${process.env.NEXT_PUBLIC_BASE_URL}/search/` 
: "http://localhost:3000/search/";
export const metadata = {
metadataBase: new URL('https://culturays.com'), 
 title:"Urban News | Search",
 alternates: {
  canonical: 'https://culturays.com/search/',

}, 
};
const newsByLatest =()=>{ 

const res= fetch('https://content.culturays.com/graphql',{ 
method: "POST",
  headers: {
      'Content-Type':'application/json'
    },
body: JSON.stringify({
  query:`
  query WPPOSTS { 
posts(first: 10, where: {categoryName: "Latest"})  { 
 
pageInfo {
endCursor
} 
edges{
cursor 
node{
id
title
  slug
  
  tags {
nodes {
name
slug
}
}
categories {
    nodes {
      name
      slug
    }
  }
excerpt
  date
    author {
  node {
firstName
lastName
name
slug
description
}
}
  featuredImage {
    node {
      altText
      sourceUrl
    }
  }

}
 }}}  
 
  ` 

}) 
}).then((res) => res.json() )
.then((data) => data.data ) 
.catch((err) => console.log("err", err))  
return res


}
const SearchPage = async ({searchParams}: {
  searchParams: Promise<{ name: string }>} ) => {
  const {name}=await searchParams  
 const content = await searchValues(name) 
 const latestPosts=await newsByLatest()
 const searchPageContent= latestPosts.posts.edges
 
  return (
    <div>
   <Search name={name} content={content} searchPageContent={searchPageContent} />  
    </div>
  ) 
} 

export default SearchPage
