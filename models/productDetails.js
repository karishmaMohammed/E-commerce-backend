const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: { type: String },
    description: { type: String },
    price: { type: Number },
    category: { type: String },
    stock: { type: Number, min: 0 },
    images: [{ type: String }], // Array of image URLs
    ratings: {
        averageRating: { type: Number, min: 0, max: 5, default: 0 },
        numberOfRatings: { type: Number, default: 0 }
    },
    
}, {
    timestamps: true
});



const productModel = mongoose.model('product_details', productSchema);
module.exports = { productModel };
