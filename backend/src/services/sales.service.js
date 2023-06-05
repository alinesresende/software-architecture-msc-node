const salesModel = require('../models/sales.model');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  if (sale === null || sale.length === 0) {
    return { type: 404, result: { message: 'Sale not found' } };
  }
  return { type: 200, result: sale };
};

const insertSales = async (listProduct) => {
  const sale = await salesModel.insertSales(listProduct);
  if (sale) {
    return { type: 201, result: sale };
  }
};

const updateSales = async (quantity, saleId, productId) => {
  const upadateSale = await salesModel.updateSales(quantity, saleId, productId);
  if (upadateSale) {
    return { type: 200, result: upadateSale };
  }
};

const deleteSales = async (id) => {
await salesModel.deleteSales(id);
    return { type: 204 };
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSales,
  updateSales,
  deleteSales,
};
