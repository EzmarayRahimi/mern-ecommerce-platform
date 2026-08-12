import { useState } from "react";
import {useNavigate} from "react-router-dom"
import orderService from "../services/orderService";
import order from "../../../server/models/order";

function PlaceOrderPage (){

    const navigate = useNavigate()

    const [loading , setLoading]= useState(false)
    const [error , setError] = useState("")

    const placeOrderHandler = async ()=>{
       try{
         setLoading(true)
        setError("")

        const data = await orderService.createOrder()

        navigate(`/orders/${order._id}`)
       }catch(err){
        setError(err.response?.data?.message || "Place order failed !")
       }finally{
         setLoadin(false)
       }
    }

    return (
        <div className="contaner">
            <h1>Place order </h1>
           {error && <p style={{ color: "red" }}>{error}</p>}
            <p>click here to create your order</p>


            <button onClick={placeOrderHandler} disabled={loading}>
                {
                    loading ? "Loading..." : "Place order"
                }

            </button>

        </div>
    )
}
export default PlaceOrderPage;