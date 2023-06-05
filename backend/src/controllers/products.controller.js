const productService = require('../services/products.service');

const getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts();
  return res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, result } = await productService.getProductById(id);
    return res.status(type).json(result);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const { type, result } = await productService.insertProduct(name);
  return res.status(type).json(result);
};

const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, result } = await productService.updateProducts(name, Number(id));
  return res.status(type).json(result);
};

const deleteProducts = async (req, res) => {
  const { id } = req.params;
  const { type } = await productService.deleteProducts(id);
  return res.status(type).json({});
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProducts,
  deleteProducts,
};