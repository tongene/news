"use client"
import { faFacebook, faWhatsapp, faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { faLink } from "@fortawesome/free-solid-svg-icons" 
import { usePathname } from "next/navigation"
type Share = {
  item:any,
  activeIdx:any ,
  shareOptions:boolean
}
const ShareButtons = ({item, activeIdx, shareOptions}:Share) => {
const pathname= usePathname()
const copyToClipboard = async (text:string) => {
  const permissionName = "clipboard-write" as PermissionName;
  try {
      const permissions = await navigator.permissions.query({name: permissionName })
      if (permissions.state === "granted" || permissions.state === "prompt") {
          await navigator.clipboard.writeText(text);
          alert('Text copied to clipboard!');
      } else {
          throw new Error("Can't access the clipboard. Check your browser permissions.")
      } 
  } catch (error) {
      alert({'Error copying to clipboard:': error});
  }
}


const parts = pathname.split('/').filter(Boolean);
const firstTwoItems = parts.slice(0, 2);  

  return (
    <div className="relative share-main" title="share"> 
    {shareOptions &&activeIdx=== String(item?.id) &&(
    <div className="share-view absolute text-white flex justify-center items-center mt-1 text-lg rounded-none shadow-4xl p-3 border z-10 bg-slate-800 right-10 w-60"> 
    <a target="_blank"rel="noreferrer" href={`https://twitter.com/intent/tweet?text=${item?.title}&url=https://culturays.com/${firstTwoItems[0]}/${item?.slug}/`} ><FontAwesomeIcon icon={faXTwitter} width={40} className="shadow-sharebtn p-1.5 hover:opacity-70" /></a>  
    <a
  target="_blank"
  rel="noreferrer"
  href={`https://wa.me/?text=${encodeURIComponent(`${item?.title} https://culturays.com/${firstTwoItems[0]}/${item?.slug}/`)}`}
>
  <FontAwesomeIcon
    icon={faWhatsapp}
    width={40}
    className="shadow-sharebtn p-1.5 hover:opacity-70"
  />
</a>

    <a target="_blank"rel="noreferrer"href={`https://www.facebook.com/sharer/sharer.php?u=https://culturays.com/${firstTwoItems[0]}/${item?.slug}&t=${item?.title}/`}><FontAwesomeIcon width={40}icon={faFacebook} className= "shadow-sharebtn p-1.5 hover:opacity-70" /></a> 
    <p onClick={()=>copyToClipboard(`https://culturays.com/${firstTwoItems[0]}/${item?.slug}/` )} ><FontAwesomeIcon width={40}icon={faLink} className="cursor-pointer shadow-sharebtn p-1.5 hover:opacity-70" /></p> 
    </div>) } 
    </div>
  )
}

export default ShareButtons


