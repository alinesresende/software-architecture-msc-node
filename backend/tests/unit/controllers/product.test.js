const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productController = require('../../../src/controllers/products.controller');
const productService = require('../../../src/services/products.service');
const { products, newProduct, updateProducts } = require('../mocks/products.mock');

chai.use(sinonChai);

const { expect } = chai;

describe('Teste da camada Controller', function () {
  const req = {}; 
  const res = {}; 

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  });

  afterEach(function () {
    sinon.restore();
  });
  
  it('Testando se retorna todos produtos getAllProducts', async function () {
    sinon.stub(productService, 'getAllProducts').resolves(products);
    await productController.getAllProducts(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(products);
});

it('Testando se retorna um produto getProductById', async function () {
  req.params = { id: 1 };
  sinon.stub(productService, 'getProductById').resolves({ type: 200, result: products[0] });
  await productController.getProductById(req, res);
  expect(res.status).to.be.calledWith(200);
  expect(res.json).to.be.calledWithExactly(products[0]);
});

it('Testando se é possível cadastrar um produto', async function () {
  req.body = { name: 'ProdutoX' };
  sinon.stub(productService, 'insertProduct').resolves({ type: 201, result: newProduct });
  await productController.insertProduct(req, res);
  expect(res.status).to.be.calledWith(201);
  expect(res.json).to.be.calledWithExactly(newProduct);
});

it('Testando se é possível atualizar um produto', async function () {
  req.body = { name: 'Martelo do Batman' };
  sinon.stub(productService, 'updateProducts').resolves({ type: 200, result: updateProducts });
  await productController.updateProducts(req, res);
  expect(res.status).to.be.calledWith(200);
  expect(res.json).to.be.calledWithExactly(updateProducts);
});

it('Testando se é possível deletar um produto', async function () {
  req.params = { id: 1 };
  sinon.stub(productService, 'deleteProducts').resolves({ type: 204 });
  await productController.deleteProducts(req, res);
  expect(res.status).to.be.calledWith(204);
  expect(res.json).to.be.calledWithExactly({});
});
});