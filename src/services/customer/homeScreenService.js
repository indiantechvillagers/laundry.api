const models = require("../../models");

const excludeAttributes = { exclude: ['createdAt', 'updatedAt'] };

const homeScreenService = {
  homeSceenData: async (userId) => {
    try {
      const Banners = await models.Banners.findAll({
        where: {
          isActive: true,
          isDeleted: false,
        },
        attributes: excludeAttributes,
      });

      const services = await models.Category.findAll({
        where: {
          isActive: true,
          isDeleted: false
        },
        attributes: excludeAttributes,
        include: [{
          model: models.SubCategories,
          as: 'subCategories',
          attributes: excludeAttributes,
          include: [
            {
              model: models.Products,
              as: 'products',
              attributes: excludeAttributes
            }
          ]
        }]
      });

      let lastOrder = {};
      if (userId) {
        lastOrder = await models.Orders.findOne({
          where: {
            userId: userId
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
          order: [['createdAt', 'DESC']], // Order by createdAt column in descending order
          limit: 1 // Limit the result to 1
        });
      }

      const reviews = await models.ReviewRatings.findAll({
        where: {
          isActive: true,
          isDeleted: false,
          isApproved: true
        },
        include: [
          {
            model: models.Users,
            as: 'addedUser',
            attributes: { exclude: ['createdAt', 'updatedAt', 'password', 'phone', 'dob', 'roleId', 'isActive', 'isDeleted'] }
          }
        ],
        attributes: excludeAttributes
      });

      return {
        banners: Banners || [],
        services: services || [],
        previousOrder: lastOrder || {},
        reviews: reviews || []
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getAllBanners: async () => {
    try {
      const data = await models.Banners.findAll({
        where: {
          isActive: true,
          isDeleted: false,
        },
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getAllServices: async () => {
    try {
      const data = await models.Category.findAll({
        where: {
          isActive: true,
          isDeleted: false
        },
        attributes: excludeAttributes,
        include: [{
          model: models.SubCategories,
          as: 'subCategories',
          attributes: excludeAttributes,
          include: [
            {
              model: models.Products,
              as: 'products',
              attributes: excludeAttributes
            }
          ]
        }]
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getPreviousOrder: async (userId) => {
    try {
      const data = await models.Orders.findOne({
        where: {
          userId: userId
        },
        include: [
          {
            model: models.OrderStatusMaster,
            as: 'status',
            attributes: excludeAttributes
          },
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
            model: models.OrderPaymentTypeMaster,
            as: 'paymentMethod',
            attributes: excludeAttributes
          },
          {
            model: models.Addresses,
            as: 'address',
            attributes: excludeAttributes
          }
        ],
        order: [['createdAt', 'DESC']], // Order by createdAt column in descending order
        limit: 1 // Limit the result to 1
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getOrderDetails: async (id) => {
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
        ]
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getAllOrders: async (userId) => {
    try {
      const data = await models.Orders.findAll({
        where: {
          userId: userId
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
        order: [['createdAt', 'DESC']]
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  checkpincode: async (payload) => {
    try {
      const data = await models.PincodeMaster.findOne({
        where: {
          pincode: payload.pincode,
          isActive: true,
          isDeleted: false
        }
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getAllReviews: async () => {
    try {
      const data = await models.ReviewRatings.findAll({
        where: {
          isActive: true,
          isDeleted: false,
          isApproved: true
        },
        include: [
          {
            model: models.Users,
            as: 'addedUser',
            attributes: { exclude: ['createdAt', 'updatedAt', 'password', 'phone', 'dob', 'roleId', 'isActive', 'isDeleted'] }
          }
        ]
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

module.exports = homeScreenService;
