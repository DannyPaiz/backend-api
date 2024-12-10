const {User} = require('../models/User');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:', // Use in-memory storage for SQLite
});

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Define association
    // Product.belongsTo(User, { foreignKey: 'ownerId' });
    // User.hasMany(Product);

module.exports = { Product, sequelize };