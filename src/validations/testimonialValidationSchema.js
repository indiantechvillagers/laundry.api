const Joi = require("joi");

const createTestimonialsSchema = Joi.object({
  authorName: Joi.string().required(),
  notes: Joi.string().required(),
  showInUI: Joi.boolean().default(false),
  isApproved: Joi.boolean().default(false),
  isActive: Joi.boolean().default(true),
  isDeleted: Joi.boolean().default(false),
});
const updateTestimonialsSchema = Joi.object({
  authorName: Joi.string(),
  notes: Joi.string(),
  showInUI: Joi.boolean(),
  isActive: Joi.boolean(),
  isDeleted: Joi.boolean()
});
module.exports = {
  createTestimonialsSchema,
  updateTestimonialsSchema,
};
