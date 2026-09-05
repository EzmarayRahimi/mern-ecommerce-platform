const { getOrders,getMyOrders,updateOrderStatus, createOrder, getOrderById } = require("../controllers/orderController")
const { protect , admin} = require("../middleware/authMiddleware")
const router = require('express').Router()


//Get Orders
router.get('/', protect,admin,getOrders)
//Create Order
router.post('/' , protect,createOrder)
//get My order
router.get('/myorders', protect,getMyOrders)
//Get order by id 
router.get('/:id', protect, getOrderById)

//update status
router.put('/:id/status',protect,admin, updateOrderStatus)



module.exports = router