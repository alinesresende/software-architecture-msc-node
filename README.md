# Store Manager 🚀

### Development of a RESTful API using layered architecture

#### The built API is a sales management system in which it will be possible to create, visualize, delete and update products and sales.
  
<details>
  <summary>📝 Skills </summary>

- Interaction with a MySQL relational database;
- Implementation of an API using layered architecture;
- Created validations for the data received by the API;
- Write tests for APIs to ensure the implementation of endpoints;

</details>

<details>
<summary>🐳 Starting application in Docker Compose</summary>

```bash
# install the dependencies
npm install

# Start the `backend` and `db` compose containers
# The application will be available at `http://localhost:3001` in development mode
docker-compose up -d

# You can view application logs with `docker logs -n 20 -f <container-name>`
docker logs -n 20 -f store_manager
```

</details>

### 01 - Created endpoints to list products

- The endpoint for listing products must be accessible via the path `GET /products` and `GET /products/:id`;
- The `GET /products` path, all products must be returned;
- The `GET /products/:id` path, only the product with the `id` present in the URL must be returned;
- The listing result must be **sorted** in ascending order by the `id` field;
- Created tests that guarantee the implemented functionality;

---

### 02 - Created endpoints to list sales

- The endpoint for listing sales must be accessible via the path `GET /sales` and `GET /sales/:id`;
- The `GET /sales` path, all sales must be returned;
- The `GET /sales/:id` path, only the sale with the `id` present in the URL must be returned;

----
  
### 03 - Created endpoint to register products

- The endpoint must be accessible via the `POST /products` path;
- The shipped products must be saved in the `products` database table;
---

### 04 - Created validations for product registration

- The product registration endpoint must return error messages for requests with invalid data;

 ---

### 05 - Created endpoint to register sales

- The sales endpoint must be accessible via the `POST /sales` path;
- Submitted sales must be saved in the `sales` and `sales_products` database tables;

---

### 06 - Created validations for the sales register

- The sales master endpoint should return error messages for requests with invalid data;

---

### 07 - Created endpoint to update a product

- The endpoint must be accessible via the `PUT /products/:id` path;
  
---

### 08 - Created endpoint to delete a product

- The endpoint must be accessible via the `DELETE /products/:id` path;

--- 

### 09 - Created endpoint to delete a sale

- The endpoint must be accessible via the `DELETE /sales/:id` path;

---

### 10 - Created endpoint to update the quantity of a product in a sale

- The endpoint must be accessible via the path `/sales/:saleId/product/:productId/quantity`;

--- 
  
### 11 - Created endpoint for searching products

- The endpoint must be accessible via the `GET /products/search` URL;

