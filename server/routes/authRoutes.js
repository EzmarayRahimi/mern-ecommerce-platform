const { registerUser, loginUser, getUsers } = require('../controllers/authController')
const { admin } = require('../middleware/authMiddleware')

const router = require('express').Router()

//Register user 

router.post('/register', registerUser)

//Login User
router.post('/login',loginUser)

//get all users 
router.get('/' ,admin, getUsers)



module.exports = router