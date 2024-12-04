const taskRepository = require('./task.repository');

const getTasks = () => {
    return taskRepository.getAllTasks();
};

const getTask = (id) => {
    const task = taskRepository.getTaskById(id);
    if (!task) {
        throw new Error('Tâche non trouvée');
    }
    return task;
};

const addTask = (title, description) => {
    if (!title || typeof title !== 'string' || title.trim() === '') {
        throw new Error('Le titre de la tâche est requis et doit être une chaîne non vide');
    }
    if (!description || typeof description !== 'string' || description.trim() === '') {
        throw new Error('La description de la tâche est requise et doit être une chaîne non vide');
    }
    return taskRepository.createTask(title,description);
};

const removeTask = (id) => {
    return taskRepository.deleteTask(id);
};

const updateTask = (id, title, description) => {

    return taskRepository.updateTask(id, title, description);
};
const markTaskAsCompleted = (id) =>{
    const task = taskRepository.getTaskById(id);
    if (task) {
        task.completed = true; // Mettre à jour le champ completed
        return task;
    }
    return null; // Si la tâche n'existe pas, retourner null
}
module.exports = {
    getTasks,
    addTask,
    removeTask,
    getTask,
    updateTask,
    markTaskAsCompleted
};