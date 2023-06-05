const productsModel = require('../models/products.model');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  if (!product) {
    return { type: 404, result: { message: 'Product not found' } };
  }
  return { type: 200, result: product };
};

const insertProduct = async (name) => {
  const newProduct = await productsModel.insertProduct(name);
  return { type: 201, result: newProduct };
};

const updateProducts = async (name, id) => {
  const update = await productsModel.updateProducts(name, id);
  return { type: 200, result: update };
};

const deleteProducts = async (id) => {
 await productsModel.deleteProducts(id);
  return { type: 204 };
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProducts,
  deleteProducts,
};
