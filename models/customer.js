const mongoose = require('mongoose');

// create user schema
const customerSchema = new mongoose.Schema({
    fullName: { type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String},
    gender:{ type: String},
    phoneNumber:{ type: String},
    idToken: { type: String},
    is_verified: { type: Boolean },
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'order_details' }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product_details' }]
    // is_admin: { type: Boolean, index: true },
    // onBoardingStatus:{ type: String},
}, {
    timestamps: true,
});


customerSchema.index({ email: 1 });
// customerSchema.index({ is_verified: 1 });
// customerSchema.index({ is_admin: 1 });

// create user mode
const customerModel = mongoose.model('customer', customerSchema);
module.exports = { customerModel };
