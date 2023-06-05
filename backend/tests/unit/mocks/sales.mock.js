const sales = [
  {
    saleId: 1,
    date: '2023-05-2719:48:43.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-05-27T19:41:43.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-05-27T19:48:43.000Z',
    productId: 3,
    quantity: 15,
  },
];

const salesById = [
  {
    saleId: 1,
    date: '2023-05-27T19:48:43.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-05-27T19:48:43.000Z',
    productId: 2,
    quantity: 10,
  },
];

const salesIdIncorrect = [
  {
    saleId: [],
    date: '2023-05-27T19:48:43.000Z',
    productId: 1,
    quantity: 5,
  },
];

const newInsertSales = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];  

const newSales = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const exampleDataIncorrect = [
  {
    productId: 1,
    quantity: 0,
  },
  {
    productId: 2,
    quantity: 0,
  },
];  

const quantityIncorrect = [
  {
    productId: 1,
  },
  {
    productId: 2,
  },
];

const productIdIncorrect = [
  {
    quantity: 1,
  },
  {
    quantity: 1,
  },
];  

module.exports = { sales,
salesById,
newInsertSales,
salesIdIncorrect,
newSales,
exampleDataIncorrect,
quantityIncorrect,
productIdIncorrect };