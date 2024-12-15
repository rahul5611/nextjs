import React, { useState } from 'react';
import './Dropdown.css';

const Dropdown = (props) => {

    const { options, onSelect, placeholder = "Select an user" } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
        props.onSelect(option)
    };

    return (
        <div className="dropdown">
            <button className="dropdown-button" onClick={toggleDropdown}> 
                {selectedOption ? selectedOption.label : placeholder}
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                    {options && options.length > 0 && options.map((option) => (
                        <li
                            key={option.value}
                            className="dropdown-item"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
