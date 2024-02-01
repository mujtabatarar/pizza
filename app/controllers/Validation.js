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

//promo validation
exports.promoCreate = joi.object({
  name: joi.string().required(),
  description: joi.string().optional(),
  discountType: joi.string().required(),
  discountValue: joi.number().required(),
  minBasketValue: joi.number().optional(),
  totalVouchers: joi.number().optional(),
  redeemsPerCustomer: joi.number().optional(),
  validity: joi.number().optional(),
  applicablePaymentTypes: joi.string().optional(),
  expiryDate: joi.string().optional(),
  startDate: joi.string().optional(),
  status: joi.boolean().required(),

})
exports.promoUpdate = joi.object({
  id: joi.string().required(),
  name: joi.string().optional(),
  description: joi.string().optional(),
  discountType: joi.string().optional(),
  discountValue: joi.number().optional(),
  minBasketValue: joi.number().optional(),
  totalVouchers: joi.number().optional(),
  redeemsPerCustomer: joi.number().optional(),
  validity: joi.number().optional(),
  applicablePaymentTypes: joi.string().optional(),
  expiryDate: joi.string().optional(),
  startDate: joi.string().optional(),
  status: joi.boolean().optional(),

})

exports.idValidate = joi.object({
  id: joi.number().required()
});

exports.getAllPromoPayload = joi.object({
  perPage: joi.number().required(),
  pageNo: joi.number().required()
});

exports.getAllPromoCodeWithUsageBasicDetailsDto = joi.object({
  perPage: joi.number().required(),
  pageNo: joi.number().required()
});