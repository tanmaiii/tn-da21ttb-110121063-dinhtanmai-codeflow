'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('topics', 'teacherId');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('topics', 'teacherId', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    });
  },
};
