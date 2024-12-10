const { Product } = require('./models/Product');
const { User } = require('./models/User');
const {sequelize, Sequelize} = require('./db/db');

Product.belongsTo(User, {foreignKey: 'ownerId'}); // Product table, there will be an ownerId <- FK
User.hasMany(Product);

module.exports = {
    Product,
    User,
    sequelize,
    Sequelize
};
