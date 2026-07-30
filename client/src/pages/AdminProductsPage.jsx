import { useState , useEffect, use } from "react";
import productService from '../services/productService'
import { Link } from "react-router-dom";


function AdminProductsPage (){

    const [products,setProducts]= useState([])
    const [loading,setLoading]= useState(false)
    const [error,setError]= useState("")

    const fetchProducts = async ()=>{
        try{
        
          setLoading(true)
          setError("")

          const data = await productService.getProducts()

          setProducts(data.products)


        }catch(err){
                    setError(err.response?.data?.message || "Loading faild!")
        }finally{
                  setLoading(false)
        }
    }

    useEffect(()=>{
        fetchProducts();
    },[]
         )
if(loading){
    return(<h1>Loading...</h1>
    )
}
if(error){
    return(<h1>{error}</h1>)
} 
return(
    <div className="container">
       <div style={{
        display:"flex",
        justifyContent:"space-between",
        marginBottom:"20px"
       }}>
        <h1>Admin Products</h1>
      <Link to="admin/products/create">
        <button>Create product</button>
        </Link>
             <div>
                <table 
                border="1"
                cellPadding="10"
                cellSpacing="0"
                width="100%"
                >
                    <thead>
                        <tr >
                            <td >Name </td>
                            <td style={{padding:"10px",}}>Price </td>
                            <td>Categoy </td>
                            <td style={{padding:"10px",}}>Stock </td>
                            <td>Actions </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product)=>(
                               <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td style={{paddingLeft:"20px",}}>{product.countInStock}</td>
                                <td>
                                    <button>Edite</button>
                                    <button style={{marginLeft:"10px",}}>Delete</button>
                                </td>
                               </tr>
                            ))
                        }
                    </tbody>
                </table>
             </div>
       </div>
    </div>
)

}

export default AdminProductsPage