  const User = require('../models/user')
  const generateToken = require('../utils/generateToken.js')
  const bcrypt = require('bcryptjs')

//Register User 

const registerUser = async (req,res,next) =>{
    try{
        const {name,email,password} = req.body 

        const userExists = await User.findOne({email})

        if(userExists){
           res.status(400)    
             throw new Error("user already exist ! ")
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = await User.create({
            name , email , password : hashedPassword 
        })

        res.status(201).json({
            _id : user._id,
            name : user.name ,
            email : user.email ,
            token : generateToken(user._id)
        })

    }
    catch(error){
        next(error)
    }
}


//Login User

const loginUser = async (req , res , next) =>{
    try{
        const {email , password}= req.body 

        const user = await User.findOne({email})

        if(user && await(bcrypt.compare(password , user.password))){
            res.json({
                  id : user._id,
                  name: user.name,
                  email : user.email,
                  token : generateToken(user._id)
            })
        }
        else{
            res.status(401)
            throw new Error("invaled username or password !")
        }
    
    }
    catch(error){
               next(error)

    }
}


//get all users 
const getUsers = async (req, res , next )=>{
    try{
          const users = await User.find()
                     res.json(users)
    }
  catch(error){
           next(error)

  }
}







module.exports = {
    registerUser,
    loginUser,
    getUsers
}