const Product = require('../models/product')

//Create New Product 

const createProduct = async (req , res , next )=>{
      
      try{

            const imagepaths = req.files ? req.files.map(file =>  `/${file.path}`): []
            const {name ,price ,description ,category ,countInStock ,rating} = req.body 
            
            const product = new Product({
                name,
                price,
                imagepaths,
                description ,
                category,
                rating

            })

            const createProduct = await product.save()
              res.status(201).json(createProduct)


        }
        catch(error){
            next(error)
        }
}

//Get ALL Products filter and search 

const getProducts = async (req , res ,next)=>{

    try{

        const page = Number(req.query.page) || 1 
        const limit = 10 

        const keyword = req.query.keyword ? 
        { 
            $or:[
                {name:{$regex:req.query.keyword, $options : "i"}},

                {description:{$regex:req.query.keyword , $options : "i"}}
            ]
        }: {}

        const category = req.query.category ? {category:req.query.category} : {}


        const filter = {
            ...keyword,
            ...category
        }
        console.log(filter)

        const count = await Product.countDocuments(filter)

        let sortOption = {createdAt : -1 }

        const products = await
      Product.find(filter)
        .sort(sortOption)
        .limit(limit)
        .skip(limit * (page -1))

        

           res.json({
        products ,
        page,
        pages : Math.ceil(count/limit)
    })

    }
    catch(error){
        next(error)
    }
}

//Get Product By Id 

const getProductById = async (req , res , next) =>{
    try{
        const product = await Product.findById(req.params.id)

        if(!product){
            return
            res.status(404)
                       throw new Error("Prduct not found !")
        }
        res.json(product)
    }
    catch(error){
    next(error)
    }
}

//Update Product 

const updateProduct = async (req , res , next ) =>{
    try{
           const product = await Product.findById(req.params.id)
    
           if(!product){
            return
              res.status(404)
              throw new Error("Product not found ! ")
           }


           const {name , price , description , countInStock , rating} = req.body 

           if(req.files && req.files.length > 0){
            product.images = req.files.map(fiel => `/${file.path}`)
           }

 product.name = name || product.name 
 product.price = price || product.price
 product.description = description || product.description
 product.category = category ||product.category
 product.countInStock = countInStock || product.countInStock
 product.rating = rating || product.rating
 

 const updated = await product.save()
 res.json(updated)
    }
    catch(error){
        next(error)
    }
      
}




// DELETE
const deleteProduct = async (req, res , next ) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404)
          throw new Error("Product not found ! ")
    }

    await product.deleteOne()
    res.json({ message: 'Product deleted' })

  } catch (error) {
    next(error)
  }
}











module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}