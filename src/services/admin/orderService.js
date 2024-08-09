const models = require('../../models');

const Sequelize = require('sequelize');
const { Op } = Sequelize;


const ejs = require('ejs');
const nodeMialer = require('nodemailer');
const mail_moment = require('moment');
const path = require('path');



const moment = require('moment-timezone');
const getCurrentWeekDates = async () => {
    const today = moment();
    const nextWeek = moment(today).add(6, 'days'); // Get the date 7 days from today
    return [today.format('YYYY-MM-DD'), nextWeek.format('YYYY-MM-DD')];
};

// Query to fetch day-wise usage story of the current week
const getUsageStoryOfWeek = async () => {
    const [startDate, endDate] = await getCurrentWeekDates(); // Await the result of getCurrentWeekDates()
    const usageStory = await models.SlotUsageStory.findAll({
        where: {
            isActive: true,
            isDeleted: false,
            date: {
                [Op.between]: [startDate, endDate]
            }
        },
        order: [['date', 'ASC']]
    });

    return usageStory;
};

const orderService = {

    getAllSlots: async () => {
        try {
            const slotMaster = await models.SlotMaster.findAll({
                where: {
                    isActive: true,
                    isDeleted: false,
                }
            });
            const usageStory = await getUsageStoryOfWeek(); // Call getUsageStoryOfWeek
            // Create a map to store the count of usage for each slotId
            const usageCounts = new Map();
            // Iterate over usageStory to count the usage for each slotId
            usageStory.forEach(story => {
                const { slotId } = story;
                if (usageCounts.has(slotId)) {
                    usageCounts.set(slotId, usageCounts.get(slotId) + 1);
                } else {
                    usageCounts.set(slotId, 1);
                }
            });
            // Create a new array with modified objects
            const slotMasterWithUsageCount = slotMaster.map(slot => {
                const count = usageStory.filter(story => story.slotId === slot.slotId).length;
                return { ...slot, usedCount: count };
            });
            const slotMasterRaw = slotMasterWithUsageCount.map(slot => {
                const { dataValues, usedCount } = slot;
                return { ...dataValues, usedCount };
            });
            const filteredSlots = slotMasterRaw.filter(slot => slot.usedCount <= slot.slotLimit);
            // Group slots by day
            const groupedSlots = filteredSlots.reduce((acc, slot) => {
                const { day } = slot;
                if (!acc[day]) {
                    acc[day] = { day, slots: [] };
                }
                acc[day].slots.push(slot);
                return acc;
            }, {});
            // Convert groupedSlots object into an array
            const slotsByDay = Object.values(groupedSlots);
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            // Get the index of today's day in the daysOfWeek array
            const todayIndex = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', weekday: 'long' });
            let startingDayIndex = daysOfWeek.indexOf(todayIndex);
            // Function to get the next day based on the index
            const getNextDay = (currentIndex) => {
                const nextIndex = (currentIndex + 1) % daysOfWeek.length; // Wrap around if needed
                return daysOfWeek[nextIndex];
            };
            // Create an array of days starting from today and continuing sequentially
            let sortedDays = [];
            for (let i = 0; i < daysOfWeek.length; i++) {
                sortedDays.push(daysOfWeek[startingDayIndex]);
                startingDayIndex = (startingDayIndex + 1) % daysOfWeek.length;
            }
            // Map the sorted days array to the data array
            let sortedData = sortedDays.map(day => {
                const foundDay = slotsByDay.find(d => d.day === day);
                const slots = foundDay ? foundDay.slots : []; // Check if foundDay is not undefined
                return {
                    day: day,
                    slots: slots
                };
            });
            return sortedData;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    add: async (payload) => {
        try {
            // Create admin record in the database
            const data = await models.Orders.create(payload);
            // return admin;
            return data;
        } catch (error) {
            console.log(error)
            // Handle any errors that occur during database operation
            throw new Error('Failed to add');
        }
    },
    getAll: async () => {
        try {
            const data = await models.Orders.findAll({
                include: [
                    {
                        model: models.CartIdMaster,
                        as: "cart",
                        include: [
                            {
                                model: models.Carts,
                                as: "carts",
                                include: [
                                    {
                                        model: models.Products,
                                        as: "product"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: models.Users,
                        as: "user",
                    },
                    {
                        model: models.OrderStatusMaster,
                        as: "status",
                    },
                    {
                        model: models.OrderPaymentTypeMaster,
                        as: "paymentMethod",
                    },
                    {
                        model: models.Addresses,
                        as: "address",
                    },
                    {
                        model: models.OrderPaymentTransactionDetails,
                        as: "paymentTransaction",
                    },
                    {
                        model: models.RefundMaster,
                        as: "refundData",
                    },
                    {
                        model: models.SlotUsageStory,
                        as: "pickupSlots",
                        include: [
                            {
                                model: models.SlotMaster,
                                as: "slot",
                            }
                        ]
                    },
                    {
                        model: models.OrderStatusChangeLogs,
                        as: "statusChangeLogs",
                        include: [
                            {
                                model: models.OrderStatusMaster,
                                as: "orderStatus",
                            },
                            {
                                model: models.Users,
                                as: "statusChangedBy",
                            }
                        ]
                    }
                ],
                order: [['orderId', 'DESC']]
            });

            // After fetching, sort the OrderStatusChangeLogs separately
            if (data && data.length > 0) {
                data.forEach(order => {
                    order.statusChangeLogs.sort((a, b) => b.statusChangeLogId - a.statusChangeLogId);
                });
            }

            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    filterorder: async (orderStatusId) => {
        try {
            const data = await models.Orders.findAll({
                where: {
                    orderStatusId: orderStatusId
                },
                include: [
                    {
                        model: models.CartIdMaster,
                        as: "cart",
                        include: [
                            {
                                model: models.Carts,
                                as: "carts",
                                include: [
                                    {
                                        model: models.Products,
                                        as: "product"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: models.Users,
                        as: "user",
                    },
                    {
                        model: models.OrderStatusMaster,
                        as: "status",
                    },
                    {
                        model: models.OrderPaymentTypeMaster,
                        as: "paymentMethod",
                    },
                    {
                        model: models.Addresses,
                        as: "address",
                    },
                    {
                        model: models.OrderPaymentTransactionDetails,
                        as: "paymentTransaction",
                    },
                    {
                        model: models.RefundMaster,
                        as: "refundData",
                    },
                    {
                        model: models.SlotUsageStory,
                        as: "pickupSlots",
                        include: [
                            {
                                model: models.SlotMaster,
                                as: "slot",
                            }
                        ]
                    }
                ],
                order: [['orderId', 'DESC']]
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getAllOrder: async () => {
        try {
            const data = await models.Orders.findAll({
                include: [
                    {
                        model: models.CartIdMaster,
                        as: "cart",
                        include: [
                            {
                                model: models.Carts,
                                as: "carts",
                                include: [
                                    {
                                        model: models.Products,
                                        as: "product"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: models.Users,
                        as: "user",
                    },
                    {
                        model: models.OrderStatusMaster,
                        as: "status",
                    },
                    {
                        model: models.OrderPaymentTypeMaster,
                        as: "paymentMethod",
                    },
                    {
                        model: models.Addresses,
                        as: "address",
                    },
                    {
                        model: models.OrderPaymentTransactionDetails,
                        as: "paymentTransaction",
                    },
                    {
                        model: models.RefundMaster,
                        as: "refundData",
                    },
                    {
                        model: models.SlotUsageStory,
                        as: "pickupSlots",
                        include: [
                            {
                                model: models.SlotMaster,
                                as: "slot",
                            }
                        ]
                    }
                ]
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    update: async (id, paylod) => {
        try {

            if (paylod.orderStatusId && [3, 7, 8, 9].includes(paylod.orderStatusId)) {
                paylod.isOrderCompleted = true;
            } else {
                paylod.isOrderCompleted = false;
            }
            // Create admin record in the database
            const [rowsAffected, updatedData] = await models.Orders.update(paylod, {
                where: {
                    orderId: id
                }
            });

            if (rowsAffected > 0) {
                return 'Data updated successfully';
            } else {
                return 'No data found matching the condition';
            }

        } catch (error) {
            console.log(error)
            // Handle any errors that occur during database operation
            throw new Error('Failed to update');
        }
    },
    updateorderstatus: async (id, paylod, basePath) => {
        try {

            if (paylod.orderStatusId && [3, 7, 8, 9].includes(paylod.orderStatusId)) {
                paylod.isOrderCompleted = true;
            } else {
                paylod.isOrderCompleted = false;
            }

            // Create admin record in the database
            const [rowsAffected, updatedData] = await models.Orders.update({
                orderStatusId: paylod.orderStatusId,
                isOrderCompleted: paylod.isOrderCompleted

            }, {
                where: {
                    orderId: id
                }
            });

            if (rowsAffected > 0) {

                const orderData = await models.Orders.findOne({
                    where: {
                        orderId: id
                    },
                    include: [
                        {
                            model: models.CartIdMaster,
                            as: 'cart',
                            include: [
                                {
                                    model: models.Carts,
                                    as: "carts",
                                    include: [
                                        {
                                            model: models.Products,
                                            as: "product",
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            model: models.Users,
                            as: "user",
                        },
                        {
                            model: models.OrderStatusMaster,
                            as: "status",
                        },
                        {
                            model: models.OrderPaymentTypeMaster,
                            as: "paymentMethod",
                        },
                        {
                            model: models.Addresses,
                            as: "address",
                        },
                        {
                            model: models.OrderPaymentTransactionDetails,
                            as: "paymentTransaction",
                        },
                        {
                            model: models.RefundMaster,
                            as: "refundData",
                        },
                        {
                            model: models.SlotUsageStory,
                            as: "pickupSlots",
                            include: [
                                {
                                    model: models.SlotMaster,
                                    as: "slot",
                                }
                            ]
                        }
                    ]
                });

                await models.OrderStatusChangeLogs.create({
                    orderId: id,
                    notes: paylod.notes,
                    orderStatusId: paylod.orderStatusId,
                    addedBy: paylod.userId
                })

                const orderStatusData = await models.OrderStatusMaster.findOne({
                    where: {
                        orderStatusId: paylod.orderStatusId
                    }

                });
                const cartProduct = await models.Carts.findAll({
                    where: {
                        cartId: orderData.dataValues.cartId
                    },
                    include: [
                        {
                            model: models.Products,
                            as: "product",
                        }
                    ]
                })
                await models.NotificationMaster.bulkCreate([
                    {
                        "notificationTitle": `Order Status changed to ${orderStatusData.statusName}!`,
                        "notificationMessage": `Order Status changed to ${orderStatusData.statusName}`,
                        "notificationType": "Web",
                        "notificationFor": "order",
                        "isActive": true,
                        "isDeleted": false,
                        "isRead": false,
                        "userId": 1, // for admin.
                        "orderId": id
                    },
                    {
                        "notificationTitle": `Order Status changed to ${orderStatusData.statusName}!`,
                        "notificationMessage": `Order Status changed to ${orderStatusData.statusName}`,
                        "notificationType": "Web",
                        "notificationFor": "order",
                        "isActive": true,
                        "isDeleted": false,
                        "isRead": false,
                        "userId": orderData.userId,
                        "orderId": id
                    }
                ]);

                let mailSubject;

                if (orderData.status.dataValues.orderStatusId == 1) {
                    mailSubject = 'Your Order Placed';
                    orderData.status.dataValues.statusName = 'Order Placed!'
                } else if (orderData.status.dataValues.orderStatusId == 2) {
                    mailSubject = 'Your Order Accepted';
                    orderData.status.dataValues.statusName = 'Order Accepted!'
                } else if (orderData.status.dataValues.orderStatusId == 3) {
                    mailSubject = 'Your Order Rejected';
                    orderData.status.dataValues.statusName = 'Order Rejected!'
                } else if (orderData.status.dataValues.orderStatusId == 4) {
                    mailSubject = 'Your Order is Ready For Pickup';
                    orderData.status.dataValues.statusName = 'Ready For Pickup!'
                } else if (orderData.status.dataValues.orderStatusId == 5) {
                    mailSubject = 'Your Order Item is Recived For Processing'
                    orderData.status.dataValues.statusName = 'Order Item is Recived For Processing!'
                } else if (orderData.status.dataValues.orderStatusId == 6) {
                    mailSubject = 'Your Order is Out For Delivery';
                    orderData.status.dataValues.statusName = 'Out For Delivery!'
                } else if (orderData.status.dataValues.orderStatusId == 7) {
                    mailSubject = 'Your Order has been Cancelled by Admin';
                    orderData.status.dataValues.statusName = 'Order has been Cancelled by Admin!'
                } else if (orderData.status.dataValues.orderStatusId == 8) {
                    mailSubject = 'Your order Cancellation Request has been Approved';
                    orderData.status.dataValues.statusName = 'Order cancellation Request has been Approved'
                } else if (orderData.status.dataValues.orderStatusId == 9) {
                    mailSubject = 'Order Delivered';
                }

                // console.log(orderData.cart.carts[0].dataValues.product)
                // console.log(orderData.cart.carts[0].dataValues.product.length)
                if (orderData.status.dataValues.orderStatusId == 4) {
                    orderData.arriving_text = 'Pickup Time & Date';
                    orderData.arriving_date = orderData.pickUpSlot
                } else if (orderData.status.dataValues.orderStatusId == 6) {
                    orderData.arriving_text = 'Arriving on';
                    orderData.arriving_date = orderData.deliverySlot
                }

                
                orderData.bgIMG = basePath + `/static/close-up-person.jpg`
                orderData.orderedCard = orderData.cart.carts[0];
                orderData.product = orderData.cart.carts[0].dataValues.product;
                const mailData = path.join(__dirname, '../../mailTemplate/updateOrderStatus.ejs');
                const mailBody = await ejs.renderFile(mailData, {
                    orderData, mail_moment, cartProduct
                });

                const smtpData = {
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'ataulmolla.itv@gmail.com',
                        pass: 'lvnufkickhbsxdrd'
                    }
                };

                const transporter = nodeMialer.createTransport(smtpData);

                const mailOptions = {
                    from: 'Lough-O-laundry ataulmolla.itv@gmail.com',
                    to: 'ataulmolla.itv@gmail.com,mahiruddinseikh@gmail.com,subhankardasdeara@gmail.com',
                    subject: mailSubject,
                    // subject: orderData.status.dataValues.statusName,
                    html: mailBody
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error)
                    } else {
                        console.log('message sent');
                    }
                });

                return 'Order status updated successfully';
            } else {
                return 'No data found matching the condition';
            }

        } catch (error) {
            console.log(error)
            // Handle any errors that occur during database operation
            throw new Error('Failed to update');
        }
    },
    updatepaymentstatus: async (id, paylod) => {
        try {
            // Create admin record in the database
            const [rowsAffected, updatedData] = await models.Orders.update(paylod, {
                where: {
                    orderId: id
                }
            });

            if (rowsAffected > 0) {

                await models.NotificationMaster.bulkCreate([
                    {
                        "notificationTitle": `Order Payment Status changed to ${paylod.paymentStatus}!`,
                        "notificationMessage": `Order Payment Status changed to ${paylod.paymentStatus}`,
                        "notificationType": "Web",
                        "notificationFor": "order",
                        "isActive": true,
                        "isDeleted": false,
                        "isRead": false,
                        "userId": 1, // for admin.
                        "orderId": id
                    }
                ]);

                return 'Order status updated successfully';
            } else {
                return 'No data found matching the condition';
            }
        } catch (error) {
            console.log(error)
            // Handle any errors that occur during database operation
            throw new Error('Failed to update');
        }
    },
    delete: async (id) => {
        try {
            // Create admin record in the database
            const [rowsAffected, updatedData] = await models.Orders.update({ isDeleted: true }, {
                where: {
                    orderId: id
                }
            });

            if (rowsAffected > 0) {
                return 'Data deleted successfully';
            } else {
                return 'No data found matching the condition';
            }
        } catch (error) {
            throw new Error('Failed to delete data');
        }
    },
    get: async (id) => {
        try {
            const data = await models.Orders.findOne({
                where: {
                    orderId: id
                },
                include: [
                    {
                        model: models.CartIdMaster,
                        as: "cart",
                        include: [
                            {
                                model: models.Carts,
                                as: "carts",
                                include: [
                                    {
                                        model: models.Products,
                                        as: 'product',
                                        attributes: ['productName', 'thumbnailImage', 'longDescription', 'shortDescription', 'categoryId', 'subCategoryId'],
                                        include: [
                                            {
                                                model: models.Category,
                                                as: 'category',
                                                attributes: ['categoryName']
                                            },
                                            {
                                                model: models.SubCategories,
                                                as: 'subCategory',
                                                attributes: ['subCategoryName']
                                            },
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: models.Users,
                        as: "user",
                    },
                    {
                        model: models.OrderStatusMaster,
                        as: "status",
                    },
                    {
                        model: models.OrderPaymentTypeMaster,
                        as: "paymentMethod",
                    },
                    {
                        model: models.Addresses,
                        as: "address",
                    },
                    {
                        model: models.OrderPaymentTransactionDetails,
                        as: "paymentTransaction",
                    },
                    {
                        model: models.RefundMaster,
                        as: "refundData",
                    },
                    {
                        model: models.SlotUsageStory,
                        as: "pickupSlots",
                        include: [
                            {
                                model: models.SlotMaster,
                                as: "slot",
                            }
                        ]
                    },
                    {
                        model: models.OrderStatusChangeLogs,
                        as: "statusChangeLogs",
                        include: [
                            {
                                model: models.OrderStatusMaster,
                                as: "orderStatus",
                            },
                            {
                                model: models.Users,
                                as: "statusChangedBy",
                            }
                        ]
                    }
                ],

            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getSpecificOrder: async (id) => {
        try {
            const data = await models.Orders.findOne({
                where: {
                    orderId: id
                },
                include: [
                    {
                        model: models.Carts,
                        as: "cart",
                        include: [
                            {
                                model: models.Products,
                                as: "product"
                            }
                        ]
                    },
                    {
                        model: models.Users,
                        as: "user",
                    },
                    {
                        model: models.OrderStatusMaster,
                        as: "status",
                    },
                    {
                        model: models.OrderPaymentTypeMaster,
                        as: "paymentMethod",
                    },
                    {
                        model: models.Addresses,
                        as: "address",
                    },
                    {
                        model: models.OrderPaymentTransactionDetails,
                        as: "paymentTransaction",
                    },
                    {
                        model: models.RefundMaster,
                        as: "refundData",
                    },
                    {
                        model: models.SlotUsageStory,
                        as: "pickupSlots",
                        include: [
                            {
                                model: models.SlotMaster,
                                as: "slot",
                            }
                        ]
                    }
                ]
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getLebel: async (id) => {
        try {
            const orderData = await models.Orders.findOne({
                where: {
                    orderId: id
                },
                include: [
                    {
                        model: models.CartIdMaster,
                        as: "cart",
                        include: [
                            {
                                model: models.Carts,
                                as: "carts",
                                include: [
                                    {
                                        model: models.Products,
                                        as: 'product',
                                        attributes: ['productName', 'thumbnailImage', 'longDescription', 'shortDescription', 'categoryId', 'subCategoryId'],
                                        include: [
                                            {
                                                model: models.Category,
                                                as: 'category',
                                                attributes: ['categoryName']
                                            },
                                            {
                                                model: models.SubCategories,
                                                as: 'subCategory',
                                                attributes: ['subCategoryName']
                                            },
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: models.Users,
                        as: "user",
                    },
                    {
                        model: models.Addresses,
                        as: "address",
                    },
                    {
                        model: models.SlotUsageStory,
                        as: "pickupSlots",
                        include: [
                            {
                                model: models.SlotMaster,
                                as: "slot",
                            }
                        ]
                    }
                ]
            });

            if (orderData) {
                // Grouping by categoryId and subCategoryId
                const groupedItems = orderData.cart.carts.reduce((acc, cartItem) => {
                    const { productName } = cartItem.product;
                    const { categoryName } = cartItem.product.category;
                    const { subCategoryName } = cartItem.product.subCategory;
                    const key = `${categoryName}_${subCategoryName}`;
                    if (!acc[key]) {
                        acc[key] = {
                            categoryName,
                            subCategoryName,
                            item: []
                        };
                    }
                    acc[key].item.push({ productName });
                    return acc;
                }, {});

                // Generating the desired output
                const labels = Object.values(groupedItems).map(group => ({
                    orderId: orderData.orderId,
                    createdAt: orderData.createdAt,
                    name: orderData.user.name,
                    category: group.categoryName,
                    subCategoryName: group.subCategoryName,
                    item: group.item
                }));

                return labels;
            }
            else {
                return []
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
}

module.exports = orderService;