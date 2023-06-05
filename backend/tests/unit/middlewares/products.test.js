const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { isNameRequired,
  isNameLengthMinFive, 
  cantUpdateNonExistingProduct } = require('../../../src/middlewares/products.validator');

  const productModel = require('../../../src/models/products.model');

chai.use(sinonChai);

const { expect } = chai;

describe('Teste dos Middlewares - Products', function () {
  const req = {}; 
  const res = {}; 
  
  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  });
  
  afterEach(function () {
    sinon.restore();
  });
  
  it('Testando se middlewares IsNameRequired verificar se o name existe', function () {
    const next = sinon.stub().returns(); 
    req.body = { name: 'ProdutoX' };
    isNameRequired(req, res, next); 
    expect(next).to.have.been.calledWithExactly();
  });

  it('Testando se middlewares IsNameRequired verificar se o name não existe', function () {
    const next = sinon.stub().returns(); // crie um stub
    req.body = {};
    isNameRequired(req, res, next); 
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWithExactly({ message: '"name" is required' });
  });

  it('Testando se name possui tamanho minimo de 5', function () {
    const next = sinon.stub().returns(); 
    req.body = { name: 'ProdutoX' };
    isNameLengthMinFive(req, res, next); 
    expect(next).to.have.been.calledWithExactly();
  });

  it('Testando se name não possui tamanho mínimo de 5', function () {
    const next = sinon.stub().returns(); 
    req.body = { name: 'Pro' };
    isNameLengthMinFive(req, res, next); 
    expect(res.status).to.be.calledWith();
    expect(res.json).to.be.calledWithExactly({ 
      message: '"name" length must be at least 5 characters long' });
  });

  it('Testando se não pode atualizar um product que não existe', async function () {
    const next = sinon.stub();
    sinon.stub(productModel, 'getProductById').resolves(null);
    req.params = { id: 45 };
    await cantUpdateNonExistingProduct(req, res, next); 
    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWithExactly({ message: 'Product not found' });
  });

  it('Testando se ocorre a chamado do next quando o produto exite', async function () {
    const next = sinon.stub();
    sinon.stub(productModel, 'getProductById').resolves({ id: 1 });
    req.params = { id: 1 };
    await cantUpdateNonExistingProduct(req, res, next); 
    expect(next).to.have.been.calledWithExactly();
  });
});