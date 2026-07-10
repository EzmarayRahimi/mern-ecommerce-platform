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

<header>
    <Link to="/">Home </Link>
    <Link to="/register">Register</Link>
    {userInfo ? (<span>Wellcome Mr/Mss {userInfo.name}</span>):(<Link to="/login">Login</Link>)}

      <button onClick={handlLogout}> <span> ________</span>LogOut</button>
</header>

)
}