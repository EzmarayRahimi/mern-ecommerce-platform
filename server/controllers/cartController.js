const Cart = require('../models/cart')

//Get Users Carts
const getCart = async (req , res) => {


    let cart = await Cart.findOne({user:req.user._id}).populate('products.product')

    if(!cart){
        cart = await Cart.create({
            user: req.user._id , products: [] })
    }
                         res.json(cart)

}

//Add to cart 
const addToCart = async (req,res)=>{

         const {productId , quantity} = req.body

         if(!productId){
  return res.status(400)
                         throw new Error("product is required !")
}
         let cart = await Cart.findOne({
            user:req.user._id
         })

         if(!cart){ 
            cart = await Cart.create({
                user : req.user._id , products : [] })         }


    const existProduct = cart.products.find(
    (item) => item.product.toString() === productId )

if(existProduct){
    existProduct.quantity += quantity || 1
} else {
    cart.products.push({
        product : productId ,
        quantity
      })
    
}
 await cart.save()
     res.json(cart)



}

//Remove From Cart 
const removeFromCart = async (req , res) =>{

    const {productId} =  req.body 

     const cart = await Cart.findOne({user : req.user._id})
     if(!cart){
  return res.status(404)
                          throw new Error("Cart not found !")
}
     cart.products =  cart.products.filter(
        (item) => item.product.toString() !== productId
    )

    await cart.save()
     res.json(cart)
}


module.exports = {
    getCart,
    addToCart,
    removeFromCart
}