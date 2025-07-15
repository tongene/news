import Image from "next/image" 

const Creator = () => {
  return ( 
  <div className="w-full m-auto py-8 bg-white bg-opacity-90 text-gray-700"> 
  <h1 className="font-bold py-4 text-3xl text-center">Christina Ngene</h1>
<div className="w-3/5 md:w-2/5 m-auto">

<Image
src='/assets/images/ngenet.jpg' 
width={1250}
height={675} 
className="shadow-1xl m-2"
alt="Christina Ngene"
/> 
</div >
   

<div className="w-4/5 m-auto text-lg">
<p className="py-3">I am a web developer and content writer with over five years of experience. I blend technical expertise with creative storytelling to build and grow my small business and media brand. 
</p>

<p>This dual skill set allows me to create impactful digital experiences while communicating ideas that resonate deeply with audiences.</p>
 
<br/>
<p >My long-term vision is to establish a standard-setting media center and to collaborate with passionate, forward-thinking individuals on issues that shape our society. I’m driven by purpose, curiosity, and the belief that creativity and technology can be powerful tools for social good.</p>
 <br/>
<p>From a young age, writing has been my outlet—my sanctuary. It’s where I’ve always found clarity, courage, and the freedom to dream. Today, I continue to channel that passion into every project I take on, weaving ambition, empathy, and integrity into my work and identity as a woman. </p>
<br/>
<p>I hope to unravel the tapestry of humanity, emotions and paint vivid idea of imagination and introspection with each stroke of the pen.</p> 
<p>Through *Culturays*, I hope to move beyond personal expression and into meaningful service—exploring the depth of human experience, inspiring introspection, and amplifying voices that deserve to be heard.</p> 
<p className="py-3">I hope that my journey transcends mere self-expression and extend into the realm of service and altruism through. </p>

<p>I’ve equipped myself with the necessary educational background, and I approach my work with discipline, professionalism, and a strong ethical foundation. I believe in building with purpose—not chasing trends or quick wins, but focusing on lasting value and impact. </p>
<br/>
<p>Ambition and purpose is my approach to life. I am setting my sights far, unafraid to chase this dreams and carve a path in the world.</p>

<p className="py-3">I am refusing to be consumed by the allure of instant gratification with an understanding of value, patience and perseverance. I am taking each step with deliberation, savoring this journey rather than fixating on the destination.</p>

<p>To make this work, I am leveraging professionalism and will be a beacon of integrity and trustworthiness.</p>

<p className="py-3">I hope to look back some day and measure my success by the impact I make rather than by financial gains. True fulfillment lies not in personal achievements alone but in the ability to make a meaningful difference in the lives of others.</p>
<p>Success, to me, isn’t measured by financial gains alone, but by the lives touched, the stories told, and the hope sparked. I aim to leave a legacy of kindness, courage, and creativity.</p>
<p></p>I am a builder, a dreamer, a compassionate soul committed to making the world a better place, one word, one act of kindness, one dream at a time. I am a beacon of hope and inspiration and I am a woman! 
<br/>
{/* <p>P.S You can ignore all these if it sounds boring to you. But this is how I motivate myself daily. Thank you for reading!!!</p> */}
    </div> 
    </div>  )
}

export default Creator
