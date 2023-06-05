const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { products, newProduct, updateProducts } = require('../mocks/products.mock');

const { expect } = chai;

const productModel = require('../../../src/models/products.model');

describe('Teste da camada Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Testando se retorna todos produtos getAllProducts', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productModel.getAllProducts();
    expect(result).to.be.deep.equal(products);
  });

  it('Testando se retorna um produto getProductById', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    const result = await productModel.getProductById(1);
    expect(result).to.be.deep.equal(products[0]);
  });

  it('Testando se produto não encontrado', async function () {
    sinon.stub(connection, 'execute').resolves([[null]]);
    const result = await productModel.getProductById(45);
    expect(result).to.be.equal(null);
  });

  it('Testando se é possível cadastrar um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    const result = await productModel.insertProduct('ProdutoX');
    expect(result).to.be.deep.equal(newProduct);
  });

  it('Testando se é possível atualuzar um produto', async function () {
    sinon.stub(connection, 'execute').resolves();
    const result = await productModel.updateProducts('Martelo do Batman', 1);
    expect(result).to.be.deep.equal(updateProducts);
  });

  it('Testando se é possível deletar um produto', async function () {
    sinon.stub(connection, 'execute').resolves();
    const result = await productModel.deleteProducts(1);
    expect(result).to.be.deep.equal();
  });
});