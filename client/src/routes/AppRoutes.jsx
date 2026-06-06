
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import LoginPage  from '../pages/LoginPage'
import RegisterPage  from '../pages/RegisterPage'

import {Route, Routes } from 'react-router-dom'




 function AppRoutes() {

       return (
        <Routes>
            <Route element={<MainLayout/>}>
            <Route path = "/" element ={<HomePage/>}/>
            <Route path = "/login" element ={<LoginPage/>}/>
            <Route path = "/register" element ={<RegisterPage/>}/>
            </Route>
        </Routes>
       )

}


export default AppRoutes