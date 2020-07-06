'use strict';
const Sequelize = require("sequelize");
const constants = require('../../config/constants');

const UserModel = require("../models/user.model");

/**
 * Functionality used to connect the mysql
 * database as per the requirement. 
 * Can be invoked when the server started
 */

/**
 * Sequelize: 
 * 1. promise-based ORM(a form of abstraction for common SQL operations) for Node
 * 2. allows us to map relational database to objects
 * 3. 
 */

/**
 * STEPS FOLLOWED : 
 * ----------------
 * Instantiate Sequelize and define all details necessary for connecting to the database
 * Instantiate models by passing a sequelize instance and library itself to required model files
 * Define their relationships if any
 */
const sequelize = new Sequelize(
    constants.DB.DB_NAME, 
    constants.DB.USER, 
    constants.DB.PASSWORD, 
    {
        host: constants.DB.HOST,
        dialect: constants.DB.dialect,
        operatorsAliases: false,
        pool: {
            max: constants.DB.pool.max,
            min: constants.DB.pool.min,
            acquire: constants.DB.pool.acquire,
            idle: constants.DB.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = UserModel(sequelize, Sequelize);

db.sequelize.sync({
    force: constants.DB.DROP_AND_RESYNC
});

sequelize
.authenticate()
.then(function(err) {
console.log('Database Connection has been established successfully.');
})
.catch(function (err) {
console.log('Unable to connect to the database:', err);
});


module.exports = {
    db
};