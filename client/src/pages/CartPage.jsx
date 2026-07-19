import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

function CartPage(){

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

       </div>
    )

}


export default CartPage