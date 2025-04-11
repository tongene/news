import AllBirthdays from "@/components/AllBirthdays"
import StructuredData from "@/components/StructuredData"
import { createClient } from "@/utils/supabase/server"
import { PeopleAudience, SpecialAnnouncement, WithContext } from "schema-dts"


const BdaysPage = async() => {
     const forumBdays =async ()=>{
        const supabase = await createClient()
        const { data: bday, error } = await supabase
        .from('bday')
        .select('*')
        if(error)throw new Error('An Error has Occured')
          return bday  
      }
       const data = await forumBdays()
       const today = new Date();
       const todayMonth = today.getMonth();
       const filteredDates = data?.filter((dateStr) => { 
        const date = new Date(dateStr.info);
        const dateMonth = date.getMonth(); 
        return dateMonth=== todayMonth;
    }); 
   
       const jsonLd:WithContext<SpecialAnnouncement> = {
        '@context': 'https://schema.org',
        '@type': 'SpecialAnnouncement',
         name:"Culturays Naija Birthdays",
         description: "Naija Birthdays Today",
         dateCreated:today.getDate().toLocaleString(),
          mainEntityOfPage: {
           "@type": "WebPage",
           "@id":'https://culturays.com/naija-birthdays/',
         },
         url:'https://culturays.com/naija-birthdays/',
         image: filteredDates[0].img,
         publisher: {
           "@type": "Organization",
           name: "Christina Ngene",
           logo: {
             "@type": "ImageObject",
             url: "https://culturays.com/assets/images/culturays-no-bg.png",
           },
         },
          
         keywords:filteredDates[0].name,    
         
       };
      
      
  return (
    <div> 
      <StructuredData schema={jsonLd} />
      <AllBirthdays data={data} />
    </div>
  )
}

export default BdaysPage
