const express = require('express');
const router = express.Router();
const { 
  login, 
} = require('../controllers/Admin');
const products = require("../controllers/Products/Products")
const extra = require('../controllers/Products/Extra')


router.get("/pizza", products.pizzas.get);
router.post("/pizza", products.pizzas.create);
router.put("/pizza", products.pizzas.update);
router.delete("/pizza", products.pizzas.delete);

router.get("/variants", products.variants.get);
router.post("/variants", products.variants.create);
router.put("/variants", products.variants.update);
router.delete("/variants", products.variants.delete);

router.get("/category", products.categories.get);
router.post("/category", products.categories.create);
router.put("/category", products.categories.update);
router.delete("/category", products.categories.delete);

// extra

//cheese
router.get("/cheese", extra.cheese.get);
router.post("/cheese", extra.cheese.create);
router.put("/cheese", extra.cheese.update);
router.delete("/cheese", extra.cheese.delete);

//crust type
router.get("/crust-type", extra.crust_type.get);
router.post("/crust-type", extra.crust_type.create);
router.put("/crust-type", extra.crust_type.update);
router.delete("/crust-type", extra.crust_type.delete);

//sauce
router.get("/sauce", extra.sauce.get);
router.post("/sauce", extra.sauce.create);
router.put("/sauce", extra.sauce.update);
router.delete("/sauce", extra.sauce.delete);

//toppings
router.get("/toppings", extra.toppings.get);
router.post("/toppings", extra.toppings.create);
router.put("/toppings", extra.toppings.update);
router.delete("/toppings", extra.toppings.delete);

//veggies
router.get("/veggies", extra.veggies.get);
router.post("/veggies", extra.veggies.create);
router.put("/veggies", extra.veggies.update);
router.delete("/veggies", extra.veggies.delete);

module.exports = router;