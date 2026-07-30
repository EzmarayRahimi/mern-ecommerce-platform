import api from './api'


const getProducts = async (keyword = "",category = "")=>{

       let url = "/products"
       const query=[];

       if(keyword){
        query.push(`keyword=${keyword}`);
       }
       if(category){
        query.push(`category=${category}`)
       }

       if(query.length>0){
        url += `?${query.join("&")}`;
       }

        const {data} = await api.get(url)

        return data ;
}

const getProductById = async (id)=>{
    const {data} = await api.get(`/products/${id}` )

    return data ;
}
 
const createProduct = async (productData)=>{
    const {data} = await api.post('/products' , productData)
    return data;
}



const productService = {
    getProducts,
    getProductById,
    createProduct


}

export default productService