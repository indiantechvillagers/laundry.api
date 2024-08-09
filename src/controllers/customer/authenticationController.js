// // authController.js

// exports.customerAuth = async (req, res) => {
//     const { phoneNumber } = req.body;
//     const otp = generateOTP(); // You need to implement generateOTP function
//     const otpSent = await authService.customerAuth(phoneNumber, otp);
//     // if (otpSent) {
//     //     res.json({ success: true, message: 'OTP sent successfully', otp: otp });
//     // } else {
//     //     res.status(500).json({ success: false, message: 'Failed to send OTP' });
//     // }
// };

// exports.verifyOTP = async (req, res) => {
//     const { phoneNumber, otp } = req.body;
//     // You need to implement OTP verification logic
//     if (isValidOTP(otp)) {
//         res.json({ success: true, message: 'OTP verification successful' });
//     } else {
//         res.status(401).json({ success: false, message: 'Invalid OTP' });
//     }
// };

const Joi = require('joi');
const jwt = require('jsonwebtoken');
const userService = require('../../services/admin/userService');
const authService = require('../../services/customer/authenticationService');
const models = require('../../models')

function generateOTP() {
    // Generate a random 6-digit number
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString(); // Convert to string
}

const customerController = {
    getOTP: async (req, res) => {
        try {
            const schema = Joi.object({
                phone: Joi.string().required()
            });
            const { error, value } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({ status: 400, error: error.details[0].message });
            }
            const otp = generateOTP();
            const otpExpiration = new Date(Date.now() + 600000); // OTP expires after 10 minutes
            const otpData = await models.OTPMaster.findAll({
                where: {
                    phone: value.phone,
                    isActive: true
                },
            });
            if (otpData && otpData.length > 0) {
                const [rowsAffected, updatedData] = await models.OTPMaster.update(
                    { isActive: false },
                    {
                        where: {
                            phone: value.phone
                        }
                    }
                );
            }
            await models.OTPMaster.create({
                phone: value.phone,
                otp: otp,
                otpExpiration: otpExpiration,
                isActive: true,
                isDeleted: false
            });
            // Send token in response
            return res.status(200).json({ status: 200, otp: otp, otpExpiration: otpExpiration });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    auth: async (req, res) => {
        try {
            // Validate user input
            const schema = Joi.object({
                phone: Joi.string().required(),
                otp: Joi.string().required(),
                deviceId: Joi.string().required()
            });
            const { error, value } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({ status: 400, error: error.details[0].message });
            }
            // Check if user exists and password is correct
            const user = await authService.authenticate(value);
            if (!user) {
                return res.status(402).json({ status: 402, error: 'Failed to authenticate.' });
            }

            if (req.body.deviceId) {
                await models.CartIdMaster.update(
                    { userId: user.userId },
                    {
                        where: {
                            deviceId: req.body.deviceId
                        }
                    }
                );
                await models.Carts.update(
                    { userId: user.userId },
                    {
                        where: {
                            deviceId: req.body.deviceId
                        }
                    }
                );
            }

            // Generate JWT token
            // const token = jwt.sign({ userId: user.userId }, 'your_secret_key', { expiresIn: '10h' });

            const token = jwt.sign({ userId: user.userId }, 'your_secret_key');

            // Send token in response
            return res.status(200).json({ status: 200, token: token, data: user });
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getAllUserList: async (req, res) => {
        try {
            const admins = await userService.getAllUsers();
            return res.status(200).json({ status: 200, data: admins || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    userProfile: async (req, res) => {
        try {
            const admins = await userService.userProfile(req.params.userId);
            return res.status(200).json({ status: 200, data: admins || {} });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    userSoftDelete: async (req, res) => {
        try {
            const data = await userService.userSoftDelete(req.params.userId);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    updateUserInfo: async (req, res) => {
        try {
            // Validate request body against the schema
            const { error, value } = userValidateSchema.updateUserSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ status: 400, error: error.details[0].message });
            }
            let userId;
            if (req.params.userId) {
                userId = req.params.userId;
            } else {
                userId = req.user.userId;
            }
            const data = await userService.updateUserInfo(userId, value);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    }
};

module.exports = customerController;
