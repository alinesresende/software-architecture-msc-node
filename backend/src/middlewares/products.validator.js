const productsModel = require('../models/products.model');

const isNameRequired = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  } 
    next();
};

const isNameLengthMinFive = (req, res, next) => {
  const { name } = req.body;
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  } 
    next();
};

const cantUpdateNonExistingProduct = async (req, res, next) => {
  const { id } = req.params;
  const productExists = await productsModel.getProductById(id);
  if (!productExists) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  isNameRequired,
  isNameLengthMinFive,
  cantUpdateNonExistingProduct,
};