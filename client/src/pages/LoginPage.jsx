import { useState } from "react"
import { useNavigate } from "react-router-dom"
import authService from "../services/authService"
import { useAuth } from "../context/AuthContext"


function LoginPage(){

   const navigate = useNavigate();
   const {loginUser} = useAuth();
       const [email , setEmail] = useState("")
       const [password , setPassword] = useState("")
       const [loading , setLoading] = useState(false)
       const [error , setError ] = useState("")
     

const submitHandler = async (e) =>{
  e.preventDefault()
 
try{
   setLoading(true)   
  setError("")
  const data = await authService.login(email , password) 
  loginUser(data)


  localStorage.setItem("userInfo",JSON.stringify(data));
  navigate("/")
}
catch(err) {
    console.log(err);

  setError( err.response?.data?.message ||
      "Login failed")
}
finally{
  setLoading(false)
}

}




    return(
    <div>     <h1>Login Page </h1>
          
          {error && <p>{error}</p>}
    
    <form onSubmit={submitHandler} > 
      <div><label>email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
      </div>
      <div>
        <label>password</label>
        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
      </div>
            <button type="submit" disabled={loading}>{loading ? "loading..." : "login"}</button>
    </form>


    </div>
    )
       
}
 
export default   LoginPage


