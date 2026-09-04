const User = require("../models/user")
const Product = require("../models/product")
const Order = require("../models/order")


const getDashboardState = async (req,res)=>{

    const totalUsers = await User.countDocuments()

    const totalProducts = await Product.countDocuments()

    const totalOrders = await Order.countDocuments()

    const orders = await Order.find()

    const totalRevenue =  orders.reduce((sum ,order)=> sum + order.totalPrice,0)

    const penddingOrders = await Order.countDocuments({status : "pending"})

    const deliveredOrders = await Order.countDocuments({status : "delivered"}) 

res.json({
    totalOrders,
    totalProducts,
    totalUsers,
    totalRevenue,
    penddingOrders,
    deliveredOrders
})

}

module.exports={getDashboardState}