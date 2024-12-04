const Task = require('./task.model');

let tasks = [
    new Task(1, "Finaliser les applications", "Application de gestion de stock"),
    new Task(2, "faire les courses", "Acheter un ordinateur, un disque dur et changer la batterie ASUS")
];

const getAllTasks = () => tasks;

const getTaskById = (id) => {
    return tasks.find(task => task.id == id);
};


const createTask = (title, description) => {
    const newTask = new Task(tasks.length + 1, title,description);
    tasks.push(newTask);
    return newTask;
};


const deleteTask = (id) => {
    const index = tasks.findIndex(task => task.id == id);
    if (index > -1) {
        tasks.splice(index, 1);
        return true;
    }
    return false;
};

const updateTask = (id, updatedTitle, updatedDescription) => {
    const task = getTaskById(id);
    if (task) {
        task.title = updatedTitle || task.title  ;
        task.description =  updatedDescription || task.description;
        return task;
    }
    return null;
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    deleteTask,
    updateTask,
};