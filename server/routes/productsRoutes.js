const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController')
const { protect, admin } = require('../middleware/authMiddleware')
const router = require('express').Router()
const upload = require('../middleware/uploadMiddleware')

// get all products
router.get('/',getProducts)

// create a new product
router.post('/',protect,admin,  upload.array("images", 5),createProduct)

//get product by id 
router.get('/:id',getProductById)

//update products 
router.put('/:id',protect,admin, updateProduct)

//delete product
router.delete('/:id',protect, admin,deleteProduct)


module.exports = router