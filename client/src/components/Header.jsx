import {useNavigate,Link} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import adminService from '../services/adminService'






export default function Header(){
    const navigate = useNavigate()
    const {userInfo ,logoutUser} = useAuth()
  
            
const handlLogout=()=> {
        logoutUser()
        navigate("/login")
}
return(

<header 
       className='flex items-center gap-6'
>
     <Link to="/">Home </Link>

    {!userInfo && (
        <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        </>
    )}


    {userInfo &&  (
        <> 
        <Link to='/profile'>Profile</Link>
        <Link to='/orders'>My Orders</Link>
        <Link to="/cart">My Cart 🛒</Link>
          <button onClick={handlLogout}> <span> ________</span>LogOut</button>

        </>
    )}


    {true &&(
     
        
        <>
    <Link to="/admin/dashboard">Admin Dashboard</Link>
    <Link to="/admin/orders">Admin Orders</Link>
    <Link to="/admin/products">Admin Products</Link>
    <Link to="/admin/users">Admin Users</Link>
         

        
        </>
    )
     }
         
</header>

)
}