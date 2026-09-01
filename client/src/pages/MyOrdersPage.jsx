import { useState,useEffect } from "react";
import {Link} from "react-router-dom"
import orderService from "../services/orderService";

function MyOrderPage (){

    const [orders , setOrders]  = useState([])
    const [loading , setLoading ]= useState(false)
    const [error , setError] = useState("")
      
    useEffect(()=>{
        fetchOrders()
    },[])

    const fetchOrders = async ()=>{
        try{
            setLoading(true)
            setError("")

            const data = await orderService.getMyOrders()
            setOrders(data)
            

        }catch(err){
          setError(err.response?.data?.message || "failed to load orders!")
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

    return(
        <div className="container">
            <h1>My Orders </h1>
            {
                 orders.length === 0 ? (<p>No Orders yet ! </p>):(
                    <table border="1" cellPadding="20"> 
                    <thead>
                        <tr>
                            <th>Order</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order)=>(
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.status}</td>
                                <td>
                                    <Link to={`/orders/${order._id}`}>Viwe</Link>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                    
                    </table>
                 ) 
            }
        </div>
    )

}

export default MyOrderPage