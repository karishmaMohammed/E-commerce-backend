const mongoose = require('mongoose');


const orderDetailsSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, min: 1 }
    }],
    totalAmount: { type: Number },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    shippingAddress: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
        country: { type: String }
    },
    orderDate: { type: Date, default: Date.now },
    deliveryDate: { type: Date }
}, {
    timestamps: true
});


const orderDetailsModel = mongoose.model('order_details', orderDetailsSchema);
module.exports = { orderDetailsModel };
