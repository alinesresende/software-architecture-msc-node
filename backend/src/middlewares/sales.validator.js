const productsModel = require('../models/products.model');
const salesModel = require('../models/sales.model');

const isProducIdRequired = (req, res, next) => {
  const listProducts = req.body;
  // hofs every para verificar se todos products da listProducts existe (true)
  const allProductsIdExists = listProducts.every(
    (list) => list.productId !== undefined,
  );
  if (!allProductsIdExists) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};

const isQuantityRequired = (req, res, next) => {
  const listProducts = req.body;
  const allQuantityExists = listProducts.every(
    (list) => list.quantity !== undefined,
  );
  if (!allQuantityExists) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

const isQantityGreaterThanOrEqualToOne = (req, res, next) => {
  const listProducts = req.body;
  const allQuantityExists = listProducts.every(
    (list) => list.quantity !== undefined && list.quantity >= 1,
  );
  if (!allQuantityExists) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const productIdExistsInDatabase = async (req, res, next) => {
  // lista de produtos no req.body
  const listProducts = req.body;

  // o retorno do map sera um lista de promessas
  // (quando resolvidas vão resultar em boleanos
  // (true = existe no DB, false = nao existe no DB))
  const allProductExistsPromises = listProducts.map(async (product) => {
    // verificar se o productId exite no banco de dados
    const productExists = await productsModel.getProductById(product.productId);
    return !!productExists;
  });

  const allProductExistsResults = await Promise.all(allProductExistsPromises);
  // verificar se todos os productIds existem no bando de dados (são "true")
  const allProductExists = allProductExistsResults.every((result) => result);

  // se nem todos productIds existirem no DB, retornamos um erro, caso todos existam, seguimos
  if (!allProductExists) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

const cantDeleteSalesNonExistes = async (req, res, next) => {
  const { id } = req.params;
  const salesExists = await salesModel.getSaleById(id);
  if (salesExists.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    next();
};

const isQuantitySaleIsRequired = async (req, res, next) => {
  const { quantity } = req.body;
  if (!quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

const isQuantityGreaterThanOrEqualToOne = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity < 1) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const isProductRequiredInSale = async (req, res, next) => {
  const { productId } = req.params;
  const productExist = await productsModel.getProductById(productId);

  if (!productExist) {
    return res.status(404).json({ message: 'Product not found in sale' });
  }
  next();
};

const isSaleIdRequiredInSale = async (req, res, next) => {
  const { saleId } = req.params;
  const salesExist = await salesModel.getSaleById(saleId);
  if (salesExist.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  next();
};

module.exports = {
  isProducIdRequired,
  isQuantityRequired,
  isQantityGreaterThanOrEqualToOne,
  productIdExistsInDatabase,
  isQuantitySaleIsRequired,
  cantDeleteSalesNonExistes,
  isQuantityGreaterThanOrEqualToOne,
  isProductRequiredInSale,
  isSaleIdRequiredInSale,
};
