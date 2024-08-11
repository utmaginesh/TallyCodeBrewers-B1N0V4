import React, { useState, useEffect } from 'react';
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp';
import axios from 'axios'; 
import './ProblemsPage.css';
import Arena from './Arena';
import { Button } from '@mui/material';

const ProblemsPage = ( OpenSidebar) => {
  const problemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [solvedProblems, setSovedProblems] = useState([]);
  const [isProblemClicked, setIsProblemClicked] = useState(false);
  const [index, setIndex] = useState(null);
  const handleBackClick = ()=>{
    setIsProblemClicked(false);
  }
  

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/problemspage'); 
        setProblems(response.data);

        const solvedResponse = await axios.post(`http://localhost:8080/api/solvedproblems/${1}`);
        setSovedProblems(solvedResponse.data);
        console.log(solvedResponse.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch problems');
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const getDifficultyClass = (difficulty) => {
    if (difficulty === 'Easy') {
      return 'difficulty-easy';
    } else if (difficulty === 'Medium') {
      return 'difficulty-medium';
    } else if (difficulty === 'Hard') {
      return 'difficulty-hard';
    }
    return '';
  };

  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = problems.slice(indexOfFirstProblem, indexOfLastProblem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleProblemClick = (index) => {
    setIndex(index);
    setIsProblemClicked(true);
    OpenSidebar();
  }
  

  return (
    <div>
      {!isProblemClicked && (
        <div className="nova-table">
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Title</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {currentProblems.map((problem, index) => {
                const problemNumber = indexOfFirstProblem + index + 1; 
                return (
                  <tr key={problem.id}>
                    <td>{solvedProblems.includes(problem.id) ? <TaskAltSharpIcon color='success' /> : null}</td>
                    <td style={{ cursor: 'pointer' }} onClick={() => handleProblemClick(index)}>
                      {`${problemNumber}. ${problem.title}`}
                    </td>
                    <td className={getDifficultyClass(problem.level)}>
                      {problem.level}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="pagination">
            {Array.from({ length: Math.ceil(problems.length / problemsPerPage) }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {isProblemClicked && (
        <Arena problem={problems[index]} index={index} handleBackClick={handleBackClick}/>
      )}
    </div>
  );
};

export default ProblemsPage;
