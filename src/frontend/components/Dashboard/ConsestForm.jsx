import React, { useState } from 'react';
import Select from 'react-select';
import './ContestForm.css';

const ContestForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  
  const problemOptions = [
    { value: 'Problem 1', label: 'Problem 1' },
    { value: 'Problem 2', label: 'Problem 2' },
    { value: 'Problem 3', label: 'Problem 3' },
    { value: 'Problem 4', label: 'Problem 4' },
    { value: 'Problem 5', label: 'Problem 5' },
    { value: 'Problem 6', label: 'Problem 6' },
    { value: 'Problem 7', label: 'Problem 7' }
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      title,
      description,
      startTime,
      endTime,
      selectedItems,
    });
  };

  return (
    <div className="contest-form" style={{marginLeft: '10%', marginTop: '20px'}}>
      <form onSubmit={handleSubmit} className="coding-contest-form">
        <h2>Submit a New Contest</h2>
        <label>
          Contest Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" />
        </label>
        <br />
        <label>
          Contest Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-textarea" />
        </label>
        <br />
        <label>
          Start Time:
          <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="form-input" />
        </label>
        <br />
        <label>
          End Time:
          <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="form-input" />
        </label>
        <br />
        <label>
          Select Problems (Maximum 5):
          <Select
            options={problemOptions}
            isMulti
            value={selectedItems}
            onChange={(selectedOptions) => setSelectedItems(selectedOptions.slice(0, 5))}
            className="form-select"
            placeholder="Search and select problems..."
          />
        </label>
        <br />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContestForm;