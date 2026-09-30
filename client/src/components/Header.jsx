// Header.jsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
const navigate = useNavigate();
const { userInfo, logoutUser } = useAuth();
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const handlLogout = () => {
logoutUser();
setMobileMenuOpen(false);
navigate("/login");
};

const closeMobileMenu = () => {
setMobileMenuOpen(false);
};

return (
 <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur"> 
 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


    {/* Main Header */}
    <div className="flex h-16 items-center justify-between gap-4">

      {/* Logo */}
      <Link
        to="/"
        onClick={closeMobileMenu}
        className="flex shrink-0 items-center gap-2.5"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white shadow-sm">
          S
        </span>

        <div className="hidden sm:block">
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Shop<span className="text-indigo-600">Hub</span>
          </span>
        </div>

        <span className="text-lg font-bold tracking-tight text-slate-900 sm:hidden">
          Shop<span className="text-indigo-600">Hub</span>
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-1 md:flex">

        <Link
          to="/"
          className="rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
        >
          Home
        </Link>

        <Link
          to="/"
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
        >
          Products
        </Link>

        {userInfo?.isAdmin && (
          <>
            <Link
              to="/admin/dashboard"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
            >
              Dashboard
            </Link>

            <Link
              to="/admin/products"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
            >
              Products
            </Link>

            <Link
              to="/admin/orders"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
            >
              Orders
            </Link>

            <Link
              to="/admin/users"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
            >
              Users
            </Link>
          </>
        )}
      </nav>

      {/* Desktop User Actions */}
      <div className="hidden items-center gap-2 md:flex">

        {userInfo ? (
          <>
            {/* User Name */}
            <Link
              to="/profile"
              className="mr-1 flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-slate-100"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
                {userInfo.name?.charAt(0)?.toUpperCase() || "U"}
              </span>

              <span className="hidden lg:block text-sm font-medium text-slate-700">
                {userInfo.name}
              </span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="group relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
              aria-label="Shopping cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25h9.75m-9.75 0a2.25 2.25 0 0 0-2.25 2.25v.75h13.5v-.75a2.25 2.25 0 0 0-2.25-2.25m-9 0L4.73 5.272A2.25 2.25 0 0 1 6.908 3.75h11.184a1.875 1.875 0 0 1 1.793 2.423l-1.8 6.075a2.25 2.25 0 0 1-2.156 1.612H7.5Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 19.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm9 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </Link>

            {/* Logout */}
            <button
              onClick={handlLogout}
              className="ml-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 active:scale-[0.98]"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98]"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 md:hidden"
        aria-label="Toggle navigation menu"
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </button>
    </div>

    {/* Mobile Navigation */}
    {mobileMenuOpen && (
      <div className="border-t border-slate-100 py-4 md:hidden">

        <nav className="flex flex-col gap-1">

          <Link
            to="/"
            onClick={closeMobileMenu}
            className="rounded-lg bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-600"
          >
            Home
          </Link>

          <Link
            to="/"
            onClick={closeMobileMenu}
            className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
          >
            Products
          </Link>

          {userInfo ? (
            <>
              <Link
                to="/profile"
                onClick={closeMobileMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
              >
                Profile
              </Link>

              <Link
                to="/orders"
                onClick={closeMobileMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
              >
                My Orders
              </Link>

              <Link
                to="/cart"
                onClick={closeMobileMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
              >
                My Cart
              </Link>

              {userInfo?.isAdmin && (
                <>
                  <div className="my-2 border-t border-slate-100" />

                  <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Administration
                  </p>

                  <Link
                    to="/admin/dashboard"
                    onClick={closeMobileMenu}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/admin/products"
                    onClick={closeMobileMenu}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
                  >
                    Products
                  </Link>

                  <Link
                    to="/admin/orders"
                    onClick={closeMobileMenu}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
                  >
                    Orders
                  </Link>

                  <Link
                    to="/admin/users"
                    onClick={closeMobileMenu}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
                  >
                    Users
                  </Link>
                </>
              )}

              <button
                onClick={handlLogout}
                className="mt-2 rounded-lg bg-slate-900 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="mt-2 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="rounded-lg bg-indigo-600 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    )}
  </div>
</header>


);
}


///////////////////// start the header of sit

// import { useState } from "react";
// import {useNavigate ,Link} from 'react-router-dom'
// import {useAuth} from '../context/AuthContext'

// function Header(){
//      const navigate = useNavigate()

//      const {userInfo , logoutUser} = useAuth()
//      const [mobileMenuOpen , setMobileMenuOpen] =useState(false)

//      const handelLogout = ()=>{
//       logoutUser();
//       setMobileMenuOpen(false)
//       navigate('/login')

//      }
      
//      const closeMobleMenu =()=>{
//       setMobileMenuOpen(false)
//      }

//      return(
//       <header className="sticky top-0 z-50 border-b border-slate-200 shadow-sm bg-white/95  backdrop-blur ">
//        <div className=" mx-auto max-w-7x1 px-4 sm:px-6 lg:px-8 ">
//         {/*main container */}
//         <div className="flex h-16 items-center justify-between gap-4">
//  {/*logo  */}

//            <Link to="/" onClick={closeMobleMenu}
//            className="flex shrink-0 items-center gap-2.5">
//               <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white shadow-sm">
//                   S
//               </span>
//         <div className="hidden sm:block">
//           <span className="text-xl font-bold tracking-tight text-slate-900 ">
//               Shop <span className="text-indigo-600">Hub</span>
//           </span>
//         </div>
//            <span className="text-xl font-bold tracking-tight text-slate-900 sm:hidden">
//                Shop <span className="text-indigo-600">Hub</span>
//            </span>
//            </Link>

//  {/* Desktop Navigation */}
//          <nav className="hiddien items-center gap-1 md:flex">
//                <Link to="/" 
//                className=" rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600" >
//                     Home
//                </Link>
//                <Link to="/" 
//                className=" rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600" >
//                     Products
//                </Link>
//         {userInfo?.isAdmin &&(
//           <>
//            <Link to="/admin/dashboard" 
//                className=" rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600" >
//                     Dashboard
//                </Link>
//            <Link to="/admin/products" 
//                className=" rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600" >
//                     Products
//                </Link>
//            <Link to="/admin/orders" 
//                className=" rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600" >
//                     Orders
//                </Link>
//            <Link to="/admin/users" 
//                className=" rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600" >
//                     Users
//                </Link>
//           </>
//         )}
//  </nav>

// {/* Desktop User Actions */} 
//       <div className="hidden items-center gap-2 md:flex">
//         {userInfo ? (
//           <>
//           <Link to="/profile"
//           className="mr-1 flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-slate-100 ">
//             <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
//               {userInfo?.name?.charAt(0).toUpperCase()||"U"}
//             </span>

//             <span className="hidden lg:block text-sm font-medium text-slate-700">
//               {userInfo.name}
//             </span>
//           </Link>

//  {/* Cart */}
//         <Link to="/cart"
//           className="group relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600  " 
//           aria-label="Shopping cart" >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.8"
//                 stroke="currentColor"
//                 className="h-5 w-5"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25h9.75m-9.75 0a2.25 2.25 0 0 0-2.25 2.25v.75h13.5v-.75a2.25 2.25 0 0 0-2.25-2.25m-9 0L4.73 5.272A2.25 2.25 0 0 1 6.908 3.75h11.184a1.875 1.875 0 0 1 1.793 2.423l-1.8 6.075a2.25 2.25 0 0 1-2.156 1.612H7.5Z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M8.25 19.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm9 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
//                 />
//               </svg>
//         </Link>
//  {/* Logout  */}
//       <button 
//             onClick={handelLogout}
//             className="ml-1 rounded-lg bg-slate-900 px-4 py-2  text-sm font-medium text-white transition hover:bg-slate-700 active:scale-[0.9]"  >
//               Logout
//        </button>

//                 </>
//         ):(
//           <>
//           <Link
//           to="/login"
//           className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition  hover:bg-slate-100 hover:text-indigo-600">
//             Login
//           </Link>
//           <Link
//           to="/Register"
//           className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition  hover:bg-slate-100 hover:text-indigo-600">
//             Register
//           </Link>
//           </>
//         )}
//       </div>
//  {/* Moble menu button  */}
//   <button
//       type="button"
//       onClick={()=> setMobileMenuOpen(!mobileMenuOpen)}
//       className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 md:hidden"
//       aria-label="Toggle navigation menu"
//       aria-expanded={mobileMenuOpen} >

//         {mobileMenuOpen ?(
//                 <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             className="h-6 w-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18 18 6M6 6l12 12"
//             />
//           </svg>
//         ):(
//                 <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             className="h-6 w-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
//             />
//           </svg>
//         )}


//   </button>
//  </div>
   
//  {/* Mobile navigation  */}
// {mobileMenuOpen && (
//   <div className="border-t border-slate-100 py-4 md:hidden ">
//     <nav className="flex flex-col gap-1">
//       <Link to="/"
//       onClick={closeMobleMenu}
//       className="rounded-lg bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-600 ">
//       Home
//       </Link>
//       <Link to="/"
//       onClick={closeMobleMenu}
//       className="rounded-lg bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-600 ">
//       Products
//       </Link>
// {userInfo ? (
//   <>
//   <Link
//   to="/profile"
//   onClick={closeMobleMenu}
//   className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
//   >Profile</Link>
//   <Link
//   to="/orders"
//   onClick={closeMobleMenu}
//   className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
//   >My Orders</Link>
//   <Link
//   to="/cart"
//   onClick={closeMobleMenu}
//   className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
//   >My Cart</Link>
//  {userInfo?.isAdmin && (
//                      <>
//                   <div className="my-2 border-t border-slate-100" />

//                   <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
//                     Administration
//                   </p>

//                   <Link
//                     to="/admin/dashboard"
//                     onClick={closeMobileMenu}
//                     className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
//                   >
//                     Dashboard
//                   </Link>

//                   <Link
//                     to="/admin/products"
//                     onClick={closeMobileMenu}
//                     className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
//                   >
//                     Products
//                   </Link>

//                   <Link
//                     to="/admin/orders"
//                     onClick={closeMobileMenu}
//                     className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
//                   >
//                     Orders
//                   </Link>

//                   <Link
//                     to="/admin/users"
//                     onClick={closeMobileMenu}
//                     className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
//                   >
//                     Users
//                   </Link>
//                 </>

//  )}
//              <button
//                 onClick={handlLogout}
//                 className="mt-2 rounded-lg bg-slate-900 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-slate-700"
//               >
//                 Logout
//               </button>
            
//  </>
// ):(
//              <>
//               <Link
//                 to="/login"
//                 onClick={closeMobileMenu}
//                 className="mt-2 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
//               >
//                 Login
//               </Link>

//               <Link
//                 to="/register"
//                 onClick={closeMobileMenu}
//                 className="rounded-lg bg-indigo-600 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-indigo-700"
//               >
//                 Register
//               </Link>
//             </>
// )}

//     </nav>

//   </div>
// )}

//        </div>
//       </header>
//      );

// }


// export default Header