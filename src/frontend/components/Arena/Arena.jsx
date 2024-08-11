import React, { useState, useRef, useEffect, useContext } from 'react';
import "./Arena.css";
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { Box, Button, Modal, Typography } from '@mui/material';
import { UserContext } from '../../../../UserContext';

const Arena = ({ problem, index, handleBackClick, contestId}) => {
    const apiKey = 'YOUR_API_KEY';
    const {user} = useContext(UserContext);
    const [code, setCode] = useState('// Write your code here');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [Exoutput, setExOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCustomLoading, setIsCustomLoading] = useState(false);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [error, setError] = useState('');
    const [language, setLanguage] = useState('cpp');
    const [executionTime, setExecutionTime] = useState('N/A');
    const [memoryUsage, setMemoryUsage] = useState('N/A');
    const [outCame, setOutCame] = useState(false);
    const [solved, setSolved] = useState(false);
    const [selectedTestCase, setSelectedTestCase] = useState(null);
    const [testCase, setTestCase] = useState([]);
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [custominput, setCustomInput] = useState('');
    const [cusoutput, setcusOutput] = useState('');
    const [cusoutputcame, setCusoutCame] = useState(false);
    const [tResult, setResult] = useState([]);
    const [toutput, settOutput] = useState([]);
    const [tExecutionTime, settExecutionTime] = useState([]);
    const [tMemoryUsage, settMemoryUsage] = useState([]);
    const [open, setOpen] = useState(false);
    const [tpassed, settpassed] = useState(null);




    useEffect(() => {
        const fetchProblemData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/gettestcases/${problem.id}`);
                setTestCase(response.data);
            } catch (error) {
                console.error('Error fetching problem data:', error);
                setError('Error fetching problem data.');
            }
        };

        fetchProblemData();
    }, [index]);

    const languageOptions = {
        cpp: { id: 52, name: 'C++', defaultCode: '// Write your C++ code here' },
        python: { id: 71, name: 'Python', defaultCode: '# Write your Python code here' },
        java: { id: 62, name: 'Java', defaultCode: '// Write your Java code here' },
    };

    const problemTestCasesRef = useRef(null);

    const customCompile = async () => {
        setIsCustomLoading(true);
        setcusOutput('');
        setError('');
        setExecutionTime('N/A');
        setMemoryUsage('N/A');
        const body = {
            source_code: code,
            language_id: languageOptions[language].id,
            stdin: custominput,
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

                        setcusOutput(decodedOutput || decodedError || decodedCompileOutput || 'No output');

                        setExecutionTime(resultData.time ? `${resultData.time} seconds ` : 'N/A');
                        setMemoryUsage(resultData.memory ? `${resultData.memory} KB ` : 'N/A');
                        setIsCustomLoading(false);
                        setCusoutCame(true);
                    }
                } catch (error) {
                    setIsCustomLoading(false);
                    setError('Error fetching the result.');
                    console.error('Result Fetching Error:', error.response ? error.response.data : error.message);
                }
            };

            getResult();
        } catch (error) {
            setIsCustomLoading(false);
            setError('Error compiling or running the code.');
            console.error('Compilation Error:', error.response ? error.response.data : error.message);
        }
    };

    const getoutput = async (tinput, toutput, tcode) => {
        const body = {
            source_code: tcode,
            language_id: languageOptions[language].id,
            stdin: tinput,
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
                        // Wait before checking the result again
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        return getResult(); // Recursive call
                    } else {
                        const decodeBase64 = (str) => {
                            return decodeURIComponent(escape(atob(str)));
                        };
    
                        const decodedOutput = resultData.stdout ? decodeBase64(resultData.stdout) : null;
                        const decodedError = resultData.stderr ? decodeBase64(resultData.stderr) : null;
                        const decodedCompileOutput = resultData.compile_output ? decodeBase64(resultData.compile_output) : null;
    
                        const output = decodedOutput || decodedError || decodedCompileOutput || 'No output';
                        const executionTime = resultData.time ? `${resultData.time} seconds` : 'N/A';
                        const memoryUsage = resultData.memory ? `${resultData.memory} KB` : 'N/A';
                        console.log(output);
                        return {
                            success: resultData.status.id === 3 && (output.trim() === toutput.trim() || (output === 'No output' && toutput === '')), // Success if status id is 3
                            output,
                            executionTime,
                            memoryUsage,
                        };
                    }
                } catch (error) {
                    console.error('Result Fetching Error:', error.response ? error.response.data : error.message);
                    throw new Error('Error fetching the result.');
                }
            };
    
            return await getResult();
        } catch (error) {
            console.error('Compilation Error:', error.response ? error.response.data : error.message);
            throw new Error('Error compiling or running the code.');
        }
    };
    


    const compileAndRun = async () => {
        setOutCame(false);
        setIsLoading(true);
        setOutput('');
        settOutput([]);
        settExecutionTime([]);
        settMemoryUsage([]);
        setResult([]);
        setError('');
        setExecutionTime('N/A');
        setMemoryUsage('N/A');
    
        const results = [];
        const outputList = [];
        const texecution = [];
        const tmemory = [];
        
        try {
            for (let i = 0; i < Math.min(2, testCase.length); i++) {
                const testcase = testCase[i];
                const { input, output } = testcase;
                const result = await getoutput(input, output, code);
                
                results.push(result.success);
                outputList.push(result.output);
                texecution.push(result.executionTime);
                tmemory.push(result.memoryUsage);
                
                setExecutionTime(result.executionTime);
                setMemoryUsage(result.memoryUsage);
            }
            console.log(results);
            console.log(outputList);
    
            setResult(results);
            settOutput(outputList);
            settExecutionTime(texecution);
            settMemoryUsage(tmemory);

            setOutCame(true);
            if (problemTestCasesRef.current) {
                problemTestCasesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            document.querySelectorAll('.test-case-button').forEach((button, index) => {
                const resultClass = results[index] ? 'pass' : 'fail';
                button.classList.add(resultClass);
            });

        } catch (error) {
            setIsLoading(false);
            setError('Error compiling or running the code.');
        } finally {
            setIsLoading(false);
        }
    };
    

    const handleSubmit = async () => {
        settpassed(null);
        setOutCame(false);
        setIsSubmitLoading(true);
        setOutput('');
        settOutput([]);
        settExecutionTime([]);
        settMemoryUsage([]);
        setResult([]);
        setError('');
        setExecutionTime('N/A');
        setMemoryUsage('N/A');
    
        const results = [];
        try {
            for (let i = 0; i < testCase.length; i++) {
                const { input, output } = testCase[i];
                const result = await getoutput(input, output, code);
    
                results.push(result.success);
            }
            console.log(results);
    
            let passedCount = 0;
            for (let j = 0; j < results.length; j++) {
                if (results[j]) {
                    passedCount++;
                }
            }
            settpassed(passedCount);
            console.log(passedCount);
            console.log(results);
            
            setResult(results);
            setOutCame(true);
            // setTimeout(1000)
            // try{
            //     const res = await axios.post(`http://localhost:8080/api/updateUserContest/${contestId}/${user}/${index}`,{
            //         score : (passedCount * problem.score) / results.length,
            //         solution : code,
            //         language : language
            //     });
            //     console.log(res);
            // }catch(error){
            //     console.log("Error Updating submit : " + error);
            // }
            setOpen(true);
    
        } catch (error) {
            setError('Error compiling or running the code.');
        } finally {
            setIsSubmitLoading(false);
        }
    };
    

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
        setCode(languageOptions[selectedLanguage].defaultCode);
    };

    const handleTestCaseChange = (id, index) => {
        setSelectedTestCase(id);
        const selectedCase = testCase.find(tc => tc.id === id);
        if (selectedCase) {
            setInput(selectedCase.input);
            setExOutput(selectedCase.output);
            setOutput(toutput[index]);
            setExecutionTime(tExecutionTime[index]);
            setMemoryUsage(tMemoryUsage[index]);
        }
    };
    const handleCustomCheck = () =>{
        setShowCustomInput(prev => !prev);
        setCustomInput('');
        setError('');
        setcusOutput('');
        setExecutionTime('N/A');
        setMemoryUsage('N/A');
    }
    const getColorClass = (id, index) => {
        // console.log(t)
        if(outCame && tResult[index] && selectedTestCase === id )
            return "green"
        if(outCame && !tResult[index] && selectedTestCase === id )
            return "red"
        else
            return "#104f79"
    }


    const formatTestCases = () => {
        if (testCase.length < 2) return '';
        const [first, second] = testCase;
        return (
            `Example 1:\n\nInput: ${first.input}\n\nOutput: ${first.output}\n\n` +
            `Example 2:\n\nInput: ${second.input}\n\nOutput: ${second.output}`
        );
    };
    useEffect(() => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { 
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { 
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { 
            document.documentElement.msRequestFullscreen();
        }
    }, []);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    

    return (
        <>
        <Button sx={{ backgroundColor: 'rgb(203, 52, 52)', marginRight: "91%" }} variant="contained" color='secondary' onClick={handleBackClick}>Back</Button>
        <div className="problem-page">
            <div className="problem-header">
                <div className="problem-title">
                    <h2>{`${index + 1}. ${problem.title} (${problem.level})`}</h2>
                </div>
            </div>
            <div className="problem-content">
                <div className="problem-description">
                    <h3>Description</h3>
                    <p>{problem.description}</p>
                    <h3>Examples:</h3>
                    <pre style={{ fontSize: "17px" }}>{formatTestCases()}</pre>
                </div>
                <div className="problem-code">
                    <div className="code-header">
                        <select
                            id="language-select"
                            value={language}
                            onChange={handleLanguageChange}
                        >
                            {Object.keys(languageOptions).map((key) => (
                                <option key={key} value={key}>
                                    {languageOptions[key].name}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={compileAndRun}
                            disabled={isLoading || showCustomInput}>
                            {isLoading ? 'Running...' : 'Run'}
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitLoading || showCustomInput}>
                            {isSubmitLoading ? 'Submitting...' : 'Submit'}
                        </button>
                        <Modal
                            open={open}
                            onClose={() => setOpen(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description">
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Compilation Finished
                                </Typography>
                                 <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    {/* {outCame ? ( */}
                                    <>
                                        <div>Number of test cases passed: {tpassed} / {tResult.length}</div>
                                    </>
                                    {/* ) : (
                                    'Loading content...'
                                    )} */}
                             </Typography>
                            </Box>
                        </Modal>


                    </div>
                    <Editor
                        height="65vh"
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
                    <div style={{ marginTop: "7px" }}>
                        <label>
                            <input
                                type="checkbox"
                                checked={showCustomInput}
                                onChange={handleCustomCheck}
                            />
                            Custom Input
                        </label>
                    </div>
                    {showCustomInput ? (
                        <div className="custom-input-section">
                            <textarea
                                rows="4"
                                cols="30"
                                placeholder="Enter custom input here..."
                                style={{
                                    fontSize: '16px',
                                    marginTop: '20px',
                                    backgroundColor: '#252526',
                                    color: '#d4d4d4',
                                    border: '2px solid #3c3c3c',
                                    borderRadius: '4px',
                                }}
                                value={custominput}
                                onChange={(e) => setCustomInput(e.target.value)}
                            />
                            <button
                                onClick={customCompile}
                                disabled={isCustomLoading}>
                                {isCustomLoading ? 'Running...' : 'Run'}
                            </button>
                            {cusoutputcame && ( <>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <b>Output:</b>
                                <textarea
                                    value={cusoutput}
                                    disabled
                                    rows="4"
                                    style={{
                                        width: "45%"
                                    }}
                                    className="test-case-input"
                                />
                            </div>
                            <div style={{ marginTop: '10px', fontSize: '14px', color: '#d4d4d4' }}>
                                <strong>Execution Time:</strong>
                                <span style={{ borderBottom: '1px solid #d4d4d4', marginLeft: '5px' }}>{executionTime}</span>
                            </div>
                            <div style={{ marginTop: '5px', fontSize: '14px', color: '#d4d4d4' }}>
                                <strong>Memory Usage:</strong>
                                <span style={{ borderBottom: '1px solid #d4d4d4', marginLeft: '5px' }}>{memoryUsage}</span>
                             </div></>)}
                        </div>
                    ) : (
                        <div className="problem-test-cases" ref={problemTestCasesRef}>
                            <h3>Test Cases</h3>
                            <div className="test-cases">
                                {testCase.slice(0, 2).map((tc, index) => (
                                    <button
                                        key={tc.id}
                                        data-id={tc.id}
                                        style={{ backgroundColor: getColorClass(tc.id, index) }}
                                        className={`test-case-button`}
                                        onClick={() => handleTestCaseChange(tc.id, index)}>
                                        Test Case {tc.id}
                                    </button>
                                ))}
                            </div>
                            <br />
                            {selectedTestCase !== null && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '60%' }}>
                                    <b>Sample Input: </b>
                                    <textarea
                                        value={input}
                                        disabled
                                        rows='4'
                                        className="test-case-input" />
                                    <b>Expected Output:</b>
                                    <textarea
                                        value={Exoutput}
                                        disabled
                                        rows='4'
                                        className="test-case-input"
                                    />
                                    {outCame && (
                                        <>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <b>Output:</b>
                                                <textarea
                                                    value={output}
                                                    disabled
                                                    className="test-case-input"
                                                    rows="5"
                                                    />
                                            </div>
                                            <div style={{ marginTop: '10px', fontSize: '14px', color: '#d4d4d4' }}>
                                                <strong>Execution Time:</strong>
                                                <span style={{ borderBottom: '1px solid #d4d4d4', marginLeft: '5px' }}>{executionTime}</span>
                                             </div>
                                            <div style={{ marginTop: '5px', fontSize: '14px', color: '#d4d4d4' }}>
                                                <strong>Memory Usage:</strong>
                                                <span style={{ borderBottom: '1px solid #d4d4d4', marginLeft: '5px' }}>{memoryUsage}</span>
                                            </div>
                                        </>
                                        
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default Arena;
