module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: Sequelize.STRING
        },
        completed: {
            type: Sequelize.BOOLEAN
        },
        extraText: { // Add this field if you want to store additional text for tasks
            type: Sequelize.TEXT,
            allowNull: true, // Allows the field to be empty
        }

    });
  
    return Task;
};