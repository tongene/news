 
import { GoogleAuthProvider, reauthenticateWithPopup, User } from "firebase/auth";
import { auth } from "./firebase";
 
const provider = new GoogleAuthProvider();
export const deleteProfile=()=>{
    reauthenticateWithPopup(auth.currentUser as User, provider)
  .then(() => {
    return (auth.currentUser as User).delete();
  })
  .then(() => {
    console.log("User deleted after reauth");
  })
  .catch((error) => {
    console.error(error);
  });
}

