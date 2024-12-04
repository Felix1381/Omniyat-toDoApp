import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDelete, onEdit, onToggleComplete }) => {
    if (!tasks.length) {
        return <p>Aucune tâche disponible.</p>;
    }

    return (
        <div className="task-list">
            {tasks.map(task => (
                <TaskItem 
                    key={task.id} 
                    task={task} 
                    onDelete={onDelete} 
                    onEdit={onEdit} 
                    onToggleComplete={onToggleComplete} 
                />
            ))}
        </div>
    );
};

export default TaskList;