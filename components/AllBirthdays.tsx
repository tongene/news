 'use client'
import Image from 'next/image';
import React, { useMemo } from 'react'; 
type FetchArguments = Parameters<typeof fetch>;

type BdaysProps={
  info:string
img:string
name:string
}[]
type DataProps={
data:[]
 info:string
img:string
name:string
person_obj:BdaysProps
title:string
id:string
}[]
const AllBirthdays = ({data, datax}:{data:DataProps[], datax:DataProps}) => {  
   const offset = -8;
   const todaysBd= new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" ) 
 const today = new Date();
 const todayMonth = today.getMonth();
  const gx = useMemo(() => {
  const groupParent: { [info: string ]: DataProps} = {};
  datax?.forEach((dy) => 
    dy.person_obj.forEach((ex)=>{ 
         const date = new Date(ex.info);
     const dateMonth = date.getMonth(); 
      if( dateMonth=== todayMonth){
    groupParent[todayMonth as unknown as string] ||= [] ;
    groupParent[todayMonth as unknown as string]?.push(dy);
 }
  }));
 
  return groupParent ;
}, []);

const todayBirthdays = Object.values(gx).flat()
const personObj = todayBirthdays.filter((dx)=> dx.person_obj.length<4) 
 
  return (
     <div className="my-11" > 
      <section>
  <h2 className="border-dotted border-b-2 py-2 text-4xl my-4 font-bold text-center">Naija Birthdays This Month: {new Date().toLocaleString('en-US', { month: 'long' })} <small>{todaysBd.toLocaleString().split(',')[0].slice(0,-5) }</small>
</h2> 
{ datax.flat()?.length >0
&& 
<div className="card-data overflow-hidden flex bg-slate-100 p-4 relative justify-center my-8">
  <div className="pple-card-x flex flex-col w-max xs:grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
    {todayBirthdays.map((birthday, index) =>
      birthday.person_obj.length < 4 && (
        <div key={birthday.id} className="w-full xs:border-b xs:border-b-4 my-4">
          {birthday.person_obj
            .filter(person => person.name === birthday.title)
            .map((person, i) => {
              const image = birthday.person_obj[i + 2]?.img || '/assets/images/tv.png';
              const info = birthday.person_obj[i + 1]?.info;

              return (
                <div key={`${person.name}-${i}`}>
                  <div className="my-2 pple-card bg-gray-900 text-xl">
                    <h3 className="text-white text-center w-full p-2">
                      {person.name}
                    </h3>
                    <div className="pple-card m-1 relative w-[180px] h-[180px] m-auto">
                      {image && (
                        <Image
                          className="justify-self-center bg-gray-900 rounded-full"
                          src={image}
                        fill
                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          alt={person.name}
                        />
                      )}
                    </div>
                    {info && (
                      <h3 className="text-white text-center w-full p-2">
                        {info}
                      </h3>
                    )}
                  </div>
                  <hr className="my-4 xs:hidden" />
                </div>
              );
            })}
        </div>
      )
    )}
  </div>
</div>
}
{personObj?.length < 1 &&
<div className="card-data overflow-hidden flex bg-slate-100 p-4 justify-center text-black font-bold">
<p>No Birthdays This Month </p>
</div>}

</section>
 
    </div>
  );
};

export default AllBirthdays;