
import api from './api';


const getMyOrders = async ()=>{
    const {data} = await  api.get('/order/myorder')
    return data;
}

const getOrders = async ()=>{
    const {data} = await api.get('/order')
    return data;
}

const getOrderById = async (id)=>{
    const {data} = await api.get(`/order/${id}`)
    return data;
}

const createOrder = async (orderData) =>{
    const {data} = await api.post('/order',orderData)
    return data ;
}
const updateOrderStatus= async (id , status)=>{
            const {data }= await  api.put(`/order/${id}/status`,{
                status
            })
            return data 
}
const  orderService = {
               getOrderById,
               getMyOrders,
               createOrder,
               getOrders,
               updateOrderStatus,
}
export default  orderService