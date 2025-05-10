import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/LanguageSwitcher.css";

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  const languages = [
    {
      code: "en",
      name: "English",
      flag: "/public/en-flag.png",
    },
    {
      code: "es",
      name: "Español",
      flag: "/public/flag-es.png",
    },
  ];

  const selectedLanguage =
    languages.find((lang) => lang.code === language) || languages[0];

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button
        className="language-selector"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="selected-language">{selectedLanguage.name}</span>
        <img
          src={selectedLanguage.flag || "/placeholder.svg"}
          alt={selectedLanguage.name}
          className="flag-icon"
        />
      </button>

      {isOpen && (
        <div className="language-dropdown" role="listbox">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${
                language === lang.code ? "active" : ""
              }`}
              onClick={() => handleLanguageChange(lang.code)}
              role="option"
              aria-selected={language === lang.code}
            >
              <img
                src={lang.flag || "/placeholder.svg"}
                alt={lang.name}
                className="flag-icon"
              />
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
