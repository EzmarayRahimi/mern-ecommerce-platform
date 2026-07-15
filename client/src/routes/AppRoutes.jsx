
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import LoginPage  from '../pages/LoginPage'
import RegisterPage  from '../pages/RegisterPage'
import ProtectedRoute from '../components/ProtectedRoute'
import ProfilePage from '../pages/ProfilePage'
import ProductDetailsPage from '../pages/ProductDetailsPage'

import {Route, Routes } from 'react-router-dom'




 function AppRoutes() {

       return (
        <Routes>
            <Route element={<MainLayout/>}>
            <Route path = "/" element ={<HomePage/>}/>
            <Route path = "/login" element ={<LoginPage/>}/>
            <Route path = "/register" element ={<RegisterPage/>}/>
            <Route path="/product/:id" element={<ProductDetailsPage/>}/>
            <Route element={<ProtectedRoute/>}>
                <Route path='/profile' element={<ProfilePage/>}/>
            </Route>
            </Route>

        </Routes>
       )

}


export default AppRoutes