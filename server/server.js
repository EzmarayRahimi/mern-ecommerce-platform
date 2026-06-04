const express = require('express')
const cors = require('cors')
require('dotenv').config()
const productsRoutes = require('./routes/productsRoutes')
const authRoutes = require('./routes/authRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const {notFound , errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

// create express app
const app = express()


connectDB()
app.use(cors())
app.use(express.json())

app.use('/uploads', express.static('uploads'))


//products routes
app.use("/api/products",productsRoutes)

//users routes 
app.use('/api/auth',authRoutes)

//Cart routes
app.use('/api/cart', cartRoutes)

//Order routes 
app.use('/api/order',orderRoutes)

//Uplad routes
app.use('/api/upload',uploadRoutes)


// Error Handling 
app.use(notFound)
app.use(errorHandler)

// start the server on port 3000
app.listen(process.env.PORT)








