import { useAuth } from "../context/AuthContext";

function ProfilePage(){

    const {userInfo} = useAuth()

    return(
        <div>
                   <h1>Profile</h1>
             <p>Name : {userInfo.name}</p>
             <p>Email : {userInfo.email}</p>   
        </div>
    )
}

export default ProfilePage