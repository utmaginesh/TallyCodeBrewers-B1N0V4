import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

function CodeEditor() {
  const [code, setCode] = useState('// Write your code here');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [executionTime, setExecutionTime] = useState('N/A');
  const [memoryUsage, setMemoryUsage] = useState('N/A');
  const [outCame, setOutCame] = useState(false);

  const apiKey = 'YOUR_API_KEY';

  const languageOptions = {
    cpp: { id: 52, name: 'C++', defaultCode: '// Write your C++ code here' },
    python: { id: 71, name: 'Python', defaultCode: '# Write your Python code here' },
    java: { id: 62, name: 'Java', defaultCode: '// Write your Java code here' },
  };
  
  const compileAndRun = async () => {
    setIsLoading(true);
    setOutput('');
    setError('');
    setExecutionTime('N/A');
    setMemoryUsage('N/A');

    const body = {
      source_code: code,
      language_id: languageOptions[language].id,
      stdin: input,
    };

    try {
      const response = await axios.post(
        'https://judge0-ce.p.rapidapi.com/submissions?fields=*',
        body,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          },
        }
      );

      const submissionToken = response.data.token;

      const getResult = async () => {
        try {
          const resultResponse = await axios.get(
            `https://judge0-ce.p.rapidapi.com/submissions/${submissionToken}?base64_encoded=true`,
            {
              headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
              },
            }
          );

          const resultData = resultResponse.data;

          if (resultData.status.id <= 2) {
            setTimeout(getResult, 1000);
          } else {
            setIsLoading(false);

            const decodeBase64 = (str) => {
              return decodeURIComponent(escape(atob(str)));
            };

            const decodedOutput = resultData.stdout ? decodeBase64(resultData.stdout) : null;
            const decodedError = resultData.stderr ? decodeBase64(resultData.stderr) : null;
            const decodedCompileOutput = resultData.compile_output ? decodeBase64(resultData.compile_output) : null;

            setOutput(decodedOutput || decodedError || decodedCompileOutput || 'No output');

            setExecutionTime(resultData.time ? `${resultData.time} seconds` : 'N/A');
            setMemoryUsage(resultData.memory ? `${resultData.memory} KB` : 'N/A');
            setOutCame(true);
          }
        } catch (error) {
          setIsLoading(false);
          setError('Error fetching the result.');
          console.error('Result Fetching Error:', error.response ? error.response.data : error.message);
        }
      };

      getResult();
    } catch (error) {
      setIsLoading(false);
      setError('Error compiling or running the code.');
      console.error('Compilation Error:', error.response ? error.response.data : error.message);
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setCode(languageOptions[selectedLanguage].defaultCode);
  };

  return (
    <div style={{ padding: '15px', color: '#d4d4d4' }}>
      <div style={{ display: 'flex', gap: '10px',backgroundColor: '#1e1e1e' }}>
        <div style={{ flex: 2, padding: '12px', border: '2px solid #3c3c3c', borderRadius: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', borderBottom: '2px solid #3c3c3c', paddingBottom: '10px' }}>
            <select
              id="language-select"
              value={language}
              onChange={handleLanguageChange}
              style={{
                padding: '5px',
                fontSize: '16px',
                backgroundColor: '#252526',
                color: '#d4d4d4',
                border: '1px solid #3c3c3c',
                borderRadius: '4px',
              }}
            >
              {Object.keys(languageOptions).map((key) => (
                <option key={key} value={key}>
                  {languageOptions[key].name}
                </option>
              ))}
            </select>
            <button
              onClick={compileAndRun}
              style={{
                marginLeft: '10px',
                padding: '5px 10px',
                fontSize: '14px',
                backgroundColor: '#007acc',
                color: '#fff',
                border: '1px solid #007acc',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              disabled={isLoading}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#005a9e'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007acc'}
            >
              {isLoading ? 'Running...' : 'Run'}
            </button>
          </div>
          <Editor
            height="75vh"
            language={language}
            value={code}
            onChange={setCode}
            theme="vs-dark"
            options={{ fontSize: 16, minimap: { enabled: false }, lineNumbers: 'on' }}
            beforeMount={(monaco) => {
              monaco.editor.defineTheme('my-dark-theme', {
                base: 'vs-dark',
                inherit: true,
                rules: [
                  { token: 'lineNumber', foreground: 'f8f8f2', fontStyle: 'italic' },
                ],
                colors: {
                  'editorLineNumber.foreground': '#d4d4d4',
                },
              });
              monaco.editor.setTheme('my-dark-theme');
            }}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px', border: '2px solid #3c3c3c', borderRadius: '4px' }}>
          <textarea
            rows="5"
            placeholder="Enter custom input here..."
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              marginBottom: '10px',
              backgroundColor: '#252526',
              color: '#d4d4d4',
              border: '2px solid #3c3c3c',
              borderRadius: '4px',
            }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {outCame && (
            <>
              <h3 style={{ borderBottom: '2px solid #3c3c3c', paddingBottom: '10px', marginBottom: '10px' }}>Output</h3>
              <div
                style={{
                  padding: '10px',
                  backgroundColor: '#252526',
                  border: '2px solid #3c3c3c',
                  borderRadius: '4px',
                  minHeight: '150px',
                  overflowY: 'auto',
                  fontFamily: 'monospace',
                  color: '#d4d4d4',
                }}
              >
                <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                  {output}
                </pre>
              </div>
              <div style={{ marginTop: '10px', fontSize: '14px', color: '#d4d4d4' }}>
                <strong>Execution Time:</strong>
                <span style={{ borderBottom: '1px solid #d4d4d4', marginLeft: '5px' }}>{executionTime}</span>
              </div>
              <div style={{ marginTop: '5px', fontSize: '14px', color: '#d4d4d4' }}>
                <strong>Memory Usage:</strong>
                <span style={{ borderBottom: '1px solid #d4d4d4', marginLeft: '5px' }}>{memoryUsage}</span>
              </div>
              {error && (
                <div style={{ marginTop: '20px', color: 'red' }}>
                  <strong>Error:</strong> {error}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
