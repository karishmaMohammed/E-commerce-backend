const Token = require('../modules/tokenAuth');
const jwt = require('jsonwebtoken');
const { customerModel } = require('../models/customer');

let config;

async function tokenAuthentication(req, res, next) {
    const token_auth = req.headers['x-auth-token'];
    config = req.app.get('config');
    try {
        if (token_auth) {
            const payload = jwt.verify(token_auth, config.jwt_secret);
            if (payload.member_id) {
                const member = await customerModel.findOne({ _id: payload.member_id });
                if (member._id) {
                    if (member.is_verified || ['/v1/member/verify-member'].includes(req.originalUrl)) {
                        req.member = member;
                        next();
                    } else {
                        const responseData = {
                            meta: {
                                code: 403,
                                success: false,
                                message: 'Member not verified',
                            },
                        };
                        res.status(responseData.meta.code).json(responseData);
                    }
                } else {
                    const responseData = {
                        meta: {
                            code: 403,
                            success: false,
                            message: 'Access denied',
                        },
                        error: 'Invalid token',
                    };
                    res.status(responseData.meta.code).json(responseData);
                }
            } else {
                const responseData = {
                    meta: {
                        code: 403,
                        success: false,
                        message: 'Access denied',
                    },
                    error: 'Invalid token',
                };
                res.status(responseData.meta.code).json(responseData);
            }
        } else {
            const responseData = {
                meta: {
                    code: 403,
                    success: false,
                    message: 'Access denied',
                },
                error: 'Invalid token',
            };
            res.status(responseData.meta.code).json(responseData);
        }
    } catch (e) {
        const responseData = {
            meta: {
                code: 403,
                success: false,
                message: 'Access denied',
            },
            error: 'Invalid token',
        };
        res.status(responseData.meta.code).json(responseData);
    }
}

module.exports = {
    tokenAuthentication
};