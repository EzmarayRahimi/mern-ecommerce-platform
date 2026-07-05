import {Link} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'



export default function Header(){
    
    const {userInfo } = useAuth()
                    

return(

<header>
    <Link to="/">Home </Link>
    {userInfo ? (<span>Wellcome Mr/Mss {userInfo.name}</span>):(<Link to="/login">Login</Link>)}

   
</header>

)
}