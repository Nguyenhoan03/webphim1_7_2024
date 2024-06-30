'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
     await queryInterface.createTable('product', {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title:{
        allowNull: true,
        type: Sequelize.TEXT
      },
      hinhanh:{
        allowNull: true,
        type: Sequelize.TEXT
      },
      nameenglish:{
        allowNull: true,
        type: Sequelize.TEXT
      },
      trangthai:{
        allowNull: true,
        type: Sequelize.TEXT
      },
      sotap:{
        allowNull: true,
        type: Sequelize.TEXT
      },
      thoiluong:{
        allowNull: true,
        type: Sequelize.TEXT
      },
      namphathanh:{
        allowNull: true,
        type: Sequelize.TEXT
      },
      chatluong:{
        allowNull: true,
        type: Sequelize.TEXT
      },
      ngonngu:{
        allowNull: true,
        type: Sequelize.TEXT
      },
      daodien:{
        allowNull: true,
        type: Sequelize.TEXT
      },
      dienvien:{
        allowNull: true,
        type: Sequelize.TEXT
      },
      theloai:{
        allowNull: true,
        type: Sequelize.TEXT
      },
      quocgia:{
        allowNull: true,
        type: Sequelize.TEXT
      },
      descripts:{
        allowNull: true,
        type: Sequelize.TEXT
      },
      views:{
        allowNull:true,
        type:Sequelize.INTEGER
      },
      likes:{
        allowNull:true,
        type:Sequelize.INTEGER
      },
      category_id:{
        allowNull:true,
        type:Sequelize.INTEGER
      }
      
   
    });
  },
     
      

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
