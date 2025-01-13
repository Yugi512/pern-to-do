'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Users',{
      userID:{
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      userName:{
          type:DataTypes.STRING,
          allowNull:false,
      },
      userEmail:{
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
      },
      userPassword:{
          type: DataTypes.STRING,
          allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
  }
};
