const jwt = require('jsonwebtoken');
const { customerModel } = require('../models/customer');
const { notificationModel } = require('../models/notifications');

async function authenticateToken(req, res, next) {
    const tokenAuth = req.headers['x-auth-token'];
    const config = req.app.get('config');

    try {
        if (tokenAuth) {
            const payload = jwt.verify(tokenAuth, config.jwt_secret);
            if (payload.userId) {
                const member = await customerModel.findOne({ _id: payload.userId });

                if (member && member._id) {
                    if (member.is_verified || ['/customer/verify-member'].includes(req.originalUrl)) {
                        req.member = member;
                        return next();
                    } else {
                        return res.status(403).json({
                            meta: {
                                code: 403,
                                success: false,
                                message: 'Member not verified',
                            },
                        });
                    }
                } else {
                    return res.status(404).json({
                        meta: {
                            code: 404,
                            success: false,
                            message: 'Member not found',
                        },
                    });
                }
            } else {
                return res.status(401).json({
                    meta: {
                        code: 401,
                        success: false,
                        message: 'Invalid token payload',
                    },
                });
            }
        } else {
            return res.status(401).json({
                meta: {
                    code: 401,
                    success: false,
                    message: 'No token provided',
                },
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(403).json({
            meta: {
                code: 403,
                success: false,
                message: 'Invalid token',
            },
        });
    }
}


const createNotification = async (
    member_id,
    memberPhoto,
    notification_title,
    memberName,
    notify_type
) => {
 const notifications =  await notificationModel.create({
                notification_title,
                member_id,
                notify_type,
                member_photo: memberPhoto,
                member_name: memberName,
                is_read: 0,
            });
      console.log(notifications, "dvfvfvd"); 
   
};

module.exports = {
    authenticateToken,
    createNotification
};