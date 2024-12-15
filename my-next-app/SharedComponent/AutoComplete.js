import React, { useState } from 'react';
import './css/Autocomplete.css';

const Autocomplete = ({ options, onOptionSelect, label }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      // const filtered = options.filter(option =>
      //   option.first.toLowerCase().includes(value.toLowerCase())
      // );

      const filterData = options.filter(item =>
        Object.keys(item).some(key =>
          item[key]?.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
      setFilteredOptions(filterData);
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  };

  const handleOptionClick = (optionT) => {
    setInputValue();
    setShowOptions(false);
    // const filtered = options.filter(option =>
    //   option.first.toLowerCase().includes(optionT.first.toLowerCase())
    // );

    let filterData = options.filter(item =>
      Object.keys(item).some(key =>
        item[key]?.toString().toLowerCase().includes(optionT.first.toLowerCase())
      )
    );
    onOptionSelect(filterData);
  };

  return (
    <div className="autocomplete" style={{ display: "flex" }}>
      <input
        type="text"
        style={{ height: "30px", width: "200px" }}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={() => {
          setInputValue("");
        }}
        placeholder="Type to search..."
      />
      {showOptions && (
        <ul className="autocomplete-options">
          {filteredOptions && filteredOptions.length > 0 ? (
            filteredOptions.map(option => (
              <li
                key={option.id}
                onClick={() => handleOptionClick(option)}
              >
                {`${option.first} ${option.last} ${option.email}`}
              </li>
            ))
          ) : (
            <li>No options found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
