const joi = require("joi");
exports.createCategoryPayload = joi.object({
  productId: joi.number().required(), 
  type: joi.string().trim(true).required(),
  prize: joi.string().trim(true).required(),
  images: joi.array()
});

exports.updateCategoryPayload = joi.object({
  id: joi.number().required(),
  type: joi.string().trim(true),
  prize: joi.string().trim(true),
  images: joi.array()
});

exports.deleteCategoryPayload = joi.object({
  id: joi.number().required()
});

exports.getCategoryPayload = joi.object({
  id: joi.number().required(),
  perPage: joi.number().required(),
  pageNo: joi.number().required()
});