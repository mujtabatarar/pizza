const db = require("../../models");
const { createCategoryPayload, updateCategoryPayload, deleteCategoryPayload, getCategoryPayload, getOneCategoryWithChilds } = require("../Validation")
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
  category: {
    async create(req, res) {
      try {
        // let { name, description } = req?.body;
        let addedCategory = await db.category.create(req?.body);
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
        let updatedCategory = await db.category.update(req?.body, {
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
        let deletedCategory = await db.category.update({
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
          let categories = await db.category.findAll({
            offset: (parseInt(pageNo) - 1) * parseInt(perPage),
            limit: parseInt(perPage),
            where: {
              isDeleted: false,
              parentId: null,
            },

            include: [
              {
                model: db.category, // Include the category table
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
          let categories = await db.category.findAll({
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
        const { error, value: { id } } = getOneCategoryWithChilds.validate(req.params);
        if (!error) {
          let categories = await db.category.findAll({
            where: {
              isDeleted: false,
              id: id,
            },

            include: [
              {
                model: db.category, // Include the category table
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
    async create(req, res) {
      try {
        const { quantity, customerId, adminId, productId, varientId, varientPrice, orderNotes, } = req.body;
        const { sessionId } = req.headers;
        let cartItem, varient, product;

        // Check if the product is avaliable for sale.
        if (varientId != null || varientId != undefined) {
          varient = await db.varients.findByPk(varientId, {
            where: {
              status: true,
            },
          });
        } else if (productId != null || productId != undefined) {
          product = await db.varients.findByPk(productId, {
            where: {
              status: true,
            }
          });
        } else {
          res.status(400).send({ success: false, errMessage: "Product is not avaliable." });
        }

        // get previous data on base of customerId else on base of sessionid
        if (customerId != null || customerId != undefined) {
          // Check if the item already exists in the cart On base of customerId
          cartItem = await db.cart.findOne({
            where: {
              customerId,
              productId,
              varientId,
            },
          });
        } else if (adminId != null || adminId != undefined) {
          // Check if the item already exists in the cart on base of adminId
          cartItem = await db.cart.findOne({
            where: {
              adminId: adminId,
              productId: productId,
              varientId: varientId,
            },
          });
        } else {
          // Check if the item already exists in the cart on base of sessionid
          cartItem = await db.cart.findOne({
            where: {
              sessionId: sessionId,
              selectedProductId: productId,
              varientId: varientId,
            },
          });
        }
        if (cartItem) {
          // If the item exists, update the quantity
          cartItem.quantity += quantity;
          await cartItem.save();
        } else {
          // If the item doesn't exist, create a new entry in the cart
          cartItem = await db.cart.create({
            quantity,
            customerId,
            adminId,
            sessionId: sessionId,
            productId: productId,
            varient: varientId,
            varientPrice: varientPrice,
            orderNotes: orderNotes,
          });
        }
        res.status(200).send({ success: true, message: 'Item added to cart successfully.', data: cartItem });
      } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).send({ success: false, message: 'Internal Server Error.' });
      }
    },
    async get(req, res) {
      try {
        const { customerId, adminId } = req.query;
        console.log(req.query);
        console.log(req.params);
        const { sessionid } = req.headers;
        let cartItem;
        // Retrieve cart items along with product and varient details
        if (customerId != null || customerId != undefined) {
          console.log("--------------------------------customerId--------------------------------");
          cartItem = await db.cart.findAll({
            where: {
              customerId: customerId, quantity: {
                [db.Sequelize.Op.gt]: 0,
              },
            },
            include: [
              { model: db.products },
              { model: db.varients },
            ],
          });
        } else if (adminId != null || adminId != undefined) {
          console.log("--------------------------------adminId--------------------------------");
          cartItem = await db.cart.findAll({
            where: {
              adminId: adminId, quantity: {
                [db.Sequelize.Op.gt]: 0,
              },
            },
            include: [
              { model: db.products },
              { model: db.varients },
            ],
          });
        } else if (sessionid != null || sessionid != undefined) {
          console.log("--------------------------------sessionId--------------------------------");
          cartItem = await db.cart.findAll({
            where: {
              sessionid: sessionid, quantity: {
                [db.Sequelize.Op.gt]: 0,
              },
            },
            include: [
              { model: db.products },
              { model: db.varients },
            ],
          });
        }
        console.log("--------------------------------goinf to send response.--------------------------------");
        console.log(cartItem)
        res.status(200).send({ success: true, data: cartItem });
      } catch (error) {
        console.error('Error retrieving cart items:', error);
        res.status(500).send({ success: false, message: 'Internal Server Error.' });
      }
    },
    async delete(req, res) {
      try {
        const { customerId, adminId } = req.params;
        const { sessionid } = req.headers;
        const { productId, varientId } = req.query;

        let whereCondition = {};

        // Set the appropriate where condition based on the provided parameters
        if (customerId !== null || customerId !== undefined) {
          whereCondition = { customerId: customerId };
        } else if (adminId !== null || adminId !== undefined) {
          whereCondition = { adminId: adminId };
        } else if (sessionid !== null || sessionid !== undefined) {
          whereCondition = { sessionid: sessionid };
        }

        // Add productId condition
        whereCondition.productId = productId;

        // Add variantId condition if provided
        if (varientId) {
          whereCondition.varientId = varientId;
        } else {
          // If variantId is not provided, delete items without a specific variant
          delete whereCondition.varientId;
        }

        // Delete the item from the cart
        const deletedItem = await db.cart.destroy({
          where: whereCondition,
          individualHooks: true, // Enable individual hooks for the destroy operation
        });

        if (deletedItem > 0) {
          res.status(200).send({ success: true, message: 'Item deleted from cart.' });
        } else {
          res.status(404).send({ success: false, message: 'Item not found in cart.' });
        }
      } catch (error) {
        console.error('Error deleting item from cart:', error);
        res.status(500).send({ success: false, message: 'Internal Server Error.' });
      }
    },
    async update(req, res) {
      try {
        const { cartItemId } = req.params;
        const { quantity } = req.body;

        // Find the cart item by ID
        const cartItem = await db.cart.findByPk(cartItemId, {
          include: [
            { model: db.products },
            { model: db.variant, as: 'selectedVariant' },
          ],
        });

        // If the cart item is found
        if (cartItem) {
          // Validate quantity
          if (quantity < 1) {
            return res.status(400).send({ success: false, message: 'Quantity must be at least 1.' });
          }

          // Calculate updated total amount based on the quantity change
          const updatedTotalAmount = cartItem.selectedVariant.price * quantity;

          // Update the quantity and total amount
          cartItem.quantity = quantity;
          cartItem.totalAmount = updatedTotalAmount;

          // Save the changes to the database
          await cartItem.save();

          res.status(200).send({ success: true, message: 'Cart item updated successfully.' });
        } else {
          res.status(404).send({ success: false, message: 'Cart item not found.' });
        }
      } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).send({ success: false, message: 'Internal Server Error.' });
      }
    },
  },
  order: {
    async createOrderWeb(req, res) {
      try {
        const { cartId, paymentMethod, deliveryType, userId, restaurantId, dayId, deliveryLatitude, deliveryLongitude, deliveryRadius } = req.params;
        // Get cart items
        const cartItems = await db.cart.findAll({ where: { id: cartId } });

        // Calculate total amount
        const totalAmount = cartItems.reduce((total, item) => total + (item.variantPrice * item.quantity), 0);

        // Create the order
        const order = await order.create({
          status: 'pending',
          orderType: "web",
          paymentMethod: paymentMethod, // Change as needed
          deliveryType: deliveryType, // Change as needed
          // preparationTimeMinutes: , // Change as needed
          // deliveryTimeMin,
          //deliveryTimeMax,
          //orderCreationTime,
          totalAmount,

          userId,
          restaurantId,
          dayId,
          deliveryLatitude,
          deliveryLongitude,
          deliveryRadius,
        });

        // Create order items
        await Promise.all(cartItems.map(async (cartItem) => {
          await sequelize.models.OrderItem.create({
            productId: cartItem.productId, // Assuming you have a productId in your cart
            quantity: cartItem.quantity,
            variantPrice: cartItem.variantPrice,
            orderId: order.id,
          });
        }));

        // Remove cart items (optional)
        await sequelize.models.cart.destroy({ where: { id: cartId } });

        return order;
      } catch (error) {
        console.error('Error finalizing cart:', error);
        throw error;
      }
    },
    async createOrderDashboard(req, res) {
      try {
        const { cartId, orderFrom, paymentMethod, deliveryType, userId, restaurantId, dayId, deliveryLatitude, deliveryLongitude, deliveryRadius } = req.params;
        // Get cart items
        const cartItems = await db.cart.findAll({ where: { id: cartId } });

        // Calculate total amount
        const totalAmount = cartItems.reduce((total, item) => total + (item.variantPrice * item.quantity), 0);

        // Create the order
        const order = await order.create({
          status: 'pending',
          orderFrom: "customer",
          paymentMethod: paymentMethod, // Change as needed
          deliveryType: deliveryType, // Change as needed
          // preparationTimeMinutes: 30, // Change as needed
          // deliveryTimeMin,
          //deliveryTimeMax,
          //orderCreationTime,
          totalAmount,
          promoCode : promoCode,
          promoCodeDiscountType: promoCodeDiscountType,
          promoCodeDiscountValue : promoCodeDiscountValue,
          userId,
          restaurantId,
          dayId,
          deliveryLatitude,
          deliveryLongitude,
          deliveryRadius,
        });

        // Create order items
        await Promise.all(cartItems.map(async (cartItem) => {
          await sequelize.models.OrderItem.create({
            productId: cartItem.productId, // Assuming you have a productId in your cart
            quantity: cartItem.quantity,
            variantPrice: cartItem.variantPrice,
            orderId: order.id,
          });
        }));

        // Remove cart items (optional)
        await sequelize.models.cart.destroy({ where: { id: cartId } });

        return order;
      } catch (error) {
        console.error('Error finalizing cart:', error);
        throw error;
      }
    },
    async getdashboardStatsCount(req, res) {
      try {
        const statusCounts = await db.order.findAll({
          attributes: ['status', [Sequelize.fn('COUNT', Sequelize.col('status')), 'count']],
          group: ['status']
        });

        const categoryCount = await Category.count();
        const subcategoryCount = await Category.count({
          where: {
            parentId: { [Sequelize.Op.not]: null }
          }
        });
        const productCount = await Products.count();

        statusCounts.forEach(statusCount => {
          console.log(`${statusCount.status} Orders Count: ${statusCount.get('count')}`);
        });
        res.status(200).send({ success: true, data: { ...statusCounts, ...categoryCount, ...subcategoryCount, ...productCount } });
      } catch (error) {
        console.error('Error fetching dashboard status counts:', error);
      }
    },
    async getDailyRevenue(req, res) {
      try {

        const startDate = req.params.startDate || null;
        const endDate = req.params.endDate || null;
        // Set default date range to the last 7 days if not provided
        if (!startDate || !endDate) {
          endDate = moment().format('YYYY-MM-DD'); // Current date
          startDate = moment().subtract(7, 'days').format('YYYY-MM-DD'); // 7 days ago
        }

        const filter = {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
          status: 'delivered', // Assuming you want to consider only delivered orders
        };

        const dailyRevenue = await db.order.findAll({
          attributes: [
            [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'],
            [Sequelize.fn('SUM', Sequelize.col('totalAmount')), 'revenue'],
            [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
          ],
          where: filter,
          group: [Sequelize.fn('DATE', Sequelize.col('createdAt'))],
          order: [[Sequelize.fn('DATE', Sequelize.col('createdAt'))]],
        });

        console.log('Daily Revenue:');
        console.log(dailyRevenue.map(entry => ({ date: entry.date, revenue: entry.revenue.toFixed(2) })));
        res.status(200).send({ success: true, data: dailyRevenue });

      } catch (error) {
        console.error('Error calculating daily revenue:', error);
        res.status(500).send({ success: false, message: error.message });

      }
    },
    async getStatusWise(req, res){
      try {
        const status = req.params.status || null;
        const filter = {
          status: status,
        };
        const orders = await db.order.findAll({
        where: filter,
        include: [
          {
            model: db.orderItem,
            include: [
              {
                model: db.products,
                model: db.varients,
              }],
          }],
        });
        res.status(200).send({ success: true, data: orders });
      } catch (error) {
        console.error('Error getting orders:', error);
        res.status(500).send({ success: false, message: error.message });
      }
    },
    async update(req,res){
      try {
         const { error } = promoCreate.validate(req.body);
        if (!error) {
          let { id } = req?.body;
          let updatedorder = await db.order.update(req?.body, {
            where: {
              id: id,
            }
          });
          if (updatedPromo[0] > 0) {
            console.log("updated order", updatedPromo);

            res.status(200).send({ success: true, message: "order Updated." });

          } else {
            res
              .status(400)
              .send({ success: false, message: "Could not Update order." });
          }
        } else res.status(422).json({ success: false, errors: error.message })
      } catch (error) {
        console.error('Error updating orders', error);
        res.status(500).send({ success: false, message: error.message });
      }
    },
    async confirmOrder(req,res){
      try {
        const { error } = promoCreate.validate(req.body);
       if (!error) {
         let { id } = req?.body;
         let updatedorder = await db.order.update({status: active}, {
           where: {
             id: id,
           }
         });
         if (updatedorder[0] > 0) {
           console.log("updated order", updatedorder);
           res.status(200).send({ success: true, message: "order Updated." });
         } else {
           res
             .status(400)
             .send({ success: false, message: "Could not Update order." });
         }
       } else res.status(422).json({ success: false, errors: error.message })
     } catch (error) {
       console.error('Error updating orders', error);
       res.status(500).send({ success: false, message: error.message });
     }
    },
    async getTotalRevenue(req,res){
      try {
         const totalAdminRevenueViaCard = await db.order.findAll({
          attributes: [
            [Sequelize.fn('SUM', Sequelize.col('totalAmount')), 'totalAdminRevenue'],
          ],
          where: {
            orderFrom: "admin",
            paymentMethod: "card",

          }
         });
         const totalAdminRevenueViaCash = await db.order.findAll({
          attributes: [
            [Sequelize.fn('SUM', Sequelize.col('totalAmount')), 'totalAdminRevenueViaCash'],
          ],
          where: {
            orderFrom: "admin",
            paymentMethod: "cash",
          }
         });
         const totalCustomerOnlineCashRevenue = await db.order.findAll({
          attributes: [
            [Sequelize.fn('SUM', Sequelize.col('totalAmount')), 'totalCustomerOnlineCashRevenue'],
          ],
          where: {
            orderFrom: "customer",
            paymentMethod: "cash",
          }
         });
         const totalCustomerOnlineCardRevenue = await db.order.findAll({
          attributes: [
            [Sequelize.fn('SUM', Sequelize.col('totalAmount')), 'totalCustomerOnlineCardRevenue'],
          ],
          where: {
            orderFrom: "customer",
            paymentMethod: "card",
          }
         });
        res.status(422).json({ success: false, errors: error.message })
     } catch (error) {
       console.error('Error fetching total revenue', error);
       res.status(500).send({ success: false, message: error.message });
     }
    },
    async getTotalRevenueTwo(req, res) {
      try {
        const totalRevenue = await db.order.findAll({
          attributes: [
            'orderFrom',
            'paymentMethod',
            [Sequelize.fn('SUM', Sequelize.col('totalAmount')), 'totalAmount'],
          ],
          group: ['orderFrom', 'paymentMethod'],
        });
    
        const result = {
          totalAdminRevenueViaCard: 0,
          totalAdminRevenueViaCash: 0,
          totalCustomerOnlineCashRevenue: 0,
          totalCustomerOnlineCardRevenue: 0,
        };
    
        totalRevenue.forEach(item => {
          const orderFrom = item.dataValues.orderFrom;
          const paymentMethod = item.dataValues.paymentMethod;
          const totalAmount = parseFloat(item.dataValues.totalAmount);
    
          if (orderFrom === 'admin' && paymentMethod === 'card') {
            result.totalAdminRevenueViaCard += totalAmount;
          } else if (orderFrom === 'admin' && paymentMethod === 'cash') {
            result.totalAdminRevenueViaCash += totalAmount;
          } else if (orderFrom === 'customer' && paymentMethod === 'cash') {
            result.totalCustomerOnlineCashRevenue += totalAmount;
          } else if (orderFrom === 'customer' && paymentMethod === 'card') {
            result.totalCustomerOnlineCardRevenue += totalAmount;
          }
        });
    
        res.status(200).json({
          success: true,
          ...result,
        });
      } catch (error) {
        console.error('Error fetching total revenue', error);
        res.status(500).json({ success: false, message: error.message });
      }
    }
    
  },
  promo: {

    async create(req, res) {
      try {
        const { error } = promoCreate.validate(req.body);
        if (!error) {
          let addedPromo = await db.promo.create(req?.body);
          if (addedPromo?.dataValues) {
            console.log("added", addedPromo?.dataValues);
            res.status(200).send({ success: true, message: "Promo Added." });
          } else {
            console.log("something went wrong.");
            res
              .status(400)
              .send({ success: false, message: "Could not Add Promo." });
          }
        } else res.status(422).json({ success: false, errors: error.message })
      } catch (err) {
        console.log("error", err);
        res.status(503).send({ success: false, message: "Internal Server Error." });
      }
    },
    async update(req, res) {
      try {
        const { error } = promoCreate.validate(req.body);
        if (!error) {
          let { id } = req?.body;
          let updatedPromo = await db.promo.update(req?.body, {
            where: {
              id: id,
              isDeleted: false
            }
          });
          if (updatedPromo[0] > 0) {
            console.log("updatedPromo", updatedPromo);

            res.status(200).send({ success: true, message: "Promo Updated." });

          } else {
            res
              .status(400)
              .send({ success: false, message: "Could not Update Promo." });
          }
        } else res.status(422).json({ success: false, errors: error.message })
      } catch (err) {
        console.log("error", err);
        res.status(500).send({ success: false, message: "Internal Server Error." });
      }
    },
    async delete(req, res) {
      try {
        const { error } = idValidate.validate(req.params);
        if (!error) {
          let { id } = req?.query;
          let deletedCategory = await db.promo.update({
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
              .send({ success: false, message: "Could not delete promo code." });
          }
        } else res.status(422).json({ success: false, errors: error.message })
      } catch (err) {
        console.log("error", err);
        res.status(500).send({ success: false, message: "Internal Server Error." });
      }
    },
    async getOnlyPromo(req, res) {
      try {
        const { error, value: { perPage, pageNo } } = getAllPromoPayload.validate(req.query);
        if (!error) {
          let promos = await db.promo.findAll({
            offset: (parseInt(pageNo) - 1) * parseInt(perPage),
            limit: parseInt(perPage),
            where: {
              isDeleted: false,
            },
          });

          if (promos?.length)
            res.status(200).send({ success: true, data: promos })
          else
            res.status(200).send({ success: false, message: "Data not found.", data: promos })
        } else res.status(422).json({ success: false, errors: error.message })
      } catch (err) {
        console.log("error", err);
        res.status(503).send({ success: false, message: "Internal Server Error." });
      }
    },
    async getAllPromoCodeWithUsageBasicDetails(req, res) {
      try {
        const { error, value: { perPage, pageNo } } = getAllPromoPayload.validate(req.query);
        if (!error) {
          const promoWithDetails = await db.promo.findAll({
            attributes: [
              'name',
              'description',
              'discountType',
              'discountValue',
              'minBasketValue',
              'totalVouchers',
              'redeemsPerCustomer',
              'validity',
              'applicablePaymentTypes',
              'forFirstOrder',
              'expiryDate',
              'startDate',
              'status'
              [sequelize.fn('COUNT', sequelize.col('orders.id')), 'usageCount'],
              [sequelize.fn('SUM', sequelize.col('orders.promoCodeDiscountValue')), 'totalDiscountGiven'],
            ],
            include: [{
              model: order,
              attributes: [],
              where: {
                promoCode: {
                  [sequelize.Op.ne]: null,
                },
              },
            }],
            group: ['promoCode.name'],
            offset: (parseInt(pageNo) - 1) * parseInt(perPage),
            limit: parseInt(perPage),
            where: {
              isDeleted: false,
            },
          });

          console.log(promoWithDetails);

          if (promoWithDetails?.length)
            res.status(200).send({ success: true, data: promoWithDetails })
          else
            res.status(200).send({ success: false, message: "Data not found.", data: promoWithDetails })
        } else res.status(422).json({ success: false, errors: error.message })
      } catch (err) {
        console.log("error", err);
        res.status(503).send({ success: false, message: "Internal Server Error." });
      }
    },
    async getParticularPromoFullUsageDetais(req, res) {
      try {
        const { error, value: { id, perPage, pageNo } } = getAllPromoPayload.validate(req.query);
        if (!error) {
          const promoWithDetails = await db.promo.findOne({
            where: {
              name: promoCode
            },
            attributes: [
              'name',
              'description',
              'discountType',
              'discountValue',
              'minBasketValue',
              'totalVouchers',
              'redeemsPerCustomer',
              'validity',
              'applicablePaymentTypes',
              'forFirstOrder',
              'expiryDate',
              'startDate',
              'status'
              [sequelize.fn('COUNT', sequelize.col('orders.id')), 'usageCount'],
              [sequelize.fn('SUM', sequelize.col('orders.promoCodeDiscountValue')), 'totalDiscountGiven'],
            ],
            include: [{
              model: order,
              attributes: [
                'id',
                'promoCodeDiscountValue',
                'customerId'

              ],
              where: {
                promoCode: promoCode,
              },
            }],
          });

          console.log(promoWithDetails);

          if (promoWithDetails?.length)
            res.status(200).send({ success: true, data: promoWithDetails })
          else
            res.status(200).send({ success: false, message: "Data not found.", data: promoWithDetails })
        } else res.status(422).json({ success: false, errors: error.message })
      } catch (err) {
        console.log("error", err);
        res.status(503).send({ success: false, message: "Internal Server Error." });
      }
    },
    async getOne(req, res) {
      try {
        const { error, value: { id } } = idValidate.validate(req.query);
        if (!error) {
          let promos = await db.promo.findOne({
            where: {
              isDeleted: false,
              id: id,
            }
          });
          if (promos?.length)
            res.status(200).send({ success: true, data: promos })
          else
            res.status(200).send({ success: false, message: "Data not found.", data: promos })
        } else res.status(422).json({ success: false, errors: error.message })
      } catch (err) {
        console.log("error", err);
        res.status(503).send({ success: false, message: "Internal Server Error." });
      }
    },
    async applyPromoOnCart (req,res) {
      try{  

          // a - get promoCode detail from promo Code name
            // a1 check if minBasketValue > all cart items variantPrices 
            // a2 check if totalVouchers have not exceed promoUsage,
            // a3 check if redeemsPerCustomer have not exceed count of rows rows in promoUsage table where userId match and promoId match.
            // a4 check if validity date is not pass.
            // a5 check if promo is for forFirstOrder and user have no history in order table.
            // a6 check if isDeleted is not true
            // a7 check if expiryDate is not passed.
            // a8 check if startDate is passed.
            // a9 check if status is true.
            // a10 check if promoUsages is less than totalVouchers, if yes than expired that promo.
            // return appropriate error messages for these test case fails.

          // b - return error if no promo found

          // c - check if previous promo code exist on any cart items of the adminid/customerId/sessionId found in request body,
            // c1 - if c than check if that promo is expired.
            // c1-a - if c and c1 mean it is expired than remove on all cart items of this user
            // c3 , check if that previous promo is applicable with other promo code and check if current promo code is applicable with other promo code, if any of them is not applicable with other promo code than dont apply new promo, 
          // d - 
          // while applying check if that promo code is forFirstOrder if yes then check if user has precious order in order table.

          // check if promo applicable on cart item one by one. 

          // if promo 

      }catch (err){

      }
    },

    // a - get promoCode detail from promoCode name
    async getPromoCodeDetail (promoCodeName) {
      try {
        const promoCode = await db.promo.findOne({ where: { name: promoCodeName } });
        return promoCode;
      } catch (error) {
        console.error('Error fetching promo code detail:', error);
        throw new Error('Error fetching promo code detail');
      }
    },

    // a1 check if minBasketValue > all cart items variantPrices
    async isMinBasketValueValid (promoCode, cartItems) {
      const totalVariantPrices = cartItems.reduce((total, item) => total + item.variantPrice, 0);
      return promoCode.minBasketValue <= totalVariantPrices;
    },

    // a2 check if totalVouchers have not exceeded promoUsage
    async isTotalVouchersValid (promoCode) {
      return promoCode.totalVouchers > promoCode.promoUsages.length;
    },

    // a3 check if redeemsPerCustomer have not exceeded count of rows in promoUsage table
    async isRedeemsPerCustomerValid (promoCode, userId) {
      const userRedeemsCount = await db.promoUsage.count({
        where: {
          userId: userId,
          promoId: promoCode.id,
          },
        });
      return promoCode.redeemsPerCustomer > userRedeemsCount;
    },

    // a4 check if validity date is not passed
    async isValidityDateValid  (promoCode) {
      return promoCode.validity > new Date();
    },

    // a5 check if promo is for first order and user has no history in order table
    async isFirstOrderValid (promoCode, userId) {
      const userOrderCount = await db.order.count({
        where: { userId: userId },
      });
      return !promoCode.forFirstOrder || userOrderCount === 0;
    },

    // a6 check if isDeleted is not true
    async isNotDeletedValid (promoCode) {
      return !promoCode.isDeleted;
    },

    // a7 check if expiryDate is not passed
    async isExpiryDateValid (promoCode)  {
      return promoCode.expiryDate > new Date();
    },

    // a8 check if startDate is passed
    async isStartDateValid (promoCode) {
      return promoCode.startDate <= new Date();
    },

    // a9 check if status is true
    async isStatusValid (promoCode) {
      return promoCode.status;
    },

    // a10 check if promoUsages is less than totalVouchers, if yes then expire that promo
    async expirePromoIfVouchersExhausted (promoCode) {
      if (promoCode.promoUsages.length >= promoCode.totalVouchers) {
        await db.promo.update({ status: false,  },{where:{id: promoCode.id}});
        return true; // Promo expired
      }
      return false; // Promo not expired
    },

    // Helper function to check if a promo code is applicable with other promo codes
    async isApplicableWithOtherPromoCodes (promoCodeName) {
      const promoCode = await db.promo.findOne({ where: { name: promoCodeName } });
      return promoCode ? promoCode.isApplicableWithOtherPromoCodes : false;
    },

    // Helper function to check if a promo code is expired
    async isPromoCodeExpired (promoCode) {
      return promoCode.expiryDate <= new Date();
    },

    // Helper function to remove a promo code from a comma-separated string
    async removePromoCodeFromList (promoIds, promoCodeName) {
      const promoIdArray = promoIds.split(',').map(Number);
      const updatedPromoIds = promoIdArray.filter(id => id !== promoCodeName).join(',');
      return updatedPromoIds;
    },

    async checkIfFirstOrder(customerId){
    try{
        const userOrderCount = await db.order.count({ where: { customerId: customerId } });
        if (userOrderCount === 0 || userOrderCount == null || userOrderCount == undefined){
          return true;
        }else{
          return false;
        }
      }catch(err){
        throw new Error('Error fetching order detail');
      }
    },
    

      // c - check if a previous promo code exists on any cart items of the adminId/customerId/sessionId found in the request body
      // c1 - if c, then check if that promo is expired
      // c1-a - if c and c1 mean it is expired, then remove it on all cart items of this user
      // c3 - check if that previous promo is applicable with other promo code and check if the current promo code is applicable with other promo code, if any of them is not applicable with other promo code than don't apply the new promo

    // Apply these checks before applying the promo code
    async applyPromoCodeOnCart (req, res) {
      try {
        const { promoCodeName, customerId, sessionId} = req?.body;
        const promoCode = await this.getPromoCodeDetail(promoCodeName);
        const cartItems = await db.cart.findOne({ where: { [Op.or]: [{ userId: userId }, { sessionId: sessionId }] } });
        if(!cartItems) throw new Error('Cart empty');

        if (!this.isMinBasketValueValid(promoCode, cartItems)) {
            throw new Error('Minimum basket value not achieved');
        } else if (!this.isTotalVouchersValid(promoCode)) {
            throw new Error('Promo code overall limit exceeded');
        } else if (!(await this.isRedeemsPerCustomerValid(promoCode, userId))) {
            throw new Error('Promo code redeems usage limit exceeded');
        } else if (!this.isValidityDateValid(promoCode)) {
            throw new Error('Promo code validity date not valid');
        } else if (!this.isFirstOrderValid(promoCode, userId)) {
            throw new Error('Invalid for first order');
        } else if (!this.isNotDeletedValid(promoCode)) {
            throw new Error('Promo code is deleted');
        } else if (!this.isExpiryDateValid(promoCode)) {
            throw new Error('Promo code has expired');
        } else if (!this.isStartDateValid(promoCode)) {
            throw new Error('Promo code is not yet valid');
        } else if (!this.isStatusValid(promoCode)) {
            throw new Error('Promo code is not in a valid status');
        }else if (await this.expirePromoIfVouchersExhausted(promoCode)){
          throw new Error('Promo code is not in a valid status');
        }else if( promoCode.forFirstOrder === true && !checkIfFirstOrder(customerId)){
          throw new Error('Promo code is for first order, cant applied on this cart');
        }

        if (cartItems.promoIds) {
          // check if setting table have a setting for how many promo customer can apply? if it exceed limit throw error 
          promoSetting = await db.setting.findOne({where: { name: "CART_MAXIMUM_PROMO_CAP"}});
          if(promoSetting.value.parseInt === 1){
            throw new Error('Multiple promo code cannot be applied at one');
          }

          const previousPromoCodes = cartItems.promoIds.split(',');
          console.log(previousPromoCodes);
          console.log("--------------------------------");

          // Check each previous promo code
          for (const previousPromoCode of previousPromoCodes) {
            const oldPromoCode = await db.promo.findOne({ where: { id: previousPromoCode } });
            let updatedPromoIds = cartItems.promoIds;
            if (oldPromoCode) {
              // c1 - Check if the previous promo is expired
              if (this.isPromoCodeExpired(oldPromoCode)) {
                // c1-a - If c and c1 mean it is expired, then remove it on all cart items of this user
                updatedPromoIds = this.removePromoCodeFromList(cartItems.promoIds, oldPromoCode.id);
                // await db.cart.update({ promoIds: updatedPromoIds });
                console.log(`Previous promo code ${oldPromoCode.name} expired and removed from cart items.`);
              }
              // c3 - Check if the previous promo is applicable with other promo code and check if the current promo code is applicable with other promo code
              if (
                promoCode.isApplicableWithOtherPromoCodes &&
                oldPromoCode.isApplicableWithOtherPromoCodes
              ) {
                updatedPromoIds = updatedPromoIds ? `${updatedPromoIds},${promoCode.id}` : promoCode.id;
                await db.cart.update({ promoIds: updatedPromoIds });
                console.log('New promo code applied successfully!');

              } else {
                console.log('New promo code is not applicable with the previous promo code.');
                throw new Error('New promo code is not applicable with the previous promo code.');
              }
              
            }
          }
        } else {
          // Apply the new promo code logic here (assuming no previous promo code)
          await db.cart.update({ promoIds: promoCode.id });
          console.log('New promo code applied successfully!');
        }


          // c - check if a previous promo code exists on any cart items of the adminId/customerId/sessionId found in the request body
          // c1 - if c, then check if that promo is expired
          // c1-a - if c and c1 mean it is expired than remove on all cart items of this user
          // c3 - check if that previous promo is applicable with other promo code and check if the current promo code is applicable with other promo code, if any of them is not applicable with other promo code than don't apply the new promo


          // d - While applying, check if that promo code is forFirstOrder. If yes, then check if the user has a previous order in the order table.
          // const checkForFirstOrderPromoAndApply = async (promoCodeName, userId) => {
          //   try {
          // const promoCode = await PromoCode.findOne({ where: { name: promoCodeName } });

          
        
        } catch (error) {
          console.error('Error applying promo code:', error);
          throw new Error('Error applying promo code');
        }
      }
    }
}
