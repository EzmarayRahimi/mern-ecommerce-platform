import { Outlet, Navigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


function   ProtectedRoute(){
    const {userInfo} = useAuth()

    if(!userInfo){
       return <Navigate to="/login" replace/>
    }
    return <Outlet/>
}

export default ProtectedRoute