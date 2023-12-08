const db = require('../../models')

async function extraCRUD(model, action, req, res) {
  try {
    switch (action) {
      case 'get':
        const products = await db[model].findAll();
        if (products?.length)
          res.status(200).send({ success: true, data: products });
        else
          res.status(200).send({ success: false, message: "Data not found.", data: products });
        break;
      case 'create':
        const { name, price } = req?.body;
        const addedItem = await db[model].create({ name, price });
        if (addedItem?.dataValues) {
          console.log("added", addedItem?.dataValues);
          res.status(200).send({ success: true, message: `${model} Added.` });
        } else {
          console.log("something went wrong.");
          res.status(400).send({ success: false, message: `Could not Add ${model}.` });
        }
        break;
      case 'update':
        const { id:updateId } = req?.body;
        const updatedItem = await db[model].update(req?.body, {
          where: { updateId }
        });
        if (updatedItem[0] > 0) {
          console.log(`updated${model}`, updatedItem);
          res.status(200).send({ success: true, message: `${model} Updated.` });
        } else {
          console.log("something went wrong.");
          res.status(400).send({ success: false, message: `Could not Update ${model}.` });
        }
        break;
      case 'delete':
        const { id: deleteId } = req?.query;
        const deletedItem = await db[model].update({
          isDeleted: true
        }, {
          where: { deleteId }
        });
        if (deletedItem[0] > 0) {
          console.log(`deleted${model}`, deletedItem);
          res.status(200).send({ success: true, message: `${model} Deleted.` });
        } else {
          console.log("something went wrong.");
          res.status(400).send({ success: false, message: `Could not Delete ${model}.` });
        }
        break;
      default:
        res.status(400).send({ success: false, message: "Invalid action." });
    }
  } catch (err) {
    console.log("error", err);
    res.status(500).send({ success: false, message: "Internal Server Error." });
  }
}
module.exports = {

  cheese: {
    async get(req, res) {
      await extraCRUD('cheese', 'get', req, res);
    },
    async create(req, res) {
      await extraCRUD('cheese', 'create', req, res);
    },
    async update(req, res) {
      await extraCRUD('cheese', 'update', req, res);
    },
    async delete(req, res) {
      await extraCRUD('cheese', 'delete', req, res);
    },
  },
  crust_type: {
    async get(req, res) {
      await extraCRUD('crust_type', 'get', req, res);
    },
    async create(req, res) {
      await extraCRUD('crust_type', 'create', req, res);
    },
    async update(req, res) {
      await extraCRUD('crust_type', 'update', req, res);
    },
    async delete(req, res) {
      await extraCRUD('crust_type', 'delete', req, res);
    },
  },
  sauce: {
    async get(req, res) {
      await extraCRUD('sauce', 'get', req, res);
    },
    async create(req, res) {
      await extraCRUD('sauce', 'create', req, res);
    },
    async update(req, res) {
      await extraCRUD('sauce', 'update', req, res);
    },
    async delete(req, res) {
      await extraCRUD('sauce', 'delete', req, res);
    },
  },
  toppings: {
    async get(req, res) {
      await extraCRUD('toppings', 'get', req, res);
    },
    async create(req, res) {
      await extraCRUD('toppings', 'create', req, res);
    },
    async update(req, res) {
      await extraCRUD('toppings', 'update', req, res);
    },
    async delete(req, res) {
      await extraCRUD('toppings', 'delete', req, res);
    },
  },
  veggies: {
    async get(req, res) {
      await extraCRUD('veggies', 'get', req, res);
    },
    async create(req, res) {
      await extraCRUD('veggies', 'create', req, res);
    },
    async update(req, res) {
      await extraCRUD('veggies', 'update', req, res);
    },
    async delete(req, res) {
      await extraCRUD('veggies', 'delete', req, res);
    },
  },
}