import { useCart } from "../context/CartContext";

   function CartItem({item}){

    const {updateQuantity , removeFromCart} = useCart()


    const increaseQty = ()=>{
        updateQuantity(item._id , item.qty + 1 )
       
    }

    const decreaseQty = ()=>{
        if(item.qty===1){
            removeFromCart(item._id)
            return;
        }

        updateQuantity(item._id , item.qty - 1)
    }

    return(
             <div style={{
                display:"flex",
                gap : "20px",
                marginBottom:"20px",
                padding:"15px",
                border: "1px solid #ddd"

             }}>
            
            <img src={item.images[0]} alt={item.name} width={120}/>
            <div>
            <h3>{item.name}</h3>
            <p>Price: {item.price}</p>
        <button onClick={increaseQty}>+</button>
        <span style={{margin:"0 10px"}}>{item.qty}</span>
        <button onClick={decreaseQty}>-</button>
             <p>Total: {item.price * item.qty}</p>
        <button onClick={()=>removeFromCart(item._id)} style={{marginTop:"10px"}}>Remove</button>


             </div>
             </div>
    )

   }

   export default CartItem