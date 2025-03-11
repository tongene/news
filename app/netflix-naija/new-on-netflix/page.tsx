 
 
import NewlyRealeasedNetflixNaija from "@/components/NetflixNaija/NetflixNaijaNew/NewlyReleasedNetflixNaija"
import { addedOnCategory, netflixNews, newsbyNewOnCategory } from "../netflix-news"   
async function New_On_Netflix() {
 const new_on_netflix_naija = await newsbyNewOnCategory([])
 const added_on_netflix_naija =await addedOnCategory()
  const netflix_news_data = await netflixNews() 
 const made_in_africa = added_on_netflix_naija.addedCategories.edges.filter((xy:{node:{name:string}})=> xy?.node.name === 'Made in Africa').flat()
 const non_africa = added_on_netflix_naija.addedCategories.edges.filter((xy:{node:{name:string}})=> xy?.node.name !== 'Made in Africa').flat()
 
 return (      
  <>  
  <NewlyRealeasedNetflixNaija
 netflix_news_data={netflix_news_data}
  added_on_netflix_naija={added_on_netflix_naija}
  new_on_netflix_naija={new_on_netflix_naija} 
  made_in_africa={made_in_africa}
  non_africa={non_africa}
  />   
 </>
  )
}
 
export default New_On_Netflix
 
 