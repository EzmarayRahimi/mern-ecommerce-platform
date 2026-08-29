import { useState,useEffect } from "react";
import {Link} from 'react-router-dom';
import orderService from '../services/orderService'

function AdminOrdrsPage(){
    const [orders , SetOrders] = useState([]);



    useEffect(()=>{
        fetchOrder()
    },[])

    const fetchOrder= async ()=>{
        const data = await orderService.getOrders()
        SetOrders(data)
    }

    const handlStatusChange = (id , status)=>{
          await orderService.updateOrderStatus(id,status)

          fetchOrder()
    }


    return(
        <div className="container">
            <h1>Admin Orders</h1>
       <table border="1"  cellPadding="10"> 
        <thead>
            <tr>
                <th>User</th>
                <th>Email</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Details</th> 
            </tr>
        </thead>
        
            {ordres.map((order)=>( 
                <tbody>
                    <tr key={order._id}>
                        <td>{order.user?.name}</td>
                        <td>{order.user?.email}</td>
                        <td>{order.totalPrice}</td>
                        <select value={order.status} onChange={(e)=>handlStatusChange(order._id , e.target.value)}>
                            <option value="pending">Pending</option>
                            <option value="processing">processing</option>
                            <option value="shipped">shipped</option>
                            <option value="delivered">delivered</option>
                        </select>
                    </tr>
                    <td>{new Data(order.createAt).toLocalDateString()}</td>
                    <td><Link to={`/orders/${order._id}`}> view</Link></td>

                </tbody>
            ))}
        
       </table>

        </div>
    )


}

export default AdminOrdrsPage