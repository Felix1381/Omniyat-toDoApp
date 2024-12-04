import React from 'react';
import './css/Sidebar.css';
import { InputText } from 'primereact/inputtext';

const Sidebar = ({ filter, setFilter, search, setSearch }) => {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Filtres</h2>
            <InputText 
                type="text" 
                placeholder="Rechercher par nom..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className="search-input"
            />
            <h3 className="filter-title">Afficher :</h3>
            <div className="filter-options">
                <label>
                    <input 
                        type="radio" 
                        value="all" 
                        checked={filter === 'all'} 
                        onChange={() => setFilter('all')} 
                    /> 
                    Toutes
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="completed" 
                        checked={filter === 'completed'} 
                        onChange={() => setFilter('completed')} 
                    /> 
                    Complétées
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="uncompleted" 
                        checked={filter === 'uncompleted'} 
                        onChange={() => setFilter('uncompleted')} 
                    /> 
                    Non Complétées
                </label>
            </div>
        </div>
    );
};

export default Sidebar;