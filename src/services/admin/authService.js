const models = require('../../models');

const authService = {
    authenticate: async (email, password) => {
        try {
            // Find user by email
            const user = await models.Users.findOne({
                where: { email: email, isActive: true, isDeleted: false, roleId: 1 },
                include: [
                    {
                        model: models.RoleMasters,
                        as: 'role'
                    }
                ]
            });
            if (!user) {
                // User with the provided email does not exist
                return null;
            }

            // Check if the provided password matches the stored password
            const passwordMatch = await user.comparePassword(password);
            if (!passwordMatch) {
                // Passwords do not match
                return null;
            }

            // Return the user object if authentication succeeds
            return user;
        } catch (error) {
            console.error('Authentication error:', error);
            throw new Error('Authentication failed');
        }
    }
};

module.exports = authService;