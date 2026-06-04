const express = require('express')
const router = express.Router()
const upload = require("../middleware/uploadMiddleware")



router.post('/',upload.array('images',5) , (req , res )=>{
          const imagePaths = req.files.map(file => `/${file.path}`)


          res.json(imagePaths)
})


module.exports = router