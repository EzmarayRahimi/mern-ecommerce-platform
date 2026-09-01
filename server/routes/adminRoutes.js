const express = require("express")
const router = express.Router()
const {getDashboardState} = require("../controllers/adminController")
const {protect,admin} = require("../middleware/authMiddleware")


router.get("/dashboard" , protect ,admin ,getDashboardState)

module.exports = router

