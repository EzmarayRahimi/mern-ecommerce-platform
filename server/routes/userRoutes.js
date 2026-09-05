const {getAllUsers,getUserById,updateUser,deleteUser} = require('../controllers/userController')
const {admin , protect} = require('../middleware/authMiddleware')
const router = require('express').Router()


//getAllUsers 
router.route('/')
.get(protect , admin , getAllUsers)


router.route('/:id')
.get(protect , admin, getUserById)
.put(protect,admin,updateUser)
.delete(protect ,admin,deleteUser)

module.exports = router

