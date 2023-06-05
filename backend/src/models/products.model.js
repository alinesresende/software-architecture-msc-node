const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return products;
};

const getProductById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  // exemplo retorno do connection
  // [
  //   [
  //     {id: 1, name: "one"},
  //   ],
  //   ...
  // ]
  // const [item1] = product.message;
  return product;
};

const insertProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.products (name) VALUES (?)',
      [name],
);
  return {
  id: insertId,
  name,
};
};

const updateProducts = async (name, id) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
);
    return {
      id,
      name,
    };
};

const deleteProducts = async (id) => {
  await connection.execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProducts,
  deleteProducts,
};
