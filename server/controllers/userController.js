const User = require("../models/user.js")


//get all users 
const getAllUsers = async (req,res,next)=>{

    try{
        const users = await User.find({}).select("-password")
         
        res.json(users)

    }catch(error){
        next(error)
    }
}

//get user by id 
const getUserById = async(req , res , next)=>{
    try{
        const user = await User.findById(req.params.id).select("-password")  

        res.json(user)

    }catch(error){
        next(error)
    }
}
//update users 
const updateUser= async (req,res,next)=>{
    try{
         const user = await User.findById(req.params.id)
        if(!user){
            res.status(404)
            throw new Error("User Not Found !")
        }
        const {name , email ,  isAdmin}= req.body

        user.name = name || user.name
        user.emeil = email || user.email
      
        user.isAdmin = isAdmin || user.isAdmin

        const updatedUser = await  user.save()

        res.json({
           _id:updatedUser._id,
           name:updatedUser.name,
           email:updatedUser.email,
           isAdmin: updatedUser.isAdmin,
        })

    }catch(error){
        next(error)
    }
}

//delete users 
const deleteUser = async (req,res,next)=>{
    try{
          const user = await User.findById(req.params.id)
        if(!user){
            res.status(404)
            throw new Error("User Not Found !")
        }

        await user.deleteOne()
        res.json({message:"user deleted "})

    }catch(error){
       next(error)
    }
}

module.exports = {
 getAllUsers,
 getUserById,
 updateUser,
 deleteUser,
}