const taskService = require('./task.service');

const getTasks = (req, res) => {
    const tasks = taskService.getTasks();
    res.json({ success: true, tasks });
};

const getTask = (req, res, next) => {
    const { id } = req.params;
    try {
        const task = taskService.getTask(id);
        res.json({ success: true, task });
    } catch (error) {
        next(new Error(error.message)); 
    }
};

const addTask = (req, res, next) => {
    const { title, description } = req.body;
    try {
        const newTask = taskService.addTask(title, description);
        res.status(201).json({ success: true, task: newTask });
    } catch (error) {
        next(new Error(error.message)); 
    }
};

const removeTask = (req, res, next) => {
    const { id } = req.params;
    try {
        const success = taskService.removeTask(id);
        if (success) {
            return res.status(200).json({ success: true, message: "Tâche supprimée avec succès" });
        } 
        
        throw new Error('Tâche introuvable');
    } catch (error) {
        next(error); 
    }
};

const updateTask = (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const updatedTask = taskService.updateTask(id, title, description);
        res.json({ success: true, task: updatedTask });
    } catch (error) {
        next(new Error(error.message)); 
    }
};

const completeTask = (req, res, next) => {
    const id = parseInt(req.params.id);
    const updatedTask = taskService.markTaskAsCompleted(id);

    if (updatedTask) {
        return res.status(200).json({ success: true, message: 'Tâche mise à jour avec succès', task: updatedTask });
    }
    next(new Error('Tâche non trouvée')); 
};

module.exports = {
    getTasks,
    getTask,
    addTask,
    removeTask,
    updateTask,
    completeTask,
};