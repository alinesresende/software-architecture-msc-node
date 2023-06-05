const express = require('express');

const router = express.Router();

const salesController = require('../controllers/sales.controller');
const { isProducIdRequired,
isQuantityRequired,
isQantityGreaterThanOrEqualToOne, 
productIdExistsInDatabase,
cantDeleteSalesNonExistes,
isQuantitySaleIsRequired,
isQuantityGreaterThanOrEqualToOne,
isProductRequiredInSale,
isSaleIdRequiredInSale,
} = require('../middlewares/sales.validator');

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSaleById);
router.post(
'/', 
isProducIdRequired,
isQuantityRequired,
isQantityGreaterThanOrEqualToOne,
productIdExistsInDatabase,
salesController.insertSales,
);
router.put(
'/:saleId/products/:productId/quantity',
isQuantityGreaterThanOrEqualToOne,
isQuantitySaleIsRequired,
isProductRequiredInSale,
isSaleIdRequiredInSale,
salesController.updateSales,
);
router.delete('/:id', cantDeleteSalesNonExistes, salesController.deleteSales);

module.exports = router;
