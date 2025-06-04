"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'  
import {faFacebookF, faGoogle, faInstagram, faWhatsapp, faXTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons"; 
 
const SocialNav = () => {

 return (
  
   <div className="flex flex-col items-center leading-none my-4">  
<div className="flex social-forum">
<a target="_blank"rel="noreferrer"href="https://www.facebook.com/CulturaysSpot"aria-label="Visit our Facebook page">
<p className="m-1 p-2"><FontAwesomeIcon
width={20}
height={20}
icon={faFacebookF}></FontAwesomeIcon></p>
</a>

<a target="_blank"rel="noreferrer" href= "https://whatsapp.com/channel/0029Vb5TkBULNSaCbp48jd1e"aria-label="Visit our WhatsApp page">
< p className="m-1 p-2">
<FontAwesomeIcon
width={20}
height={20}
icon={faWhatsapp}/></p>
</a>

<a target="_blank"rel="noreferrer"href= "https://twitter.com/culturays"aria-label="Visit our Twitter page">
<p className="m-1 p-2">
     <FontAwesomeIcon
   width={20}
   height={20}
  icon={faXTwitter}/></p>
  </a>
 <a target="_blank"rel="noreferrer" href= "https://news.google.com/publications/CAAqBwgKMO_gzgswnvzlAw/sections/CAQqEAgAKgcICjDv4M4LMJ785QMwpZvoCA?ceid=US:en&oc=3"aria-label="Visit our Google News page"> 
  <p className="m-1 p-2"> <FontAwesomeIcon
   width={20}
   height={20}
  icon={faGoogle}/>
  </p>
  </a >
  <a target="_blank"rel="noreferrer" href= "https://www.instagram.com/culturays_/"aria-label="Visit our Instagram page"> 
  <p className="m-1 p-2"><FontAwesomeIcon
   width={20}
   height={20}
  icon={faInstagram}/> </p></a>
    <a target="_blank"rel="noreferrer" href= "https://www.youtube.com/@Culturays/"aria-label="Visit our YouTube page"> 
  <p className="m-1 p-2"><FontAwesomeIcon
   width={20}
   height={20}
  icon={faYoutube}/> </p></a>
    </div>

    </div> 
    
    )
  }
  
  export default SocialNav