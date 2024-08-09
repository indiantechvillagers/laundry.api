// data seeders

const db = require('../models'); // Import your Sequelize models

async function seedAdminRole() {
    try {
        // Check if the admin role already exists in the database
        const adminRole = await db.RoleMasters.findOne({ where: { roleName: 'Admin' } });

        // If the admin role doesn't exist, insert it into the database
        if (!adminRole) {
            await db.RoleMasters.create({
                roleName: 'Admin',
                isActive: true,
                isDeleted: false
            });
            console.log('Admin role seeded successfully!');
        }

        // Check if the second role (e.g., 'User') already exists in the database
        const userRole = await db.RoleMasters.findOne({ where: { roleName: 'Customer' } });

        // If the customer role doesn't exist, insert it into the database
        if (!userRole) {
            await db.RoleMasters.create({
                roleName: 'Customer',
                isActive: true,
                isDeleted: false
            });
            console.log('Customer role seeded successfully!');
        }
    } catch (error) {
        console.error('Error seeding roles:', error);
    }
}

async function seedAdminUser() {
    try {
        // Check if the admin role already exists in the database
        const adminRole = await db.Users.findOne({ where: { email: 'admin@laundry.com' } });

        // If the admin role doesn't exist, insert it into the database
        if (!adminRole) {
            await db.Users.create({
                email: 'admin@laundry.com',
                password: "1234",
                name: "Admin",
                roleId: 1,
                isActive: true,
                isDeleted: false
            });
            console.log('Admin user seeded successfully!');
        }
    } catch (error) {
        console.error('Error seeding admin user:', error);
    }
}

async function seedDeliveryChargeTypes() {
    try {
        // Check if the delivery Charge Type already exists in the database
        const type1 = await db.DeliveryChargeTypeMaster.findOne({ where: { deliveryChargeTypeName: 'Universal Delivery Charges' } });

        // If the charge type doesn't exist, insert it into the database
        if (!type1) {
            await db.DeliveryChargeTypeMaster.create({
                deliveryChargeTypeName: 'Universal Delivery Charges',
                isActive: true,
                isDeleted: false
            });
            console.log('Universal Delivery Charge type seeded successfully!');
        }

        const type2 = await db.DeliveryChargeTypeMaster.findOne({ where: { deliveryChargeTypeName: 'Price Range wise Delivery charges' } });

        // If the charge type doesn't exist, insert it into the database
        if (!type2) {
            await db.DeliveryChargeTypeMaster.create({
                deliveryChargeTypeName: 'Price Range wise Delivery charges',
                isActive: true,
                isDeleted: false
            });
            console.log('Price Range wise Delivery charge type seeded successfully!');
        }
    } catch (error) {
        console.error('Error seeding Delivery charge:', error);
    }
}

async function seedCouponTypes() {
    try {
        // Check if the coupon Type already exists in the database
        const type1 = await db.CouponTypeMaster.findOne({ where: { couponTypeName: 'New Account Coupon' } });

        // If the charge type doesn't exist, insert it into the database
        if (!type1) {
            await db.CouponTypeMaster.create({
                couponTypeName: 'New Account Coupon',
                isActive: true,
                isDeleted: false
            });
            console.log('New Account Coupon type seeded successfully!');
        }

        const type2 = await db.CouponTypeMaster.findOne({ where: { couponTypeName: 'Price Range Coupon' } });

        // If the charge type doesn't exist, insert it into the database
        if (!type2) {
            await db.CouponTypeMaster.create({
                couponTypeName: 'Price Range Coupon',
                isActive: true,
                isDeleted: false
            });
            console.log('Price Range Coupon type seeded successfully!');
        }
    } catch (error) {
        console.error('Error seeding Coupon type:', error);
    }
}

async function seedorderStatus() {
    try {
        //--------------------------------------------------------------------------------------------------
        const type1 = await db.OrderStatusMaster.findOne({ where: { statusName: 'NEW' } });
        if (!type1) {
            await db.OrderStatusMaster.create({
                statusName: 'NEW',
                shortForm: 'NO',
                serial: 1,
                isActive: true,
                isDeleted: false
            });
            console.log('Order status - NEW - type seeded successfully!');
        }
        //-----------------------------------------------------------------------------------------------------------
        const type2 = await db.OrderStatusMaster.findOne({ where: { statusName: 'ORDER ACCEPTED' } });
        if (!type2) {
            await db.OrderStatusMaster.create({
                statusName: 'ORDER ACCEPTED',
                shortForm: 'OA',
                serial: 2,
                isActive: true,
                isDeleted: false
            });
            console.log('Order status - ORDER ACCEPTED - type seeded successfully!');
        }
        //-----------------------------------------------------------------------------------------------------------
        const type3 = await db.OrderStatusMaster.findOne({ where: { statusName: 'ORDER REJECTED' } });
        if (!type3) {
            await db.OrderStatusMaster.create({
                statusName: 'ORDER REJECTED',
                shortForm: 'OR',
                serial: 3,
                isActive: true,
                isDeleted: false
            });
            console.log('Order status - ORDER REJECTED - type seeded successfully!');
        }
        //-----------------------------------------------------------------------------------------------------------
        const type4 = await db.OrderStatusMaster.findOne({ where: { statusName: 'READY FOR PICKUP' } });
        if (!type4) {
            await db.OrderStatusMaster.create({
                statusName: 'READY FOR PICKUP',
                shortForm: 'RFP',
                serial: 4,
                isActive: true,
                isDeleted: false
            });
            console.log('Order status - READY FOR PICKUP - type seeded successfully!');
        }
        //------------------------------------------------------------------------------------------------------------
        const type5 = await db.OrderStatusMaster.findOne({ where: { statusName: 'ITEM RECEIVED FOR PROCESSING' } });
        if (!type5) {
            await db.OrderStatusMaster.create({
                statusName: 'ITEM RECEIVED FOR PROCESSING',
                shortForm: 'IRFP',
                serial: 5,
                isActive: true,
                isDeleted: false
            });
            console.log('Order status - ITEM RECEIVED FOR PROCESSING - type seeded successfully!');
        }
        //------------------------------------------------------------------------------------------------------------
        const type6 = await db.OrderStatusMaster.findOne({ where: { statusName: 'OUT FOR DELIVERY' } });
        if (!type6) {
            await db.OrderStatusMaster.create({
                statusName: 'OUT FOR DELIVERY',
                shortForm: 'OFD',
                serial: 6,
                isActive: true,
                isDeleted: false
            });
            console.log('Order status - OUT FOR DELIVERY - type seeded successfully!');
        }
        //------------------------------------------------------------------------------------------------------------
        const type7 = await db.OrderStatusMaster.findOne({ where: { statusName: 'ORDER CANCELLED BY ADMIN' } });
        if (!type7) {
            await db.OrderStatusMaster.create({
                statusName: 'ORDER CANCELLED BY ADMIN',
                shortForm: 'OCBA',
                serial: 7,
                isActive: true,
                isDeleted: false
            });
            console.log('Order status - ORDER CANCELLED BY ADMIN - type seeded successfully!');
        }
        //------------------------------------------------------------------------------------------------------------
        const type8 = await db.OrderStatusMaster.findOne({ where: { statusName: 'ORDER CANCELLED BY CUSTOMER' } });
        if (!type8) {
            await db.OrderStatusMaster.create({
                statusName: 'ORDER CANCELLED BY CUSTOMER',
                shortForm: 'OCBC',
                serial: 8,
                isActive: true,
                isDeleted: false
            });
            console.log('Order status - ORDER CANCELLED BY CUSTOMER - type seeded successfully!');
        }
        //-------------------------------------------------------------------------------------------------------------
        const type9 = await db.OrderStatusMaster.findOne({ where: { statusName: 'DELIVERED' } });
        if (!type9) {
            await db.OrderStatusMaster.create({
                statusName: 'DELIVERED',
                shortForm: 'OD',
                serial: 9,
                isActive: true,
                isDeleted: false
            });
            console.log('Order status - DELIVERED - type seeded successfully!');
        }
        //-------------------------------------------------------------------------------------------------------------

    } catch (error) {
        console.error('Error seeding order status type:', error);
    }
}

async function seedorderPaymentMethods() {
    try {
        //--------------------------------------------------------------------------------------------------
        const type1 = await db.OrderPaymentTypeMaster.findOne({ where: { paymentTypeName: 'COD' } });
        if (!type1) {
            await db.OrderPaymentTypeMaster.create({
                paymentTypeName: 'COD',
                serial: 1,
                isActive: true,
                isDeleted: false
            });
            console.log('Order status - COD - type seeded successfully!');
        }
        //-----------------------------------------------------------------------------------------------------------
        const type2 = await db.OrderPaymentTypeMaster.findOne({ where: { paymentTypeName: 'ONLINE' } });
        if (!type2) {
            await db.OrderPaymentTypeMaster.create({
                paymentTypeName: 'ONLINE',
                serial: 2,
                isActive: true,
                isDeleted: false
            });
            console.log('Order status - ONLINE - type seeded successfully!');
        }
        //-----------------------------------------------------------------------------------------------------------

    } catch (error) {
        console.error('Error seeding order status type:', error);
    }
}
async function seedorderPaymentMethods() {
    try {
        //--------------------------------------------------------------------------------------------------
        const type1 = await db.OrderPaymentTypeMaster.findOne({ where: { paymentTypeName: 'COD' } });
        if (!type1) {
            await db.OrderPaymentTypeMaster.create({
                paymentTypeName: 'COD',
                serial: 1,
                isActive: true,
                isDeleted: false
            });
            console.log('Order status - COD - type seeded successfully!');
        }
        //-----------------------------------------------------------------------------------------------------------
        const type2 = await db.OrderPaymentTypeMaster.findOne({ where: { paymentTypeName: 'ONLINE' } });
        if (!type2) {
            await db.OrderPaymentTypeMaster.create({
                paymentTypeName: 'ONLINE',
                serial: 2,
                isActive: true,
                isDeleted: false
            });
            console.log('Order status - ONLINE - type seeded successfully!');
        }
        //-----------------------------------------------------------------------------------------------------------

    } catch (error) {
        console.error('Error seeding order status type:', error);
    }
}

async function seedRefundRequestMethodMaster() {
    try {
        //--------------------------------------------------------------------------------------------------
        const type1 = await db.RefundRequestMethodMaster.findOne({ where: { refundRequestMethodName: 'UPI' } });
        if (!type1) {
            await db.RefundRequestMethodMaster.create({
                refundRequestMethodName: 'UPI',
                serial: 1,
                isActive: true,
                isDeleted: false
            });
            console.log('Refund Request Method Name - UPI - type seeded successfully!');
        }
        //-----------------------------------------------------------------------------------------------------------
        const type2 = await db.RefundRequestMethodMaster.findOne({ where: { refundRequestMethodName: 'BANK' } });
        if (!type2) {
            await db.RefundRequestMethodMaster.create({
                refundRequestMethodName: 'BANK',
                serial: 2,
                isActive: true,
                isDeleted: false
            });
            console.log('Refund Request Method Name status - BANK - type seeded successfully!');
        }
        //-----------------------------------------------------------------------------------------------------------

    } catch (error) {
        console.error('Error seeding order status type:', error);
    }
}

async function seedRefundStatusMaster() {
    try {
        //--------------------------------------------------------------------------------------------------
        const type1 = await db.RefundStatusMaster.findOne({ where: { refundStatusName: 'Pending' } });
        if (!type1) {
            await db.RefundStatusMaster.create({
                refundStatusName: 'Pending',
                serial: 1,
                isActive: true,
                isDeleted: false
            });
            console.log('Refund status - Pending - type seeded successfully!');
        }
        //-----------------------------------------------------------------------------------------------------------
        const type2 = await db.RefundStatusMaster.findOne({ where: { refundStatusName: 'Processing' } });
        if (!type2) {
            await db.RefundStatusMaster.create({
                refundStatusName: 'Processing',
                serial: 2,
                isActive: true,
                isDeleted: false
            });
            console.log('Refund status - Processing - type seeded successfully!');
        }
        //-----------------------------------------------------------------------------------------------------------
        const type3 = await db.RefundStatusMaster.findOne({ where: { refundStatusName: 'Approved' } });
        if (!type3) {
            await db.RefundStatusMaster.create({
                refundStatusName: 'Approved',
                serial: 3,
                isActive: true,
                isDeleted: false
            });
            console.log('Refund status - Approved - type seeded successfully!');
        }
        //-----------------------------------------------------------------------------------------------------------
        const type4 = await db.RefundStatusMaster.findOne({ where: { refundStatusName: 'Rejected' } });
        if (!type4) {
            await db.RefundStatusMaster.create({
                refundStatusName: 'Rejected',
                serial: 4,
                isActive: true,
                isDeleted: false
            });
            console.log('Refund status - Rejected - type seeded successfully!');
        }
        //-----------------------------------------------------------------------------------------------------------
        const type5 = await db.RefundStatusMaster.findOne({ where: { refundStatusName: 'Completed' } });
        if (!type5) {
            await db.RefundStatusMaster.create({
                refundStatusName: 'Completed',
                serial: 5,
                isActive: true,
                isDeleted: false
            });
            console.log('Refund status - Completed - type seeded successfully!');
        }
        //-----------------------------------------------------------------------------------------------------------
        const type6 = await db.RefundStatusMaster.findOne({ where: { refundStatusName: 'Cancelled' } });
        if (!type6) {
            await db.RefundStatusMaster.create({
                refundStatusName: 'Cancelled',
                serial: 6,
                isActive: true,
                isDeleted: false
            });
            console.log('Refund status - Cancelled - type seeded successfully!');
        }
        //-----------------------------------------------------------------------------------------------------------

    } catch (error) {
        console.error('Error seeding order status type:', error);
    }
}

module.exports = {
    seedAdminRole,
    seedAdminUser,
    seedDeliveryChargeTypes,
    seedCouponTypes,
    seedorderStatus,
    seedorderPaymentMethods,
    seedRefundStatusMaster,
    seedRefundRequestMethodMaster
};
