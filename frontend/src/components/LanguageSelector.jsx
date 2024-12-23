import React from 'react';

const LanguageSelector = ({ currentLanguage, onChangeLanguage }) => {
  const languages = ['English', 'Tamil', 'Hindi'];

  return (
    <div>
      <select value={currentLanguage} onChange={(e) => onChangeLanguage(e.target.value)}>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
