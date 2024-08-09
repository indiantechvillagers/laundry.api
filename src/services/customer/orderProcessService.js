
const models = require("../../models");
const excludeAttributes = { exclude: ['createdAt', 'updatedAt'] };

const sequelize = require('sequelize');

const Sequelize = require('sequelize');
const { Op } = Sequelize;


const ejs = require('ejs');
const nodeMialer = require('nodemailer');
const mail_moment = require('moment');
const html_to_pdf = require('html-pdf');
const path = require('path');



// Function to get the start and end date of the current week starting from today's date
// const getCurrentWeekDates = async () => {

//     console.log(new Date())

//     const today = new Date();
//     const nextWeek = new Date(today);
//     nextWeek.setDate(nextWeek.getDate() + 7); // Get the date 7 days from today

//     return [today.toISOString().slice(0, 10), nextWeek.toISOString().slice(0, 10)]; // Return dates as YYYY-MM-DD strings
// };
const moment = require('moment-timezone');
const getCurrentWeekDates = async () => {
    const today = moment();
    const nextWeek = moment(today).add(6, 'days'); // Get the date 7 days from today
    return [today.format('YYYY-MM-DD'), nextWeek.format('YYYY-MM-DD')];
};


const getNextDayOfWeek = (day) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const currentDayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const targetDayOfWeek = daysOfWeek.indexOf(day);
    const daysUntilTargetDay = (targetDayOfWeek + 7 - currentDayOfWeek) % 7;
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + daysUntilTargetDay);
    return formatDate(nextDay);
};

// Function to format date as YYYY-MM-DD
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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

const getCurrentAvailableSlots = (data) => {
    const currentDate = new Date();
    const currentDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    const currentTime = currentDate.toLocaleTimeString('en-US', { hour12: true });

    return data.map(day => {
        if (day.day === currentDay) {
            const filteredSlots = day.slots.filter(slot => {
                let [startTime, endTime] = slot.time.split(' - ');
                startTime = startTime.trim();
                endTime = endTime.trim();

                // Handle special case for "11PM - 12PM"
                if (endTime === '12PM' && startTime === '11PM') {
                    endTime = '11:59PM'; // Adjust endTime for correct comparison
                }

                const [startHour, startMinute] = startTime.split(/[ :]+/);
                const [endHour, endMinute] = endTime.split(/[ :]+/);

                const start24Hour = parseInt(startHour) + (startTime.includes('PM') ? 12 : 0);
                const end24Hour = parseInt(endHour) + (endTime.includes('PM') ? 12 : 0);
                const current24Hour = parseInt(currentTime.split(':')[0]) + (currentTime.includes('PM') ? 12 : 0);

                if (current24Hour < start24Hour || current24Hour > end24Hour) {
                    return false; // Slot is before or after current time
                } else if (current24Hour === start24Hour && parseInt(currentTime.split(':')[1]) < parseInt(startMinute)) {
                    return false; // Slot starts after current time
                } else if (current24Hour === end24Hour && parseInt(currentTime.split(':')[1]) >= parseInt(endMinute)) {
                    return false; // Slot has already ended
                }

                return true; // Slot is within current time
            });
            return { day: day.day, slots: filteredSlots };
        }
        return day;
    }).filter(day => day.slots && day.slots.length > 0);
};

const orderProcessServices = {
    getAllCarts: async (userId) => {
        try {
            const data = await models.Carts.findAll({
                // where: {
                //     isActive: true,
                //     isDeleted: false,
                //     userId: userId
                // },
                where: {
                    isActive: true,
                    isDeleted: false,
                    deviceId: userId
                },
                include: [
                    {
                        model: models.CartIdMaster,
                        as: 'cart',
                        where: {
                            isOrderCompleted: false
                        },
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    },
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
            });

            const groupedData = [];

            // Function to check if an object with the given category and subcategory exists in groupedData
            const findGroup = (category, subCategory) => {
                return groupedData.find(group => group.categoryId === category && group.subCategoryId === subCategory);
            };

            // Iterate through each item in the data array
            data.forEach(item => {
                const categoryId = item.product.categoryId
                const categoryName = item.product.category.categoryName
                const subCategoryId = item.product.subCategoryId
                const subCategoryName = item.product.subCategory.subCategoryName

                // Check if a group with the same category and subcategory exists
                let group = findGroup(categoryId, subCategoryId);
                // If no group exists, create a new group
                if (!group) {
                    group = {
                        categoryId,
                        categoryName,
                        subCategoryId,
                        subCategoryName,
                        cart: []
                    };
                    groupedData.push(group);
                }

                // Add the current item to the group's cart
                group.cart.push(item);
            });

            return groupedData;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    editcartitem: async (id, paylod) => {
        try {
            if (paylod.quantity < 1) {

                await orderProcessServices.deletecartitem(id);

                return 'Item deleted successfully';
            } else {

                const productData = await models.Carts.findOne({
                    where: { cartProductId: id },
                    include: [{
                        model: models.Products,
                        as: 'product'

                    }]
                });
                if (productData) {
                    paylod.pricePerQantity = productData.product.price;
                    paylod.totalPrice = productData.product.price * paylod.quantity;
                } else {
                    return 'Invalid id';
                }

                // Create admin record in the database
                const [rowsAffected, updatedData] = await models.Carts.update(paylod, {
                    where: {
                        cartProductId: id
                    }
                });

                if (rowsAffected > 0) {
                    return 'Cart updated successfully';
                } else {
                    return 'No data found matching the condition';
                }

            }



            // const productData = await models.Carts.findOne({
            //     where: { cartProductId: id },
            //     include: [{
            //         model: models.Products,
            //         as: 'product'

            //     }]
            // });
            // if (productData) {
            //     paylod.pricePerQantity = productData.product.price;
            //     paylod.totalPrice = productData.product.price * paylod.quantity;
            // } else {
            //     return 'Invalid id';
            // }

            // // Create admin record in the database
            // const [rowsAffected, updatedData] = await models.Carts.update(paylod, {
            //     where: {
            //         cartProductId: id
            //     }
            // });

            // if (rowsAffected > 0) {
            //     return 'Cart updated successfully';
            // } else {
            //     return 'No data found matching the condition';
            // }

        } catch (error) {
            console.log(error)
            // Handle any errors that occur during database operation
            throw new Error('Failed to update');
        }
    },
    deletecartitem: async (id) => {
        try {
            const data = await models.Carts.destroy({
                where: {
                    cartProductId: parseInt(id)
                }
            });

            if (data > 0) {
                return 'Item deleted successfully';
            } else {
                return 'No data found matching the condition';
            }
        } catch (error) {
            throw new Error('Failed to delete data');
        }
    },
    getAllSlots2: async () => {
        // try {
        //     // const slots = await models.SlotMaster.findAll({
        //     //     where: {
        //     //         isActive: true,
        //     //         isDeleted: false,
        //     //     },
        //     //     include: [
        //     //         {
        //     //             model: models.SlotUsageStory,
        //     //             as: 'slotUsages',
        //     //             attributes: { exclude: ['createdAt', 'updatedAt'] }
        //     //         }
        //     //     ]
        //     // });

        //     const slots = await models.SlotMaster.findAll({
        //         where: {
        //             isActive: true,
        //             isDeleted: false,
        //         },
        //         include: [
        //             {
        //                 model: models.SlotUsageStory,
        //                 as: 'slotUsages',
        //                 attributes: [],
        //             },
        //         ],
        //         attributes: [
        //             'day',
        //             [Sequelize.fn('COUNT', Sequelize.col('slotUsages.slotId')), 'totalUsageCount'],
        //             [Sequelize.literal('DATE(`slotUsages`.`createdAt`)'), 'usageDate'],
        //             'slotLimit'
        //         ],
        //         group: ['day', Sequelize.literal('DATE(`slotUsages`.`createdAt`)')],
        //     });

        //     // Filter out records where totalUsageCount exceeds slotLimit
        //     const filteredSlots = slots.filter(slot => {
        //         const totalUsageCount = slot.get('totalUsageCount');
        //         const slotLimit = slot.get('slotLimit');

        //         console.log('totalUsageCount : ' + totalUsageCount)
        //         console.log('slotLimit : ' + slotLimit)

        //         return totalUsageCount !== undefined && totalUsageCount < slotLimit;
        //     });

        //     console.log(JSON.stringify(filteredSlots));

        //     const today = new Date().getDay(); // Get current day (0-6, 0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        //     const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        //     const groupedSlots = daysOfWeek.slice(today).map(day => {
        //         const slotsForDay = filteredSlots.filter(slot => slot.day === day);
        //         if (slotsForDay.length > 0) {
        //             return {
        //                 day,
        //                 slots: slotsForDay
        //             };
        //         }
        //     }).filter(daySlots => daySlots); // Remove undefined values from map result


        //     // Add slots from Sunday to Wednesday
        //     if (today !== 0) {
        //         for (let i = 0; i < today; i++) {
        //             const day = daysOfWeek[i];
        //             const slotsForDay = groupedSlots.filter(slot => slot.day === day);
        //             if (slotsForDay.length > 0) {
        //                 groupedSlots.push({
        //                     day,
        //                     slots: slotsForDay
        //                 });
        //             }
        //         }
        //     }

        //     console.log(groupedSlots);


        //     return groupedSlots;
        // } catch (error) {
        //     throw new Error(error.message);
        // }



        // try {
        //     const slots = await models.SlotMaster.findAll({
        //         where: {
        //             isActive: true,
        //             isDeleted: false,
        //         },
        //         include: [
        //             {
        //                 model: models.SlotUsageStory,
        //                 as: 'slotUsages',
        //                 attributes: [],
        //             },
        //         ],
        //         attributes: [
        //             'day',
        //             [Sequelize.fn('COUNT', Sequelize.col('slotUsages.slotId')), 'totalUsageCount'],
        //             [Sequelize.literal('DATE(`slotUsages`.`createdAt`)'), 'usageDate'],
        //             'slotLimit'
        //         ],
        //         group: ['day', Sequelize.literal('DATE(`slotUsages`.`createdAt`)')],
        //     });

        //     // Filter out records where totalUsageCount exceeds slotLimit or slotLimit is already used
        //     const filteredSlots = slots.filter(slot => {
        //         const totalUsageCount = slot.get('totalUsageCount');
        //         const slotLimit = slot.get('slotLimit');
        //         return totalUsageCount !== undefined && totalUsageCount < slotLimit && totalUsageCount !== slotLimit;
        //     });

        //     console.log(JSON.stringify(filteredSlots));

        //     const today = new Date().getDay(); // Get current day (0-6, 0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        //     const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        //     const sortedGroupedSlots = daysOfWeek.map(day => {
        //         const slotsForDay = filteredSlots.filter(slot => slot.day === day);
        //         if (slotsForDay.length > 0) {
        //             return {
        //                 day,
        //                 slots: slotsForDay
        //             };
        //         }
        //     }).filter(daySlots => daySlots); // Remove undefined values from map result

        //     // Sort the grouped slots by today's day
        //     const sortedSlots = sortedGroupedSlots.sort((a, b) => {
        //         const todayIndex = daysOfWeek.indexOf(daysOfWeek[today]);
        //         const aIndex = daysOfWeek.indexOf(a.day);
        //         const bIndex = daysOfWeek.indexOf(b.day);
        //         return (aIndex >= todayIndex ? aIndex : aIndex + 7) - (bIndex >= todayIndex ? bIndex : bIndex + 7);
        //     });

        //     console.log(sortedSlots);

        //     return sortedSlots;
        // } catch (error) {
        //     throw new Error(error.message);
        // }

        // try {
        //     const slots = await models.SlotMaster.findAll({
        //         where: {
        //             isActive: true,
        //             isDeleted: false,
        //         },
        //         include: [
        //             {
        //                 model: models.SlotUsageStory,
        //                 as: 'slotUsages',
        //                 attributes: [],
        //             },
        //         ],
        //         attributes: [
        //             'day',
        //             [Sequelize.fn('COUNT', Sequelize.col('slotUsages.slotId')), 'totalUsageCount'],
        //             [Sequelize.literal('DATE(`slotUsages`.`createdAt`)'), 'usageDate'],
        //             'slotLimit'
        //         ],
        //         group: ['day', Sequelize.literal('DATE(`slotUsages`.`createdAt`)')],
        //     });

        //     // Filter out records where totalUsageCount exceeds slotLimit or slotLimit is already used
        //     const filteredSlots = slots.filter(slot => {
        //         const totalUsageCount = slot.get('totalUsageCount');
        //         const slotLimit = slot.get('slotLimit');
        //         return totalUsageCount !== undefined && totalUsageCount < slotLimit && totalUsageCount !== slotLimit;
        //     });

        //     // Group slots by day
        //     const groupedSlotsByDay = filteredSlots.reduce((acc, slot) => {
        //         const day = slot.get('day');
        //         if (!acc[day]) {
        //             acc[day] = [];
        //         }
        //         acc[day].push(slot);
        //         return acc;
        //     }, {});

        //     const today = new Date().getDay(); // Get current day (0-6, 0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        //     const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        //     const availableSlotsByDay = daysOfWeek.map(day => {
        //         const slotsForDay = groupedSlotsByDay[day] || [];
        //         return {
        //             day,
        //             slots: slotsForDay
        //         };
        //     });

        //     console.log(availableSlotsByDay);

        //     return availableSlotsByDay;
        // } catch (error) {
        //     throw new Error(error.message);
        // }
    },
    // Function to get the start and end date of the current week
    getCurrentWeekDates: async () => {
        const today = new Date();
        const currentDay = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
        const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust to Monday if today is Sunday
        const monday = new Date(today.setDate(diff));
        const sunday = new Date(today.setDate(monday.getDate() + 6)); // Sunday is 6 days ahead of Monday
        return [monday, sunday];
    },
    // Query to fetch day-wise usage story of the current week
    getUsageStoryOfWeek: async () => {
        const [startDate, endDate] = getCurrentWeekDates();

        const usageStory = await models.SlotUsageStory.findAll({
            where: {
                isActive: true,
                isDeleted: false,
                date: {
                    [Op.between]: [startDate.toISOString(), endDate.toISOString()] // Assuming date is stored as ISO string in the database
                }
            },
            order: [['date', 'ASC']]
        });

        return usageStory;
    },
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
            const filteredSlots = slotMasterRaw.filter(slot => slot.usedCount < slot.slotLimit);
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

            const filteredData = getCurrentAvailableSlots(sortedData);

            return filteredData;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getAllAddress: async (userId) => {
        try {
            const data = await models.Addresses.findAll({
                where: {
                    isActive: true,
                    isDeleted: false,
                    userId: userId
                },
                order: [['addressId', 'DESC']]
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getdeliverycharge: async (payload) => {
        try {

            // let deliveryChargeAmount;
            let cartIdMaster = {}


            console.log('userId : ' + payload.userId)

            if (payload.userId) {
                cartIdMaster = await models.CartIdMaster.findOne({
                    where: {
                        isActive: true,
                        isDeleted: false,
                        isOrderCompleted: false,
                        userId: payload.userId
                    }
                });
            }

            //check servicible area or not by pincode.
            const pinCodeData = await models.PincodeMaster.findAll({
                where: {
                    pinCode: payload.pinCode,
                    isActive: true,
                    isDeleted: false
                }
            });

            if (pinCodeData && pinCodeData.length > 0) {

                let cartTotal;



                if (cartIdMaster && cartIdMaster.cartId) {

                    console.log("CartID : " + cartIdMaster.cartId);

                    cartTotal = await models.Carts.findOne({
                        attributes: [
                            [Sequelize.fn('SUM', Sequelize.literal('totalPrice')), 'totalCartPrice']
                        ],
                        where: {
                            cartId: cartIdMaster.cartId
                        },
                        raw: true
                    });
                }

                const delChargeData = await models.DeliveryChargeMaster.findAll({
                    where: {
                        isActive: true,
                        isDeleted: false,
                        pinCode: payload.pinCode
                    },
                    include: [
                        {
                            model: models.DeliveryChargeTypeMaster,
                            as: 'chargeType',
                            attributes: ['deliveryChargeTypeName']
                        }
                    ],
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                });


                let deliveryChargeAmount;

                // Check if cartTotal is defined and deliveryChargeData is not empty
                if (cartTotal && delChargeData.length > 0) {
                    // Sort the delivery charge data by minOrderAmount in descending order
                    const sortedDeliveryChargeData = delChargeData.sort((a, b) => b.minOrderAmount - a.minOrderAmount);

                    // Iterate over each delivery charge data
                    for (const chargeData of sortedDeliveryChargeData) {
                        // Check if totalCartPrice falls within the defined slab
                        if (cartTotal.totalCartPrice >= chargeData.minOrderAmount &&
                            (cartTotal.totalCartPrice < chargeData.maxOrderAmount || chargeData.maxOrderAmount === null)) {
                            // Set the delivery charge amount
                            deliveryChargeAmount = chargeData.deliveryChargeAmount;
                            break; // Exit the loop once the appropriate slab is found
                        }
                    }

                    // If deliveryChargeAmount is still not set, use the default delivery charge (delivery charge with no slab)
                    if (!deliveryChargeAmount) {
                        const defaultDeliveryCharge = sortedDeliveryChargeData.find(charge => !charge.minOrderAmount);
                        if (defaultDeliveryCharge) {
                            deliveryChargeAmount = defaultDeliveryCharge.deliveryChargeAmount;
                        }
                    }
                } else {

                    const delChargeData = await models.DeliveryChargeMaster.findAll({
                        where: {
                            isActive: true,
                            isDeleted: false,
                            pinCode: null
                        },
                        include: [
                            {
                                model: models.DeliveryChargeTypeMaster,
                                as: 'chargeType',
                                attributes: ['deliveryChargeTypeName']
                            }
                        ],
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    });

                    if (cartTotal && delChargeData.length > 0) {
                        // Sort the delivery charge data by minOrderAmount in descending order
                        const sortedDeliveryChargeData = delChargeData.sort((a, b) => b.minOrderAmount - a.minOrderAmount);

                        // Iterate over each delivery charge data
                        for (const chargeData of sortedDeliveryChargeData) {
                            // Check if totalCartPrice falls within the defined slab
                            if (cartTotal.totalCartPrice >= chargeData.minOrderAmount &&
                                (cartTotal.totalCartPrice < chargeData.maxOrderAmount || chargeData.maxOrderAmount === null)) {
                                // Set the delivery charge amount
                                deliveryChargeAmount = chargeData.deliveryChargeAmount;
                                break; // Exit the loop once the appropriate slab is found
                            }
                        }

                        // If deliveryChargeAmount is still not set, use the default delivery charge (delivery charge with no slab)
                        if (!deliveryChargeAmount) {
                            const defaultDeliveryCharge = sortedDeliveryChargeData.find(charge => !charge.minOrderAmount);
                            if (defaultDeliveryCharge) {
                                deliveryChargeAmount = defaultDeliveryCharge.deliveryChargeAmount;
                            }
                        }
                    }
                }
                return { deliveryChargeAmount };
            }
            else {
                return "Not Serviceable Area."
            }
        } catch (error) {
            console.log(error)
            throw new Error(error.message);
        }
    },
    addNewAddress: async (payload) => {
        try {
            // Create admin record in the database
            const data = await models.Addresses.create(payload);
            // return admin;
            return data;
        } catch (error) {
            // Handle any errors that occur during database operation
            throw new Error("Failed to add");
        }
    },
    getapplicablecouponlist: async (payload) => {
        try {

            const cartData = await models.CartIdMaster.findOne({
                where: {
                    isActive: true,
                    isDeleted: false,
                    isOrderCompleted: false,
                    userId: payload.userId
                }
            });

            if (!cartData) {
                return [];
            }

            payload.cartId = cartData.cartId;

            const couponList = await models.CouponMaster.findAll({
                where: {
                    isActive: true,
                    isDeleted: false,
                },
            });
            let applicableCoupons = [];

            // Check if the user has placed any orders
            const orderCount = await models.Orders.count({
                where: {
                    userId: payload.userId // Assuming userId is available in payload
                }
            });

            // Get the cart total
            const cartTotal = await models.Carts.findOne({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('totalPrice')), 'totalCartPrice']
                ],
                where: {
                    cartId: payload.cartId
                },
                raw: true
            });

            // Filter coupons based on cart total and order history
            if (orderCount === 0) {
                // User has not placed any orders
                applicableCoupons = couponList.filter(coupon => (coupon.couponTypeId === 1 || coupon.couponTypeId === 2) &&
                    (!coupon.minOrderAmount || cartTotal.totalCartPrice >= coupon.minOrderAmount) &&
                    (!coupon.maxOrderAmount || cartTotal.totalCartPrice <= coupon.maxOrderAmount));
            } else {
                // User has placed orders
                applicableCoupons = couponList.filter(coupon => coupon.couponTypeId !== 1 &&
                    (!coupon.minOrderAmount || cartTotal.totalCartPrice >= coupon.minOrderAmount) &&
                    (!coupon.maxOrderAmount || cartTotal.totalCartPrice <= coupon.maxOrderAmount));
            }

            // Sort applicableCoupons by discountAmount in descending order
            applicableCoupons.sort((a, b) => b.discountAmount - a.discountAmount);

            // Create an object to store the highest discount objects for each couponTypeId and discountType combination
            const highestDiscounts = {};

            // Iterate over each coupon object in the applicableCoupons array
            applicableCoupons.forEach(coupon => {
                // Get the couponTypeId and discountType of the current coupon
                const { couponTypeId, discountType } = coupon;

                // Check if there is already an object stored for the current couponTypeId and discountType combination
                if (!(couponTypeId in highestDiscounts) || !highestDiscounts[couponTypeId][discountType] || coupon.discountAmount > highestDiscounts[couponTypeId][discountType].discountAmount) {
                    // If not, or if the current coupon has a higher discountAmount, store the current coupon object
                    highestDiscounts[couponTypeId] = {
                        ...highestDiscounts[couponTypeId],
                        [discountType]: coupon
                    };
                }
            });

            // Extract the highest discount coupon objects from the highestDiscounts object
            const highestDiscountCoupons = Object.values(highestDiscounts).reduce((acc, obj) => {
                // Iterate over each discountType object in the current highestDiscounts object
                for (const discountType in obj) {
                    // Push the discountType object into the accumulator array
                    acc.push(obj[discountType]);
                }
                return acc;
            }, []);

            return highestDiscountCoupons;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    },
    applycoupon: async (payload) => {
        try {
            const couponData = await models.CouponMaster.findOne({
                where: {
                    isActive: true,
                    isDeleted: false,
                    couponId: payload.couponId
                }
            });


            const cartIdMaster = await models.CartIdMaster.findOne({
                where: {
                    isActive: true,
                    isDeleted: false,
                    isOrderCompleted: false,
                    userId: payload.userId
                }
            });

            // Get the cart total
            const cartData = await models.Carts.findOne({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('totalPrice')), 'totalCartPrice']
                ],
                where: {
                    cartId: cartIdMaster.cartId
                },
                raw: true
            });

            let discountAmount = 0;

            if (cartData) {
                if (couponData && couponData.discountType == 'PERCENTAGE') {
                    discountAmount = cartData.totalCartPrice * (couponData.discountAmount / 100)
                } else if (couponData && couponData.discountType == 'FLAT') {
                    discountAmount = couponData.discountAmount;
                } else {
                    discountAmount = 0;
                }
            }

            return { discountAmount };

        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    },
    placeorder: async (payload, basePath) => {
        try {

            const cartIdMaster = await models.CartIdMaster.findOne({
                where: {
                    isActive: true,
                    isDeleted: false,
                    isOrderCompleted: false,
                    userId: payload.userId
                }
            });

            // step 1 - check slot availability
            const slotMaster = await models.SlotMaster.findOne({
                where: {
                    isActive: true,
                    isDeleted: false,
                    slotId: payload.slotId
                },
                raw: true
            });

            const day = slotMaster.day;
            const slotLimit = slotMaster.slotLimit;

            console.log('day : ' + day)

            const date = getNextDayOfWeek(day);

            const slotUsedCount = await models.SlotUsageStory.count({
                where: {
                    slotId: payload.slotId,
                    date: date // Assuming userId is available in payload
                }
            });

            console.log('slotLimit : ' + slotLimit)
            console.log('slotUsedCount : ' + slotUsedCount)


            if (slotLimit <= slotUsedCount) {
                return "Slot is not available, please choose different pickup slot";
            }

            //step 2 - insert in order table.
            payload.pickUpSlot = `${date} ${day} ${slotMaster.time}`
            payload.cartId = cartIdMaster.cartId;


            const appliedTaxes = await models.taxMaster.findAll({
                where: {
                    isApplied: true,
                    isActive: true
                },
                raw: true
            });

            // payload.gst = 0;
            // payload.sgst = 0;
            // payload.cgst = 0;


            if (appliedTaxes && appliedTaxes.length > 0) {

                appliedTaxes.forEach((tax, index) => {

                    console.log(tax.taxName);

                    if (tax.taxName.toLowerCase() === 'sgst') {
                        console.log(tax.amount);
                        payload.sgst = payload.totalPrice * (tax.amount / 100) || 0;
                        payload.totalPayableAmount = payload.totalPayableAmount + (payload.totalPrice * (tax.amount / 100) || 0);
                    }
                    if (tax.taxName.toLowerCase() === 'cgst') {
                        console.log(tax.amount);
                        payload.cgst = payload.totalPrice * (tax.amount / 100) || 0;
                        payload.totalPayableAmount = payload.totalPayableAmount + (payload.totalPrice * (tax.amount / 100) || 0);
                    }

                    payload.gst = payload.sgst + payload.cgst;
                });
            }

            const orderInData = await models.Orders.create(payload);
            const orderData = await models.Orders.findOne({
                where: {
                    orderId: orderInData.dataValues.orderId
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
            //step 3 - add usage record in 
            const SlotUsageStory = await models.SlotUsageStory.create({
                isDeleted: false,
                isActive: true,
                // orderId: orderInData.orderId,
                date: date,
                slotId: payload.slotId,
            });

            await models.Orders.update({ slotUsageId: SlotUsageStory.slotUsageId }, {
                where: {
                    orderId: orderInData.orderId
                }
            });

            //step 4 - set isOrderCompleted as true in CartIdMaster
            await models.CartIdMaster.update({
                isOrderCompleted: true
            }, {
                where: {
                    cartId: cartIdMaster.cartId
                },
            });

            await models.OrderStatusChangeLogs.create({
                orderId: orderInData.orderId,
                notes: "New order placed",
                orderStatusId: 1,
                addedBy: payload.userId
            })
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
                    "notificationTitle": `New Order Placed!`,
                    "notificationMessage": `New order placed. OrderID: ${orderInData.orderId}`,
                    "notificationType": "Web",
                    "notificationFor": "order",
                    "isActive": true,
                    "isDeleted": false,
                    "isRead": false,
                    "userId": 1,
                    "orderId": orderInData.orderId
                },
                {
                    "notificationTitle": `New Order Placed!`,
                    "notificationMessage": `New order placed. OrderID: ${orderInData.orderId}`,
                    "notificationType": "Web",
                    "notificationFor": "order",
                    "isActive": true,
                    "isDeleted": false,
                    "isRead": false,
                    "userId": payload.userId,
                    "orderId": orderInData.orderId
                }
            ]);

            let totalItem = 0,totalPrice = 0;
            cartProduct.map(p => {
                totalItem =  totalItem + Number(p.quantity)
                totalPrice = totalPrice + Number(p.totalPrice)
            })
            // mail send 
            
            const sendTo = orderData.user.email ? `${orderData.user.email, orderData.address.email}` : `${orderData.address.email, orderData.user.email}`
            const dateTime = new Date(orderData.dataValues.createdAt)
            cartProduct.date = dateTime.toLocaleDateString('en-US')
            orderData.status.dataValues.statusName = "Your order is successfully placed"
            orderData.bgIMG = basePath + `/static/close-up-person.jpg`
            orderData.orderedCard = orderData.cart.carts[0];
            orderData.product = orderData.cart.carts[0]?.dataValues.product;
            cartProduct.total = orderData.totalPayableAmount;
            cartProduct.billTo = orderData.address.dataValues.name;
            cartProduct.orderId = orderData.orderId;
            cartProduct.totalItem = totalItem;
            cartProduct.totalPrice = totalPrice;

            const Template = path.join(__dirname, '../../mailTemplate/updateOrderStatus.ejs');
            const mailTemplate = await ejs.renderFile(Template, {
                orderData, mail_moment, cartProduct
            });
            const mailData = path.join(__dirname, '../../mailTemplate/placeOrder.ejs');
            const fileName = 'Invoice.pdf'
            const mailBody = await ejs.renderFile(mailData, {
                cartProduct,orderData, mail_moment
            });
            console.log("cartProduct")
            console.log(cartProduct)
            console.log("orderData")
            console.log(orderData)
            html_to_pdf.create(mailBody).toFile(fileName, (error, data) => {
                if (error) {

                    throw new Error('Failed to Add');

                } else {

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
                        from: 'Lought-O-Laundry ataulmolla.itv@gmail.com',
                        to: sendTo,
                        bcc: 'rabilal.itv@gmail.com,mahiruddinseikh@gmail.com,ataulmolla.itv@gmail.com',
                        subject: 'Your order is successfully placed',
                        html: mailTemplate,
                        attachments: [
                            {
                                // filename: data.filename,
                                filename: fileName,
                                path: data.filename,
                                content: data.filename,
                            },
                        ],
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error)
                        } else {
                            console.log('message sent');
                        }
                    });
                }

            });



            console.log("Order Placed")

            return "Order placed successfully. With id: " + orderInData.orderId;
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    },
};

module.exports = orderProcessServices;