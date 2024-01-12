const joi = require("joi");

exports.loginPayload = joi.object({
  email: joi.number().required(),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});


exports.createCategoryPayload = joi.object({
  productId: joi.number().required(), 
  type: joi.string().trim(true).required(),
  prize: joi.string().trim(true).required(),
  images: joi.array()
});

exports.updateCategoryPayload = joi.object({
  id: joi.number().required(),
  description: joi.string().trim(true),
  type: joi.string().trim(true),
  prize: joi.string().trim(true),
  images: joi.array()
});

exports.deleteCategoryPayload = joi.object({
  id: joi.number().required()
});

exports.getCategoryPayload = joi.object({
  id: joi.number().optional(),
  perPage: joi.number().required(),
  pageNo: joi.number().required()
});

exports.getOneCategoryWithChilds = joi.object({
  id: joi.number().required()
});