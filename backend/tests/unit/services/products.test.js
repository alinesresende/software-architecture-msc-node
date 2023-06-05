const chai = require('chai');
const sinon = require('sinon');
const productModel = require('../../../src/models/products.model');
const productService = require('../../../src/services/products.service');
const { products, newProduct, updateProducts } = require('../mocks/products.mock');

const { expect } = chai;

describe('Teste da camada Service', function () {
  it('Testando se retorna todos produtos getAllProducts', async function () {
    sinon.stub(productModel, 'getAllProducts').resolves(products);
    const result = await productService.getAllProducts();
    expect(result).to.be.deep.equal(products);
  });

  it('Testando se retorna um produto com id igual 1', async function () {
    sinon.stub(productModel, 'getProductById').resolves(products[0]);
    const result = await productService.getProductById(1);
    expect(result).to.be.deep.equal({ type: 200, result: products[0] });
  });

  it('Testando se é possível cadastrar um produto', async function () {
    sinon.stub(productModel, 'insertProduct').resolves(newProduct);
    const result = await productService.insertProduct();
    expect(result).to.be.deep.equal({ type: 201, result: newProduct });
  });

  it('Testando se é possível atualuzar um produto', async function () {
    sinon.stub(productModel, 'updateProducts').resolves(updateProducts);
    const result = await productService.updateProducts();
    expect(result).to.be.deep.equal({ type: 200, result: updateProducts });
  });

  it('Testando se é possível deletar um produto', async function () {
    sinon.stub(productModel, 'deleteProducts').resolves();
    const result = await productService.deleteProducts();
    expect(result).to.be.deep.equal({ type: 204 });
  });
});