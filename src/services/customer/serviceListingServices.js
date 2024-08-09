
const models = require("../../models");
const excludeAttributes = { exclude: ['createdAt', 'updatedAt'] };

const serviceListingServices = {
    getAllProduct: async (subCategoryId) => {
        try {
            const data = await models.Products.findAll({
                where: {
                    isActive: true,
                    isDeleted: false,
                    subCategoryId: subCategoryId
                },
                include: [
                    {
                        model: models.Category,
                        as: 'category',
                        attibutes: excludeAttributes
                    },
                    {
                        model: models.SubCategories,
                        as: 'subCategory',
                        attibutes: excludeAttributes
                    },
                    {
                        model: models.ProductsImages,
                        as: 'images',
                        attibutes: excludeAttributes
                    }
                ]
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    addToCart: async (payload) => {
        try {

            console.log("Payload : " + JSON.stringify(payload));

            let cartId;

            let existingCardIDQuery = {
                isOrderCompleted: false
            }

            // if (payload.userId) {
            //     existingCardIDQuery.userId = payload.userId;
            // }
            if (payload.deviceId) {
                existingCardIDQuery.deviceId = payload.deviceId;
            }
            if (payload.userId) {
                existingCardIDQuery.userId = payload.userId;
            }

            const existingCardID = await models.CartIdMaster.findAll({
                where: existingCardIDQuery
            });

            if (existingCardID && existingCardID.length > 0) {
                cartId = existingCardID[0].cartId;
            }
            else {
                const data = await models.CartIdMaster.create(payload);
                cartId = data.cartId;
            }

            console.log("CartId : " + cartId);

            const productData = await models.Products.findOne({
                where: { productId: payload.productId }
            });

            if (productData) {
                payload.pricePerQantity = productData.price;
                payload.totalPrice = productData.price * payload.quantity;
            } else {
                return 'Invalid product id';
            }

            let existCartQuery = {
                cartId: cartId,
                // userId: payload.userId,
                productId: payload.productId
            }

            // if (payload.userId ) {
            //     existCartQuery.userId = payload.userId;
            // }

            if (payload.deviceId) {
                existCartQuery.deviceId = payload.deviceId;
            }
            if (payload.userId) {
                existCartQuery.userId = payload.userId;
            }

            //checking whether same product already present or not
            const existCart = await models.Carts.findOne({
                where: existCartQuery
            });

            let updateFilter = {
                cartId: cartId,
                deviceId: payload.deviceId,
                productId: payload.productId
            };

            if (payload.userId) {
                updateFilter.userId = payload.userId;
            }

            if (existCart) {

                const [rowsAffected, updatedData] = await models.Carts.update(payload, {
                    // where: {
                    //     cartId: cartId,
                    //     userId: payload.userId,
                    //     productId: payload.productId
                    // }
                    where: updateFilter
                });
                return "Product updated in cart";
            } else {
                payload.cartId = cartId;
                const data = await models.Carts.create(payload);
                return "Product added in cart";
            }
        } catch (error) {
            console.log(error)
            throw new Error('Failed to add');
        }
    },
    getCartId: async (payload) => {
        try {
            const existingCardID = await models.CartIdMaster.findAll({
                where: {
                    userId: payload.userId,
                    isOrderCompleted: false
                }
            });

            if (existingCardID && existingCardID.length > 0) {
                return { cartId: existingCardID[0].cartId };
            }
            else {
                const data = await models.CartIdMaster.create(payload);
                return { cartId: data.cartId };
            }
        } catch (error) {
            throw new Error('Failed to add');
        }
    }
}

module.exports = serviceListingServices;