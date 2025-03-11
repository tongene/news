 'use client'

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation" 
import { EventsProps } from "@/app/types"; 
import { addEventTitle, updateEventTitle } from "@/app/naija-events/eventaction";
const EventForm = ({eventEdit, setActive, active }:{eventEdit:EventsProps, setActive:React.Dispatch<React.SetStateAction<boolean>>, active:boolean}) => {

const [uploading, setUploading] = useState(false)
const router=useRouter()
const modalEl =useRef<HTMLDivElement | null>(null);
const clearEl = useRef<HTMLFormElement | null>(null);

const addEventAction=async(formData:FormData)=>{
setUploading(true)  
await addEventTitle(formData)
setUploading(false)
setActive(false)
clearEl.current?.reset();
router.refresh();
}
const updateEventAction=async(formData:FormData)=>{
setUploading(true)  
await updateEventTitle(formData,eventEdit)
setUploading(false)
setActive(false)
clearEl.current?.reset();
router.refresh();
}

useEffect(() => {
const handler = (event:MouseEvent) => {
if (!modalEl.current) {
return;
}

if (!modalEl.current.contains(event.target as Node)) {
setActive(false);

}

};
document.addEventListener("click", handler, true);

return () => {
document.removeEventListener("click", handler);
};

}, [active]);

 
return (
<div className="flex justify-center items-center fixed z-10 top-0 h-screen bg-slate-800 opacity-90 w-full">
<form className='m-2 flex' ref={clearEl} >
<div className="bg-black p-20 mt-11 rounded-md" ref={modalEl}>
<label className="block mb-2 text-sm font-medium text-gray-900 text-white" htmlFor="title">
Event Title</label>
<textarea
cols={40}
name='title'
defaultValue={eventEdit.title}
className='focus:outline-none leading-6 px-3 py-1 text-sm resize-none dark:bg-gray-700 dark:text-white m-1 rounded-b-md border-black'
placeholder="Title"
/>
<label className="block mb-2 text-sm font-medium text-gray-900 text-white" htmlFor="title">
Description</label>
<textarea
cols={40}
name='description'
defaultValue={eventEdit.description}
className='focus:outline-none leading-6 px-3 py-1 text-sm resize-none dark:bg-gray-700 dark:text-white m-1 rounded-b-md border-black '
placeholder="Description"
/>
<label className="block mb-2 text-sm font-medium text-gray-900 text-white" htmlFor="location">
Genre</label>
<textarea
cols={40}
name='genre'
defaultValue={eventEdit.genre}
className='focus:outline-none leading-6 px-3 py-1 text-sm resize-none dark:bg-gray-700 dark:text-white m-1 rounded-b-md border-black'
placeholder="Genre"
/>
<label className="block mb-2 text-sm font-medium text-gray-900 text-white" htmlFor="location">
Artist</label>
<textarea
cols={40}
name='artist'
defaultValue={eventEdit.artist}
className='focus:outline-none leading-6 px-3 py-1 text-sm resize-none dark:bg-gray-700 dark:text-white m-1 rounded-b-md border-black'
placeholder="Artist"
/>
<label className="block mb-2 text-sm font-medium text-gray-900 text-white" htmlFor="location">
Location</label>
<textarea
cols={40}
name='location'
defaultValue={eventEdit.location}
className='focus:outline-none leading-6 px-3 py-1 text-sm resize-none dark:bg-gray-700 dark:text-white m-1 rounded-b-md border-black'
placeholder="Location"
/>
<label className="block mb-2 text-sm font-medium text-gray-900 text-white" htmlFor="date">
Date</label>
<div className="custom-date-picker my-2">
<input
  type="date"
  name="date"
  min={new Date().toISOString().split('T')[0] }
  // max={"2025-04-30"} // Set max date as needed
  defaultValue={ String(eventEdit.date)}
  className={`text-sm p-2 rounded-b-md dark:bg-gray-700 dark:text-white datepickerbg`}
/>
</div>
 
<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
{uploading ? 'Uploading ...' : 'Upload'}</label>
<div className="flex "
><input
className="p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
id="file_input"
type="file"
name='file'
accept="image/*"
// onChange={uploadAvatar}
disabled={uploading}/>
<button type="submit" formAction={eventEdit.id?updateEventAction:addEventAction}>
<FontAwesomeIcon icon={faAngleRight} className="text-white text-lg opacity-70 mt-2 mx-4 p-1 cursor-pointer"/>
</button>
</div>
</div>
</form>

</div>
)
}

export default EventForm
