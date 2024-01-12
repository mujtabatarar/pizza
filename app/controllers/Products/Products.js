const db = require("../../models");
const { createCategoryPayload, updateCategoryPayload, deleteCategoryPayload, getCategoryPayload, getOneCategoryWithChilds } = require("./Validation")
module.exports = {
  pizzas: {
    async create(req, res) {
      try {
        let payload = req?.body;
        let addedProduct = await db.products.create(payload);
        if (addedProduct?.dataValues) {
          console.log("added", addedProduct?.dataValues);

          res.status(200).send({ success: true, message: "Product Added.", data: addedProduct?.dataValues ?? [] });

        } else {
          console.log("something went wrong.");
          res
            .status(400)
            .send({ success: false, message: "Could not Add Product." });
        }
      } catch (err) {
        console.log("error", err);
        res.status(503).send({ success: false, message: "Internal Server Error." });
      }
    },
    async update(req, res) {
      try {
        let payload = req?.body;
        let updatedProduct = await db.products.update(payload, {
          where: {
            id: payload.id
          }
        });
        if (updatedProduct[0] > 0) {
          console.log("updatedProduct", updatedProduct);

          res.status(200).send({ success: true, message: "Product Updated." });

        } else {
          console.log("something went wrong.");
          res
            .status(400)
            .send({ success: false, message: "Could not Update Product." });
        }
      } catch (err) {
        console.log("error", err);
        res.status(503).send({ success: false, message: "Internal Server Error." });
      }
    },
    async get(req, res) {
      try {
        let { perPage, pageNo } = req?.query;
        console.log(perPage, pageNo)
        let products = await db.products.findAll({
          offset: (parseInt(pageNo) - 1) * parseInt(perPage),
          limit: parseInt(perPage),
          where: {
            isDeleted: false
          },
          include: [
            {
              model: db.varients, // Include the variants table
              // as: 'variants', // Specify the alias for the variants table
            },
            //   {
            //     model: db.category, // Include the category table
            //     as: 'category', // Specify the alias for the category table
            //   },
            //   {
            //     model: db.products, // Include the product table
            //     as: 'subcategory', // Specify the alias for the category table
            //   },
          ],
        });
        if (products?.length)
          res.status(200).send({ success: true, data: products })
        else
          res.status(200).send({ success: false, message: "Data not found.", data: products })
      } catch (err) {
        console.log("error", err);
        res.status(503).send({ success: false, message: "Internal Server Error." });
      }
    },
    async delete(req, res) {
      try {
        let { id } = req?.query;
        let deletedProduct = await db.products.update(
          { isDeleted: true }, {
          where: {
            id
          }
        }
        );
        if (deletedProduct[0] > 0) {
          console.log("deletedProduct", deletedProduct);

          res.status(200).send({ success: true, message: "Product Deleted." })

        } else {
          console.log("something went wrong.");
          res
            .status(200)
            .send({ success: false, message: "Could not delete Product." });
        }
      } catch (err) {
        console.log("error", err);
        res.status(503).send({ success: false, message: "Internal Server Error." });
      }
    },
  },
  variants: {
    async create(req, res) {
      try {
        let addedCategory = await db.varients.create(req?.body);
        if (addedCategory?.dataValues) {
          res.status(200).send({ success: true, message: "Varrient Added." });
        }
        else {
          console.log("something went wrong.");
          res
            .status(400)
            .send({ success: false, message: "Could not Add Varient." });
        }
      } catch (err) {
        console.log("error", err);
        res.status(503).send({ success: false, message: "Internal Server Error." });
      }
    },
    async update(req, res) {
      try {
        const { error, value } = updateCategoryPayload.validate(req.body)
        if (!error) {
          let updatedCategory = await db.varients.update(value, {
            where: {
              id: value.id
            }
          });
          if (updatedCategory[0] > 0) {
            console.log("updatedCategory", updatedCategory);
            if (value?.images?.length) {
              await db.images.destroy({ where: { varientId: value?.id } })
              let imagePayload = value?.images?.map?.(img => {
                return {
                  varientId: value?.id,
                  name: img
                }
              })
              await db.images.bulkCreate(imagePayload)
            }
            res.status(200).send({ success: true, message: "Varient Updated." });

          } else {
            console.log("something went wrong.");
            res
              .status(400)
              .send({ success: false, message: "Could not Update Varient." });
          }
        }
        else
          res.status(422).json({ success: false, errors: error?.message })
      } catch (err) {
        console.log("error", err);
        res.status(500).send({ success: false, message: "Internal Server Error." });
      }
    },
    async delete(req, res) {
      try {
        const { error, value } = deleteCategoryPayload.validate(req.query)
        if (!error) {
          let deletedCategory = await db.varients.update({
            isDeleted: true
          }, {
            where: {
              id: value.id
            }
          });
          if (deletedCategory[0] > 0) {
            console.log("deletedCategory", deletedCategory);

            res.status(200).send({ success: true, message: "Varient deleted." });

          } else {
            console.log("something went wrong.");
            res
              .status(400)
              .send({ success: false, message: "Could not Delete Varient." });
          }
        }
        else
          res.status(422).json({ success: false, errors: error.message })
      } catch (err) {
        console.log("error", err);
        res.status(500).send({ success: false, message: "Internal Server Error." });
      }
    },
    async get(req, res) {
      try {
        let categories = await db.varients.findAll({
          where: {
            isDeleted: false
          },
          include: {
            model: db.images
          }
        });
        if (categories?.length)
          res.status(200).send({ success: true, data: categories })
        else
          res.status(200).send({ success: false, message: "Data not found.", data: categories })
      } catch (err) {
        console.log("error", err);
        res.status(503).send({ success: false, message: "Internal Server Error." });
      }
    },
  },
  categories: {
    async create(req, res) {
      try {
        // let { name, description } = req?.body;
        let addedCategory = await db.categories.create(req?.body);
        if (addedCategory?.dataValues) {
          console.log("added", addedCategory?.dataValues);

          res.status(200).send({ success: true, message: "Category Added." });

        } else {
          console.log("something went wrong.");
          res
            .status(400)
            .send({ success: false, message: "Could not Add Category." });
        }
      } catch (err) {
        console.log("error", err);
        res.status(503).send({ success: false, message: "Internal Server Error." });
      }
    },
    async update(req, res) {
      try {
        let { id } = req?.body;
        let updatedCategory = await db.categories.update(req?.body, {
          where: {
            id
          }
        });
        if (updatedCategory[0] > 0) {
          console.log("updatedCategory", updatedCategory);

          res.status(200).send({ success: true, message: "Category Updated." });

        } else {
          console.log("something went wrong.");
          res
            .status(400)
            .send({ success: false, message: "Could not Update Category." });
        }

      } catch (err) {
        console.log("error", err);
        res.status(500).send({ success: false, message: "Internal Server Error." });
      }
    },
    async delete(req, res) {
      try {
        let { id } = req?.query;
        let deletedCategory = await db.categories.update({
          isDeleted: true
        }, {
          where: {
            id
          }
        });
        if (deletedCategory[0] > 0) {
          console.log("deletedCategory", deletedCategory);

          res.status(200).send({ success: true, message: "Category Deleted." });

        } else {
          console.log("something went wrong.");
          res
            .status(400)
            .send({ success: false, message: "Could not Delete Category." });
        }
      } catch (err) {
        console.log("error", err);
        res.status(500).send({ success: false, message: "Internal Server Error." });
      }
    },
    async get(req, res) {
      try {
        const { error, value: { perPage, pageNo } } = getCategoryPayload.validate(req.query);
        if (!error) {
          let categories = await db.categories.findAll({
            offset: (parseInt(pageNo) - 1) * parseInt(perPage),
            limit: parseInt(perPage),
            where: {
              isDeleted: false,
              parentId: null,
            },

            include: [
              {
                model: db.categories, // Include the category table
                as: 'subCategories', // Specify the alias for the category table
                include: [
                  {
                    model: db.products,
                    include: [
                      {
                        model: db.varients,

                      },
                    ],
                  },
                ],


              },

            ],
          });

          if (categories?.length)
            res.status(200).send({ success: true, data: categories })
          else
            res.status(200).send({ success: false, message: "Data not found.", data: categories })
        } else res.status(422).json({ success: false, errors: error.message })
      } catch (err) {
        console.log("error", err);
        res.status(503).send({ success: false, message: "Internal Server Error." });
      }
    },
    async getOnlyCategories(req, res) {
      try {
        const { error, value: { perPage, pageNo } } = getCategoryPayload.validate(req.query);
        if (!error) {
          let categories = await db.categories.findAll({
            offset: (parseInt(pageNo) - 1) * parseInt(perPage),
            limit: parseInt(perPage),
            where: {
              isDeleted: false,
              parentId: null,
            },
          });

          if (categories?.length)
            res.status(200).send({ success: true, data: categories })
          else
            res.status(200).send({ success: false, message: "Data not found.", data: categories })
        } else res.status(422).json({ success: false, errors: error.message })
      } catch (err) {
        console.log("error", err);
        res.status(503).send({ success: false, message: "Internal Server Error." });
      }
    },
    async getOne(req, res) {
      try {
        const { error, value: { id } } = getOneCategoryWithChilds.validate(req.query);
        if (!error) {
          let categories = await db.categories.findAll({
            where: {
              isDeleted: false,
              id: id,
            },

            include: [
              {
                model: db.categories, // Include the category table
                as: 'subCategories', // Specify the alias for the category table
                include: [
                  {
                    model: db.products,
                    include: [
                      {
                        model: db.varients,

                      },
                    ],
                  },
                ],
              }],
          });

          if (categories?.length)
            res.status(200).send({ success: true, data: categories })
          else
            res.status(200).send({ success: false, message: "Data not found.", data: categories })
        } else res.status(422).json({ success: false, errors: error.message })
      } catch (err) {
        console.log("error", err);
        res.status(503).send({ success: false, message: "Internal Server Error." });
      }
    }

  },
  cart: {
    async addToCartByCustomer(req, res){
      try {
        const { quantity, customerId, adminId, sessionId, productId, variantId, variantPrice,  orderNotes,  } = req.body;
        let cartItem, variant, product;

        // If customerId exist then add to cart,
        if(variantId !== null || variantId !== undefined){
           variant = await db.varients.findByPk(variantId);
        }else if(productId != null || productId !== undefined){
           product = await db.varients.findByPk(productId);
        }else{
          res.status(400).send({ errMessage: "" });
        }

        // get previous data on base of customerId else on base of sessionId
        if(customerId != null || customerId != undefined){
        // Check if the item already exists in the cart On base of customerId
          cartItem = await db.cart.findOne({
            where: {
              customerId,
              productId,
              selectedVariantId: variantId,
            },
          });
        }else{
        // Check if the item already exists in the cart on base of sessionId
          cartItem = await db.cart.findOne({
            where: {
              sessionId,
              productId,
              selectedVariantId: variantId,
            },
          });
        }
        if (cart) {
          // If the item exists, update the quantity
          cartItem.cartItem += quantity;
          await cartItem.save();
        } else {
          // If the item doesn't exist, create a new entry in the cart
          await db.cart.create({
            quantity,
            customerId,
            adminId,
            sessionId: sessionId,
            selectedProductId : productId,
            selectedVariantId: variantId,
            selectedVariantPrice: variantPrice,
            orderNotes: orderNotes,
          });
        }
        res.status(200).send({ success: true, message: 'Item added to cart successfully.' });
      } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).send({ success: false, message: 'Internal Server Error.' });
      }
    }
  },
}
