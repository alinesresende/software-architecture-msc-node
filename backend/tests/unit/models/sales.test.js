const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { sales } = require('../mocks/sales.mock');
const { salesById, newInsertSales, newSales } = require('../mocks/sales.mock');

const { expect } = chai;

const salesModel = require('../../../src/models/sales.model');

describe('Teste da camada Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Testando se retorna todos sales salesAllProducts', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);
    const result = await salesModel.getAllSales();
    expect(result).to.be.deep.equal(sales);
  });

  it('Testando se retorna um sale getSaleById com id igual a 1', async function () {
    sinon.stub(connection, 'execute').resolves([salesById]);
    const result = await salesModel.getSaleById(1);
    expect(result).to.be.deep.equal(salesById);
  });

  it('Testando se é possível cadastrar uma nova sale', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }, newInsertSales]);
    const result = await salesModel.insertSales(newInsertSales);
    expect(result).to.be.deep.equal(newSales);
  });

  it('Testando se é possível deletar uma sale', async function () {
    sinon.stub(connection, 'execute').resolves();
    const result = await salesModel.deleteSales(1);
    expect(result).to.be.deep.equal();
  });
});