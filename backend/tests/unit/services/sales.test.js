const chai = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');
const { sales } = require('../mocks/sales.mock');
const { salesById, newSales } = require('../mocks/sales.mock');

const { expect } = chai;

describe('Teste da camada Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Testando se retorna todos sales', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(sales);
    const result = await salesService.getAllSales();
    expect(result).to.be.deep.equal(sales);
  });

  it('Testando se retorna um sale com id igual a 1', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves(salesById);
    const result = await salesService.getSaleById(1);
    expect(result).to.be.deep.equal({ type: 200, result: salesById });
  });

  it('Testando se a sale não é encontrada', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves(null);
    const result = await salesService.getSaleById(null);
    expect(result).to.be.deep.equal({ type: 404, result: { message: 'Sale not found' } });
  });

  it('Testando se é possível cadastrar uma nova sale', async function () {
    sinon.stub(salesModel, 'insertSales').resolves(newSales);
    const result = await salesModel.insertSales();
    expect(result).to.be.deep.equal(newSales);
  });

  it('Testando se é possível deletar nova sale', async function () {
    sinon.stub(salesModel, 'deleteSales').resolves(newSales);
    const result = await salesModel.deleteSales();
    expect(result).to.be.deep.equal(newSales);
  });
});