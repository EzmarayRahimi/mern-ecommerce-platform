
import api from './api';


const getorders = async ()=>{
    const {data} = await  api.get('/order')
    return data;
}

const getOrderById = async (id)=>{
    const {data} = await api.get(`/order/${id}`)
    return data;
}

const createOrder = async () =>{
    const {data} = await api.post('/order')
    return data ;
}
const  orderService = {
               getOrderById,
               getorders,
               createOrder,
}
export default  orderService