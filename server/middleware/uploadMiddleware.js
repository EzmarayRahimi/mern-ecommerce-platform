const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination (req, file , cb ){
        cb(null , "uploads/")
    },
    filename (req, file, cb){
                cb(null , `${Date.now()}` + "-" + file.originalname)
    } 
})


const fileFilter = (req , file , cb )=>{
    const fileTypes = /jpg|jpeg|png/

    const extname = 
    fileTypes.test (path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)


    if(extname && mimetype){
        cb(null , true )
    }else {
        cb(new Error("Image only !") , false )
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits : {fileSize: 1024 * 1024 * 5 }
})


module.exports = upload