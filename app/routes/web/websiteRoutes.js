const express = require('express');
const router = express.Router();
const { createMessage } = require("../../controllers/Admin/Message");
const products = require("../../controllers/Products/Products");
const { getAllTimmings } = require('../../controllers/Admin/Setting');

// unprotedted routes for dashboard
// contact-us
router.post("/contact-us/message", createMessage);
 router.get('/timming', getAllTimmings ),

 //products
 router.get("/products/products", products.pizzas.get);
 router.get("/products/variants", products.variants.get);
 router.get("/products/category/main", products.category.getOnlyCategories);
 router.get("/products/category/one/:id", products.category.getOne);
 router.get("/products/category/all", products.category.get);


// cart
router.get("/cart", products.cart.get);
router.post("/cart", products.cart.create);
router.put("/cart", products.cart.update);
router.delete("/cart", products.cart.delete);

// timming


module.exports = router;