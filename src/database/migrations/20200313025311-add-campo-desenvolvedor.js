'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('games','id_desenvolvedor', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'desenvolvedores',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      })
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.removeColumn('games','id_desenvolvedor')
  }
};
