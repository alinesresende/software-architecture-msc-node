const salesServices = require('../services/sales.service');

const getAllSales = async (req, res) => {
  const sales = await salesServices.getAllSales();
  return res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, result } = await salesServices.getSaleById(id);
    return res.status(type).json(result);
};

const insertSales = async (req, res) => {
  const listProducts = req.body;
  const { type, result } = await salesServices.insertSales(listProducts);
    return res.status(type).json(result);
};

const updateSales = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;
  const { type, result } = await salesServices.updateSales(quantity, saleId, productId);
  return res.status(type).json(result);
};

const deleteSales = async (req, res) => {
  const { id } = req.params;
  const { type } = await salesServices.deleteSales(id);
  return res.status(type).json({});
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSales,
  updateSales,
  deleteSales,
};
