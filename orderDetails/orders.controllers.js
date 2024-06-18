const { customerModel } = require('../models/customer');

async function addWishListItems(req, res) {
    let responseData;
    try {
        // Extract wishlist items from the request body
        const { wishlistItems } = req.body;
        
        if (!wishlistItems || !Array.isArray(wishlistItems)) {
            responseData = {
                meta: {
                    code: 400,
                    success: false,
                    message: 'Invalid wishlist items provided!',
                },
            };
            return res.status(responseData.meta.code).json(responseData);
        }

        // Find the user by name
        const userName = req.member.name;
        const user = await customerModel.findOne({ fullName: userName });

        if (!user) {
            responseData = {
                meta: {
                    code: 404,
                    success: false,
                    message: 'User not found!',
                },
            };
            return res.status(responseData.meta.code).json(responseData);
        }

        // Add new items to the user's wishlist
        user.wishlist = [...new Set([...user.wishlist, ...wishlistItems])]; // Avoid duplicates

        // Save the updated user document
        await user.save();

        responseData = {
            meta: {
                code: 200,
                success: true,
                message: 'Wishlist updated successfully!',
            },
            data: user.wishlist
        };
        return res.status(responseData.meta.code).json(responseData);
    } catch (error) {
        console.log(error);
        responseData = {
            meta: {
                code: 500,
                success: false,
                message: 'Something went wrong!',
            },
        };
        return res.status(responseData.meta.code).json(responseData);
    }
}

module.exports = { addWishListItems };
