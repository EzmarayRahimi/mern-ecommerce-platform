import { useState , useEffect } from "react";
import adminService from "../services/adminService";


function AdminDashboardPage (){

    const [stats ,setState ] = useState(null)

    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState("")

    useEffect(()=>{
        fetchDashboard();
    },[])
      

    const fetchDashboard = async () =>{
        try{
           setError("")
           setLoading(true)

           const data = await adminService.getDashboardStats()
               console.log(data)
           setState(data)


        }catch(err){
              setError(err.response?.data?.message || "faild to load State !")
        }finally{
            setLoading(false)
        }
    }


   if(loading){
    return(
        <h1>Loading...</h1>
    )
   }
   if(error){
    return(
        <h1>{error}</h1>
    )
   }
   if(!stats){
    return(
        <h1>No data found </h1>
    )
   }

   return(
    <div className="container">
        <h1>Admin Dashboard</h1>
        
        <div className="dashboard-grid-card">
            <div>
                <h3>Total Users :</h3>
                <h2>{stats.totalUsers}</h2>
            </div>
            <div>
                <h3>Total Products :</h3>
                <h2>{stats.totalProducts}</h2>
            </div>
            <div>
                <h3>Total Orders :</h3>
                <h2>{stats.totalOrders}</h2>
            </div>
            <div>
                <h3>Total Revenue :</h3>
                <h2>{stats.totalRevenue}</h2>
            </div>
            <div>
                <h3>Total Pendding :</h3>
                <h2>{stats.penddingOrders}</h2>
            </div>
            <div>
                <h3>Total Delivered :</h3>
                <h2>{stats.deliveredOrders}</h2>
            </div>


        </div>
    </div>
   )

}

export default AdminDashboardPage

