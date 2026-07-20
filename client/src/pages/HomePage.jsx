import { useState,useEffect } from "react"
import productService from "../services/productService"
import ProductCart from "../components/ProductCart"
import SearchBar from "../components/SearchBar"
import { useSearchParams } from "react-router-dom"
import CategoryFilter from "../components/CategoryFilter"
function HomePage(){

      const [products , setProducts] = useState("")
      const [loading , setLoadin] = useState(false)
      const [error , setError] = useState("")
      const [searchParams]= useSearchParams();
      const keyword = searchParams.get("keyword") || "";
      const category = searchParams.get("category") || "";
useEffect(()=>{
    const fetchProducts = async ()=>{

        try{
            setLoadin(true)
            setError("")

         const data = await productService.getProducts(keyword,category); 
              
             setProducts(data.products)

        }
        catch(err){
            setError(err.response?.data?.message || "failed to load products")
        }finally{
            setLoadin(false)
        }
    }
    fetchProducts();
},[keyword,category])

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
        <SearchBar/>
        <CategoryFilter/>
    {products.length === 0 ? (<h3>Not any products to show</h3>):(products.map((product)=>(
       <ProductCart
               key={product._id}
               product={product}
       />
    )))}

    </div>

    )
       
}
 
export default HomePage