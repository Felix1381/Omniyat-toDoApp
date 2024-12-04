import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import './css/EditTask.css';

const EditTask = ({ task, onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ id: task.id, title, description });
    };

    return (
        <form onSubmit={handleSubmit} className="p-fluid">
            <div className="p-field">
                <label htmlFor="title">Titre</label>
                <InputText
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="p-field">
                <label htmlFor="description">Description</label>
                <InputTextarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="p-d-flex p-jc-between">
                <Button type="submit" label="Enregistrer" icon="pi pi-save" />
                <Button 
                    type="button" 
                    label="Annuler" 
                    icon="pi pi-times" 
                    className="p-button-secondary" 
                    onClick={onCancel} 
                />
            </div>
        </form>
    );
};

export default EditTask;