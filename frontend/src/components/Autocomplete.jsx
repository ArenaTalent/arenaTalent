import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AutocompleteWrapper = styled.div`
  position: relative;
`;

const AutocompleteInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: #000;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-top: none;
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1;
`;

const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Autocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 2) {
        try {
          const response = await axios.get(`/api/colleges?query=${query}`);
          setSuggestions(response.data);
        } catch (error) {
          console.error('Error fetching college suggestions:', error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleSelect = (college) => {
    setQuery(college.name);
    setSuggestions([]);
    onSelect(college);
  };

  return (
    <AutocompleteWrapper>
      <AutocompleteInput
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter college name"
      />
      {suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((college) => (
            <SuggestionItem key={college.id} onClick={() => handleSelect(college)}>
              {college.name}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </AutocompleteWrapper>
  );
};

export default Autocomplete;
