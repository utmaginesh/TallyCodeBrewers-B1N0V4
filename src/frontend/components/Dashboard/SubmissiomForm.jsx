import React, { useState } from 'react';
import './SubmissionForm.css';

const SubmissionForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [constraints, setConstraints] = useState('');
  const [testCases, setTestCases] = useState([
    { content: '', explanation: '' },
  ]);
  const [solution, setSolution] = useState('');
  const [language, setLanguage] = useState('');
  const [tags, setTags] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestBody = {
      title: title,
      description: description,
      level: difficulty,
      solutionCode: solution,
      testCases: testCases.map(tc => ({
        input: tc.content.split('->')[0].trim(),
        output: tc.content.split('->')[1]?.trim() || ''
      })),
      constraints: constraints,
      tags: tags.join(','),
      score: score,
      contests: []
    };
  
    try {
      const response = await fetch('https://api.yourdomain.com/submit-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className='submission-form'>
      <form onSubmit={handleSubmit} className="coding-question-form">
        <h2>Submit a New Coding Question</h2>
        <label>
          Question Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" />
        </label>
        <br />
        <label>
          Question Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-textarea" />
        </label>
        <br />
        <label>
          Constraints (optional):
          <input type="text" value={constraints} onChange={(e) => setConstraints(e.target.value)} className="form-input" />
        </label>
        <br />
        <h3>Example Test Cases:</h3>
        {testCases.map((testCase, index) => (
          <div key={index} className="test-case">
            <label>
              Test Case {index + 1} (Input and Output):
              <textarea value={testCase.content} onChange={(e) => setTestCases(testCases.map((tc, i) => (i === index ? { ...tc, content: e.target.value } : tc)))} className="form-textarea" placeholder="Format: input -> output" />
            </label>
            <br />
            <label>
              Explanation:
              <textarea value={testCase.explanation} onChange={(e) => setTestCases(testCases.map((tc, i) => (i === index ? { ...tc, explanation: e.target.value } : tc)))} className="form-textarea" />
            </label>
          </div>
        ))}
        <label>
          Solution:
          <textarea value={solution} onChange={(e) => setSolution(e.target.value)} className="form-textarea" />
        </label>
        <br />
        <label>
          Programming Language:
          <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} className="form-input" />
        </label>
        <br />
        <label>
          Tags:
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value.split(','))} className="form-input" />
        </label>
        <br />
        <label>
          Difficulty:
          <input type="text" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="form-input" />
        </label>
        <br />
        <label>
          Personal Review:
          <textarea value={review} onChange={(e) => setReview(e.target.value)} className="form-textarea" />
        </label>
        <br />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmissionForm;