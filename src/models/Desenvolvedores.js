const { Model, DataTypes } = require('sequelize');

class Desenvolvedores extends Model{

    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
        }, {
			sequelize
        })
	}
	
	static association(models){
		this.hasMany(models.Games, {
			foreignKey: 'id_desenvolvedor',
			as: 'desenvolvedor'
		})
	}

}

module.exports = Desenvolvedores;