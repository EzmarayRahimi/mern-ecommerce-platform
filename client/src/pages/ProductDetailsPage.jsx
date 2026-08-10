import { useState,useEffect } from "react";
import {useParams} from 'react-router-dom';
import productService from "../services/productService";
import { useCart } from "../context/CartContext";

function ProductDetailsPage(){


    const {addToCart} = useCart()
      
    const {id} = useParams()
    console.log(id)

    const [product , setProduct]=useState(null)
    const [loading , setLoading]=useState(false)
    const [error,setError]=useState("")


    useEffect(()=>{
        const fetchProduct = async ()=>{
            try{
            setLoading(true)
            setError("")
            const data = await productService.getProductById(id)
            setProduct(data)
            }catch(err){
                setError(err.response?.data?.message || "failed to load product !")
            }finally{
                setLoading(false)
            }
  } ;
  fetchProduct()  
    },[id])

    if(error){
    return (
        <h2>{error}</h2>
    )
}
    if(loading){
    return (
        <h2>Loading...</h2>
    )
}
       if(!product){
    return (
        <h2>Product Not Found !</h2>
    )
}

return(
    <div>
        <h1>{product.name}</h1>

        <img src={`http://localhost:3000${product.images[0]}`} 
        alt={product.name}
        width="300"
        />
       
      <p><strong>Price: </strong>${product.price}</p>
      <p><strong>Details: </strong>{product.description}</p>
      <p><strong>Category: </strong>{product.category}</p>
      <p><strong>Rating: </strong>{product.rating}</p>
      <p><strong>Stock: </strong>{product.countInStock}</p>
      <button
      onClick={()=>
        addToCart(product)}>
            Add To Cart
      </button>
    </div>
)

}


export default ProductDetailsPage;
