import Main from '@/components/NaijaWiki/Main'  
import { netflixNews } from '../netflix-naija/netflix-news'

const NaijaWikiPage =async () => {  
  const netflix_News = await netflixNews() 
return (
<div>
 
 <Main netflix_News={netflix_News}/> 
 </div>
  )
}

export default NaijaWikiPage