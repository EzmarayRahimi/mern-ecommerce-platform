const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController')
const { protect, admin } = require('../middleware/authMiddleware')
const router = require('express').Router()

// get all products
router.get('/',getProducts)

// create a new product
router.post('/',protect,admin,createProduct)

//get product by id 
router.get('/:id',getProductById)

//update products 
router.put('/:id',protect,admin, updateProduct)

//delete product
router.delete('/:id',protect, admin,deleteProduct)


module.exports = router