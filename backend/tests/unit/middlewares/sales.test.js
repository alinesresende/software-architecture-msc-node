const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { isProducIdRequired, 
  isQuantityRequired,
  isQantityGreaterThanOrEqualToOne,
  productIdExistsInDatabase, 
  isQuantityGreaterThanOrEqualToOne,
  isQuantitySaleIsRequired,
  isProductRequiredInSale,
  // isSaleIdRequiredInSale,
} = require('../../../src/middlewares/sales.validator');

const { newInsertSales,
  exampleDataIncorrect,
  quantityIncorrect,
  productIdIncorrect } = require('../mocks/sales.mock');

  const productModel = require('../../../src/models/products.model');
  // const salesModel = require('../../../src/models/sales.model');

chai.use(sinonChai);

const { expect } = chai;

describe('Teste dos Middlewares - Sales', function () {
  const req = {}; 
  const res = {}; 
  
  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  });
  
  afterEach(function () {
    sinon.restore();
  });
  
  it('Testando se middlewares o campo productId existe', function () {
    const next = sinon.stub().returns(); 
    req.body = newInsertSales;
    isProducIdRequired(req, res, next); 
    expect(next).to.have.been.calledWithExactly();
  });

  it('Testando se middlewares o campo productId retorna um erro', function () {
    const next = sinon.stub().returns(); 
    req.body = productIdIncorrect;
    isProducIdRequired(req, res, next); 
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWithExactly({ message: '"productId" is required' });
  });

  it('Testando se middlewares o campo quantity existe', function () {
    const next = sinon.stub().returns(); 
    req.body = newInsertSales;
    isQuantityRequired(req, res, next); 
    expect(next).to.have.been.calledWithExactly();
  });

  it('Testando se middlewares o campo quantity retorna um erro', function () {
    const next = sinon.stub().returns(); 
    req.body = quantityIncorrect;
    isQuantityRequired(req, res, next); 
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWithExactly({ message: '"quantity" is required' });
  });

  it('Testando se o campo quantity menor ou igual a 0 (Zero)', function () {
    const next = sinon.stub().returns(); 
    req.body = exampleDataIncorrect;
    isQantityGreaterThanOrEqualToOne(req, res, next); 
    expect(res.status).to.be.calledWith(422);
    expect(res.json).to.be.calledWithExactly({ 
      message: '"quantity" must be greater than or equal to 1' });
  });

  it('Testando a chamada do next(), caso o campo quantity esteja correto', function () {
    const next = sinon.stub().returns(); 
    req.body = newInsertSales;
    isQantityGreaterThanOrEqualToOne(req, res, next); 
    expect(next).to.have.been.calledWithExactly();
  });

  it('Testando a chamada do next(), caso o product exista', async function () {
  const next = sinon.stub();
  sinon.stub(productModel, 'getProductById').resolves({ productId: 1 });
  req.body = [{ productId: 1 }];
  await productIdExistsInDatabase(req, res, next);
  expect(next).to.have.been.calledWithExactly();
  });

  it('Testando se retorna um erro quando o product não existe', async function () {
  const next = sinon.stub();
  sinon.stub(productModel, 'getProductById').resolves(null);
  req.body = [{ productId: 45 }];
  await productIdExistsInDatabase(req, res, next);
  expect(res.status).to.be.calledWith(404);
  expect(res.json).to.be.calledWithExactly({ message: 'Product not found' });
  });

  it('Testando se retorna um erro o campo quantity menor ou igual a 0 (Zero)', async function () {
    const next = sinon.stub();
    req.body = { quantity: 0 };
    await isQuantityGreaterThanOrEqualToOne(req, res, next);
    expect(res.status).to.be.calledWith(422);
    expect(res.json).to.be.calledWithExactly({ 
      message: '"quantity" must be greater than or equal to 1' });
    });

    it('Testando se retorna um erro se a quantity não existir', async function () {
      const next = sinon.stub();
      req.body = {};
      await isQuantitySaleIsRequired(req, res, next);
      expect(res.status).to.be.calledWith(400);
      expect(res.json).to.be.calledWithExactly({ 
        message: '"quantity" is required' });
    });

    it('Testando se retorna um erro se a productId não existir', async function () {
      const next = sinon.stub();
      sinon.stub(productModel, 'getProductById').resolves(null);
      req.params = { productId: 45 };
      await isProductRequiredInSale(req, res, next);
      expect(res.status).to.be.calledWith(404);
      expect(res.json).to.be.calledWithExactly({ 
        message: 'Product not found in sale' });
    });

    // it('Testando se retorna um erro se a saleId não existir', async function () {
    //   const next = sinon.stub();
    //   sinon.stub(salesModel, 'getSaleById').resolves(null);
    //   req.params = { saleId: 45 };
    //   await isSaleIdRequiredInSale(req, res, next);
    //   expect(res.status).to.be.calledWith(404);
    //   expect(res.json).to.be.calledWithExactly({ 
    //     message: 'Sale not found' });
    // });
});
