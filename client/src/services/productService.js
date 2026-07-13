import api from './api'


const getProducts = async ()=>{
        const {data} = await api.get("/products")

        return data ;
}

const productService = {
    getProducts
}

export default productService