const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Games = require('../models/Games');

const connection = new Sequelize(dbConfig);

Games.init(connection)

module.exports = connection;