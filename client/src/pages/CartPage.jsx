import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

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
                <div key={item._id}>
                      
                    <h1>{item.name}</h1>
                     <p><strong>Price: </strong>${item.price}</p>
      <p><strong>Details: </strong>{item.description}</p>
      <p><strong>Category: </strong>{item.category}</p>
      <p><strong>Quantity: </strong>{item.qty}</p>
      <p><strong>Total: </strong>{item.price * item.qty}</p>


                </div>
            ))
        }

       </div>
    )

}


export default CartPage