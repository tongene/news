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
<p className="py-3">I am a web developer and content writer and havw been in the field for over 5 years. I combine both skills for the development of my small business and company.</p>

<p>My aim is to build a standard media center and to work with the most empirical people out there on issues that affect our society. </p>
 
<br/>
<p >From a young age, I discovered my passion for the written word, finding solace and expression in the art of writing. Writing is my sanctuary, a place where dreams take flight and aspirations find voice.</p>
 <br/>
<p>Now I try daily to weave passion, ambition, and compassion into this skill as well as into my essence as a woman. </p>
<br/>
<p>I hope to unravel the tapestry of humanity, emotions and paint vivid idea of imagination and introspection with each stroke of the pen.</p> 

<p className="py-3">I hope that my journey transcends mere self-expression and extend into the realm of service and altruism through Culturays. </p>

<p>I have acquired the necessary educational background and I am relentless in my work and ethic. </p>
<br/>
<p>Ambition and purpose is my approach to life. I am setting my sights high, unafraid to chase this dreams and carve a path in the world.</p>

<p className="py-3">I am refusing to be consumed by the allure of instant gratification with an understanding of value, patience and perseverance. I am taking each step with deliberation, savoring this journey rather than fixating on the destination.</p>

<p>To make this work, I am leveraging professionalism and will be a beacon of integrity and trustworthiness.</p>

<p className="py-3">I hope to look back some day and measure my success by the impact I make rather than by financial gains. True fulfillment lies not in personal achievements alone but in the ability to make a meaningful difference in the lives of others.</p>

<p></p>I am a builder, a dreamer, a compassionate soul committed to making the world a better place, one word, one act of kindness, one dream at a time. I am a beacon of hope and inspiration and I am a woman!
<br/>
<p>P.S You can ignore all these if it sounds boring to you. But this is how I motivate myself daily. Thank you for reading!!!</p>
    </div> 
    </div>  )
}

export default Creator
