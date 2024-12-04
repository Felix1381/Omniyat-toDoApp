import React from 'react';
import { Button } from 'primereact/button';

const TaskItem = ({ task, onDelete, onEdit, onToggleComplete }) => {
    const handleToggleComplete = () => {
        onToggleComplete(task.id);
    };

    return (
        <div className={`task-card ${task.completed ? 'completed' : ''}`}>
            <div className="task-card-content">
                <strong>{task.title}</strong>
                <p>{task.description}</p>
            </div>
            <div className="task-card-actions">
                <Button 
                    icon="pi pi-pencil" 
                    onClick={() => onEdit(task)} 
                    className="p-button-text"
                />
                <Button 
                    icon="pi pi-check" 
                    onClick={handleToggleComplete} 
                    className="p-button-text"
                    disabled={task.completed}
                />
                <Button 
                    icon="pi pi-trash" 
                    onClick={() => onDelete(task.id)} 
                    className="p-button-text"
                />
            </div>
        </div>
    );
};

export default TaskItem;