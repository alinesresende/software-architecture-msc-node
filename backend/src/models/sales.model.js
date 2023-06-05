const connection = require('./connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT s.id AS saleId, s.date, p.product_id AS productId, p.quantity 
    FROM StoreManager.sales s 
    INNER JOIN StoreManager.sales_products p 
    ON s.id = p.sale_id
    ORDER BY s.id ASC, p.product_id ASC`,
  );
  return sales;
};

const getSaleById = async (id) => {
  const [sales] = await connection.execute(
    `SELECT s.date, p.product_id AS productId, p.quantity
    FROM StoreManager.sales s
    INNER JOIN StoreManager.sales_products p
    ON s.id = p.sale_id
    WHERE s.id = ?
    ORDER BY s.id ASC, p.product_id ASC`,
    [id],
  );
    // exemplo retorno do connection
  // [
  //   [
  //     {id: 1, name: "one"},
  //     {id: 2, name: "one"},
  //   ],
  //   ...
  // ]
  return sales;
};

const insertSales = async (listProduct) => {
  // 1 - criar uma SALE
  // 2 - insertId é id da nova SALE
  // 3 - listProduct são produtos a serem cadastrados
  const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.sales () VALUES ()',
);
  const newSales = listProduct.map(async ({ productId, quantity }) => {
    await connection.execute(`INSERT INTO StoreManager.sales_products 
    (sale_id, product_id, quantity) VALUES (?, ?, ?)`, [insertId, productId, quantity]);
  });
  await Promise.all(newSales);
  return {
    id: insertId,
    itemsSold: listProduct,
  };
}; 

const updateSales = async (quantity, saleId, productId) => {
   await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, saleId, productId],
    );

   const [[{ date }]] = await connection.execute(
    'SELECT date FROM StoreManager.sales WHERE id = ?',
     [saleId],
    );
    return {
      date,
      productId: Number(productId),
      quantity,
      saleId: Number(saleId),
    };
};

const deleteSales = async (id) => {
 await connection.execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSales,
  updateSales,
  deleteSales,
};