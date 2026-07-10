import { useState } from "react"
import {useNavigate} from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import authService from "../services/authService"

function RegisterPage(){
      const navigate = useNavigate()
      const {loginUser} = useAuth()

  const [name , setName]= useState("")
  const [email , setEmail] = useState("")  
  const [password , setPassword] = useState("")   
  const [confrimPassword , setConfrimPassword] = useState("")   
  const [loading , setLoading] = useState(false)
  const [error , setError] = useState("")   


  const submitHandler = async (e)=>{
    e.preventDefault();

    if(password !== confrimPassword){
      setError("password dose not match!")
      return;
    }
     try{
      setLoading(true)
      setError("")


      const data = 
      await authService.register(
        name ,
        email,
        password
      )

      loginUser(data)

      localStorage.setItem("userInfo",JSON.stringify(data))

      navigate("/")

     }  catch(err){
      setError(
        err.response?.data?.message || "register failed ! "
      )
     }finally{
      setLoading(false)
     }


  }
   

    return(
      <div> 
        <h1>Register Page </h1>
        {error && <p>{error}</p>}
     
          <form onSubmit={submitHandler}>
            <div>
              <label>Name</label>
              <input type="text" value={name}   onChange={(e)=> setName(e.target.value)} />
            </div>
            <div>
              <label>Email</label>
              <input type="email" value={email}  onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
              <label>Password</label>
               <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
            </div>
            <div>
              <label>Confrim Password</label>
              <input type="password" value={confrimPassword} onChange={(e)=>setConfrimPassword(e.target.value)}/>
            </div>
            <button type="submit" disabled={loading}>
            {loading ? "Loading...":"Register"}
          </button>
          </form>

          

      </div>
    )
       
}
 
export default RegisterPage