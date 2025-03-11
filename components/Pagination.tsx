const Pagination = ({postPerPage, totalPosts, paginating }:{postPerPage:number,totalPosts:number, paginating:Function}) => {
    const pageNumbers =[]
    for(let i = 1 ; i <= Math.ceil(totalPosts / postPerPage); i++){
        pageNumbers.push( i )
        
    } 
     
   
  return (
    <div> 
        <nav>
            <ul> 
              {pageNumbers.map(number=>(           
       <a onClick={()=> paginating(number)} key={number}></a>
            )) } 
            </ul>
        </nav>
    
 
    </div>
  )
}

export default Pagination