import { useState,useEffect } from "react"
import productService from "../services/productService"

function HomePage(){

      const [products , setProducts] = useState("")
      const [loading , setLoadin] = useState(false)
      const [error , setError] = useState("")

useEffect(()=>{
    const fetchProducts = async ()=>{

        try{
            setLoadin(true)
            setError("")

         const data = await productService.getProducts(); 
              
             setProducts(data.products)

        }
        catch(err){
            setError(err.response?.data?.message || "failed to load products")
        }finally{
            setLoadin(false)
        }
    }
    fetchProducts();
},[])

if(loading){
    return ( 
        <h1>Loading...</h1>
    )
}
if(error){
    return (
        <h1>{error}</h1>
    )
}

 return(
    <div>
        <h1>HOME PAGE</h1>
    {products.length === 0 ? (<h3>Not any products to show</h3>):(products.map((product)=>(
        <div key={product._id}>
            <h1>{product.name}</h1>
            <h3>Price : $ {product.price}</h3>
            <p>{product.description}</p>
        </div>
    )))}

    </div>

    )
       
}
 
export default HomePage