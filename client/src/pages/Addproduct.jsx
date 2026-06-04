import {useState} from 'react'
import axios from 'axios'


function Addproduct(){
    const [form , setForm ]= useState({
        name : "",
        price : "",
        image : "",
        description  : ""
        
    })

 //get inputs data 

 const handleChange = (e)=>{
    setForm({
        ...form,
        [e.target.name]:e.target.value

    });

    
   
 };

 //send data for backend 

 const handleSubmit = async (e)=>{
    e.preventDefault()

    try{
       const res =await axios.post(
        "http://localhost:3000/api/products/create",form
    ) ;
    console.log(res.data)
    alert("Product Added Succesfully")
    setForm({
            name: "",
            price: "",
            image: "",
            description: ""
        })
     
    }
    catch (err) {
        console.log(err)
    }

 }

   return(
        <div className='p-6 max-w-md mx-auto'> 

        <h1 className='text-2xl font-bold mb-4 '>Add Products</h1>

            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                <input 
                type="text" 
                name="name" 
                placeholder='Product Name'
                value={form.name} 
                onChange={handleChange}
                className='border p-2'
                /> 

                   <input 
                type="number" 
                name="price" 
                value={form.price} 

                placeholder='Product price' 
                onChange={handleChange}
                className='border p-2'
                /> 

                   <input 
                type="text" 
                name="image" 
                value={form.image} 

                placeholder='image URL' 
                onChange={handleChange}
                className='border p-2'
                /> 

                <textarea 
                
                name="description" 
                placeholder='About Product '
                value={form.description} 
                onChange={handleChange}
                className='border p-2'
                /> 

                <button type='submit'
                className='bg-blue-500 text-white p-2' >
                    Add Products
                </button>


            </form>
        </div>
    )

}

export default Addproduct