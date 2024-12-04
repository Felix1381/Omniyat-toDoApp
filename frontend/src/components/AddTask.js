import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

const AddTask = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ title, description });
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="p-fluid">
            <div className="p-field">
                <label htmlFor="newTaskTitle">Titre</label>
                <InputText 
                    id="newTaskTitle" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
            </div>
            <div className="p-field">
                <label htmlFor="newTaskDescription">Description</label>
                <InputTextarea 
                    id="newTaskDescription" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <Button type="submit" label="Ajouter Tâche" icon="pi pi-plus" />
        </form>
    );
};

export default AddTask;