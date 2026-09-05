import { useState ,useEffect } from "react";
import adminService  from "../services/adminService";
import { useNavigate, useParams } from "react-router-dom";

function AdminUserEditPage (){
    const { id} = useParams()
    const navigate = useNavigate()

    const [name , setName]= useState("")
    const [email , setEmail] = useState("")
    const [isAdmin , setIsAdmin] = useState(false)

    const [loading ,setLoading]=useState(false)
    const [error , setError] = useState("")

    useEffect(()=>{
          fetchUsers();
    },[])

const fetchUsers= async () =>{
      try{
        setLoading(true)
        setError("")
            const data = await adminService.getUserById(id)
    setName(data?.name ?? "");
    setEmail(data?.email ?? "");
    setIsAdmin(data?.isAdmin ?? false);
      }catch(err){
        setError(err.response?.data?.message || "faild to load user ")
      }finally{
        setLoading(false)
      } 
}

const submitHandler = async (e)=>{
        e.preventDefault();
    try{
        setLoading(true)
        setError("")

        const data = await adminService.updateUser(id,{
            name ,
            email,
            isAdmin,
        })

        navigate('/admin/users')
    }catch(err){
          setError(err.response?.data?.message || "faild to update user !")
    }finally{
        setLoading(false)
    }
}


  if(loading){
        return( <h1>Loading...</h1>)
    }
    if(error){
        return(<h1>{error}</h1>)
    }

    return(
        <div className="container">
              <h1>Edit User</h1>

              <form onSubmit={submitHandler}> 
                
                <input type="text" 
                name="name" 
                id="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Name"
                /><br/>

                <input type="email" 
                name="email" 
                id="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="email"
                /><br/>
                <label >
                     <input type="checkbox" 
                name="isAdmin" 
                id="isAdmin"
                checked={isAdmin }
                onChange={(e)=>setIsAdmin(e.target.checked)}
                
                /> Admin
                </label> <br />

               
            <button>Save</button>
              </form>
        </div>
    )
           
}

export default AdminUserEditPage