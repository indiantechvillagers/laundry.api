const OrderStatusMasterService = require("../../services/admin/OrderStatusMasterService");
const OrderStatusMasterValidationSchema = require("../../validations/OrderStatusMasterValidationSchema");

const OrderStatusMasterController = {
  add: async (req, res) => {
    const { error, value } =
      OrderStatusMasterValidationSchema.createOrderStatusMasterSchema.validate(
        req.body
      );
    if (error) {
      return res
        .status(400)
        .json({ status: 400, error: error.details[0].message });
    }

    try {
      const data = await OrderStatusMasterService.add(value);

      return res
        .status(200)
        .json({ status: 200, msg: "Order Status Master added" });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const data = await OrderStatusMasterService.getAll();
      return res.status(200).json({ status: 200, data: data || [] });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  getAlldd: async (req, res) => {
    try {
      const data = await OrderStatusMasterService.getAlldd();
      return res.status(200).json({ status: 200, data: data });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      // Validate request body against the schema
      const { error, value } =
        OrderStatusMasterValidationSchema.updateOrderStatusMasterSchema.validate(
          req.body
        );

      const data = await OrderStatusMasterService.update(
        req.params.orderStatusId,
        value
      );
      return res.status(200).json({ status: 200, data: data });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const data = await OrderStatusMasterService.delete(
        req.params.orderStatusId
      );
      return res.status(200).json({ status: 200, data: data });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  get: async (req, res) => {
    try {
      const data = await OrderStatusMasterService.get(req.params.orderStatusId);
      return res.status(200).json({ status: 200, data: data || {} });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
};

module.exports = OrderStatusMasterController;
