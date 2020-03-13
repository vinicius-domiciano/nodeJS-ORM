const { Model, DataTypes } = require('sequelize');

class Games extends Model{

    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            descricao: DataTypes.TEXT,
        }, { 
            sequelize,
        })
    }

}

module.exports = Games;