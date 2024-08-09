const Sequelize = require('sequelize'); // sequelize module import
const fs = require('fs'); // fs module import
const path = require('path'); // path module import

require('dotenv').config();

const env = process.env.NODE_ENV || 'local'; // process env or local in default.
const config = require('../../config/config.json')[env];

// connection instances creation for SQl with sequelize.
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        port: config.port,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
);

const db = {};

fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js')
    .forEach((file) => {
        // var model = sequelize.import(path.join(__dirname, file));
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes,
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// ------------------------------------------------
db.RoleModules.belongsTo(db.RoleMasters, {
    as: 'role',
    foreignKey: {
        name: 'roleId',
    },
});

db.RoleMasters.hasMany(db.RoleModules, {
    as: 'roleModule',
    foreignKey: {
        name: 'roleId'
    },
});
// ------------------------------------------------
db.RoleModules.belongsTo(db.ModuleMasters, {
    as: 'module',
    foreignKey: {
        name: 'moduleId'
    },
});

db.ModuleMasters.hasMany(db.RoleModules, {
    as: 'roleModules',
    foreignKey: {
        name: 'moduleId'
    },
});
// ------------------------------------------------

db.API_Routes.belongsTo(db.Users, {
    as: 'createdByUser',
    foreignKey: {
        name: 'userId'
    },
});

db.Users.hasMany(db.API_Routes, {
    as: 'apiRoutes',
    foreignKey: {
        name: 'userId'
    },
});
// ------------------------------------------------
db.RouteRoles.belongsTo(db.RoleMasters, {
    as: 'role',
    foreignKey: {
        name: 'roleId'
    },
});

db.RoleMasters.hasMany(db.RouteRoles, {
    as: 'routes',
    foreignKey: {
        name: 'roleId'
    },
});
// ------------------------------------------------
db.RouteRoles.belongsTo(db.API_Routes, {
    as: 'apiRuote',
    foreignKey: {
        name: 'routeId'
    },
});

db.API_Routes.hasMany(db.RouteRoles, {
    as: 'routeRoles',
    foreignKey: {
        name: 'routeId'
    },
});
// ------------------------------------------------
db.Users.belongsTo(db.RoleMasters, {
    as: 'role',
    foreignKey: {
        name: 'roleId'
    },
});

db.RoleMasters.hasMany(db.Users, {
    as: 'routeRoles',
    foreignKey: {
        name: 'roleId'
    },
});
// ------------------------------------------------
db.Addresses.belongsTo(db.Users, {
    as: 'user',
    foreignKey: {
        name: 'userId'
    },
});

db.Users.hasMany(db.Addresses, {
    as: 'addresses',
    foreignKey: {
        name: 'userId'
    },
});
// ------------------------------------------------
db.SubCategories.belongsTo(db.Category, {
    as: 'category',
    foreignKey: {
        name: 'categoryId'
    },
});

db.Category.hasMany(db.SubCategories, {
    as: 'subCategories',
    foreignKey: {
        name: 'categoryId'
    },
});
// ------------------------------------------------
db.Products.belongsTo(db.Category, {
    as: 'category',
    foreignKey: {
        name: 'categoryId'
    },
});

db.Category.hasMany(db.Products, {
    as: 'products',
    foreignKey: {
        name: 'categoryId'
    },
});
// ------------------------------------------------
db.Products.belongsTo(db.SubCategories, {
    as: 'subCategory',
    foreignKey: {
        name: 'subCategoryId'
    },
});

db.SubCategories.hasMany(db.Products, {
    as: 'products',
    foreignKey: {
        name: 'subCategoryId'
    },
});
// ------------------------------------------------
db.CartIdMaster.belongsTo(db.Users, {
    as: 'user',
    foreignKey: {
        name: 'userId'
    },
});

db.Users.hasMany(db.CartIdMaster, {
    as: 'cartIds',
    foreignKey: {
        name: 'userId'
    },
});
// ------------------------------------------------
db.Carts.belongsTo(db.CartIdMaster, {
    as: 'cart',
    foreignKey: {
        name: 'cartId'
    },
});

db.CartIdMaster.hasMany(db.Carts, {
    as: 'carts',
    foreignKey: {
        name: 'cartId'
    },
});
// ------------------------------------------------
db.Carts.belongsTo(db.Products, {
    as: 'product',
    foreignKey: {
        name: 'productId'
    },
});

db.Products.hasMany(db.Carts, {
    as: 'carts',
    foreignKey: {
        name: 'productId'
    },
});
// ------------------------------------------------
db.Carts.belongsTo(db.Users, {
    as: 'user',
    foreignKey: {
        name: 'userId'
    },
});

db.Users.hasMany(db.Carts, {
    as: 'cartMaster',
    foreignKey: {
        name: 'userId'
    },
});
// ------------------------------------------------
db.SlotUsageStory.belongsTo(db.SlotMaster, {
    as: 'slot',
    foreignKey: {
        name: 'slotId'
    },
});

db.SlotMaster.hasMany(db.SlotUsageStory, {
    as: 'slotUsages',
    foreignKey: {
        name: 'slotId'
    },
});
// ------------------------------------------------
// db.SlotUsageStory.belongsTo(db.Orders, {
//     as: 'order',
//     foreignKey: {
//         name: 'orderId'
//     },
// });

// db.Orders.hasMany(db.SlotUsageStory, {
//     as: 'slotUsed',
//     foreignKey: {
//         name: 'orderId'
//     },
// });
// db.Orders.belongsTo(db.SlotUsageStory, {
//     as: 'pickupSlots',
//     foreignKey: {
//         name: 'slotUsageId'
//     },
// });

// db.SlotUsageStory.hasMany(db.Orders, {
//     as: 'orders',
//     foreignKey: {
//         name: 'slotUsageId'
//     },
// });
// ------------------------------------------------
db.DeliveryChargeMaster.belongsTo(db.DeliveryChargeTypeMaster, {
    as: 'chargeType',
    foreignKey: {
        name: 'deliveryChargeTypeId'
    },
});

db.DeliveryChargeTypeMaster.hasMany(db.DeliveryChargeMaster, {
    as: 'charges',
    foreignKey: {
        name: 'deliveryChargeTypeId'
    },
});
// ------------------------------------------------
db.CouponMaster.belongsTo(db.CouponTypeMaster, {
    as: 'couponType',
    foreignKey: {
        name: 'couponTypeId'
    },
});

db.CouponTypeMaster.hasMany(db.CouponMaster, {
    as: 'coupons',
    foreignKey: {
        name: 'couponTypeId'
    },
});
// ------------------------------------------------
db.CouponUsageHistory.belongsTo(db.CouponMaster, {
    as: 'couponData',
    foreignKey: {
        name: 'couponId'
    },
});

db.CouponMaster.hasMany(db.CouponUsageHistory, {
    as: 'usageHistory',
    foreignKey: {
        name: 'couponId'
    },
});
// ------------------------------------------------
db.CouponUsageHistory.belongsTo(db.Orders, {
    as: 'orderData',
    foreignKey: {
        name: 'orderId'
    },
});

db.Orders.hasMany(db.CouponUsageHistory, {
    as: 'couponUsed',
    foreignKey: {
        name: 'orderId'
    },
});
// ------------------------------------------------
db.CouponUsageHistory.belongsTo(db.Users, {
    as: 'userData',
    foreignKey: {
        name: 'userId'
    },
});

db.Users.hasMany(db.CouponUsageHistory, {
    as: 'couponUsedHistory',
    foreignKey: {
        name: 'userId'
    },
});
// ------------------------------------------------
db.Orders.belongsTo(db.Users, {
    as: 'user',
    foreignKey: {
        name: 'userId'
    },
});

db.Users.hasMany(db.Orders, {
    as: 'orders',
    foreignKey: {
        name: 'userId'
    },
});
// ------------------------------------------------
db.Orders.belongsTo(db.OrderStatusMaster, {
    as: 'status',
    foreignKey: {
        name: 'orderStatusId'
    },
});

db.OrderStatusMaster.hasMany(db.Orders, {
    as: 'orderList',
    foreignKey: {
        name: 'orderStatusId'
    },
});
// ------------------------------------------------
db.Orders.belongsTo(db.CartIdMaster, {
    as: 'cart',
    foreignKey: {
        name: 'cartId'
    },
});

db.CartIdMaster.hasMany(db.Orders, {
    as: 'orderLists',
    foreignKey: {
        name: 'cartId'
    },
});
// ------------------------------------------------
db.Orders.belongsTo(db.OrderPaymentTypeMaster, {
    as: 'paymentMethod',
    foreignKey: {
        name: 'paymentTypeId'
    },
});

db.OrderPaymentTypeMaster.hasMany(db.Orders, {
    as: 'orders',
    foreignKey: {
        name: 'paymentTypeId'
    },
});
// ------------------------------------------------
db.Orders.belongsTo(db.Addresses, {
    as: 'address',
    foreignKey: {
        name: 'addressId'
    },
});

db.Addresses.hasMany(db.Orders, {
    as: 'orders',
    foreignKey: {
        name: 'addressId'
    },
});
// ------------------------------------------------
db.Orders.belongsTo(db.OrderPaymentTransactionDetails, {
    as: 'paymentTransaction',
    foreignKey: {
        name: 'transactionId'
    },
});

db.OrderPaymentTransactionDetails.hasOne(db.Orders, {
    as: 'orderInfo',
    foreignKey: {
        name: 'transactionId'
    },
});
// ------------------------------------------------
db.Orders.hasOne(db.OrderPaymentTransactionDetails, {
    foreignKey: 'orderId',
    as: 'paymentTransactions',
});

db.OrderPaymentTransactionDetails.belongsTo(db.Orders, {
    foreignKey: 'orderId',
    as: 'order',
});
// ------------------------------------------------
db.OrderStatusChangeLogs.belongsTo(db.Orders, {
    as: 'order',
    foreignKey: {
        name: 'orderId'
    },
});

db.Orders.hasMany(db.OrderStatusChangeLogs, {
    as: 'statusChangeLogs',
    foreignKey: {
        name: 'orderId'
    },
});
// ------------------------------------------------
db.OrderStatusChangeLogs.belongsTo(db.OrderStatusMaster, {
    as: 'orderStatus',
    foreignKey: {
        name: 'orderStatusId'
    },
});

db.OrderStatusMaster.hasMany(db.OrderStatusChangeLogs, {
    as: 'ChangeLogs',
    foreignKey: {
        name: 'orderStatusId'
    },
});
// ------------------------------------------------
db.OrderStatusChangeLogs.belongsTo(db.Users, {
    as: 'statusChangedBy',
    foreignKey: {
        name: 'addedBy', // Use the foreign key name as 'addedBy'
        allowNull: false // Assuming userId cannot be null
    }
});

db.Users.hasMany(db.OrderStatusChangeLogs, {
    as: 'statusChangeLogs',
    foreignKey: {
        name: 'addedBy', // Use the foreign key name as 'addedBy'
        allowNull: false // Assuming userId cannot be null
    }
})

// ------------------------------------------u------
db.Orders.belongsTo(db.SlotUsageStory, {
    as: 'pickupSlots',
    foreignKey: {
        name: 'slotUsageId'
    },
});

db.SlotUsageStory.hasMany(db.Orders, {
    as: 'orderList',
    foreignKey: {
        name: 'slotUsageId'
    },
});
// ------------------------------------------------

db.RefundMaster.belongsTo(db.Users, {
    as: 'owner',
    foreignKey: {
        name: 'userId'
    },
});

db.Users.hasOne(db.RefundMaster, {
    as: 'refundRequests',
    foreignKey: {
        name: 'userId'
    },
});
// ------------------------------------------------

db.RefundMaster.belongsTo(db.Orders, {
    as: 'order',
    foreignKey: {
        name: 'orderId'
    },
});

db.Orders.hasOne(db.RefundMaster, {
    as: 'refund',
    foreignKey: {
        name: 'orderId'
    },
});
// ------------------------------------------------
db.RefundMaster.hasOne(db.Orders, {
    foreignKey: 'refundId',
    as: 'orderData',
});

db.Orders.belongsTo(db.RefundMaster, {
    foreignKey: 'refundId',
    as: 'refundData'
});

// ------------------------------------------------
db.RefundMaster.belongsTo(db.RefundStatusMaster, {
    as: 'refundStatus',
    foreignKey: {
        name: 'refundStatusId'
    },
});

db.RefundStatusMaster.hasMany(db.RefundMaster, {
    as: 'refundRequests',
    foreignKey: {
        name: 'refundStatusId'
    },
});
// // ------------------------------------------------
db.RefundMaster.belongsTo(db.RefundRequestMethodMaster, {
    as: 'refundMethod',
    foreignKey: {
        name: 'refundRequestMethodId'
    },
});

db.RefundRequestMethodMaster.hasMany(db.RefundMaster, {
    as: 'refunds',
    foreignKey: {
        name: 'refundRequestMethodId'
    },
});
// // ------------------------------------------------
db.RefundMaster.belongsTo(db.OrderPaymentTransactionDetails, {
    as: 'refundTransactionDetails',
    foreignKey: {
        name: 'transactionId'
    },
});

db.OrderPaymentTransactionDetails.hasOne(db.RefundMaster, {
    as: 'refunds',
    foreignKey: {
        name: 'transactionId'
    },
});
// // ------------------------------------------------
db.ReviewRatings.belongsTo(db.Users, {
    as: 'addedUser',
    foreignKey: {
        name: 'addedBy', // Use the foreign key name as 'addedBy'
        allowNull: false // Assuming userId cannot be null
    }
});

db.Users.hasMany(db.ReviewRatings, {
    as: 'ratings',
    foreignKey: {
        name: 'addedBy', // Use the foreign key name as 'addedBy'
        allowNull: false // Assuming userId cannot be null
    }
})
// ------------------------------------------------
db.ReviewRatings.belongsTo(db.Users, {
    as: 'approver',
    foreignKey: {
        name: 'approvedBy', // Use the foreign key name as 'addedBy'
        // allowNull: false // Assuming userId cannot be null
    }
});

db.Users.hasMany(db.ReviewRatings, {
    as: 'approvedList',
    foreignKey: {
        name: 'approvedBy', // Use the foreign key name as 'addedBy'
        // allowNull: false // Assuming userId cannot be null
    }
})
// ------------------------------------------------
db.ReviewRatings.belongsTo(db.Products, {
    as: 'product',
    foreignKey: {
        name: 'productId'
    },
});

db.Products.hasMany(db.ReviewRatings, {
    as: 'productReviews',
    foreignKey: {
        name: 'productId'
    },
});
// // ------------------------------------------------
db.Feedbacks.belongsTo(db.Products, {
    as: 'productData',
    foreignKey: {
        name: 'productId'
    },
});

db.Products.hasMany(db.Feedbacks, {
    as: 'feedbackData',
    foreignKey: {
        name: 'productId'
    },
});
// // ------------------------------------------------
db.Feedbacks.belongsTo(db.Users, {
    as: 'userData',
    foreignKey: {
        name: 'addedBy', // Use the foreign key name as 'addedBy'
        allowNull: false // Assuming userId cannot be null
    }
});

db.Users.hasMany(db.Feedbacks, {
    as: 'feedback',
    foreignKey: {
        name: 'addedBy', // Use the foreign key name as 'addedBy'
        allowNull: false // Assuming userId cannot be null
    }
})
// // ------------------------------------------------
db.Feedbacks.belongsTo(db.Users, {
    as: 'approverData',
    foreignKey: {
        name: 'approvedBy', // Use the foreign key name as 'addedBy'
        // allowNull: false // Assuming userId cannot be null
    }
});

db.Users.hasMany(db.Feedbacks, {
    as: 'feedBackApproved',
    foreignKey: {
        name: 'approvedBy', // Use the foreign key name as 'addedBy'
        // allowNull: false // Assuming userId cannot be null
    }
})
// ------------------------------------------------

// db.Testimonials.belongsTo(db.Users, {
//     as: 'testimonialsAddedBy',
//     foreignKey: {
//         name: 'addedBy', // Use the foreign key name as 'addedBy'
//         allowNull: false // Assuming userId cannot be null
//     }
// });

// db.Users.hasMany(db.Testimonials, {
//     as: 'testimonials',
//     foreignKey: {
//         name: 'addedBy', // Use the foreign key name as 'addedBy'
//         allowNull: false // Assuming userId cannot be null
//     }
// })
// // ------------------------------------------------
db.Testimonials.belongsTo(db.Users, {
    as: 'approverData',
    foreignKey: {
        name: 'approvedBy'
    }
});

db.Users.hasMany(db.Testimonials, {
    as: 'testimonialsApprovedBy',
    foreignKey: {
        name: 'approvedBy'
    }
})

// ------------------------------------------------
db.NotificationMaster.belongsTo(db.Users, {
    as: 'user',
    foreignKey: {
        name: 'userId'
    }
});

db.Users.hasMany(db.NotificationMaster, {
    as: 'notifications',
    foreignKey: {
        name: 'userId',
    }
})
// ------------------------------------------------
db.NotificationMaster.belongsTo(db.Orders, {
    as: 'order',
    foreignKey: {
        name: 'orderId'
    }
});

db.Orders.hasMany(db.NotificationMaster, {
    as: 'orderNotifications',
    foreignKey: {
        name: 'orderId',
    }
})
// ------------------------------------------------
db.ProductsImages.belongsTo(db.Products, {
    as: 'product',
    foreignKey: {
        name: 'productId'
    }
});

db.Products.hasMany(db.ProductsImages, {
    as: 'images',
    foreignKey: {
        name: 'productId',
    }
})
// ------------------------------------------------

module.exports = db;
