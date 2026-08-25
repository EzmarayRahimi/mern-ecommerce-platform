import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import orderService from "../services/orderService";


function OrderDetailsPage(){
    const {id} = useParams()

    const[order,setOrder]= useState(null)
    const [loading , setLoading] = useState(true)
    const [error , setError]= useState("")
    

    useEffect(()=>{
        fetchOrder()
    },[id])

    const fetchOrder= async ()=>{
        try{
           

        const data = await orderService.getOrderById(id)

        setOrder(data)

        }catch(err){
            setError(err.response?.data?.message || "failed to load order!")
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
    <h1>Order Detailes</h1>
    <p>
        <strong>Order ID:</strong>{order._id}
    </p>
    <p>
        <strong>Status:</strong>{order.status}
    </p>
    <p>
        <strong>Total Price:</strong>{order.totalPrice}
    </p>
    <hr />
    <h2>Products</h2>
    {order.orderItems.map((item)=>(
        <div
        key={item.product._id} 
        style={{
            border : "1px solid #ddd",
            padding : "15px",
            marginBottom :"15px"

        }}
        >
            <h3>{item.product.name}</h3>
            <p>Price : ${item.product.price}</p>
            <p>Quantity:{item.product.quantity}</p>
            {item.product.images?.length > 0 && (<img src={`http://localhost3000${item.product.images[0]}`} 
            alt={item.product.name}
            width={120}
            />)}
        </div>
    ))}
        
    </div>
 )

}

export default OrderDetailsPage