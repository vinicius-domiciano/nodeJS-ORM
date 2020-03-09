const { Sequelize } = require('sequelize');

const sequelize =  new Sequelize('DataBase', 'User', 'Password', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
            .then(() => {
                console.log('conexao realizada com sucesso')
            })
            .catch((erro) => console.log("erro:" + erro));

module.exports = sequelize;