import React from 'react';
import styled from 'styled-components';

const PreferenceContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`;

const PreferenceButton = styled.button`
  background-color: ${props => props.selected ? '#4a90e2' : '#3a3a3a'};
  color: #e0e0e0;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.selected ? '#3a80d2' : '#4a4a4a'};
  }
`;

const culturePreferenceOptions = [
  "Collaborative", "Innovative", "Inclusive", "Transparent", "Flexible",
  "Diverse", "Growth-Oriented", "Team-Driven", "Results-Focused", "Customer-Centric",
  "Work-Life Balance", "Empathetic", "Fast-Paced", "Accountability", "Autonomous",
  "Creative", "Supportive", "Entrepreneurial", "Sustainability-Focused", "High-Performance",
  "Trustworthy", "Purpose-Driven", "Agile", "Open-Minded", "Data-Driven"
];

const CulturePreferenceSelector = ({ selectedPreferences, setSelectedPreferences }) => {
  const togglePreference = (preference) => {
    if (selectedPreferences.includes(preference)) {
      setSelectedPreferences(selectedPreferences.filter(p => p !== preference));
    } else if (selectedPreferences.length < 3) {
      setSelectedPreferences([...selectedPreferences, preference]);
    }
  };

  return (
    <PreferenceContainer>
      {culturePreferenceOptions.map((preference, index) => (
        <PreferenceButton
          key={index}
          selected={selectedPreferences.includes(preference)}
          onClick={() => togglePreference(preference)}
        >
          {preference}
        </PreferenceButton>
      ))}
    </PreferenceContainer>
  );
};

export default CulturePreferenceSelector;
