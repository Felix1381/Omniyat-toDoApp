const taskRepository = require('./task.repository');

const getTasks = async() => {
    return await taskRepository.getAllTasks();
};

const getTask = async (id) => {
    const task = await taskRepository.getTaskById(id);
    if (!task) {
        throw new Error('Tâche non trouvée');
    }
    return task;
};

const addTask = async (title, description) => {
    if (!title || typeof title !== 'string' || title.trim() === '') {
        throw new Error('Le titre de la tâche est requis et doit être une chaîne non vide');
    }
    if (!description || typeof description !== 'string' || description.trim() === '') {
        throw new Error('La description de la tâche est requise et doit être une chaîne non vide');
    }
    return await taskRepository.createTask(title, description);
};

const removeTask = async (id) => {
    return await taskRepository.deleteTask(id);
};

const updateTask = async (id, title, description) => {
    // Si title ou description est undefined, on les remplace par null pour garder les anciennes valeurs
    const updatedTitle = title !== undefined ? title : null;
    const updatedDescription = description !== undefined ? description : null;

    return await taskRepository.updateTask(id, updatedTitle, updatedDescription);
};

const markTaskAsCompleted = async (id) => {
    const task = await taskRepository.getTaskById(id);
    if (task) {
        await taskRepository.completeTask(id); // Passer 'true' ou un flag pour indiquer que c'est pour compléter
        return task;
    }
    return null; // Si la tâche n'existe pas, retourner null
};

module.exports = {
    getTasks,
    addTask,
    removeTask,
    getTask,
    updateTask,
    markTaskAsCompleted,
};