import { useState, useEffect } from "react";
import adminService from "../services/adminService";


function AdminUsersPage(){
    const [users ,setUsers]= useState([])
    const [loading , setLoading] = useState(false)
    const [error,setError] = useState("")


const fetchUsers = async () =>{
   try{
    setLoading(true)
    setError("")

    const data = await  adminService.getUsers()

    setUsers(data)

   }catch(err){
    setError(err.response?.data?.message || "faild to load users")
   }finally{
    setLoading(false)
   }

}

const handelDelete = async (id) =>{
    if(!window.confirm("delete this user !"
        )) return;
        try{
       await adminService.deleteUser(id)
       fetchUsers();

    }catch(err){
        alert(err.response?.data?.message || "delete faild")
    }
}

    useEffect(()=>{
        fetchUsers();
    },[])

if(loading){
    return(
        <h1>Loading...</h1>
    )
}
if(error){
    return(
        <h1>{error}</h1>
    )
}

return(
    <div className="container">
             <h1>Admin Users</h1>

             <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Action</th>
                    </tr>
                   
                </thead>
                <tbody>
   {
    users.map((user)=>(
        <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.isAdmin ? "Yes" : "No"}</td>
            <td>
                <Link>Edit</Link> {'|'}
                <button onClick={()=>handelDelete(user._id)}>Delete
                </button>
            </td>
            
        </tr> )) }
                </tbody>
             </table>
    </div>
)

}

export default AdminUsersPage