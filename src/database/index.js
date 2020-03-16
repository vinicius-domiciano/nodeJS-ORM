const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Games = require('../models/Games');
const Developer = require('../models/Desenvolvedores');
const Consoles = require('../models/Consoles');

const connection = new Sequelize(dbConfig);

Games.init(connection)
Developer.init(connection);
Consoles.init(connection)


Games.association(connection.models)
Developer.association(connection.models)
Consoles.association(connection.models)

module.exports = connection;