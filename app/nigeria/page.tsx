import StructuredData from '@/components/StructuredData';
import { CollectionPage, WithContext } from 'schema-dts'; 
import { fetchGeo, fetchInd, fetchGov, fetchEco } from './pages-action';
import Link from 'next/link';
import { PagesProps } from '../types';

const Industry = async() => {
const contentPages = await fetchInd()
const geoPages = await fetchGeo()
const govPages = await fetchGov()
const ecomsPages = await fetchEco()
const pages= contentPages.filter((xy:PagesProps)=> xy.contents.nodes.length>0).map((dy:PagesProps)=> dy.contents.nodes).flat()  
 const geoAnalysis= geoPages.filter((xy:PagesProps)=> xy.contents.nodes.length>0).map((dy:PagesProps)=> dy.contents.nodes).flat() 
 const govAnalysis= govPages.filter((xy:PagesProps)=> xy.contents.nodes.length>0).map((dy:PagesProps)=> dy.contents.nodes).flat() 
 const ecomsAnalysis= ecomsPages.filter((xy:PagesProps)=> xy.contents.nodes.length>0).map((dy:PagesProps)=> dy.contents.nodes).flat() 
 const jsonLd:WithContext<CollectionPage>={ 
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "The current state of the manufacturing industry in Nigeria. Local production and imports from China into Nigeria.",
  "mainEntity": [
    {
      "@type": "Article",
      "name": `${pages[0].title}` ,
      "url":`https://culturays.com/nigeria/${pages[0].slug}/`
    },
  {
      "@type": "Article",
      "name": `${geoAnalysis[0]?.title}` ,
      "url":`https://culturays.com/nigeria/${geoAnalysis[0]?.slug}/`
    },
     
  {
      "@type": "Article",
      "name": `${govAnalysis[0]?.title}` ,
      "url":`https://culturays.com/nigeria/${govAnalysis[0]?.slug}/`
    } 
    ,
  {
      "@type": "Article",
      "name": `${ecomsAnalysis[0]?.title}` ,
      "url":`https://culturays.com/nigeria/${ecomsAnalysis[0]?.slug}/`
    },
  ]
}
  return (
    <div>
        <StructuredData schema={jsonLd} />
         <main className="max-w-4xl mx-auto px-4 py-12">  
      <h1 className="text-4xl font-bold mb-6 text-green-800 dark:text-white">
      An Overview of Nigeria as a Country in 2025. 
      </h1>
     
<p className="text-lg py-8">
This page serves as a central resource for stories, reports, and visuals
about Nigeria. Dive into indepth analysis on what works, what doesn't and what needs fixing in the country.

This hub features our most important explainers, investigations, and videos covering Nigeria’s local manufacturing challenges, outsourcing trends, and policy shifts.
</p>
<hr className='h-1'/>
<section className="py-10">
<h2 className="text-2xl font-semibold mb-2"> Manufacturing in Nigeria</h2><p className="py-1">
## Nigeria’s Manufacturing & Industrial Ecosystem

Nigeria’s economy is powered by both imported goods and local innovation. This hub gathers all our in-depth coverage on local manufacturing, trade policy, outsourcing, and industrial clusters like Aba, Nnewi, and Kano. 

      </p>
        {pages.slice(0,3).map((xy:PagesProps)=> 
        <ul key={xy.id} className="list-disc p-6 text-blue-700">
          <li>
            <Link href={`/nigeria/${xy.slug}/`}>
            {xy.title}
            </Link>
          </li>
         
        </ul> )}
          {/* <h2 className="text-2xl font-semibold mb-2">
          Local Manufacturing Case Studies
        </h2>
         <h2 className="text-2xl font-semibold mb-2">Trade & Policy</h2>
        <h2 className="text-2xl font-semibold mb-2">Video Stories</h2> */}
      </section>
  <hr className='h-1'/>
      <section className="py-10">
   <h2 className="text-2xl font-semibold mb-2"> Mining Sector in Nigeria</h2>
   <p className="py-1">## It will take some time to know whether the policy reforms of 2024–2025 in the Nigeria’s mining ministry are effective. However, the anouncement of local processing requirement, a ban on unprocessed lithium export and formalization of cooperatives and deployment of mining marshals are key to reshaping the ecosystem.</p>
         {geoAnalysis.slice(0,3).map((xy:PagesProps)=> 
        <ul key={xy.id} className="list-disc p-6 text-blue-700">
          <li>
            <Link href={`/nigeria/${xy.slug}/`}>
            {xy.title}
            </Link>
          </li>
         
        </ul> )}  
          {/* <h2 className="text-2xl font-semibold mb-2">
          Local Manufacturing Case Studies
        </h2>
         <h2 className="text-2xl font-semibold mb-2">Trade & Policy</h2>
        <h2 className="text-2xl font-semibold mb-2">Video Stories</h2> */}

      </section>
  <hr className='h-1'/>
      <section className="py-10"> 
<h2 className="text-2xl font-semibold mb-2"> Government of Nigeria</h2>
<p className="py-1">## Nigeria is not poor. It’s poorly managed.
Nigerians are not lazy. They are locked out.
Youth are not the problem. They’re the solution waiting to be used.</p>
<br/>
<p className="py-1">In a functional system, many governemrnt officials would be facing prosecution for economic sabotage, forced to forfeit assets and banned from public office for the what Nigeria is today.</p><p className="py-1">Punishment for officials in Nigreia is long overdue and impunity rules because the system protects its own.</p><p>The so-called "recycled politicians"—those who have rotated through ministries, committees, and state houses for decades—have institutionalized corruption and mediocrity.</p>
         {govAnalysis.slice(0,3).map((xy:PagesProps)=> 
        <ul key={xy.id} className="list-disc p-6 text-blue-700">
          <li>
            <Link href={`/nigeria/${xy.slug}/`}>
            {xy.title}
            </Link>
          </li>
         
        </ul> )} 
           {/* <h2 className="text-2xl font-semibold mb-2">
          Local Manufacturing Case Studies
        </h2>
         <h2 className="text-2xl font-semibold mb-2">Trade & Policy</h2>
        <h2 className="text-2xl font-semibold mb-2">Video Stories</h2> */}

      </section>
  <hr className='h-1'/>
      <section className="py-10">
        <h2 className="text-2xl font-semibold mb-2"> Economics of Nigeria</h2>
<p className="py-1">## Policy Decay and Economic Sabotage is ripping Nigeria to shreds.
Naira devaluation is not only the result of global markets—it’s from years of overdependence on imports, non-productive manufacturing, and FX hoarding by elite interests.

Inflation is worsened by broken supply chains, extortion at every level of local production, and subsidy mismanagement</p><br/><p className="py-1">Exlpore the expert analysis as well as daily updates on how the situation develops within the country.</p>
{ecomsAnalysis.slice(0,3).map((xy:PagesProps)=> 
<ul key={xy.id} className="list-disc p-6 text-blue-700">
<li>
<Link href={`/nigeria/${xy.slug}/`}>
{xy.title}
</Link>
          </li> 
        </ul> )} 
           {/* <h2 className="text-2xl font-semibold mb-2">
          Local Manufacturing Case Studies
        </h2>
         <h2 className="text-2xl font-semibold mb-2">Trade & Policy</h2>
        <h2 className="text-2xl font-semibold mb-2">Video Stories</h2>  */}
      </section>
 
      <p className="mt-10 text-sm text-gray-500">
      {pages[0].modified}
      </p>
    </main>
    </div>
  )
}

export default Industry
