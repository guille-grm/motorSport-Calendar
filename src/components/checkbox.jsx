import React from 'react';
import './checkbox.css';

  export const Checkbox = ({title, options, selectedCategories, setSelectedCategories}) => {
    const allSelected = options.every(opt => selectedCategories.includes(opt));
  
    const toggleAll = () => {
      if (allSelected) {
        setSelectedCategories(prev => prev.filter(cat => !options.includes(cat)));
      } else {
        setSelectedCategories(prev => [...new Set([...prev, ...options])]);
      }
    };
  
    const toggleOption = (opt) => {
      setSelectedCategories(prev =>
        prev.includes(opt)
          ? prev.filter(c => c !== opt)
          : [...prev, opt]
      );
    };
  
    return (
      <details className="checkbox" open>
        <summary>
          <label>
            {title}
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleAll}
            />
          </label>
        </summary>
        <div>
          {options.map((label, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`option-${index}`}
                name={`option-${index}`}
                checked={selectedCategories.includes(label)}
                onChange={() => toggleOption(label)}
                value={label.toLowerCase()}
              />
              <label htmlFor={`option-${index}`}>{label}</label>
            </div>
          ))}
        </div>
      </details>
    );
  };
  