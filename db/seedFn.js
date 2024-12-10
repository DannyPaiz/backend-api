const {sequelize} = require('../db/db');
const {User} = require('../models/User');
const {Product} = require('../models/Product');
const {users, products} = require('../db/seedData');

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // recreate db
    const createdUsers = await User.bulkCreate(users);
    const createdProducts = await Product.bulkCreate(products);
    for(let i=0; i<createdProducts.length; ++i){
        let product = createdProducts[i];
        const userId = createdUsers[i % 3].id;
        await product.setUser(userId);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = seed;
