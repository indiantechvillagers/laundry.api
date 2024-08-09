const bannerService = require("../../services/admin/bannerService");
const bannerValidationSchema = require("../../validations/bannerValidationSchema");

const bannerController = {
  add: async (req, res) => {
    const { error, value } = bannerValidationSchema.createBannerSchema.validate(
      req.body
    );
    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message });
    }

    try {
      const data = await bannerService.add(value);
      return res.status(200).json({ status: 200, msg: "Banner added" });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const data = await bannerService.getAll();
      return res.status(200).json({ status: 200, data: data || [] });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { error, value } =
        bannerValidationSchema.updateBannerSchema.validate(req.body);

      const data = await bannerService.update(req.params.bannerId, value);
      return res.status(200).json({ status: 200, data: data });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const data = await bannerService.delete(req.params.bannerId);
      return res.status(200).json({ status: 200, data: data });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  get: async (req, res) => {
    try {
      const data = await bannerService.get(req.params.bannerId);
      return res.status(200).json({ status: 200, data: data || {} });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
};

module.exports = bannerController;
