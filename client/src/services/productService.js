import api from './api'


const getProducts = async ()=>{
        const {data} = await api.get("/products")

        return data ;
}

const getProductById = async (id)=>{
    const {data} = await api.get(`/products/${id}` )

    return data ;
}
const productService = {
    getProducts,
    getProductById

}

export default productService