// task.routes.js
const express = require('express');
const taskController = require('./task.controller');

const router = express.Router();

router.put('/:id/complete',taskController.completeTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTask);
router.post('/', taskController.addTask);
router.delete('/:id', taskController.removeTask);
router.put('/:id', taskController.updateTask);

module.exports = router;