const taskService = require('./task.service');

const getTasks = async(req, res) => {
    const tasks = await taskService.getTasks();
    res.json({ success: true, tasks });
};

const getTask = async (req, res, next) => {
    const { id } = req.params;
    try {
        const task = await taskService.getTask(id);
        res.json({ success: true, task });
    } catch (error) {
        next(new Error(error.message)); 
    }
};

const addTask = async(req, res, next) => {
    const { title, description } = req.body;
    try {
        const newTask = await taskService.addTask(title, description);
        res.status(201).json({ success: true, task: newTask });
    } catch (error) {
        next(new Error(error.message)); 
    }
};

const removeTask =async (req, res, next) => {
    const { id } = req.params;
    try {
        const success = await taskService.removeTask(id);
        if (success) {
            return res.status(200).json({ success: true, message: "Tâche supprimée avec succès" });
        } 
        
        throw new Error('Tâche introuvable');
    } catch (error) {
        next(error); 
    }
};

const updateTask = async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        // On ne passe que les valeurs définies, donc s'il n'y a pas de valeur, on envoie null
        const updatedTask = await taskService.updateTask(id, title !== undefined ? title : null, description !== undefined ? description : null);

        if (updatedTask) {
            res.json({ success: true, task: updatedTask });
        } else {
            res.status(404).json({ success: false, message: "Tâche non trouvée" });
        }
    } catch (error) {
        next(new Error(error.message));
    }
};

const completeTask = async(req, res, next) => {
    const id = parseInt(req.params.id);
    const updatedTask = await taskService.markTaskAsCompleted(id);

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