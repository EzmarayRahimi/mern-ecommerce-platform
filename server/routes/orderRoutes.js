const { getOrders, createOrder, getOrderById } = require("../controllers/orderController")
const { protect } = require("../middleware/authMiddleware")
const router = require('express').Router()


//Get Orders
router.get('/', protect,getOrders)
//Create Order
router.post('/' , protect,createOrder)
//Get order by id 
router.get('/:id', protect, getOrderById)


module.exports = router