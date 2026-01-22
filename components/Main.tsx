"use client" 
import { startTransition, useEffect, useMemo, useState } from 'react' 
import { Cursors, InnerEdges, PostXNode, SideNode } from '@/app/types'  
import MainBottom from './MainBottom'
import SideBar from './Side' 
import MainPosts from './MainPosts';
import Next from './Home/Next' 

  const newsViews=async()=>{ 
           const res= fetch('https://content.culturays.com/graphql',{ 
              method: "POST",
               headers: {
                   'Content-Type':'application/json'
                  },
                  next: { revalidate: 60 }, 
              body: JSON.stringify({
                query:`
                query WPPOSTS { 
             posts(first: 10, where: {categoryName: "Latest"}) { 
           pageInfo {
        endCursor
      }
         edges{ 
            node{
             
            categories {
                  nodes {
                    name
                    slug
                  }
                } 
       }
          } }} 
               ` 
              
              }) 
            }).then((res) => res.json() )
            .then((data) => data.data ) 
           .catch((err) => console.log("err", err)) 
           const dataView= await res
    const postX = dataView.posts?.pageInfo?.endCursor 
if(!postX)return
      const wprest = fetch('https://content.culturays.com/graphql',{     
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS($after: String) {                  
             posts(first:4 ,after:$after, where: {categoryName: "Latest"}) {
                pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
           } 
        } 
         `, variables:{
          after:postX 
         }
        
        })
        })
        .then(response => response.json() )  
        .then(data => data.data.posts ) 
        .catch(error => console.error('Error:', error));  

     return wprest
  }
  async function sidePlusViews(){
   const latestPosts=await newsViews()
  const latestStr=latestPosts?.pageInfo?.endCursor 

     const wprest = fetch('https://content.culturays.com/graphql', { 
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
       next: { revalidate: 60 }, 
        body: JSON.stringify({
          query:`
          query WPPOSTS {                  
             posts(first:4 ,after:"${latestStr}", where: {categoryName: "Latest"}) {
                pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
                edges{
               cursor
              node{
               id
                title
                  slug
                  tags {
                    nodes {
                    id
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
           }  } 
        } 
         ` 
        
        })
        , 
        }).then(response => response.json()) 
        .then(data => data.data) 
        .catch(error => console.error('Error:', error)); 
      // const response = wprest?.data?.posts?.edges
   
    return wprest
  }
   async function postCategories(){
 
  const wprest = fetch('https://content.culturays.com/graphql',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
       next: { revalidate: 60 }, 
        body: JSON.stringify({
          query:`
          query WPPOSTS { 
         categories(where: {name: "Topics"}) {          
         edges {
          cursor      
          node {
        name
        slug
        posts{
        edges{
       cursor
        }
        }
         children (where: {exclude: "dGVybTo0MDQ="}){
            
         edges {
          cursor
              
          node {
          name
          slug
         posts(first:5) {
        pageInfo{
        endCursor
      startCursor
      hasNextPage
           }
         edges{
         cursor
            node {
              author {
                node {
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
                  tags {
                nodes {
                id
                  name
                  slug
                }
              }
              
                postsTags {
              nodes {
                name
                slug
              }
            }
              date
              excerpt
               slug
              title
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
             
             
            }
          } 
      }
        }}
      }  }}
  }
    }   `  
        
        })
        
        }).then(response => response.json()) 
        .then(data => data.data)
        .catch(error => console.error('Error:', error));
       // const response = wprest?.data
        return wprest ??[]
  } 
const Main = () => { 
const [activeSet, setActiveSet]=useState(true)
const [actIdx, setActIdx]=useState(-1)
const [categoryPost,setCategoryPost]=useState<InnerEdges[]>([])
const [categoryName,setCategoryName]=useState('') 
const [top_PostsCa, setTopPostsCa]=useState<PostXNode[]>([]) 
const [sidebarItems, setSidebarxItems]=useState<Cursors[]>([])
// const [top_Last_categories, setLast_categories]=useState([])

useEffect(() => {
  const x_wiki = async () => {
    const post_data = await postCategories();
    const postCategory_Children =
      (post_data?.categories?.edges as InnerEdges[])
        ?.map(xy => xy?.node?.children?.edges)
        ?.flat() ?? [];

    setTopPostsCa(postCategory_Children);

    const sidebarxItems = await sidePlusViews();
    const txPlus = sidebarxItems.posts?.edges.map((dy: InnerEdges) => dy.node);

    setSidebarxItems(txPlus);
  };

  x_wiki();
}, []);
 
const categoryMap = useMemo(() => {
  const map: Record<string, InnerEdges[]| InnerEdges> = {};

  top_PostsCa?.flat().forEach((cat) => {
    const name = cat.node.name;
    const posts = cat.node.posts?.edges ?? [] ;
    map[name] = posts;
  });

  // Add ALL category
  map["ALL"]= Object.values(map).flat();

  return map;
}, [top_PostsCa]);

const changeSet = (i:number, name:string) => {
  startTransition(() => {
    setActIdx(i);
    setCategoryName(name);
    setCategoryPost(categoryMap[name] as InnerEdges[]?? []);
  });
};

 
  const changeView = async(i:number,name:string) =>{
     setActiveSet(prev => !prev)
    setActIdx(i);
    setCategoryName(name)  
    };
    
  
  return ( 
<section className='clear-left'> 
<div className="lg:flex justify-center sm:px-11 px-4 m-auto" style={{maxWidth:'1700px'}}> 
<div className='max-w-7xl mx-auto'> 
  
<div className='lg:flex xl:px-4'> 
<div className='py-20 md:px-1 m-auto'> 
<div className='py-5'>
<div className='flex border-b shadow-sm justify-around items-center sm:w-[580px] md:w-[710px] lg:w-[600px] xl:w-[800px] 2xl:w-[1000px] mx-auto'> 
<h3 data-test="header-1" className='text-xl font-bold w-60'>Don&#39;t Miss</h3>  
<hr className='bg-black h-1 w-3/4 my-4'/>
<div className='w-2/3' >
<ul className='flex justify-end flex-wrap py-2'> 
 <li
  className={
    actIdx === -1
      ? 'font-bold cursor-pointer text-gray-700 bg-gray-100 p-2 rounded underline decoration-cyan-500 decoration-4 hover:text-gray-900'
      : 'cursor-pointer text-gray-600 bg-gray-100 p-2 rounded hover:text-gray-900'
  }
  onClick={() => changeSet(-1, '')}
>
  All
</li>
 
    {top_PostsCa?.map((xy, idx) =>  
      <li 
    className={
    actIdx === idx
      ? 'font-bold cursor-pointer text-gray-500 bg-gray-100 p-2 rounded underline decoration-cyan-500 decoration-4 hover:text-gray-800 my-0.5'
      : 'cursor-pointer text-gray-600 bg-gray-100 p-2 rounded hover:text-gray-800 m-0.5'}
      onClick={() =>changeSet(idx, xy.node.name)}  
        key={xy.node.name + ' ' + xy.node.slug}>
        {xy.node.name}
      </li> 
    )}   
  </ul> 
</div> 
</div>  
 
</div>

<Next categoryName={categoryName} categoryPost={categoryPost} />

 <hr/> 
</div>   

</div>   
 <hr className='h-1 w-4/5 m-auto my-4'/>
   <MainPosts /> 
 
</div>  
<div > 
     <SideBar 
     sideBarPlus={sidebarItems}/>  
  </div> </div>
     <MainBottom />   
   </section>
  )
}

export default Main