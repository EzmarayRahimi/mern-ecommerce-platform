import { useState } from "react";
import {useNavigate} from "react-router-dom"
import productService from "../services/productService";
import uploadService from "../services/uploadService";


function CreateProductsPage (){
        
    const navigate = useNavigate();

    const [name , setName]=useState("")
    const [price , setPrice]=useState("")
    const [description , setDesciption]=useState("")
    const [category , setCategory]=useState("")
    const [countInStock , setCountInStock]=useState("")
    const [images,setImages]=useState([])

    const [loading ,setLoading]=useState(false)
    const [error , setError] = useState("")


    const uploadFileHandler = async (e)=>{
      try{
        const uploadImages = await uploadService.uploadImages(e.target.files )
        console.log(uploadImages)
             setImages(uploadImages)
               
      }catch(err){
        console.log(err)
        console.log(err.response)
        setError(err.response?.data?.message || "upload failed!")
      }
    }

const submitHandler = async (e)=>{
  e.preventDefault();

     try{
        setLoading(true)
        setError("")
            console.log(images)
        await  productService.createProduct({
          name,
          price,
          description,
          category,
          countInStock,
          images
        })
          navigate('/admin/products');
     }catch(err){
          setError(err.response?.data?.message || "faild to create product!")
     }finally{
        setLoading(false)
     }
  

}

return(
    <div className="container">
       
        <h1>Create Product</h1>
        {error && <p style={{color:"red"}}>{error}</p>}

        <form onSubmit={submitHandler}>
                  <div>
                   <label>images </label>
            <input 
            type="file" 
           multiple
            onChange={uploadFileHandler}
             /> 
            </div>
            <br />

            <div>
                   <label>Name: </label>
            <input 
            type="text" 
            value={name}
            onChange={(e)=>setName(e.target.value)}
             /> 
            </div>
            <br />
            <div>
                     <label>Price: </label>
              <input 
            type="text" 
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
             />
            </div>
            <br />
            <div>
                   <label>Desciption: </label>
              <input 
            type="text" 
            value={description}
            onChange={(e)=>setDesciption(e.target.value)}
             />
            </div>
           <br />
           <div>
              <label>Category: </label>
              <input 
            type="text" 
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
             />
           </div>
            <br />
            <div>
                  <label>Stock: </label>
              <input 
            type="text" 
            value={countInStock}
            onChange={(e)=>setCountInStock(e.target.value)}
             />
            </div>
            <br />
            
             <button type="submit" disabled={loading}>
                 {loading ? 'loadin...' : "create"}
                 </button>
        </form>

    </div>
)

}


export default CreateProductsPage