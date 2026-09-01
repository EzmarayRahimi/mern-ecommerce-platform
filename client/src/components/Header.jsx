import {useNavigate,Link} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'



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
    <Link to="/register">Register</Link>
    <Link to="/profile">Profile</Link>
    <Link to="/cart">My Cart 🛒</Link>
    <Link to="/admin/orders">Admin Orders</Link>

    {userInfo ? (<span>Wellcome Mr/Mss {userInfo.name}</span>):(<Link to="/login">Login</Link>)}

      <button onClick={handlLogout}> <span> ________</span>LogOut</button>
</header>

)
}