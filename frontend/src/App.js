import React, { useState, useEffect } from 'react';
import { getTasks, addTask, updateTask, deleteTask, completeTask } from './api/taskAPI';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [filter, setFilter] = useState('all'); // all, completed, uncompleted
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const response = await getTasks();
        setTasks(response.data.tasks);
    };

    const handleAddTask = async (newTask) => {
        await addTask(newTask);
        loadTasks();
    };

    const handleUpdateTask = async (updatedTask) => {
        await updateTask(updatedTask.id, { title: updatedTask.title, description: updatedTask.description });
        setEditingTask(null);
        loadTasks();
    };

    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        loadTasks();
    };

    const handleToggleComplete = async (id) => {
        await completeTask(id);
        loadTasks();
    };

    const startEdit = (task) => {
        setEditingTask(task);
    };

    const cancelEdit = () => {
        setEditingTask(null);
    };

    const filteredTasks = tasks
        .filter(task => (
            filter === 'all' ||
            (filter === 'completed' && task.completed) ||
            (filter === 'uncompleted' && !task.completed)
        ))
        .filter(task => task.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="App">
            <Navbar />
            <div className="container">
                <Sidebar filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} />
                <div className="main-content">
                    <h1>Gestion des Tâches</h1>
                    {editingTask ? (
                        <EditTask task={editingTask} onSave={handleUpdateTask} onCancel={cancelEdit} />
                    ) : (
                        <AddTask onAdd={handleAddTask} />
                    )}
                    <TaskList 
                        tasks={filteredTasks} 
                        onDelete={handleDeleteTask} 
                        onEdit={startEdit} 
                        onToggleComplete={handleToggleComplete} 
                    />
                </div>
            </div>
        </div>
    );
};

export default App;