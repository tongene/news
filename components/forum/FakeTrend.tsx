"use client" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"; 
import { dateFormatter } from "@/utils/dateformat";
import { FakeObj } from "@/app/data/trends";
import { useEffect, useState } from "react";
 
const FakeTrends = ({filteredTrends}:{filteredTrends:FakeObj[]}) => { 
  const [fakeNewsData,setFakeNewsData]=useState<FakeObj[]>([])
  useEffect(()=>{
setFakeNewsData(filteredTrends)
  },[])
 const xty=fakeNewsData.map((exTrend, i)=> exTrend.claimReview[0]).flat()
 const gxt =xty.filter((item, index, self) => index === self.findIndex((t) => t.title === item.title)).flat()
 
  return (
<div className="mx-2 ">  
<h2 className="text-2xl font-bold text-center border-b-4 m-auto py-4 my-2">Fake News Fact-Check</h2>
<p className="text-end text-2xl"><small >  
 {dateFormatter.format(new Date()).split(',')[0] }
 </small></p> 
<p className="italic text-lg p-4">In 2025, there has been at least 30 fake news and propaganda circulating the internet. About 27 of those in January alone. Be careful what you read. The good things is, we are here to fact-check the news.</p>
    
  <div className="flex lg:block lg:h-96 overflow-y-hidden lg:overflow-y-auto" >  
 {gxt.map((xy, i)=>
 <div key={xy.title + ' '  + Math.random()} className="border">
 {xy.textualRating?.split('-')[0].length <= 6 ? <p className="p-1 text-lg text-center">{xy.textualRating?.split('-')[0]} </p>:''}

 <div className="px-2 cursor-pointer w-96 flex justify-between py-6 items-center hover:bg-opacity-70 hover:bg-green-50 h-44"> 
  <p className="p-2 text-lg">{i+1}.</p>   
 <h3 className="px-2 text-lg w-72"><a target='_blank' href={xy.url}>{fakeNewsData[i]?.text}</a></h3>  
 <p className="p-1 mt-2 xl:mt-0 text-xl opacity-70"><a target='_blank' href={xy.url}><FontAwesomeIcon icon={faAngleRight}/></a></p>  

 </div> 
  </div> 
 )  }
 
   </div>  
    </div>
  )
}

export default FakeTrends
