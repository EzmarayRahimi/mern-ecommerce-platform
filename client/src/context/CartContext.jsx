import { useContext,createContext,useState,useEffect } from "react";

const CartContext = createContext();

 function CartProvider({children}){

    const [cartItems , setCartItems] = useState(()=>{
        const savedCart = localStorage.getItem("cartItems")

        return savedCart ?
         JSON.parse(savedCart):[]
    })

    useEffect(()=>{
        
        localStorage.setItem("cartItems" , JSON.stringify(cartItems))
    } ,[cartItems])


    const addToCart = (product)=>{
        const existingItem = 
        cartItems.find((item)=> item._id === product._id)
    

    if(existingItem){
        setCartItems(cartItems.map((item)=> item._id === product._id ? {
            ...item ,
            qty:item.qty + 1 ,
        }:item));
    }else{
        setCartItems([
            ...cartItems,
            {
                ...product,
                qty :1,
            }
        ])
    }
  };

  const removeFromCart = (id)=>{
    setCartItems(
        cartItems.filter((item)=> item._id !== id)
    )
  };

  const updateQuantity =(id,qty)=>{
    setCartItems(
        cartItems.map((itme)=> 
            item._id === id ? {
                ...item ,
                qty,
            }:item)
    )
  }

  return (
    <CartContext.Provider value={{
       cartItems ,
    addToCart,
    removeFromCart,
    updateQuantity
    }}>{children}</CartContext.Provider>
  )


}

export function useCart (){
    return useContext(CartContext)
}

export default CartProvider