const Joi = require('joi');
const jwt = require('jsonwebtoken');
const userService = require('../../services/admin/userService');
const authService = require('../../services/admin/authService');
const userValidateSchema = require('../../validations/userValidateSchema');


const adminController = {
    addUser: async (req, res) => {
        // Validate request body against the schema
        const { error, value } = userValidateSchema.createUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }

        try {
            // Call service method to add admin
            const admin = await userService.addUser(value);
            return res.status(200).json({ status: 200, msg: "User added" });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    login: async (req, res) => {
        try {
            // Validate user input
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            });
            const { error, value } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({ status: 400, error: error.details[0].message });
            }

            // Check if user exists and password is correct
            const user = await authService.authenticate(value.email, value.password);
            if (!user) {
                return res.status(402).json({ status: 402, error: 'Invalid email or password' });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user.userId }, 'your_secret_key', { expiresIn: '10h' });

            // Send token in response
            return res.status(200).json({ status: 200, token: token, data: user });
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ status: 500, error: 'Internal server error' });
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
    getCustomerList: async (req, res) => {
        try {
            const admins = await userService.getCustomerList();
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

module.exports = adminController;