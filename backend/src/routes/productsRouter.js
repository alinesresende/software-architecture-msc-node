const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products.controller');
const { isNameRequired,
   isNameLengthMinFive, 
   cantUpdateNonExistingProduct } = require('../middlewares/products.validator');

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', isNameRequired, isNameLengthMinFive, productsController.insertProduct);
router.put(
'/:id', 
cantUpdateNonExistingProduct,
isNameRequired,
isNameLengthMinFive,
productsController.updateProducts,
);
router.delete('/:id', cantUpdateNonExistingProduct, productsController.deleteProducts);

module.exports = router;
