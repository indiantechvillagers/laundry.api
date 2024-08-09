const testimonialService = require("../../services/admin/testimonialService");
const testimonialValidationSchema = require("../../validations/testimonialValidationSchema");

const testimonialController = {
  add: async (req, res) => {
    const { error, value } =
      testimonialValidationSchema.createTestimonialsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message });
    }

    console.log(value)

    try {
      const data = await testimonialService.add(value);

      return res.status(200).json({ status: 200, msg: "Testimonial added" });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const data = await testimonialService.getAll();
      return res.status(200).json({ status: 200, data: data || [] });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { error, value } =
        testimonialValidationSchema.updateTestimonialsSchema.validate(req.body);

      const data = await testimonialService.update(
        req.params.testimonialId,
        value
      );
      return res.status(200).json({ status: 200, data: data });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const data = await testimonialService.delete(req.params.testimonialId);
      return res.status(200).json({ status: 200, data: data });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  get: async (req, res) => {
    try {
      const data = await testimonialService.get(req.params.testimonialId);
      return res.status(200).json({ status: 200, data: data || {} });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  },
  approve: async (req, res) => {
    try {
        const data = await testimonialService.update(req.params.testimonialId,
            {
                "isApproved": true,
                "approvedBy": req.user.userId
            }
        );
        return res.status(200).json({ status: 200, data: data });
    } catch (error) {
        return res.status(500).json({ status: 500, error: error.message });
    }
},
};

module.exports = testimonialController;
