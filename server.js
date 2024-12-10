const express = require('express');
const { sequelize } = require('./models/Product');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('./controllers/productController');

const app = express();

app.use(express.json());

// Define CRUD routes
app.post('/products', createProduct);
app.get('/products', getAllProducts);
app.get('/products/:id', getProductById);
app.put('/products/:id', updateProduct);
app.delete('/products/:id', deleteProduct);

// Export the app for testing purposes
module.exports = app;

// Separate function to start the server
if (require.main === module) {
  (async () => {
    try {
      await sequelize.sync();
      app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
      });
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();
}