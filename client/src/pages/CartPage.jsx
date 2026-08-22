import { useCart } from "../context/CartContext";
import { Link , useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";

function CartPage(){
    const navigate = useNavigate()

    const {cartItems}= useCart()


    if(cartItems.length===0){
        return(
            <div>
                 <h1>Your Cart 🛒</h1>
                 <p>your cart is empty ! </p>
                 <Link to="/">GO to Shoping</Link>
            </div>     
        )
    }
 
    return(
       <div>
                 <h1>Your Cart 🛒</h1>

        {
            cartItems.map((item)=>(
               <CartItem 
               key={item._id} 
               item={item}
               />
            ))
        }

        <hr />
        <h2>Total:${
                      cartItems.reduce((total,item)=> total + item.price * item.qty ,0 )
                        }</h2>

                        <button onClick={()=> navigate('/placeorder') } disabled={cartItems.length===0} >CheckOut</button>

       </div>
    )

}


export default CartPage