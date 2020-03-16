const { Model, DataTypes } = require('sequelize')

class Consoles extends Model{

    static init(sequelize) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },{
            sequelize
        })
    }

    static association(models) {
        this.belongsToMany(models.Games, {
            foreignKey: 'id_console',
            through: 'plataformas',
            as: 'games',
        })
    }

}

module.exports = Consoles;