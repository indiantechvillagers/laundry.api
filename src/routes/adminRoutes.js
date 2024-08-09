const express = require('express');
const router = express.Router();
const roleController = require('../controllers/admin/roleController');
const userController = require('../controllers/admin/userController');
const pinCodeController = require('../controllers/admin/pinCodeController');
const categoryController = require('../controllers/admin/categoryController');
const subCategoryController = require('../controllers/admin/subCategoryController');
const productController = require('../controllers/admin/productController');
const testimonialController = require('../controllers/admin/testimonialControllers');
const bannerController = require('../controllers/admin/bannerControllers');
const addresseController = require('../controllers/admin/addresseControllers');
const ReviewRatingController = require('../controllers/admin/ReviewRatingController');

const FeedbackController = require('../controllers/admin/FeedbackController');
const SlotController = require('../controllers/admin/SlotController');
const couponController = require('../controllers/admin/couponController');
const couponTypeMasterController = require('../controllers/admin/couponTypeMasterController');
const deliveryChargeController = require('../controllers/admin/deliveryChargeController');

const notificationController = require('../controllers/admin/notificationController');
const refundStatusController = require('../controllers/admin/refundStatusController');
const refundMasterController = require('../controllers/admin/refundMasterController');

const contactUsController = require('../controllers/admin/contactUsController');
const cartIdController = require('../controllers/admin/cartIdController');
const cartController = require('../controllers/admin/cartController');
const orderStatusMasterController = require("../controllers/admin/OrderStatusMasterControllers");
const orderController = require('../controllers/admin/orderController');

const deliveryChargeTypeController = require('../controllers/admin/deliveryChargeTypeController');

const authMiddleware = require('../middleware/authMiddleware');

const fileController = require('../controllers/admin/fileController');
const filesController = require('../controllers/admin/filesController');
const dashboardController = require('../controllers/admin/dashboardController');
const taxMasterController = require('../controllers/admin/taxMasterController');


// Login route
router.post('/login', userController.login);

// Protected route (requires token)
// router.get('/profile', authMiddleware.verifyToken, userController.profile);

router.get('/users', authMiddleware.verifyToken, userController.getAllUserList);
router.post('/user', authMiddleware.verifyToken, userController.addUser);
router.get('/user/:userId/profile', authMiddleware.verifyToken, userController.userProfile);

router.delete('/user/:userId/delete', authMiddleware.verifyToken, userController.userSoftDelete);
router.put('/user/:userId/update', authMiddleware.verifyToken, userController.updateUserInfo); // other user data update
router.put('/user/update', authMiddleware.verifyToken, userController.updateUserInfo); // other user data update

// route for roles.
router.post('/role', authMiddleware.verifyToken, roleController.add);
router.get('/roles', authMiddleware.verifyToken, roleController.getAll);
router.get('/roles/dd', authMiddleware.verifyToken, roleController.getAlldd);
router.put('/role/:roleId', authMiddleware.verifyToken, roleController.update);
router.delete('/role/:roleId', authMiddleware.verifyToken, roleController.delete);
router.get('/role/:roleId', authMiddleware.verifyToken, roleController.get);

//route for pincode
router.post('/pincode', authMiddleware.verifyToken, pinCodeController.add);
router.get('/pincodes', authMiddleware.verifyToken, pinCodeController.getAll);
router.put('/pincode/:pincodeId', authMiddleware.verifyToken, pinCodeController.update);
router.delete('/pincode/:pincodeId', authMiddleware.verifyToken, pinCodeController.delete);
router.get('/pincode/:pincodeId', authMiddleware.verifyToken, pinCodeController.get);

//route for Services - category
router.post('/category', authMiddleware.verifyToken, categoryController.add);
router.get('/categories', authMiddleware.verifyToken, categoryController.getAll);
router.get('/categories/dd', authMiddleware.verifyToken, categoryController.getAlldd);
router.put('/category/:categoryId', authMiddleware.verifyToken, categoryController.update);
router.delete('/category/:categoryId', authMiddleware.verifyToken, categoryController.delete);
router.get('/category/:categoryId', authMiddleware.verifyToken, categoryController.get);

//route for Services - subcategory
router.post('/subcategory', authMiddleware.verifyToken, subCategoryController.add);
router.get('/subcategories', authMiddleware.verifyToken, subCategoryController.getAll);
router.get('/subcategories/dd', authMiddleware.verifyToken, subCategoryController.getAlldd);
router.put('/subcategory/:subCategoryId', authMiddleware.verifyToken, subCategoryController.update);
router.delete('/subcategory/:subCategoryId', authMiddleware.verifyToken, subCategoryController.delete);
router.get('/subcategory/:subCategoryId', authMiddleware.verifyToken, subCategoryController.get);

//route for Services - subcategory
router.post('/product', authMiddleware.verifyToken, productController.add);
router.get('/products', authMiddleware.verifyToken, productController.getAll);
router.put('/product/:productId', authMiddleware.verifyToken, productController.update);
router.delete('/product/:productId', authMiddleware.verifyToken, productController.delete);
router.get('/product/:productId', authMiddleware.verifyToken, productController.get);
router.post('/product/:productId/image', authMiddleware.verifyToken, productController.addImage);
router.delete('/image/:productImageId', authMiddleware.verifyToken, productController.deleteImage);
router.put('/image/:productImageId', authMiddleware.verifyToken, productController.updateImage);

// route for testimonial
router.post("/testimonial", authMiddleware.verifyToken, testimonialController.add);
router.get("/testimonials", authMiddleware.verifyToken, testimonialController.getAll);
router.put("/testimonial/:testimonialId", authMiddleware.verifyToken, testimonialController.update);
router.delete("/testimonial/:testimonialId", authMiddleware.verifyToken, testimonialController.delete);
router.get("/testimonial/:testimonialId", authMiddleware.verifyToken, testimonialController.get);
router.put("/testimonial/:testimonialId/approve", authMiddleware.verifyToken, testimonialController.approve);

// route for banners
router.post("/banner", authMiddleware.verifyToken, bannerController.add);
router.get("/banners", authMiddleware.verifyToken, bannerController.getAll);
router.put("/banner/:bannerId", authMiddleware.verifyToken, bannerController.update);
router.delete("/banner/:bannerId", authMiddleware.verifyToken, bannerController.delete);
router.get("/banner/:bannerId", authMiddleware.verifyToken, bannerController.get);

// route for address
router.post("/address", authMiddleware.verifyToken, addresseController.add);
router.get("/addresses", authMiddleware.verifyToken, addresseController.getAll);
router.put("/address/:addressId", authMiddleware.verifyToken, addresseController.update);
router.delete("/address/:addressId", authMiddleware.verifyToken, addresseController.delete);
router.get("/address/:addressId", authMiddleware.verifyToken, addresseController.get);

// review rating
router.post('/reviewrating', authMiddleware.verifyToken, ReviewRatingController.add);
router.get('/reviewratings', authMiddleware.verifyToken, ReviewRatingController.getAll);
router.put('/reviewrating/:reviewId', authMiddleware.verifyToken, ReviewRatingController.update);
router.put('/reviewrating/:reviewId/approve', authMiddleware.verifyToken, ReviewRatingController.approve);
router.delete('/reviewrating/:reviewId', authMiddleware.verifyToken, ReviewRatingController.delete);
router.get('/reviewrating/:reviewId', authMiddleware.verifyToken, ReviewRatingController.get);

// feedback router
router.post('/feedback', authMiddleware.verifyToken, FeedbackController.add);
router.get('/feedbacks', authMiddleware.verifyToken, FeedbackController.getAll);
router.put('/feedback/:feedbackId', authMiddleware.verifyToken, FeedbackController.update);
router.delete('/feedback/:feedbackId', authMiddleware.verifyToken, FeedbackController.delete);
router.get('/feedback/:feedbackId', authMiddleware.verifyToken, FeedbackController.get);
router.put('/feedback/:feedbackId/approve', authMiddleware.verifyToken, FeedbackController.approve);

// Slot Router
router.post('/slot', authMiddleware.verifyToken, SlotController.add);
router.get('/slots', authMiddleware.verifyToken, SlotController.getAll);
router.put('/slot/:slotId', authMiddleware.verifyToken, SlotController.update);
router.delete('/slot/:slotId', authMiddleware.verifyToken, SlotController.delete);
router.get('/slot/:slotId', authMiddleware.verifyToken, SlotController.get);

// coupon types Router
router.post('/coupontype', authMiddleware.verifyToken, couponTypeMasterController.add);
router.get('/coupontypes', authMiddleware.verifyToken, couponTypeMasterController.getAll);
router.get('/coupontypes/dd', authMiddleware.verifyToken, couponTypeMasterController.getAlldd);
router.put('/coupontype/:couponTypeId', authMiddleware.verifyToken, couponTypeMasterController.update);
router.delete('/coupontype/:couponTypeId', authMiddleware.verifyToken, couponTypeMasterController.delete);
router.get('/coupontype/:couponTypeId', authMiddleware.verifyToken, couponTypeMasterController.get);

// coupon Router
router.post('/coupon', authMiddleware.verifyToken, couponController.add);
router.get('/coupons', authMiddleware.verifyToken, couponController.getAll);
router.put('/coupon/:couponId', authMiddleware.verifyToken, couponController.update);
router.delete('/coupon/:couponId', authMiddleware.verifyToken, couponController.delete);
router.get('/coupon/:couponId', authMiddleware.verifyToken, couponController.get);

// delivery charge type  router
router.post('/deliverychargetype', authMiddleware.verifyToken, deliveryChargeTypeController.add);
router.get('/deliverychargetypes', authMiddleware.verifyToken, deliveryChargeTypeController.getAll);
router.get('/deliverychargetypes/dd', authMiddleware.verifyToken, deliveryChargeTypeController.getAlldd);
router.put('/deliverychargetype/:deliveryChargeTypeId', authMiddleware.verifyToken, deliveryChargeTypeController.update);
router.delete('/deliverychargetype/:deliveryChargeTypeId', authMiddleware.verifyToken, deliveryChargeTypeController.delete);
router.get('/deliverychargetype/:deliveryChargeTypeId', authMiddleware.verifyToken, deliveryChargeTypeController.get);

// delivery Charge Router
router.post('/deliverycharge', authMiddleware.verifyToken, deliveryChargeController.add);
router.get('/deliverycharges', authMiddleware.verifyToken, deliveryChargeController.getAll);
router.put('/deliverycharge/:deliveryChargeId', authMiddleware.verifyToken, deliveryChargeController.update);
router.delete('/deliverycharge/:deliveryChargeId', authMiddleware.verifyToken, deliveryChargeController.delete);
router.get('/deliverycharge/:deliveryChargeId', authMiddleware.verifyToken, deliveryChargeController.get);


// 28th Feb 2024
// notification Router
router.post('/notification', authMiddleware.verifyToken, notificationController.add);
router.get('/notifications', authMiddleware.verifyToken, notificationController.getAll);
router.get('/notificationForNewOrder', authMiddleware.verifyToken, notificationController.getNewOrderNotification);
router.get('/user/notifications', authMiddleware.verifyToken, notificationController.userNotifications);
router.put('/notification/:notificationId', authMiddleware.verifyToken, notificationController.update);
router.delete('/notification/:notificationId', authMiddleware.verifyToken, notificationController.delete);
router.get('/notification/:notificationId', authMiddleware.verifyToken, notificationController.get);

// refund status router
router.post('/refundStatus', authMiddleware.verifyToken, refundStatusController.add);
router.get('/refundStatuses', authMiddleware.verifyToken, refundStatusController.getAll);
router.put('/refundStatus/:refundStatusId', authMiddleware.verifyToken, refundStatusController.update);
router.delete('/refundStatus/:refundStatusId', authMiddleware.verifyToken, refundStatusController.delete);
router.get('/refundStatus/:refundStatusId', authMiddleware.verifyToken, refundStatusController.get);

// refund Master router
router.post('/refund', authMiddleware.verifyToken, refundMasterController.add);
router.get('/refunds', authMiddleware.verifyToken, refundMasterController.getAll);
router.put('/refund/:refundId', authMiddleware.verifyToken, refundMasterController.update);
router.put('/refund/:refundId/changeStatus', authMiddleware.verifyToken, refundMasterController.changeStatus);
router.delete('/refund/:refundId', authMiddleware.verifyToken, refundMasterController.delete);
router.get('/refund/:refundId', authMiddleware.verifyToken, refundMasterController.get);

// contact us router
router.post('/contactUs', authMiddleware.verifyToken, contactUsController.add);
router.get('/contactUses', authMiddleware.verifyToken, contactUsController.getAll);
router.put('/contactUs/:contactUsId', authMiddleware.verifyToken, contactUsController.update);
router.delete('/contactUs/:contactUsId', authMiddleware.verifyToken, contactUsController.delete);
router.get('/contactUs/:contactUsId', authMiddleware.verifyToken, contactUsController.get);

// cart Id router
router.post('/cartIdMaster', authMiddleware.verifyToken, cartIdController.add);
router.get('/cartIdMasters', authMiddleware.verifyToken, cartIdController.getAll);
router.put('/cartIdMaster/:cartId', authMiddleware.verifyToken, cartIdController.update);
router.delete('/cartIdMaster/:cartId', authMiddleware.verifyToken, cartIdController.delete);
router.get('/cartIdMaster/:cartId', authMiddleware.verifyToken, cartIdController.get);

// cart  router
router.post('/cart', authMiddleware.verifyToken, cartController.add);
router.get('/carts', authMiddleware.verifyToken, cartController.getAll);
router.put('/cart/:cartProductId', authMiddleware.verifyToken, cartController.update);
router.delete('/cart/:cartProductId', authMiddleware.verifyToken, cartController.delete);
router.get('/cart/:cartProductId', authMiddleware.verifyToken, cartController.get);

//  Tax Master Router
router.post('/tax', authMiddleware.verifyToken, taxMasterController.add);
router.get('/taxes', authMiddleware.verifyToken, taxMasterController.getAll);
router.put('/tax/:taxMasterId', authMiddleware.verifyToken, taxMasterController.update);
router.delete('/tax/:taxMasterId', authMiddleware.verifyToken, taxMasterController.delete);
router.get('/tax/:taxMasterId', authMiddleware.verifyToken, taxMasterController.get);

// Dashboard router
router.get('/dashboard', authMiddleware.verifyToken, dashboardController.get);

//route for order Status Master
router.post(
    "/orderstatus",
    authMiddleware.verifyToken,
    orderStatusMasterController.add
);
router.get(
    "/orderstatuses",
    authMiddleware.verifyToken,
    orderStatusMasterController.getAll
);
router.get(
    "/orderstatuses/dd",
    authMiddleware.verifyToken,
    orderStatusMasterController.getAlldd
);
router.put(
    "/orderstatus/:orderStatusId",
    authMiddleware.verifyToken,
    orderStatusMasterController.update
);
router.delete(
    "/orderstatus/:orderStatusId",
    authMiddleware.verifyToken,
    orderStatusMasterController.delete
);
router.get(
    "/orderstatus/:orderStatusId",
    authMiddleware.verifyToken,
    orderStatusMasterController.get
);

// order  router

// router.post('/getavailableslots', authMiddleware.verifyToken, orderController.add);
router.get("/getavailableslots", authMiddleware.verifyToken, orderController.getslots);

router.post('/order', authMiddleware.verifyToken, orderController.add);
router.get('/orders', authMiddleware.verifyToken, orderController.getAll);
router.put('/order/:orderId', authMiddleware.verifyToken, orderController.update);
router.delete('/order/:orderId', authMiddleware.verifyToken, orderController.delete);
router.get('/order/:orderId', authMiddleware.verifyToken, orderController.get);

router.get('/order/:orderId/labels', authMiddleware.verifyToken, orderController.getLebel);

router.put('/order/:orderId/updateorderstatus', authMiddleware.verifyToken, orderController.updateorderstatus);
router.put('/order/:orderId/updatepaymentstatus', authMiddleware.verifyToken, orderController.updatepaymentstatus);
router.get('/order/:orderStatusId/filterorder', authMiddleware.verifyToken, orderController.filterorder);


router.post('/file/upload', authMiddleware.verifyToken, fileController.uploadFile);
router.get('/file/getall', authMiddleware.verifyToken, filesController.getAll);
router.delete('/file/:fileId', authMiddleware.verifyToken, filesController.delete);
router.get('/file/:fileId', authMiddleware.verifyToken, filesController.get);


//customers
router.get('/customers', authMiddleware.verifyToken, userController.getCustomerList);


module.exports = router;