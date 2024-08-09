const addresseService = require("../../services/admin/addresseService");
const addresseValidationSchema = require("../../validations/addresseValidationSchema");

const addresseControllers = {
  add: async (req, res) => {
    const { error, value } =
      addresseValidationSchema.createAddresseSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message });
    }

    try {
      const data = await addresseService.add(value);

      return res.status(200).json({ status: 200, msg: "Addresse added" });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const data = await addresseService.getAll();
      return res.status(200).json({ status: 200, data: data || [] });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { error, value } =
        addresseValidationSchema.updateAddresseSchema.validate(req.body);

      const data = await addresseService.update(req.params.addressId, value);
      return res.status(200).json({ status: 200, data: data });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const data = await addresseService.delete(req.params.addressId);
      return res.status(200).json({ status: 200, data: data });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  get: async (req, res) => {
    try {
      const data = await addresseService.get(req.params.addressId);
      return res.status(200).json({ status: 200, data: data || {} });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
};

module.exports = addresseControllers;
