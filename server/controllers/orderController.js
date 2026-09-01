
const Order = require('../models/order')


//create order 
const createOrder = async (req,res)=>{
            console.log("req body ", req.body)
    const {orderItems , totalPrice} = req.body

    if(!orderItems || orderItems.length ===  0){
        res.status(400)
        throw new Error("cart is empty! ")
    
    }

    const formattedItems = orderItems.map((item)=>({
        product : item._id ,
        quantity : item.qty,
    }));

    const order = await Order.create({
         user: req.user._id,
         orderItems : formattedItems,
         totalPrice,
    })
    res.status(201).json(order)
}


//Get my order 

const getMyOrders = async (req ,res ) => {

       const orders = await Order.find({user:req.user._id,}).populate('orderItems.product')

       if(orders.length === 0){
        return res.json([])
       }
      
       res.json(orders)


}

//Get order by id 

const getOrderById = async ( req , res ) =>{

    const order = await Order.findById(req.params.id).populate("orderItems.product")

    if(!order){
        res.status(400)
                    throw new Error("Order not found !")


    }

        res.json(order)

}

//admin orders

const getOrders = async (req, res)=>{
    const orders = await Order.find({})
    .populate("user","name email")
    .populate("orderItems.product")
    .sort({createdAt : -1 })
       
    res.json(orders)
}

//update status 
const updateOrderStatus = async (req,res) =>{
    const {status} = req.body

    const order = await Order.findById(req.params.id)

    if(!order){
        res.status(400)
        throw new Error("Order Not Found !")
    }

    order.status = status 

    const updatedOrder = 
    await order.save()
    res.json(updatedOrder)

}

module.exports = {
    createOrder,
    getMyOrders,
    getOrders,
    getOrderById,
    updateOrderStatus
}

