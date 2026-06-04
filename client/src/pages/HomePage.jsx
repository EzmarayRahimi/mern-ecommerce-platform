import {useEffect , useState} from 'react'
import {getProducts} from '../services/api'




function HomePage(){

    const [products,setProducts]= useState([])

    useEffect(()=>{
               getProducts()
               .then(res =>{
                setProducts(res.data)
               })
         
    },[])

    return(
        <>
    <div className="grid grid-cols-3 gap-6 p-6">

  {products.map(p => (
    
    <div key={p._id} className="border rounded-lg shadow p-4">

      <img
        src={p.image}
        className="h-40 w-full object-cover rounded"
      />

      <h2 className="text-xl font-bold mt-2">
        {p.name}
      </h2>

      <p className="text-gray-600">
        ${p.price}
      </p>

      <button className="mt-3 bg-green-500 text-white px-3 py-1 rounded">
        Add to Cart
      </button>

    </div>

  ))}

</div>
 </>
    )
}
 
export default HomePage