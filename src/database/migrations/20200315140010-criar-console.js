'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('consoles', {
      id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false
     },
     nome: {
       type: Sequelize.STRING(78),
       allowNull: false,
     },
     created_at: {
       type: Sequelize.DATE,
       allowNull: false,
     },
     updated_at: {
       type: Sequelize.DATE,
       allowNull: false,
     },
   });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('consoles');
  }
};
