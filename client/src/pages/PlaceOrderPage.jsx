import { useState } from "react";
import {useNavigate} from "react-router-dom"
import orderService from "../services/orderService";
import {useCart} from "../context/CartContext"


function PlaceOrderPage (){

    const navigate = useNavigate()
    const {cartItems , clearCart}= useCart()


    const [loading , setLoading]= useState(false)
    const [error , setError] = useState("")


    const totalPrice = cartItems.reduce((total,item) => total + item.price * item.qty, 0 )
    const placeOrderHandler = async ()=>{
       try{
         setLoading(true)
        setError("")

        const order = await orderService.createOrder({
            orderItems : cartItems ,
            totalPrice,
        });
        clearCart();

        navigate(`/orders/${order._id}`)
       

       }catch(err){
        setError(err.response?.data?.message || " failed  to create order!")
       }finally{
         setLoading(false)
       }
    }

    return (
        <div className="contaner">
            <h1>Place order page </h1>
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