import { createClient } from "@/utils/supabase/server";
import axios from "axios"
import * as cheerio from 'cheerio';  
  
type PeopleType={
   name:string
   info:string
   img:string
}
 
export async function getPeople() {
  const pop_people=[]
//     const queryParams = {
//         limit: 10, 
//       };
//       const params = new URLSearchParams(queryParams);
   // // const res = await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerians`)
// //const res2 = await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerian_actors` )
// // const res3 = await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerian_musicians` )
// //const res4 = await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerian_writers` )
// // const res5 = await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerian_poets` ) 
 // //const res6 = await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerian_sportspeople` )
 // //   const res7=await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerian_women_artists` )
// // const res8=await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerian_artists` )
// //const res9=await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerian_scientists_and_scholars` )
 // const res10=await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerian_film_directors` )
//const res11=await axios.get(`https://en.wikipedia.org/wiki/List_of_pastors_in_Nigeria` ) 
 // // const res12=await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerian_media_personalities` ) 
// const res13=await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerian_architects` ) 
// .then((response)=>{  
//   const html = response.data
//   const $ = cheerio.load(html) 
           ///for several urls not for all
                // $('.div-col >ul > li >a', html).each(function(){
                //   const name = $(this).text().replace(/\n/g,'').trim()
                //   const url = $(this).attr('href')           
                //   pop_people.push({  
                //   name,
                //   url,
               
                //   }) 
                // }) 
                   ///for several urls not for all
  //  $('.mw-content-ltr >ul > li > a', html).each(function(){
  //                   const name = $(this).text().replace(/\n/g,'').trim()
  //                   const url = $(this).attr('href')           
  //                   pop_people.push({  
  //                  name ,
  //                    url,
                 
  //                   }) 
  //                   })
                  //    $('ul:nth-child(13) > li > a', html).each(function(){
                  //   const name = $(this).text().replace(/\n/g,'').trim()
                  //   const url = $(this).attr('href')           
                  //   pop_people.push({  
                  //  name ,
                  //    url,
                 
                  //   }) 
                  //   })
                    ///for only  one of the urls not for all
                  // $('ul:nth-child(82)> li > a', html).each(function(){
                  //   const name = $(this).text().replace(/\n/g,'').trim()
                  //   const url = $(this).attr('href')           
                  //   pop_people.push({  
                  //   name ,
                  //   url,
                 
                  //   }) 
                  //   })
//for many lists like musicians as well as writers ul is selected individually - just switching from odd nth-childs for musicians(11-61) and to even writers(14-60)
//ul:nth-child(60)  ul:nth-child(14)
//ul:nth-child(13)ul:nth-child(53)
// ul:nth-child(10) ul:nth-child(22)
//ul:nth-child(8) ul:nth-child(30)
//ul:nth-child(11) ul:nth-child(23)
//  ul:nth-child(13) ul:nth-child(47)
//  ul:nth-child(30) 
// //
   // $('ul:nth-child(13) > li > a', html).each(function(){
   //                  const name = $(this).text().replace(/\n/g,'').trim()
   //                  const url = $(this).attr('href')           
   //                  pop_people.push({  
   //                 name ,
   //                   url,
                 
   //                  }) 
   //                  })
   //   $('ul:nth-child(15) > li > a', html).each(function(){
   //                  const name = $(this).text().replace(/\n/g,'').trim()
   //                  const url = $(this).attr('href')           
   //                  pop_people.push({  
   //                 name ,
   //                   url,
                 
   //                  }) 
   //                  })
   // $('ul:nth-child(17) > li > a', html).each(function(){
   //    const name = $(this).text().replace(/\n/g,'').trim()
   //    const url = $(this).attr('href')           
   //    pop_people.push({  
   //   name ,
   //     url,
   
   //    }) 
   //    }) 
   //      $('ul:nth-child(19) > li > a', html).each(function(){
   //       const name = $(this).text().replace(/\n/g,'').trim()
   //       const url = $(this).attr('href')           
   //       pop_people.push({  
   //      name ,
   //        url,
      
   //       }) 
   //       })  
   //         $('ul:nth-child(21) > li > a', html).each(function(){
   //       const name = $(this).text().replace(/\n/g,'').trim()
   //       const url = $(this).attr('href')           
   //       pop_people.push({  
   //      name ,
   //        url,
      
   //       }) 
   //       }) 
   //         $('ul:nth-child(23) > li > a', html).each(function(){
   //       const name = $(this).text().replace(/\n/g,'').trim()
   //       const url = $(this).attr('href')           
   //       pop_people.push({  
   //      name ,
   //        url,
      
   //       }) 
   //       }) 
   //         $('ul:nth-child(25) > li > a', html).each(function(){
   //       const name = $(this).text().replace(/\n/g,'').trim()
   //       const url = $(this).attr('href')           
   //       pop_people.push({  
   //      name ,
   //        url,
      
   //       }) 
   //       }) 
   //         $('ul:nth-child(27) > li > a', html).each(function(){
   //       const name = $(this).text().replace(/\n/g,'').trim()
   //       const url = $(this).attr('href')           
   //       pop_people.push({  
   //      name ,
   //        url,
      
   //       }) 
   //       }) 
   //         $('ul:nth-child(29) > li > a', html).each(function(){
   //       const name = $(this).text().replace(/\n/g,'').trim()
   //       const url = $(this).attr('href')           
   //       pop_people.push({  
   //      name ,
   //        url,
      
   //       }) 
   //       }) 
 
 
      //      $('ul:nth-child(30) > li > a', html).each(function(){
      //    const name = $(this).text().replace(/\n/g,'').trim()
      //    const url = $(this).attr('href')           
      //    pop_people.push({  
      //   name ,
      //     url,
      
      //    }) 
      //    }) 
   //         $('ul:nth-child(33) > li > a', html).each(function(){
   //       const name = $(this).text().replace(/\n/g,'').trim()
   //       const url = $(this).attr('href')           
   //       pop_people.push({  
   //      name ,
   //        url,
      
   //       }) 
   //       }) 
   //         $('ul:nth-child(35) > li > a', html).each(function(){
   //       const name = $(this).text().replace(/\n/g,'').trim()
   //       const url = $(this).attr('href')           
   //       pop_people.push({  
   //      name ,
   //        url,
      
   //       }) 
   //       }) 
   //         $('ul:nth-child(37) > li > a', html).each(function(){
   //       const name = $(this).text().replace(/\n/g,'').trim()
   //       const url = $(this).attr('href')           
   //       pop_people.push({  
   //      name ,
   //        url,
      
   //       }) 
   //       }) 
   //       $('ul:nth-child(39) > li > a', html).each(function(){
   //          const name = $(this).text().replace(/\n/g,'').trim()
   //          const url = $(this).attr('href')           
   //          pop_people.push({  
   //         name ,
   //           url,
         
   //          }) 
   //          }) 

   //       $('ul:nth-child(41) > li > a', html).each(function(){
   //          const name = $(this).text().replace(/\n/g,'').trim()
   //          const url = $(this).attr('href')           
   //          pop_people.push({  
   //         name ,
   //           url,
       
   //          }) 
   //          }) 


   //       $('ul:nth-child(43) > li > a', html).each(function(){
   //          const name = $(this).text().replace(/\n/g,'').trim()
   //          const url = $(this).attr('href')           
   //          pop_people.push({  
   //         name ,
   //           url,
         
   //          }) 
   //          }) 


   //       $('ul:nth-child(45) > li > a', html).each(function(){
   //          const name = $(this).text().replace(/\n/g,'').trim()
   //          const url = $(this).attr('href')           
   //          pop_people.push({  
   //         name ,
   //           url,
         
   //          }) 
   //          }) 


   //        $('ul:nth-child(47) > li > a', html).each(function(){
   //          const name = $(this).text().replace(/\n/g,'').trim()
   //          const url = $(this).attr('href')           
   //          pop_people.push({  
   //         name ,
   //           url,
         
   //          }) 
   //          }) 
   //           $('ul:nth-child(49) > li > a', html).each(function(){
   //             const name = $(this).text().replace(/\n/g,'').trim()
   //             const url = $(this).attr('href')           
   //             pop_people.push({  
   //            name ,
   //              url,
            
   //             }) 
   //             }) 
   //               $('ul:nth-child(51) > li > a', html).each(function(){
   //                const name = $(this).text().replace(/\n/g,'').trim()
   //                const url = $(this).attr('href')           
   //                pop_people.push({  
   //               name ,
   //                 url,
               
   //                }) 
   //                })  
   //                 $('ul:nth-child(53) > li > a', html).each(function(){
   //                   const name = $(this).text().replace(/\n/g,'').trim()
   //                   const url = $(this).attr('href')           
   //                   pop_people.push({  
   //                  name ,
   //                    url,
                  
   //                   }) 
   //                   })  
      //                 $('ul:nth-child(54) > li > a', html).each(function(){
      //                   const name = $(this).text().replace(/\n/g,'').trim()
      //                   const url = $(this).attr('href')           
      //                   pop_people.push({  
      //                  name ,
      //                    url,
                     
      //                   }) 
      //                   })  
      //                    $('ul:nth-child(56)> li > a', html).each(function(){
      //                      const name = $(this).text().replace(/\n/g,'').trim()
      //                      const url = $(this).attr('href')           
      //                      pop_people.push({  
      //                     name ,
      //                       url,
                        
      //                      }) 
      //                      })  
      //                       $('ul:nth-child(58) > li > a', html).each(function(){
      //                         const name = $(this).text().replace(/\n/g,'').trim()
      //                         const url = $(this).attr('href')           
      //                         pop_people.push({  
      //                        name ,
      //                          url,
                           
      //                         }) 
      //                         })  
      //                          $('ul:nth-child(60) > li > a', html).each(function(){
      //                            const name = $(this).text().replace(/\n/g,'').trim()
      //                            const url = $(this).attr('href')           
      //                            pop_people.push({  
      //                           name ,
      //                             url,
                              
      //                            }) 
      //                            }) 
   //                                 $('ul:nth-child(61) > li > a', html).each(function(){
   //                                  const name = $(this).text().replace(/\n/g,'').trim()
   //                                  const url = $(this).attr('href')           
   //                                  pop_people.push({  
   //                                 name ,
   //                                   url,
                                 
   //                                  }) 
   //                                  })

            // })
 //console.log(pop_people)
// const pplN= popAct?.filter((ux)=> ux.filmsAc !== '').filter((ux)=> !ux?.filmsAc?.includes('List')).filter((ux)=> !ux?.filmsAc?.includes('Article')).filter((ux)=>  ux?.filmsAc?.charAt(0) !== ux?.filmsAc?.charAt(0).toLowerCase() )

//  const supabase =createClient()
//  for (const ez of pop_people ) { 
// const { data, error } = await supabase
// .from('bdays')
// .upsert([{name:ez.name, url:ez.url}])
// .select()
// if(error){
//    console.log(error) 
// }
//      }
//   return pplN       
} 

   
export const popPeople =async ()=>{ 
 const supabase =await createClient()
//  const { data: bdays_1, error:bday_1err } = await supabase
//  .from('bdays')
//  .select('*') 
//  .range(0, 500)
// // console.log(bday_1err)
//  if(bday_1err)throw new Error('An error has occured') 

// const { data: bdays_2, error:bday_2err } = await supabase
// .from('bdays')
// .select('*')
// .range(500, 1000)
// ///console.log(bday_2err)
// if(bday_2err)throw new Error('An error has occured') 
 
const { data: bdays_3, error:bday_2err } = await supabase
.from('bdays')
.select('*') 
// console.log(bday_2err)
 if(bday_2err)throw new Error('An error has occured')  
 
 const pop_Url = bdays_3.map((xxu)=> xxu.url).flat() 
const txnames:PeopleType[]=[]
const getCopies = pop_Url.filter( function( item, index, inputArray ) {
    return inputArray.indexOf(item) === index;
  })
 const url_item = pop_Url.filter((ex)=> !ex?.includes('php')).filter((ex)=> !ex?.includes('cs-nwilliams-radio-apprentice/')).filter((ex)=> !ex?.includes('/wiki/Alhaji_Hassan_Dalhat')).filter((ex)=> !ex?.includes('/wiki/Scooby_Nero')).filter((ex)=> !ex?.includes('/wiki/Brosthrone')).filter((ex)=> !ex?.includes('/wiki/Kingsley_Okonkwo')).flat() 
 
  try{ 
  const result= await axios.all(url_item.map(async(endpoint) =>await axios.get(`https://en.wikipedia.org${endpoint}`))).then( (allResponses) => {  
const pop_names=allResponses.map((response)=> {  
   const html = response.data
   const $ = cheerio.load(html) 

const texts= $('.fn', html).map((index, element) => {  
   const tx = $(element).text() 
   const xnames= [] 
    xnames.push({name:tx})
    return xnames
}).get()

  const info= $('.bday', html).map((index, element) => {  
   const info = $(element).text() 
   const xnames= [] 
    xnames.push({info:info})
    return xnames
}).get()

  const imgs= $('.infobox-image > span > a > img', html).map((index, element)=>{      
     const img = $(element).attr('src')  as string 
     const xnames= []
      xnames.push({img}) 
  return xnames
 }).get();
return [...texts, ...info, ...imgs]
 }) 
 
 
return pop_names

 }) .then(data => data)
 .catch(error => console.error("Error:", error));
const xfilter=[result].flat().map((vx)=> vx) 
 
await Promise.all(xfilter.map((tx)=>
   (tx as PeopleType[]).map( (ex, index, inputArray )=> {  
 if( inputArray.findIndex((v)=>v.name) === index) {
  ( tx as PeopleType[]).map(async(dy)=>{
   if(dy.info){
  const { data , error} = await supabase
    .from('b_day')
    .upsert({title: ex.name, person_obj:tx}, {onConflict:'title'})
    .select() 
    console.log(error)
}})}
})  ))
}catch(err){ 
    console.log(err)   
 } 
 finally{
return []
   }

}   
  