// import {useNavigate,Link} from 'react-router-dom'
// import {useAuth} from '../context/AuthContext'

// export default function Header(){
//     const navigate = useNavigate()
//     const {userInfo ,logoutUser} = useAuth()
//     console.log(userInfo)
  
// const handlLogout=()=> {
//         logoutUser()
//         navigate("/login")
// }
// return(

// <header 
//        className='flex items-center gap-6'
// >
//      <Link to="/">Home </Link>

// {!userInfo && (
//         <>
//         <Link to="/login">Login</Link>
//         <Link to="/register">Register</Link>
//         </>
//     )}
// {userInfo &&  (
//         <> 
//         <Link to='/profile'>Profile</Link>
//         <Link to='/orders'>My Orders</Link>
//         <Link to="/cart">My Cart 🛒</Link>
//         <p>Welcome Mr/Mss <span>{userInfo.name}</span></p>
//           <button onClick={handlLogout}> <span> ________</span>LogOut</button>
//         </>
//     )}


// {userInfo?.isAdmin  &&(
//     <>
//         <Link to="/admin/dashboard">Admin Dashboard</Link>
//         <Link to="/admin/orders">Admin Orders</Link>
//         <Link to="/admin/products">Admin Products</Link>
//         <Link to="/admin/users">Admin Users</Link> 
//     </>
//     )
//      }
         
// </header>

// )
// }



import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
const navigate = useNavigate();
const { userInfo, logoutUser } = useAuth();

const handlLogout = () => {
logoutUser();
navigate("/login");
};

return (
<header className="bg-white border-b border-slate-200 sticky top-0 z-50">

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

<div className="h-16 flex items-center justify-between">

{/* Logo */}
<Link
to="/"
className="flex items-center gap-2 text-xl font-bold text-indigo-600"
>
<span className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
S
</span>

ShopHub
</Link>

{/* Navigation */}
<nav className="hidden md:flex items-center gap-7">

<Link
to="/"
className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition"
>
Home
</Link>

 </nav>


{/* Admin section */}
{userInfo?.isAdmin && (
    <>
    <Link
to="/admin/orders"
className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition"
>
Admin Orders
</Link>
    <Link
to="/admin/users"
className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition"
>
Admin Users
</Link>
    <Link
to="/admin/products"
className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition"
>
Admin Products
</Link>

<Link
to="/admin/dashboard"
className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition"
>
Dashboard
</Link>



    
    </>
)}


{/* User section */}
<div className="flex items-center gap-3">


{userInfo ? (
<>
<span className="hidden lg:block text-sm text-slate-600">
Welcome, <span className="font-semibold text-slate-900">
{userInfo.name}
</span>
</span>



<Link
to="/cart"
className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition"
>
Cart 🛒
</Link>
<Link
to="/profile"
className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition"
>
Profile
</Link>
<button
onClick={handlLogout}
className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition"
>
Logout
</button>
</>
) : (
    <>
    <Link
to="/login"
className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
>
Login
</Link>

<Link
to="/register"
className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition"
>
Register
</Link>

    </>



)}

</div>

</div>

</div>

</header>
);
}