import React, {useState} from 'react';
import {Checkbox} from "./checkbox.jsx";
import './sidebar.css';

export const Sidebar = ({selectedCategories, setSelectedCategories}) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div>
        <button 
          className="sidebar-toggle" 
          onClick={toggleSidebar}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? '✕' : '☰'}
        </button>
        
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
          <h2>Motor Sport Calendar</h2>
          <h3>Check your favourites categories</h3>
          <div className='sidebar-checkbox'>
            <Checkbox
              title="Formulas"
              options={["F1", "F2", "F3"]}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
            <Checkbox
              title="SportCars"
              options={["WEC"]}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
            <Checkbox
              title="IMSA"
              options={["MX5", "Mustang"]}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
        </div>
      </div>
    );
  };