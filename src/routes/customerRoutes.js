const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const homeScreenControllers = require('../controllers/customer/homeScreenControllers');
const serviceListingConotroller = require('../controllers/customer/serviceListingConotroller');
const orderProcessConotroller = require('../controllers/customer/orderProcessController');

const authenticationController = require('../controllers/customer/authenticationController');
const customerRefundController = require('../controllers/customer/customerRefundController');


// route for banners
router.get("/banners", homeScreenControllers.getAllBanners);
router.get("/services", homeScreenControllers.getAllServices);
router.get("/order/previous", authMiddleware.verifyCustomerTokenForHomeScreen, homeScreenControllers.getPreviousOrder);
router.get("/orders", authMiddleware.verifyToken, homeScreenControllers.getAllOrders);
router.get("/order/:orderId", authMiddleware.verifyToken, homeScreenControllers.getOrderDetails);
router.post("/checkpincode", homeScreenControllers.checkpincode);
router.get("/reviews", homeScreenControllers.getAllReviews);

router.get("/homescreendata", authMiddleware.verifyCustomerTokenForHomeScreen, homeScreenControllers.homeSceenData);

// Refund
router.post("/refundRequest", authMiddleware.verifyToken, customerRefundController.add);
router.get("/refundRequests", authMiddleware.verifyToken, customerRefundController.getAll);

// Service listing page
router.get("/subcategory/:subCategoryId/products", serviceListingConotroller.getAllProduct);
router.get("/getcartid", authMiddleware.verifyToken, serviceListingConotroller.getCartId);
// router.post("/addtocart", authMiddleware.verifyToken, serviceListingConotroller.addToCart);
router.post("/addtocart", authMiddleware.verifyCustomerTokenForHomeScreen, serviceListingConotroller.addToCart);


//  Order Process Router
// router.get("/getusercart", authMiddleware.verifyToken, orderProcessConotroller.getAllCarts);
router.post("/getusercart", orderProcessConotroller.getAllCarts);

// router.put("/editcartitem/:cartProductId", authMiddleware.verifyToken, orderProcessConotroller.editcartitem);
// router.delete("/deletecartitem/:cartProductId", authMiddleware.verifyToken, orderProcessConotroller.deletecartitem);
router.put("/editcartitem/:cartProductId", orderProcessConotroller.editcartitem);
router.delete("/deletecartitem/:cartProductId", orderProcessConotroller.deletecartitem);
router.get("/getavailableslots", orderProcessConotroller.getslots);

router.post("/getdeliverycharge", authMiddleware.verifyToken, orderProcessConotroller.getdeliverycharge);

router.get("/getalladdress", authMiddleware.verifyToken, orderProcessConotroller.getAllAddress);

router.post("/addnewaddress", authMiddleware.verifyToken, orderProcessConotroller.addNewAddress);
router.get("/getapplicablecouponlist", authMiddleware.verifyToken, orderProcessConotroller.getapplicablecouponlist);

router.post("/applycoupon", authMiddleware.verifyToken, orderProcessConotroller.applycoupon);

router.post("/placeorder", authMiddleware.verifyToken, orderProcessConotroller.placeorder);

//authentication APIs
router.post("/getOTP", authenticationController.getOTP);
router.post("/auth", authenticationController.auth);

module.exports = router;