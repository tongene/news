"use server"

import axios from "axios";
import * as cheerio from 'cheerio';
interface FullObjType {
  data: any[]; 
}
type EvObjType= {
  titleAObj:any ; 
}

export async function getNaijaEvents3(){
  const titleObj: { title: string }[]= []
const titleAObj: { atitle: string }[]= []
const imgObj: { img: string }[]= []
const dateObj : { dateX: string }[]= []
const descObj: { desc: string }[]= []
const priceObj : { cost: string }[]= []
const groupedObj ={}

try{
    
const res12= axios.get('https://allevents.in/lagos/all') 
.then(async(response)=>{
  const html = response.data   
const $ = cheerio.load(html) 
$('ul > li > div.banner-cont.php-banner-cont', html).each( (index, element)=> {
  const img = $(element).attr('style');
  imgObj.push({ img:img as string });
});


  $('div.title a', html).each( (index, element)=>{   
  const atitle = $(element).attr('href') 
    titleAObj.push({atitle:atitle as string})       
}) 


$('div.title h3', html).each((index, element)=>{  
    const title = $(element).text()
    titleObj.push({title:title}) 
      
}) 

$('div.subtitle', html).each((index, element)=>{  
    const desc = $(element).text()
    descObj.push({desc:desc}) 
    
  })
    $('div.date', html).each((index, element)=>{      
        const dateX = $(element).text()  
        dateObj.push({dateX:dateX}) 
               })
              $('div.price-container', html).each((index, element)=>{      
                  const cost = $(element).text()
                  priceObj.push({cost:cost}) 
               })

        }).catch(error => {
     console.log(error.response.data.error)
     if(error)throw new Error('An error has occured')
  })
   return  { titleObj, titleAObj, imgObj, dateObj, descObj, priceObj} as EvObjType 
        
      }catch(err){
        if(err) throw new Error('An error has occured')
      } 

      }
      
export async function events3Details(id:string ) { 
        const nameObj= []
        const imgObj= []
        const descObj= []
        const locObj= []
        const dateObj =[]
        const genreObj= []  
        const fullObj: FullObjType = { data: [] };
      try{
  axios.get(id).then((response) => {
// new Promise((resolve)=> {
// setTimeout(()=>{
// resolve(true)
// },5000)
// }) 
const html = response.data
const $ = cheerio.load(html) 
$('h1', html).each((index, element)=>{            
const ev = $(element).attr('title')
fullObj['data'] ||= [];
 fullObj['data']?.push( {title:(ev as string).trim().replace(/\t/g,'').replace(/\n/g,'') })  
fullObj['data'].push( {slug:(ev as string).trim().toLowerCase()})  
})   

$('.event-thumb', html).each((index, element)=>{    
const img = $(element).attr('src')
if(img!== undefined){ 
fullObj['data'].push( {img} )   
    }  
    })     
  $('#event_description > p', html).each((index, element)=>{      
const desc = $(element).text()           
fullObj['data'].push( {desc} ) 
}) 
$('div.venue-li >p > span', html).each((index, element)=>{      
const ven = $(element).text()
fullObj['data'].push( {ven:ven.trim().replace(/\t/g,'').replace(/\n/g,'')} ) 
fullObj['data'].push( {venSlug:ven?.trim().toLowerCase().split(',')[0]})
  
})  
$('div.small-event-list > a', html).each((index, element)=>{      
const gnr = $(element).text()
fullObj['data'].push( {gnr:gnr.trim().replace(/\t/g,'').replace(/\n/g,'')} ) 
fullObj['data'].push( {gnrSlug:gnr?.trim().toLowerCase().split(',')[0]})
  
}) 
//#event-detail-fade > 
$('div.event-head.wdiv.padding-10 > div > div:nth-child(6) > span:nth-child(4) > span', html).each( (index, element)=>{      
 const day = $(element).text()  
fullObj['data'].push( {day:day.trim().replace(/\t/g,'').replace(/\n/g,'')} ) 
}) 
          
 }).catch(error => {
  console.log(error.response.data.error)
  if(error)throw new Error('An error has occured')
}); 

}catch(err){ 
    console.log(err)   
 } 

  return fullObj
}
    