const { customerModel } = require('../models/customer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function register(req, res){
    let responseData;
    try {
        const {fullName, email, phoneNumber, password, gender} = req.body;
         
         if (!fullName || !email || !phoneNumber || !password || !gender) {
            responseData = {
                meta: {
                    code: 400,
                    success: false,
                    message: 'All fields are required!',
                },
            };
            return res.status(responseData.meta.code).json(responseData);
        }

        const existingUser = await customerModel.findOne({ email });
        if (existingUser) {
            responseData = {
                meta: {
                    code: 400,
                    success: false,
                    message: 'Email already registered!',
                },
            };
            return res.status(responseData.meta.code).json(responseData);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userDetails = await customerModel.create({
            fullName,
            gender,
            email,
            phoneNumber,
            password: hashedPassword,
        });

        responseData = {
            meta: {
                code: 200,
                success: true,
                message: 'SUCCESS!',
            },
            data:{
                user_details: userDetails._id
            }
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

async function login(req, res){
    let responseData;
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            responseData = {
                meta: {
                    code: 400,
                    success: false,
                    message: 'Email and password are required!',
                },
            };
            return res.status(responseData.meta.code).json(responseData);
        }
        const user = await customerModel.findOne({ email });
        if (!user) {
            responseData = {
                meta: {
                    code: 401,
                    success: false,
                    message: 'Invalid email or password!',
                },
            };
            return res.status(responseData.meta.code).json(responseData);
        }

        const isPasswordValid = bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            responseData = {
                meta: {
                    code: 401,
                    success: false,
                    message: 'Invalid email or password!',
                },
            };
            return res.status(responseData.meta.code).json(responseData);
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' } 
        );

        responseData = {
            meta: {
                code: 200,
                success: true,
                message: 'Login successfull!',
            },
            data: {
                user_token: token,
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

async function verifyMember(req, res) {
    let responseData;
    try {
        const result = await customerModel.findByIdAndUpdate(
            req.member._id,
            { is_verified: 1 },
            { new: true },
        );
        if (result) {
            responseData = {
                meta: {
                    code: 200,
                    success: true,
                    message: 'Member verified successfully.',
                },
                data:{
                    email:req.member.email
                }
            };
            return res.status(responseData.meta.code).json(responseData);
        }
    } catch (e) {
        console.log(e);
        responseData = {
            meta: {
                code: 200,
                success: false,
                message: 'Internal server error',
            },
        };
        return res.status(responseData.meta.code).json(responseData);
    }
}

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

async function editProfileDetails(req, res){
    let responseData;
    try {
        const { name,phone,email,gender, action} = req.body;
        let getDetails;
        if(action === 'update'){
            const updatedDetails = await customerModel.findByIdAndUpdate(
                req.member._id, 
                {
                  fullName: name,
                  phoneNumber: phone,
                  email,
                  gender
                },
                { new: true } 
            );
        }else if(action === 'get_info'){
             getDetails = await customerModel.findOne({_id: req.member._id},
                {fullName:1, phoneNumber:1, email:1, gender:1});
        }
        
        responseData = {
            meta: {
                code: 200,
                success: true,
                message: 'successfully.',
            },
            data:{
                details: action === 'get_info' ? getDetails : ''
            }
        };

        return res.status(responseData.meta.code).json(responseData);
    } catch (error) {
        console.log(error);
        responseData = {
            meta: {
                code: 200,
                success: false,
                message: 'something went wrong!.',
            },
        };

        return res.status(responseData.meta.code).json(responseData);
    }
}


module.exports={
    register,
    login,
    verifyMember,
    customerDetails,
    editProfileDetails
}