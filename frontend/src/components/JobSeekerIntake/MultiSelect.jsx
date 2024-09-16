import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  z-index: 1000;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #3a3a3a;
  border: 1px solid #4a4a4a;
  border-radius: 4px;
  text-align: left;
  cursor: pointer;
  color: #e0e0e0;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #4a4a4a;
  }

  &:focus {
    outline: none;
    border-color: #6a6a6a;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  border: 2px solid #4a4a4a;
  border-top: none;
  border-radius: 0 0 4px 4px;
  list-style-type: none;
  padding: 0;
  margin: 0;
  z-index: 1001;
  box-shadow: 0 4px 8px rgba(0,0,0,0.4);
`;

const DropdownItem = styled.li`
  padding: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #e0e0e0;

  &:hover {
    background-color: #3a3a3a;
  }

  ${props => props.selected && `
    background-color: #4a4a4a;
    font-weight: bold;
  `}
`;

const SelectedItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SelectedItem = styled.span`
  background-color: #4a4a4a;
  color: #e0e0e0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #e0e0e0;
  cursor: pointer;
  margin-left: 0.5rem;
  font-size: 1rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`;

const MultiSelect = ({ options, value, onChange, placeholder, maxSelections = 3 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleOption = (option) => {
    const newValue = value.includes(option)
      ? value.filter(item => item !== option)
      : [...value, option].slice(0, maxSelections);
    onChange(newValue);
  };

  const removeOption = (option) => {
    onChange(value.filter(item => item !== option));
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {value.length > 0 ? `${value.length} selected` : placeholder}
      </DropdownButton>
      {isOpen && (
        <DropdownList>
          {options.map(option => (
            <DropdownItem
              key={option}
              onClick={() => toggleOption(option)}
              selected={value.includes(option)}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
      <SelectedItems>
        {value.map(item => (
          <SelectedItem key={item}>
            {item}
            <RemoveButton onClick={() => removeOption(item)}>×</RemoveButton>
          </SelectedItem>
        ))}
      </SelectedItems>
    </DropdownContainer>
  );
};

export default MultiSelect;
