import ComingToNetflixNaija from "@/components/NetflixNaija/NetflixNaijaComing/ComingToNetflixNaija"
import { netflixNews, newsbyComingtoCategory } from "../netflix-news"  
 
const ComingToNetflixNaijaPage = async() => {
const coming_to_netflix_naija = await newsbyComingtoCategory([]) 
const netflixNaija=coming_to_netflix_naija.map((xy:{node:{naijaOnNetflix:{edges:[]} }})=> xy.node.naijaOnNetflix.edges).flat()
const category_children=coming_to_netflix_naija.map((ex:{node:{children:{edges:[]} }})=> ex.node.children.edges).flat()
const coming_to_netflix_class= category_children.filter((ex:{node:{slug:string}})=> ex.node.slug==='coming-to-netflix-class').map((fx:{node:{naijaOnNetflix:{edges:[]}} })=> fx.node.naijaOnNetflix.edges).flat()  
const coming_to_netflix_category =category_children.filter((ex:{node:{slug:string}})=> ex.node.slug==='category-coming-to-netflix').map((fx:{node:{naijaOnNetflix:{edges:[]}} })=> fx.node.naijaOnNetflix.edges).flat() 
const netflix_news_data = await netflixNews()
const coming_to_netflix_grouped =netflixNaija.concat(coming_to_netflix_class).concat(coming_to_netflix_category) 
 
  return (
   <div>
 <ComingToNetflixNaija  
  netflix_news_data={netflix_news_data}
 coming_to_netflix_naija=
 {coming_to_netflix_naija} 
 coming_to_netflix_grouped={coming_to_netflix_grouped}
 />  
    </div>
  )
}

export default ComingToNetflixNaijaPage

 
  
