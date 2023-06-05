const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesController = require('../../../src/controllers/sales.controller');
const salesService = require('../../../src/services/sales.service');
const { sales } = require('../mocks/sales.mock');
const { salesById, newSales } = require('../mocks/sales.mock');

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
  
  it('Testando se retorna todos sales', async function () {
    sinon.stub(salesService, 'getAllSales').resolves(sales);
    await salesController.getAllSales(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(sales);
});

it('Testando se retorna um produto com id igual 1', async function () {
  req.params = { id: 1 };
  sinon.stub(salesService, 'getSaleById').resolves({ type: 200, result: salesById });
  await salesController.getSaleById(req, res);
  expect(res.status).to.be.calledWith(200);
  expect(res.json).to.be.calledWithExactly(salesById);
});

it('Testando se é possível cadastrar uma nova sale', async function () {
  sinon.stub(salesService, 'insertSales').resolves(newSales);
  const result = await salesService.insertSales(201);
  expect(result).to.be.deep.equal(newSales);
});

it('Testando se é possível deletar uma sale', async function () {
  req.params = { id: 1 };
  sinon.stub(salesService, 'deleteSales').resolves({ type: 204 });
  await salesController.deleteSales(req, res);
  expect(res.status).to.be.calledWith(204);
  expect(res.json).to.be.calledWithExactly({});
});
});