const Cart = require('../models/cart')
const Order = require('../models/order')



//Create Order 

const createOrder = async (req,res) => {
     const cart = await Cart.findOne({user:req.user._id})

     if(!cart || cart.products.length === 0 ){
        res.status(400)
                      throw new Error("cart is empty ! ")
     }

     let total = 0 

     cart.products.forEach(item => {total += item.quantity * 100 })

      const order = await Order.create({
        user : req.user._id ,
        orderItems : cart.products,
        totalPrice: total 
      })   

      cart.products = []
      await cart.save()

      res.status(200).json(order)


}


//Get my order 

const getOrders = async (req ,res ) => {

       const orders = await Order.findOne({user:req.user._id}).populate('orderItems.product')

       if(!orders){
        res.status(404)
                        throw new Error("You don't have any order yet !")
       }
      
       res.json(orders)


}

//Get order by id 

const getOrderById = async ( req , res ) =>{

    const order = await Order.findById(req.params.id)

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

