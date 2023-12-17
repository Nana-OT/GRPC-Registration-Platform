import React, { useState } from 'react';
import '../App.css';

const Multicast = ({ entries, onMulticast }) => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [multicastMessage, setMulticastMessage] = useState('');
  const [multicastRecipient, setMulticastRecipient] = useState('');

  const handleSearch = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    const filteredSuggestions = entries.filter((entry) =>
      entry.firstName.toLowerCase().includes(input.toLowerCase()) ||
      entry.lastName.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setSearchInput(`${suggestion.firstName} ${suggestion.lastName}`);
    setSuggestions([]);
  };

  const handleMulticast = () => {
    if (selectedSuggestion && multicastMessage && multicastRecipient) {
      onMulticast(selectedSuggestion, multicastRecipient, multicastMessage);
      setSearchInput('');
      setMulticastMessage('');
      setMulticastRecipient('');
      setSelectedSuggestion(null);
    } else {
      alert('Please select a valid entry and provide recipient name and message to multicast.');
    }
  };

  const handleReset = () => {
    setSearchInput('');
    setSuggestions([]);
    setSelectedSuggestion(null);
  };

  return (
    <div className="multicast-window">
      <form>
        <div className='search-container'>
          <input
            type="text"
            id="search"
            name="search"
            value={searchInput}
            onChange={handleSearch}
            placeholder='Search by name'
            required
          />
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={selectedSuggestion === suggestion ? 'selected' : ''}
                >
                  {`${suggestion.firstName} ${suggestion.lastName}`}
                </li>
              ))}
            </ul>
          )}
        </div>

        <label htmlFor="multicastRecipient">Recipient's Name:</label>
        <input
          type="text"
          id="multicastRecipient"
          value={multicastRecipient}
          onChange={(e) => setMulticastRecipient(e.target.value)}
          required
        />

        <label htmlFor="multicastMessage">Message:</label>
        <textarea
          id="multicastMessage"
          value={multicastMessage}
          onChange={(e) => setMulticastMessage(e.target.value)}
          required
        />

        <div className="multicast-btns">
          <button className="reset-btn" type="reset" onClick={handleReset}>
            Reset
          </button>
          <button type="button" onClick={handleMulticast}>
            Multicast
          </button>
          <button className="close-btn">Close</button>
        </div>
      </form>
    </div>
  );
};

export default Multicast;
