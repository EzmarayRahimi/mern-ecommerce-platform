
const mongoose = require('mongoose')
const Schema = mongoose.Schema 

 
const productSchema = new mongoose.Schema(
    { name: {
           type: String,
           required: true,
            trim: true
  },

  price: {
    type: Number,
    required: true,
    min: 0
  },

  images: {
    type:[String],
    required : true 
  },

  description: {
    type: String,
    trim: true
  },

  category: {
    type: String,
    default: "general"
  },

  countInStock: {
    type: Number,
    default: 0
  },

  rating: {
    type: Number,
    default: 0
  },

  numReviews: {
    type: Number,
    default: 0
  }
},{timestamps:true})


module.exports = mongoose.model('Product',productSchema)