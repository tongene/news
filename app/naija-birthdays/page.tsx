import AllBirthdays from "@/components/AllBirthdays"
import StructuredData from "@/components/StructuredData"
import { createClient } from "@/utils/supabase/server"
import { BlogPosting, PeopleAudience, SpecialAnnouncement, WebPage, WithContext } from "schema-dts"


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
   
  const jsonLd:WithContext<BlogPosting>={
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Culturays - Covering News in Nigeria, Africa, and Beyond",
    "description": "This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.",
    "url": "https://culturays.com/naija-birthdays",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://culturays.com/naija-birthdays"
    },
    "inLanguage": "en",
    "image": {
      "@type": "ImageObject",
      "url": "https://culturays.com/opengraph-image.png"
    },
    "datePublished": "2025-04-15T08:00:00Z",
    "dateModified": "2025-04-15T08:00:00Z",
    "author": {
      "@type": "Organization",
      "name": "Culturays"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ngenet Studio",
      "url": "https://www.culturays.com/naija-birthdays",
      "logo": {
        "@type": "ImageObject",
        "url": "https://culturays.com/assets/images/culturays-no-bg.png"
      }
    }
  }
  return (
    <div> 
      <StructuredData schema={jsonLd} />
      <AllBirthdays data={data} />
    </div>
  )
}

export default BdaysPage
