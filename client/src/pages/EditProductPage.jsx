import { useState , useEffect, lazy } from "react";
import {useNavigate , useParams} from 'react-router-dom'
import productService from "../services/productService";

function EditProductPage (){

    const navigate = useNavigate()
    const {id} = useParams()

    const [name , setName]=useState("")
    const [price , setPrice]=useState("")
    const [description, setDescription]=useState("")
    const [category , setCategory]=useState("")
    const [countInStock , setCountInStock]=useState("")

    const [loading , setLoading]=useState(true)
    const [error , setError]=useState("")

    useEffect(()=>{
        fetchProduct();
    },[])

    const fetchProduct = async ()=>{
        try{
    
             const data = await productService.getProductById(id) 

              setName(data.name)
              setPrice(data.price)
              setDescription(data.description)
              setCategory(data.category)
              setCountInStock(data.countInStock)
        }catch(err){
               setError(err.response?.data?.message||"failed to load product!")
        }finally{
            setLoading(false)
        }
        
    }

    const submitHandler = async (e)=>{
      e.preventDefault()
      try{
        setLoading(true)
        setError("")
        
        await productService.updateProduct(id,{
            name,
            price,
            description,
            category,
            countInStock
        })


        navigate('/admin/products')


      }catch(err){
               setError(err.response?.data?.message||"failed to load product!")
         
      }finally{
       setLoading(false)
      }
    }

    if(loading){
        return( <h1>Loading...</h1>)
    }
    if(error){
        return(<h1>{error}</h1>)
    }

    return(
        <div className="container">

            <h1>Edit Product</h1> 

            <form onSubmit={submitHandler}>
                <input type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)} 
                placeholder="Name"
                />
                <br /><br />
                  <input type="number"
                value={price}
                onChange={(e)=>setPrice(e.target.value)} 
                placeholder="Price"
                />
                <br /><br />
                  <input type="text"
                value={description}
                onChange={(e)=>setDescription(e.target.value)} 
                placeholder="Description"
                />
                <br /><br />
                  <input type="text"
                value={category}
                onChange={(e)=>setCategory(e.target.value)} 
                placeholder="Category"
                />
                <br /><br />
                  <input type="number"
                value={countInStock}
                onChange={(e)=>setCountInStock(e.target.value)} 
                placeholder="Stock"
                />
                <br /><br />
                <button>Edit</button>
            </form>

        </div>

    )
}

export default EditProductPage