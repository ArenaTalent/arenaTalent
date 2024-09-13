import React, { useState } from 'react';
import styled from 'styled-components';

const LanguageContainer = styled.div`
  position: relative;
`;

const LanguageInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
`;

const LanguageList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-top: none;
  list-style-type: none;
  padding: 0;
  margin: 0;
  z-index: 1;
`;

const LanguageItem = styled.li`
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SelectedLanguages = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const LanguageTag = styled.span`
  background-color: #e0e0e0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
`;

const RemoveLanguage = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
  font-size: 1rem;
`;

const languageOptions = [
  "English", "Spanish", "Mandarin Chinese", "French", "German", "Japanese", "Russian", "Portuguese",
  "Arabic", "Hindi", "Italian", "Korean", "Dutch", "Turkish", "Swedish", "Polish", "Greek",
  "Vietnamese", "Hebrew", "Thai", "Indonesian", "Danish", "Finnish", "Norwegian", "Czech"
];

const LanguageSelector = ({ selectedLanguages, setSelectedLanguages }) => {
  const [inputValue, setInputValue] = useState('');
  const [showList, setShowList] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowList(true);
  };

  const handleSelectLanguage = (language) => {
    if (!selectedLanguages.includes(language)) {
      setSelectedLanguages([...selectedLanguages, language]);
    }
    setInputValue('');
    setShowList(false);
  };

  const handleRemoveLanguage = (language) => {
    setSelectedLanguages(selectedLanguages.filter(lang => lang !== language));
  };

  const filteredOptions = languageOptions.filter(
    lang => lang.toLowerCase().includes(inputValue.toLowerCase()) && !selectedLanguages.includes(lang)
  );

  return (
    <LanguageContainer>
      <LanguageInput
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowList(true)}
        onBlur={() => setTimeout(() => setShowList(false), 200)}
        placeholder="Type to search languages"
      />
      {showList && (
        <LanguageList>
          {filteredOptions.map((lang, index) => (
            <LanguageItem key={index} onClick={() => handleSelectLanguage(lang)}>
              {lang}
            </LanguageItem>
          ))}
        </LanguageList>
      )}
      <SelectedLanguages>
        {selectedLanguages.map((lang, index) => (
          <LanguageTag key={index}>
            {lang}
            <RemoveLanguage onClick={() => handleRemoveLanguage(lang)}>×</RemoveLanguage>
          </LanguageTag>
        ))}
      </SelectedLanguages>
    </LanguageContainer>
  );
};

export default LanguageSelector;
