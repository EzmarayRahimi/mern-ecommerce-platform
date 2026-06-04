const { getCart, addToCart, removeFromCart } = require("../controllers/cartController")
const { protect } = require("../middleware/authMiddleware")

const router =require ('express').Router()



//Get Cart
router.get('/' , protect , getCart)
//Add To Cart 
router.post('/' , protect , addToCart )
//Remove From Cart
router.delete('/:id' , protect , removeFromCart)

module.exports = router