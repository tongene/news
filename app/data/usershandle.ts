
import axios from "axios";

export async function usersList(){
    const wprest = axios({
      url:'https://content.culturays.com/graphql',
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        data: JSON.stringify({
          query:`
          query WPUSERS {
        users {
     edges{
     node{
     id
     slug
     name
     username
     }
     }
        }
         }  
         ` 
        
        })
        
        }).then(response => response.data.data.users.edges) 
        .catch(error => console.error('Error:', error));
    // const response = wprest?.data.users.edges
        return wprest 
}

export async function userItem(slug:string){
    const wprest = axios({
      url:'https://content.culturays.com/graphql',
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        data: JSON.stringify({
    query:`
    query WPUSER($id: ID!, $idType: UserNodeIdTypeEnum!){
     user(id: $id, idType: $idType) {
    slug
    email
    name
    username
     avatar {
      url
    }
  } 
    }  
    ` ,
         variables:{
         id: slug,
         idType: 'SLUG' 
         }
        
        })
        
        })
        
        .then(response => response.data.data.user) 
        .then(data =>data) 
        .catch(error => console.error('Error:', error));
        // const response = wprest.data.user
        return wprest 
}