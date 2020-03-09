const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../connections/conexao")
class Game extends Model{

    static init (){
        super.init({
            nome : {
                type: DataTypes.TEXT,
                allowNull: false
            },
            descricao:{
                type: DataTypes.TEXT,
                allowNull: false
            },
            lancamento: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        },{
            sequelize,
            timestamps: false,
            modelName: 'jogos'
        })
    }
    
}

module.exports = Game