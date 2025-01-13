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
    await queryInterface.createTable('Tasks',{
      id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      taskName:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      taskDescription:{
        type:DataTypes.STRING(300),
        allowNull: false
      },
      userID:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'userID'
        }
      },
      completed: {
        type:DataTypes.BOOLEAN,
        allowNUll: true
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
    await queryInterface.dropTable('Tasks')
  }
};
