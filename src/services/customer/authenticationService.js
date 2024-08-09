// // authService.js
// const twilio = require('twilio');
// const models = require('../../models');

// const accountSid = 'ACea9dd1a28fe66e5a3e396875bf82f870';
// const authToken = '6e1bc0660f7b2e2873b0bfc6526844bc';
// const client = twilio(accountSid, authToken);

// exports.customerAuth = async (phoneNumber, otp) => {
//     try {
//         // const message = await client.messages.create({
//         //     body: `Your OTP for login is: ${otp}`,
//         //     from: '919123868960',
//         //     to: phoneNumber
//         // });
//         // console.log('OTP sent:', message.sid);

//         // Create admin record in the database
//         const user = await models.Users.create({

//         });
//         // return admin;
//         return user;

//         return true;
//     } catch (error) {
//         console.error('Error sending OTP:', error);
//         return false;
//     }
// };


const models = require('../../models');

const authService = {
    authenticate: async (payload) => {
        try {
            const otpData = await models.OTPMaster.findOne({ where: { phone: payload.phone, isActive: true } });
            if (!otpData || otpData.otp !== payload.otp || otpData.otpExpiration < new Date()) {
                throw new Error('Invalid OTP');
            } else {
                const [rowsAffected, updatedData] = await models.OTPMaster.update(
                    { isActive: false },
                    {
                        where: {
                            otpId: otpData.otpId
                        }
                    }
                );
                const userData = await models.Users.findOne({
                    where: {
                        phone: payload.phone
                    }
                });
                if (!userData) {
                    const indata = await models.Users.create({
                        phone: payload.phone,
                        roleId: 2,
                        password: "",
                        isActive: true,
                        isDeleted: false
                    });

                    return indata;
                } else {
                    return userData;
                }
            }
        } catch (error) {
            console.error('Authentication error:', error);
            throw new Error(error.message);
        }
    }
};

module.exports = authService;
