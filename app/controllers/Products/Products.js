const db = require("../../models");
const { createCategoryPayload, updateCategoryPayload, deleteCategoryPayload, getCategoryPayload } = require("./Validation")
module.exports = {
  pizzas: {
    async create(req, res){
      try {
        let payload = req?.body;
        let addedProduct = await db.products.create(payload);
        if (addedProduct?.dataValues) {
          console.log("added", addedProduct?.dataValues);
          
          res.status(200).send({ success: true, message: "Product Added.",data:addedProduct?.dataValues ??[] });
          
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
    async update(req, res){
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
    async get(req, res){
      try {
        let { perPage, pageNo } = req?.query;
        console.log(perPage, pageNo)
        let products = await db.products.findAll({
          offset: (parseInt(pageNo) - 1)  * parseInt(perPage),
          limit: parseInt(perPage),
          where: {
            isDeleted: false
          }
          // include: [
          //   {
          //     model: db.varients, // Include the variants table
          //     as: 'variants', // Specify the alias for the variants table
          //   },
          //   {
          //     model: db.category, // Include the category table
          //     as: 'category', // Specify the alias for the category table
          //   },
          // ],
        });
        if(products?.length)
          res.status(200).send({ success: true, data: products })
        else 
          res.status(200).send({ success: false, message: "Data not found.", data: products })
      } catch (err) {
        console.log("error", err);
        res.status(503).send({ success: false, message: "Internal Server Error." });
      }
    },
    async delete(req, res){
      try {
        let { id } = req?.query;
        let deletedProduct = await db.products.update(
          {isDeleted: true},{
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
    async create(req, res){
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
    async update(req, res){
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
            if(value?.images?.length){
              await db.images.destroy({where: { varientId: value?.id }})
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
          res.status(422).json({success: false, errors: error?.message})
      } catch (err) {
        console.log("error", err);
        res.status(500).send({ success: false, message: "Internal Server Error." });
      }
    },
    async delete(req, res){
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
          res.status(422).json({success: false, errors: error.message})
      } catch (err) {
        console.log("error", err);
        res.status(500).send({ success: false, message: "Internal Server Error." });
      }
    },
    async get(req, res){
      try {
          let categories = await db.varients.findAll({
            where: {
              isDeleted: false
            },
            include:{
              model: db.images
            }
          });
          if(categories?.length)
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
    async create(req, res){
      try {
        let { name, description } = req?.body;
        let addedCategory = await db.categories.create({ name, description });
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
    async update(req, res){
      try {
        let { name, description, id } = req?.body;
        let updatedCategory = await db.categories.update({ name, description }, {
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
    async delete(req, res){
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
    async get(req, res){
      try {
        const { error, value: {perPage, pageNo} } = getCategoryPayload.validate(req.query);
        if(!error){
          let categories = await db.categories.findAll({
            offset: (parseInt(pageNo) - 1)  * parseInt(perPage),
            limit: parseInt(perPage),
            where: {
              isDeleted: false
            }
          });
          if(categories?.length)
            res.status(200).send({ success: true, data: categories })
          else 
            res.status(200).send({ success: false, message: "Data not found.", data: categories })
        } else res.status(422).json({success: false, errors: error.message})
      } catch (err) {
        console.log("error", err);
        res.status(503).send({ success: false, message: "Internal Server Error." });
      }
    }
  }
}