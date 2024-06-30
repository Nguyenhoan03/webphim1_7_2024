'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.createTable('linkfilms', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.TEXT
      },
      episode: {
        type: Sequelize.TEXT
      },
      linkfilm: {
        type: Sequelize.TEXT
      },
     });
    
  },

  async down (queryInterface, Sequelize) {
 
    await queryInterface.dropTable('linkfilms');
     
  }
};
