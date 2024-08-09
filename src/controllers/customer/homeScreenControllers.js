const homeScreenService = require("../../services/customer/homeScreenService");
const pinCodeValidateSchema = require('../../validations/pinCodeValidateSchema');

const homeScreenController = {
  homeSceenData: async (req, res) => {
    try {

      const userId = req.user.userId || "";

      const data = await homeScreenService.homeSceenData(userId);
      return res.status(200).json({ status: 200, data: data || {} });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  getAllBanners: async (req, res) => {
    try {
      const data = await homeScreenService.getAllBanners();
      return res.status(200).json({ status: 200, data: data || [] });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  getAllServices: async (req, res) => {
    try {
      const data = await homeScreenService.getAllServices();
      return res.status(200).json({ status: 200, data: data || [] });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  getPreviousOrder: async (req, res) => {
    try {
      const userId = req.user.userId || "";
      if (userId) {
        const data = await homeScreenService.getPreviousOrder(userId);
        return res.status(200).json({ status: 200, data: data || {} });
      } else {
        return res.status(200).json({ status: 200, data: {} });
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const userId = req.user.userId || "";
      if (userId) {
        const data = await homeScreenService.getAllOrders(userId);
        return res.status(200).json({ status: 200, data: data || [] });
      } else {
        return res.status(200).json({ status: 200, data: [] });
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  getOrderDetails: async (req, res) => {
    try {
      const orderId = req.params.orderId || "";
      if (orderId) {
        const data = await homeScreenService.getOrderDetails(orderId);
        return res.status(200).json({ status: 200, data: data || {} });
      } else {
        return res.status(200).json({ status: 200, data: {} });
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  checkpincode: async (req, res) => {
    try {
      const { error, value } = pinCodeValidateSchema.validateSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ status: 400, error: error.details[0].message });
      }
      const data = await homeScreenService.checkpincode(value);

      if (!data) {
        // If the resource does not exist, return a 404 response
        return res.status(404).json({ status: 404, data: {} });
      } else {
        return res.status(200).json({ status: 200, data: data || {} });
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  getAllReviews: async (req, res) => {
    try {
      const data = await homeScreenService.getAllReviews();
      return res.status(200).json({ status: 200, data: data || [] });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
};

module.exports = homeScreenController;
