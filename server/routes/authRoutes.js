const { registerUser, loginUser } = require('../controllers/authController')


const router = require('express').Router()

//Register user 
router.post('/register', registerUser)

//Login User
router.post('/login',loginUser)





module.exports = router