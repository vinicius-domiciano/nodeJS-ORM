const { Model, DataTypes } = require('sequelize');

class Games extends Model{

    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            descricao: DataTypes.TEXT,
            image:DataTypes.TEXT,
        }, { 
            sequelize,
        })
    }

    static association(models) {
        this.belongsTo(models.Desenvolvedores, { 
            foreignKey: 'id_desenvolvedor', 
            as: 'desenvolvedor' 
        })

        this.belongsToMany(models.Consoles, {
            foreignKey: 'id_game',
            through: 'plataformas',
            as: 'consoles',
        })

    }

}

module.exports = Games;