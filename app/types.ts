import { type User } from "@supabase/supabase-js";
// user_metadata:{
//   full_name:string,
//   picture:string,
//   email:string,

// } ;
export type SearchedData={
id:string;
title:string;
date:Date

}
export type CharacterProps = { 
id: string, 
title:string
slug:string,
excerpt:string
content:string
node:{
title:string,
slug:string
excerpt:string
content:string
featuredImage:{
node:{
sourceUrl:string
caption:string
altText:string
}
}

}
featuredImage:{
node:{
sourceUrl:string
caption:string
altText:string
}
}
//  charactertitles:{key:string, value:string}
charactertitles: {
slug: string
name: string
filmname:string
nodes:string[]
filmAbout: string
characterWiki:string
characterOtherName:string
filmFamily:string
genre:string
filmDirector:string
releaseDate:string
actorsBios:string
actorImgs:{
  node:{
  sourceUrl:string
  caption:string
  altText:string
  }
  }
  actorImgs2:{
    node:{
    sourceUrl:string
    caption:string
    altText:string
    }
    }
charRel:{
edges:{
node:{
title:string 
excerpt:string
content:string
slug:string
featuredImage:{
node:{
sourceUrl:string
caption:string
altText:string
}
}
charactertitles: {
slug: string
name: string
filmname:string
nodes:string[]
filmAbout: string
characterOtherName:string
filmFamily:string
genre:string
filmDirector:string
releaseDate:string
charRel:{
edges:{ 
node:{
title:string
excerpt:string
content:string
slug:string
featuredImage:{
node:{
sourceUrl:string
caption:string
altText:string
}
}
}
}
}
portrayedby:string,     
charBios:string
filmImg1:{
node:{
sourceUrl:string
caption:string
altText:string
}
}
}
}
}
}
portrayedby:string,     
charBios:string
filmImg1:{
node:{
sourceUrl:string
caption:string
altText:string
}
}
}
contentTags:{
slug: string
name: string 
nodes:{
slug: string
name: string

}[]
}
} 
export type Trendy={
trendX:{
  slug:string
excerpt:string
date:string
content:string
} 
title:string
slug:string
excerpt:string
date:string
content:string
}

export type TrendsProps={
title:string
excerpt:string
content:string
date:string
slug:string
featuredImage:{
  node:{
  sourceUrl:string
  caption:string
  altText:string
  }
  }
  trendinggroup:{
intro:string
  }
  trends:{
    nodes:{
title:string
date:string
slug:string
excerpt:string 
featuredImage:{
  node:{
  sourceUrl:string
  caption:string
  altText:string
  }
  }
}[]
  }
}
export interface MainProps {
user: User ;
trending:TrendsProps[]

}

export type PostProps={
id?:number |string
slug?:string
title?:string
genre?:string[]  
files?:string[],
user_id?:string
comments?:string[]
likes?:string[]
suggested_tags?:string[]
tags?:string[]
index?:number
username?:string
avatar_url?:string,
user_email?:string
story?:string
created_at?:string
parent_id?: string ; 
post_id?:string
article_title?:string
}
export type ArticlesReplies={
  slug:string
  title:string
    story:string
    id:number
    tags?:string[]
    comments?:string[],
    user_id:string
    suggested_tags?:string[]
    avatar_url?:string
  files?:string[],
  likes?:string[],
  username?:string
  user_email?:string  
}
export type InitialPosts={
id?:number,
title?: string
slug?:string,
genre?:string[],
story?:string,
tags?:string[]
user_id?:string,
avatar_url?:string
username?:string
user_email?:string    
files?:[],
likes?:[],
comments?:string[],
suggested_tags?:string[] 
created_at?:string
parent_id?: string
article_title:string

//[key: string]?: any
}

export type BdaysProps={
   info:string 
    img:string
    name:string
  }
  
export interface Event {
name: string; 
img_url: string;
title: string;
slug:string;
genre:string;
date:Date;
day:string;  
[key: string]: any
}
export interface EventsProps { 
name: string;
img_url: string;
title: string;
slug:string;
genre:string;
date:Date;
day:string; 
[key: string]: any
}


export type InitialComments={
id?:number
title?:string
genre?:string[]  
files?:string[],
user_id?:string
comments?:string[]
likes?:boolean[]
username?:string
user_name?:string
suggested_tags?:string[]
tags?:string[]
index?:number
avatar_url?:string,
user_email?:string
post_id?:string
parent_id?:string |null 
created_at?:Date    
// [key: string]: any;   

}


export type CommentProps={
id?:number
title?:string
genre?:string[]  
files?:string[],
user_id?:string
comments?:string[]
likes?:boolean[]
user_name?:string
suggested_tags?:string[]
tags?:string[]
index?:number
avatar_url?:string,
user_email?:string
post_id?:string
parent_id?:string |null
created_at?:Date
slug?:string
// [key: string]: any; 
} 

export interface SetCommentsProps { comments:InitialComments[], commentsByParentId: { [parentId: number]: InitialComments[] }, comment:CommentProps,  setCommentObj:React.Dispatch<React.SetStateAction<CommentProps>>,setIsEditingComment:React.Dispatch<React.SetStateAction<boolean>>, isEditingComment:Boolean, setActiveIdx:React.Dispatch<React.SetStateAction<string | number>>,setShareOptions:React.Dispatch<React.SetStateAction<boolean>>, user: User, setShow:React.Dispatch<React.SetStateAction<boolean>>, shareOptions:boolean, show:Boolean,imgIndex:String, activeIdx: string|number ,post:PostProps, replyId:string ,setReplyId:React.Dispatch<React.SetStateAction<string>>, setActiveCommentReply : React.Dispatch<React.SetStateAction<boolean>>, activeCommentReply:Boolean, commentObj:CommentProps, setEditId:React.Dispatch<React.SetStateAction<string>>,likeCommAction:Function,deleteCommAction:Function, setUserActions:React.Dispatch<React.SetStateAction<boolean>>,userActions:boolean,postReply:boolean, setPostReply:React.Dispatch<React.SetStateAction<boolean>>,commentCommAction:Function, selectedImages:string[]
setSelectedImages:React.Dispatch<React.SetStateAction<string[]>>,
}
export type RelatedProps={
title:string
articles_replies:string[]
}
export type RelevantProps={
related:{related:RelatedProps[]}
item:string
}
export interface SetCommentXProps { 
 trendX:{
  slug:string
  excerpt:string
 }
slug:string
excerpt:string
date:string
content:string, 


} 

export type VidProps={
id:string
slug:string
excerpt:string
date:string
content:string
videos:{
videoUrl:{
node:{
mediaItemUrl:string
}
}
}
author:{
  node:{
    name:string
    slug:string
    avatar:{
    url:string
    }
  }
}
videosGroup:{
  related:{
    nodes:{
      title:string
      slug:string
      featuredImage:{
        node:{
          sourceUrl:string 
          altText:string
        }
      }
    }[]
  }
videoUrl:{
node:{
mediaItemUrl:string
}}
}
genre:string
title:string
featuredImage:{
node:{
sourceUrl:string
caption:string
altText:string
}
}
contentTags:{
  id:string
slug: string
name: string 
nodes:{
  id:string
slug: string
name: string

}[]
}
node:{
video:{
  url:string
}
}
}
 
export type AllObj={}

export type NAPINewsProps={
edges:{

  node:{
    naijaOnNetflix:{ 
      edges:{
      node:{
      slug: string 
      title:string
      date:string
      excerpt:string
      author:{
      node:{
      name:string
      slug:string
      avatar:{
      url:string
      }
      }
      
      }
      
      contentTags:{  
      nodes:{
      slug: string 
      name: string 
      }
      
      }
      }
      }
      nodes:{ 
      id:string
      slug:string
      title:string
      excerpt:string
      date:Date
      content:string
      
      author:{
      node:{
      name:string
      slug:string
      avatar:{
      url:string
      }
      }
      
      }
      featuredImage:{
      node:{
      sourceUrl:string
      caption:string
      altText:string
      }
      }
      contentTags:{
      slug: string
      name: string 
      nodes:{
      slug: string
      name: string
      
      }[]
      }
      netflixNewsGroup:{
      intro:string
      netflixNewsRelated:{
      nodes:[
      {
      title:string
      slug:string
      featuredImage:{
      node:{
      sourceUrl:string
      caption:string
      altText:string
      }
      }
      }
      ]} 
      }
      }
      pageInfo:{
      hasNextPage:boolean,
      endCursor:string
      }
      
      }
      contentTags:{  
        nodes:{
        slug: string 
        name: string 
        }
        
        }
        slug: string
        title: string 
        date: string
        author:{
          node:{
          name:string
          slug:string
          avatar:{
          url:string
          }
          }
          
          }
          netflixCategories:{
            nodes:{
                id:string
          slug: string
          name: string 
          nodes:{
          slug: string
          name: string
            }
          
          
          }[]
          }
}}[]

id:string
slug:string
title:string
excerpt:string
date:Date
cursor:string 
featuredImage:{
node:{
sourceUrl:string
caption:string
altText:string

}
}

naijaOnNetflix:{
  date:string
  author:{
  node:{
  name:string
  slug:string
  avatar:{
  url:string
  }
  }
  
  }
  contentTags:{  
    nodes:{
    slug: string 
    name: string 
    }
    
    }
  edges:{
  node:{
  slug: string 
  title:string
  date:string
  excerpt:string
  author:{
  node:{
  name:string
  slug:string
  avatar:{
  url:string
  }
  }
  
  }
  
  contentTags:{  
  nodes:{
  slug: string 
  name: string 
  }
  
  }
  }
  
  }
  nodes:{ 
  id:string
  slug:string
  title:string
  excerpt:string
  date:Date
  content:string
  
  author:{
  node:{
  name:string
  slug:string
  avatar:{
  url:string
  }
  }
  
  }
  featuredImage:{
  node:{
  sourceUrl:string
  caption:string
  altText:string
  }
  }
  contentTags:{
  slug: string
  name: string 
  nodes:{
  slug: string
  name: string
  
  }[]
  }
  netflixNewsGroup:{
  intro:string
  netflixNewsRelated:{
  nodes:[
  {
  title:string
  slug:string
  featuredImage:{
  node:{
  sourceUrl:string
  caption:string
  altText:string
  }
  }
  }
  ]} 
  }
  }
  pageInfo:{
  hasNextPage:boolean,
  endCursor:string
  }
  
  }

nodes:{ 
id:string
slug:string
title:string
excerpt:string
date:Date

featuredImage:{
node:{
sourceUrl:string
caption:string
altText:string
}
}
contentTags:{
slug: string
name: string 
nodes:{
slug: string
name: string 
} 
}

}
node:{  
  content:string
  excerpt:string
  naijaOnNetflix:{
edges:{
node:{
slug: string 
title:string
date:string
excerpt:string
featuredImage:{
  node:{
  sourceUrl:string
  caption:string
  altText:string
  }
  }
author:{
node:{
name:string
slug:string
avatar:{
url:string
}
}

}
contentTags:{  
nodes:{
id:string
slug: string 
name: string 

}

}
}
} 
nodes:{ 
id:string
slug:string
title:string
excerpt:string
date:Date
content:string
author:{
node:{
name:string
slug:string
avatar:{
url:string
}
}

}
featuredImage:{
node:{
sourceUrl:string
caption:string
altText:string
}
}
contentTags:{
slug: string
name: string 
nodes:{
slug: string
name: string

}[]
}
netflixNewsGroup:{
intro:string
netflixNewsRelated:{
nodes:[
{
title:string
slug:string
featuredImage:{
node:{
sourceUrl:string
caption:string
altText:string
}
}
}
]} 
}
}
pageInfo:{
hasNextPage:boolean,
endCursor:string
}

}
slug:string
title:string
date:Date

featuredImage:{
node:{
sourceUrl:string
caption:string
altText:string
}
}
author:{
node:{
name:string
slug:string
avatar:{
url:string
}
}

}
}

author:{
node:{
name:string
slug:string
avatar:{
url:string
}
}

} 
content:string 
pageInfo:{
hasNextPage:boolean,
endCursor:string
}
hasNextPage:boolean,
endCursor:string
netflixNewsGroup:{
intro:string
netflixNewsRelated:{
  edges:{
node:
{
title:string
slug:string
featuredImage:{
node:{
sourceUrl:string
caption:string
altText:string
}
}
}

  }[]

} 

netflixNewRelated:{
  edges:{
node:
{
title:string
slug:string
featuredImage:{
node:{
sourceUrl:string
caption:string
altText:string
}
}
}

  }[]

} 


}
contentTags:{
  id:string
slug: string
name: string 
nodes:{
slug: string
name: string

}[]
}

}


export type TopNews={
  id:string
  contentTypeName:string
  content:string
  title:string
  excerpt:string
  date:string
  slug:string
  featuredImage:{
    node:{
    sourceUrl:string
    caption:string
    altText:string
    }
    }
    author:{
    node:{
    name:string
    slug:string
    avatar:{
    url:string
    }
    }
    
    }
    contentTags:{
      id:string
    slug: string
    name: string 
    nodes:{
    slug: string
    name: string
    
    }[]
    }
   tags:{
      id:string
    slug: string
    name: string 
    nodes:{
    slug: string
    name: string
    
    }[]
    }
  newsGroup:{
    related:{
      edges:[{
        node:{
          title:string
          slug:string 
          featuredImage:{
            node:{
              sourceUrl:string 
              altText:string 
              
            }
          }
        }
      }]
    }
  }
    postnewsgroup:{
    relatedPosts:{
      edges:{
        node:{
          title:string
          slug:string 
          featuredImage:{
            node:{
              sourceUrl:string 
              altText:string 
              
            }
          }
        }
      }[]
    }
  }
  businessCategories:{
     
nodes:[
  {
    name:string
   businesses:{
    nodes:{
title:string
slug:string
date:string
excerpt:string
featuredImage:{
  node:{
  sourceUrl:string
  caption:string
  altText:string
  }
  }
contentTags:{
  id:string
slug: string
name: string 
nodes:{
  id:string
slug: string
name: string

}[]
}
    }
   }
  }
]
}
economyCategories:{
     
  nodes:[
    {
      name:string
     economies:{
      nodes:{
  title:string
  slug:string
  date:string
  excerpt:string
  featuredImage:{
    node:{
    sourceUrl:string
    caption:string
    altText:string
    }
    }
  contentTags:{
    id:string
  slug: string
  name: string 
  nodes:{
    id:string
  slug: string
  name: string
  
  }[]
  }
      }
     }
    }
  ]
  }



  environmentCategories:{
     
    nodes:[
      {
        name:string
        environments:{
        nodes:{
    title:string
    slug:string
    date:string
    excerpt:string
    featuredImage:{
      node:{
      sourceUrl:string
      caption:string
      altText:string
      }
      }
    contentTags:{
      id:string
    slug: string
    name: string 
    nodes:{
      id:string
    slug: string
    name: string
    
    }[]
    }
        }
       }
      }
    ]
    }


  
  healthCategories:{
     
    nodes:[
      {
        name:string
        healths:{
        nodes:{
    title:string
    slug:string
    date:string
    excerpt:string
    featuredImage:{
      node:{
      sourceUrl:string
      caption:string
      altText:string
      }
      }
    contentTags:{
      id:string
    slug: string
    name: string 
    nodes:{
      id:string
    slug: string
    name: string
    
    }[]
    }
        }
       }
      }
    ]
    }

    societyCategories:{
     
    nodes:[
      {
        name:string
        societies:{
        nodes:{
    title:string
    slug:string
    date:string
    excerpt:string
    featuredImage:{
      node:{
      sourceUrl:string
      caption:string
      altText:string
      }
      }
    contentTags:{
      id:string
    slug: string
    name: string 
    nodes:{
      id:string
    slug: string
    name: string
    
    }[]
    }
        }
       }
      }
    ]
    }
    techCategories:{ 
    nodes:[
      {
        name:string
        technologies:{
        nodes:{
    title:string
    slug:string
    date:string
    excerpt:string
    featuredImage:{
      node:{
      sourceUrl:string
      caption:string
      altText:string
      }
      }
    contentTags:{
      id:string
    slug: string
    name: string 
    nodes:{
      id:string
    slug: string
    name: string
    
    }[]
    }
        }
       }
      }
    ]
    } 
}


export type PostTypeProps={ 
    id:string
    contentTypeName:string
    content:string
    title:string
    excerpt:string
    date:string
   slug:string
    featuredImage:{
      node:{
      sourceUrl:string
      caption:string
      altText:string
      }
      }
      author:{
      node:{
      name:string
      slug:string
      avatar:{
      url:string
      }
      }
      
      }
      contentTags:{
        id:string
      slug: string
      name: string 
      nodes:{
      slug: string
      name: string
      
      }[]
      }
      tags:{
        id:string
      slug: string
      name: string 
      nodes:{
      slug: string
      name: string
      
      }[]
      }
      categories:{ 
        nodes: {
          name:string
        } 
      } 
    postnewsgroup:{
      heroImage: {
        node:{
          sourceUrl:string 
          altText:string 
          caption:string
        }
      }
       
       relatedPosts:{
        edges:{
          node:{
              title:string
          slug:string
          featuredImage:{
            node:{
            sourceUrl:string
            caption:string
            altText:string
            }
            }
          }
          title:string
          slug:string
          featuredImage:{
            node:{
            sourceUrl:string
            caption:string
            altText:string
            }
            }
        }[]
        nodes:[{
          title:string
          slug:string
          featuredImage:{
            node:{
            sourceUrl:string
            caption:string
            altText:string
            }
            }
        }]
      }
   
    }
}


export type NextTypeProps={ 
  id:string
  slug:string
  contentTypeName:string
  content:string
  title:string
  excerpt:string
  date:string
  featuredImage:{
    node:{
    sourceUrl:string
    caption:string
    altText:string
    }
    }
    author:{
    node:{
    name:string
    slug:string
    avatar:{
    url:string
    }
    }
    
    }
    contentTags:{
      id:string
    slug: string
    name: string 
    nodes:{
    slug: string
    name: string
    
    }[]
    }
   tags:{
      id:string
    slug: string
    name: string 
    nodes:{
    slug: string
    name: string
    
    }[] 
    }
    categories:{ 
      nodes: {
        name:string
      } 
    } 
  postnewsgroup:{
    heroImage: {
      node:{
        sourceUrl:string 
        altText:string 
        caption:string
      }
    }
     
     relatedPosts:{
      nodes:[{
        title:string
        slug:string
        featuredImage:{
          node:{
          sourceUrl:string
          caption:string
          altText:string
          }
          }
      }]
    }
  }
  node:{
    slug:string
    title:string
    date:string
     author:{
    node:{
    name:string
    slug:string
    avatar:{
    url:string
    }
    }
    
    }
    contentTags:{
      id:string
    slug: string
    name: string 
    nodes:{
    slug: string
    name: string
    
    }[]
    }
 
    
  }
}


export type UserPostProps={
id:number|string
slug:string 
title:string
user_id:string
user_email:string 
username:string
avatar_url:string
comments:string[] 
genre:string[]  
files:string[], 
likes:string[]
suggested_tags:string[]
tags:string[] 
story:string
created_at:string
parent_id: string 
 }

 export type FeedProps={
     contentTypeName:string
     databaseId:string
     date:string
     slug:string
     title:string
     excerpt:string
     author:{
      node:{
        name:string
        slug:string
      }
     }
     featuredImage:{
      node:{
        sourceUrl:string
      }
     }
          node:{
            naijaOnNetflix:{
             nodes:{
           slug:string
           date:string
           contentTypeName:string 
           title:string
           excerpt:string
           author:{
            node:{
              name:string
              slug:string
            }
           }
           featuredImage:{
            node:{
              sourceUrl:string
            }
           }
         
         }
         edges:{     
           node:{
            title:string
            slug:string
            date:string
            featuredImage:{
              node:{
                sourceUrl:string
              }
             }
           }        
        }
       }
     }
     posts:{
       nodes:{
        contentTypeName:string
        date:string
        slug:string
        title:string
        excerpt:string
        author:{
         node:{
           name:string
           slug:string
         }
        }
        featuredImage:{
         node:{
           sourceUrl:string
         }
        }
       }
     }

     contentTags:{
      nodes:{
        name:string
        slug:string
      }[]
     }
     tags:{
      nodes:{
        name:string
        slug:string
      }[]
     }
     charactertitles:{
      filmname:string
      portrayedby:string
     }
 
   }
 export type SlideProps={
    name:string
    slug:string
    title:string 
    excerpt:string 
    date:string
    featuredImage:{
      node:{
        sourceUrl:string
        altText:string 
      }
    }
    videos:{
      videoUrl:{ 
         node:{
        mediaItemUrl:string
      }}
    
      
    }
  }

  export type PostsCategoryProps={   
    node:{
      name:string
      posts:{
        edges:{ 
          cursor:string 
          categories:{
            node:{ 
            name:string
            slug:string 
         
            posts:{
              edges:{ 
                cursor:string
              
                node:{
                  name:string
                  slug:string
                  title:string
                  excerpt:string
                  date:string
                }
      
              }
            }
            }
            }
          node:{
            name:string
            slug:string
            title:string
            excerpt:string
            date:string
          }

        }
      
      }
    }

    categories:{
      node:{ 
      name:string
      slug:string 
   
      posts:{
        edges:{ 
          cursor:string
        
          node:{
            name:string
            slug:string
            title:string
            excerpt:string
            date:string
          }

        }
      }
      }
      }
  }
  export type MainPostsProps={
        cursor:string 
      slug:string
      title:string
      excerpt:string
      date:string 
      pageInfo: {

      };
      categories:{
        node:{ 
        name:string
        slug:string 
     
        posts:{
          edges:{ 
            cursor:string
          
            node:{
              name:string
              slug:string
              title:string
              excerpt:string
              date:string
            }
  
          }
        }
        }
        }
    node:{
    name:string
      slug:string
      title:string
      excerpt:string
      date:string
      
      posts:{
        edges:{ 
          cursor:string 
          name:string
            slug:string
            title:string
            excerpt:string
            date:string 
            featuredImage:{
        node:{
          sourceUrl:string
          altText:string
        }
      }
      tags:{
        nodes:{
          slug:string
          name:string
        }[]
      }
          node:{
            name:string
            slug:string
            title:string
            excerpt:string
            date:string
          }

        }
      
      }
      
    }
    
  }

  export type LatestProps={  
      slug:string,
    title:string,
    excerpt:string
    date:string
    modified:Date
    contentTypeName:string
    author:{
      node:{
        slug:string,
        name:string
      }
    },
    featuredImage:{
  node:{
    sourceUrl:string,
    altText:string
  }
    }    
  
 posts:{
  edges:{
    cursor:string[]
    node:{
      slug:string,
  title:string,
  excerpt:string
  date:string
  contentTypeName:string
  databaseId:string
  modified:Date
  author:{
    node:{
      slug:string,
      name:string
    }
  },
  featuredImage:{
node:{
  sourceUrl:string,
  altText:string
}
  }
  }

  }[]
  nodes:{
    id:string
    databaseId:string
    slug:string,
    title:string,
    contentTypeName:string
    date:string 
    featuredImage:{
  node:{
    sourceUrl:string,
    altText:string
  }
    }
  }
  pageInfo:{
    endCursor:string
  }
 }

node:{
  slug:string,
  title:string,
  excerpt:string
  date:string
  contentTypeName:string
  databaseId:string
  modified:Date
  author:{
    node:{
      slug:string,
      name:string
    }
  },
  featuredImage:{
node:{
  sourceUrl:string,
  altText:string
}
  }
}
categories:{
nodes:{posts:{edges:{}}}[]
}
   }
export interface ObjType { 
  title: string[];
  slug:string  
  img_url: string
   desc: string[]
   day: string[]
   loc_slug: string  
   genre: string 
   genre_slug:string  
   location:string 
}
export interface CineType { 
  title: string 
  img_url: string
   genre: string 
   url:string 
   release_date:string 
   dur:string 
}
export type EvObjType= {
   titleAObj:any ; 
}
   export interface InnerEdges{
    cursor:string
    node:{
      name:string,
      slug:string,
      excerpt:string,
      date:string,
      cursor:string,
      title:string
      posts:{ 
        edges: InnerEdges
      }
      author:{
        node:{
          slug:string,
          name:string
        }
      },
   
  featuredImage:{
    node:{
      sourceUrl:string,
      altText:string
    }
  }
   children:{
    edges:[]
  }
    }
    
edges:{
cursor:string
pageInfo:{ 
  endCursor:string
  hasNextPage:boolean
}
node:{
  name:string,
  slug:string,
  excerpt:string,
  date:string,
  cursor:string,
  title:string
  posts:{ 
    edges: InnerEdges
  }
  author:{
    node:{
      slug:string,
      name:string
    }
  },

featuredImage:{
node:{
  sourceUrl:string,
  altText:string
}
}
children:{
edges:[]
}
}
        }[]
        nodes:[]
        pageInfo:{ 
          endCursor:string
          hasNextPage:boolean
        }
        respPosts:{
          nodes:{      
          slug:string,
          title:string,
          excerpt:string
          date:string
          modified:Date
          contentTypeName:string
          author:{
            node:{
              slug:string,
              name:string
            }
          },
          featuredImage:{
        node:{
          sourceUrl:string,
          altText:string
        }
          } 
          posts:{
              edges:{
                cursor:string[]
                node:{
                  slug:string,
              title:string,
              excerpt:string
              date:string
              contentTypeName:string
              databaseId:string
              modified:Date
              author:{
                node:{
                  slug:string,
                  name:string
                }
              },
              featuredImage:{
            node:{
              sourceUrl:string,
              altText:string
            }
              }
              }
            
              }[]
              nodes:{
                id:string
                databaseId:string
                slug:string,
                title:string,
                contentTypeName:string
                date:string 
                featuredImage:{
              node:{
                sourceUrl:string,
                altText:string
              }
                }
              }
              pageInfo:{
                endCursor:string
              }
             }
             
      }[]
   
    
   }
   }
   export interface PostXNode {
    cursor:string
    categories:{
      nodes:[{
        posts: {
           pageInfo:{
            endCursor:string
          },
            nodes:[{
          
          }]
        } 
      }]
    }
    nodes:{
      slug:string,
      excerpt:string,
      date:string,
      cursor:string,
      title:string
      featuredImage:{
        node:{
          sourceUrl:string,
          altText:string
        }
      }
      tags: {
        nodes: Array<{
          slug?: string;
          name?: string;
        }>;
      } 
    }[]
    node:{
      name:string,
      slug:string,
      excerpt:string,
      date:string,
      cursor:string,
      title:string
      posts:{ 
        nodes:[]
        edges: InnerEdges
        pageInfo:{ 
          endCursor:string
        }
      }
      author:{
        node:{
          slug:string,
          name:string
        }
      },
   
  featuredImage:{
    node:{
      sourceUrl:string,
      altText:string
    }
  }
    }
  
  }
   interface PostsAllPost{

  }
  export interface PostsNotInPost{
    
    cursor:string
    nodes: [
      {
        slug: string,
        title:string,
        excerpt:string,
        date:string,
        tags: {
          nodes: Array<{
            slug?: string;
            name?: string;
          }>;
        } 
        author:{
          node:{
            slug:string,
            name:string
          }
        },
        featuredImage: {
          node: {
            sourceUrl: string,
            altText:string,
          },
        },
      },
    ],

    node: {
       slug: string,
                  title:string,
                  excerpt:string,
                  date:string,
                  tags: {
                    nodes: 
                      {
                        slug?: string,
                        name?:string,
                      }[],
                   
                  },
                  featuredImage: {
                    node: {
                      sourceUrl: string,
                      altText:string,
                    },
                  },
                      author:{
              node:{
                slug:string,
                name:string
              }
            },
            
      posts: {
        
        pageInfo: {
          endCursor:string
        },
           edges:  [{
       node:   {
            slug: string,
            title:string,
            excerpt:string,
            date:string,
            tags: {
              nodes: Array<{
                slug?: string;
                name?: string;
              }>;
            } 
            author:{
              node:{
                slug:string,
                name:string
              }
            },
            featuredImage: {
              node: {
                sourceUrl: string,
                altText:string,
              },
            },
          },}
        ],
        nodes: [
          {
            slug: string,
            title:string,
            excerpt:string,
            date:string,
            tags: {
              nodes: Array<{
                slug?: string;
                name?: string;
              }>;
            } 
            author:{
              node:{
                slug:string,
                name:string
              }
            },
            featuredImage: {
              node: {
                sourceUrl: string,
                altText:string,
              },
            },
          },
        ],
      },
    },
    categories: {
      pageInfo: {
        endCursor: string
      },
      edges: [
        {
          node: {
            posts: {
              pageInfo: {
                endCursor:string
              },
              nodes: [
                {
                  slug: string,
                  title:string,
                  excerpt:string,
                  date:string,
                  tags: {
                    nodes: 
                      {
                        slug?: string,
                        name?:string,
                      }[],
                   
                  },
                  featuredImage: {
                    node: {
                      sourceUrl: string,
                      altText:string,
                    },
                  },
                },
              ],
            },
          },
    }],
      nodes: [
        {
          posts: {
            nodes: [],
            pageInfo: {
              endCursor: string,
            },
          },
        },
      ],
    },
   posts:{ edges: [
      {
     
  }]}
   
  }

export type CineProps={
  genre:string
  title:string
  url:string
  release_date:string
  featuredImage:{
    node:{
      sourceUrl:string
      caption:string
      altText:string
     }
   }
}
  export type SideNode ={
    node:{
        title:string;
        featuredImage:{node:{altText:string,sourceUrl:string}};
        excerpt:string;
        slug:string
    
    };
    outlineGroup:{outlineVideos:{node:{altText:string,mediaItemUrl:string}}}
    cursor: string
    content:string
    featuredImage:{
      node:{
        sourceUrl:string
        caption:string
        altText:string
       }
     }
  }
  export type Cursors={
    cursor: string 
    node:{
      title:string
      slug:string
      date:string
      featuredImage:{
        node:{
          sourceUrl:string
          caption:string
          altText:string
         }
       }
       author:{
        node:{
          name:string
          slug:string 
         }
       }
    }
  }
  