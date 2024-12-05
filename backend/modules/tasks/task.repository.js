const sql = require('mssql');
const config = require('../../config/db.config');
const Task = require('./task.model');

const getAllTasks = async () => {
    try {
        await sql.connect(config);
        const result = await sql.query`EXEC GetAllTasks`;
        const data  = result.recordset.map(task => new Task(task.id, task.title, task.description, task.completed)); // Debug: voir ce que retourne la requête
        // return result.recordset.map(task => new Task(task.id, task.title, task.description, task.completed));
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getTaskById = async (id) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id', sql.Int, id);
        const result = await request.execute('GetTaskById');
        const taskData = result.recordset[0];
        return taskData ? new Task(taskData.id, taskData.title, taskData.description) : null;
    } catch (error) {
        throw new Error(error.message);
    }
};

const createTask = async (title, description) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('title', sql.VarChar, title);
        request.input('description', sql.VarChar, description);
        request.output('id', sql.Int); // Définir le paramètre de sortie
        await request.execute('CreateTask');

        const newTaskId = request.output.id; // Récupérer l'ID de la nouvelle tâche
        return new Task(newTaskId, title, description); // Retourner la nouvelle tâche
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteTask = async (id) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id', sql.Int, id);
        const result = await request.execute('DeleteTask');
        return result.rowsAffected > 0; // Vérifier si une ligne a été affectée
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateTask = async (id, updatedTitle, updatedDescription) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id', sql.Int, id);
        request.input('title', sql.VarChar, updatedTitle);
        request.input('description', sql.VarChar, updatedDescription);
        const result = await request.execute('UpdateTask'); 
        const updatedTaskData = result.recordset[0]; 
        return updatedTaskData ? new Task(updatedTaskData.id, updatedTaskData.title, updatedTaskData.description) : null;
    } catch (error) {
        throw new Error(error.message);
    }
};
const completeTask = async (id) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id', sql.Int, id);
        const result = await request.execute('CompleteTask');
        const completedTaskData = result.recordset[0];
        return completedTaskData ? new Task(completedTaskData.id, completedTaskData.title, completedTaskData.description, completedTaskData.completed) : null;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    deleteTask,
    updateTask,
    completeTask
};