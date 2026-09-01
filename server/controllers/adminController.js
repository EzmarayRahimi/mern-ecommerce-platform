const User = require("../models/user")
const Product = require("../models/product")
const Order = require("../models/order")


const getDashboardState = async (req,res)=>{

    const totalUser = await User.countDocuments()

    const totalProducts = await Product.countDocuments()

    const totalOrders = await Order.countDocuments()

    const orders = await Order.find()

    const totalRevenue =  orders.reduce((sum ,order)=> sum + order.totalPrice,0)

    const penddingOrders = await Order.countDocuments({status : "pendding"})

    const deliveredOrders = await Order.countDocuments({status : "delivered"}) 

res.json({
    totalOrders,
    totalProducts,
    totalUser,
    totalRevenue,
    penddingOrders,
    deliveredOrders
})

}

module.exports={getDashboardState}