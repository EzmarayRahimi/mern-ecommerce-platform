
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import LoginPage  from '../pages/LoginPage'
import RegisterPage  from '../pages/RegisterPage'
import ProtectedRoute from '../components/ProtectedRoute'
import ProfilePage from '../pages/ProfilePage'
import ProductDetailsPage from '../pages/ProductDetailsPage'
import CartPage from '../pages/CartPage'
import AdminProductsPage from '../pages/AdminProductsPage'
import CreateProductsPage from '../pages/CreateProductsPage'
import EditProductPage from '../pages/EditProductPage'
import PlaceOrderPage from '../pages/PlaceOrderPage'
import MyOrderPage from '../pages/MyOrdersPage'
import OrderDetailsPage from '../pages/OrderDetailsPage'
import AdminOrdrsPage from '../pages/AdminOrdersPage'
import AdminDashboardPage from '../pages/AdminDashboardPage'
import AdminUsersPage from '../pages/AdminUsersPage'
import AdminUserEditPage from '../pages/AdminUserEditpage'


import {Route, Routes } from 'react-router-dom'




 function AppRoutes() {

       return (
        <Routes>
            <Route element={<MainLayout/>}>
            <Route path = "/" element ={<HomePage/>}/>
            <Route path = "/login" element ={<LoginPage/>}/>
            <Route path = "/register" element ={<RegisterPage/>}/>
            <Route path="/product/:id" element={<ProductDetailsPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route element={<ProtectedRoute/>}>
                <Route path='/profile' element={<ProfilePage/>}/>
                <Route path='/admin/products' element={<AdminProductsPage/>}/>
                <Route path='/admin/products/create' element={<CreateProductsPage/>}/>
                <Route path='/admin/products/:id/edit' element={<EditProductPage/>}/>
                <Route path='/placeorder' element={<PlaceOrderPage/>}/>
                <Route path='/orders' element={<MyOrderPage/>}/>
                <Route path='/orders/:id' element={<OrderDetailsPage/>}/>
                <Route path='/admin/orders' element={<AdminOrdrsPage/>}/>
                <Route path='/admin/dashboard' element={<AdminDashboardPage/>}/>
                <Route path='/admin/users' element={<AdminUsersPage/>}/>
                <Route path='/admin/users/:id/edit' element={<AdminUserEditPage/>}/>

            </Route>
            </Route>

        </Routes>
       )

}


export default AppRoutes