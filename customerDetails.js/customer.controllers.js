const { customerModel } = require('../models/customer');


async function customerDetails(req, res){
    let responseData;
    try {
        const { fullName, email } = req.body;
        const userDetails = await customerModel.create(req.body);
        console.log(userDetails);
        responseData = {
            meta: {
                code: 200,
                success: true,
                message: 'successfully.',
            },
        };

        return res.status(responseData.meta.code).json(responseData);
    } catch (error) {
        console.error(error);
        responseData = {
            meta: {
                code: 200,
                success: false,
                message: 'Something went wrong!',
            },
        };

        return res.status(responseData.meta.code).json(responseData);
    }
}

module.exports={
    customerDetails
}