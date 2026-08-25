
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

const getOrders = async (req ,res ) => {

       const orders = await Order.find({user:req.user._id,}).populate('orderItems.product')

       if(!orders){
        res.status(404)
                        throw new Error("You don't have any order yet !")
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

module.exports = {
    createOrder,
    getOrders,
    getOrderById
}

