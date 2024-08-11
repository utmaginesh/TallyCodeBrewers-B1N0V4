import React, { useState, useEffect } from 'react';
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp';
import axios from 'axios'; 
import './ContestProblems.css';
import Arena from '../Arena/Arena';
import { Button } from '@mui/material';

const ContestProblems = ({contestId, handleBack}) => {

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [solvedProblems, setSovedProblems] = useState([]);
  const [isProblemClicked, setIsProblemClicked] = useState(false);
  const [index, setIndex] = useState(null);
  const standings = [
    { place: 1, participant: 'Max Verstappen', solved: 5, score: 25 },
    { place: 2, participant: 'Lando Norris', solved: 4, score: 20 },
    { place: 3, participant: 'Charles Leclerc', solved: 4, score: 18 },
    { place: 4, participant: 'Oscar Piastri', solved: 3, score: 17 },
    { place: 5, participant: 'Carlos Sainz', solved: 3, score: 15 },
    { place: 6, participant: 'Lewis Hamilton', solved: 2, score: 14 },
    { place: 7, participant: 'Sergio Pérez', solved: 1, score: 12 },
    { place: 8, participant: 'George Russell', solved: 1, score: 10 },
    { place: 9, participant: 'Fernando Alonso', solved: 0, score: 8 },
  ];
  

  

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/getContestProblems/${contestId}`); 
        setProblems(response.data);

        // const solvedResponse = await axios.post(`http://localhost:8080/api/solvedproblems/${1}`);
        // setSovedProblems(solvedResponse.data);
        // console.log(solvedResponse.data);
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


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleProblemClick = (index) => {
    setIndex(index);
    setIsProblemClicked(true);
  }
  const handleBackClick = ()=>{
    setIsProblemClicked(false);
  }
  

  return (
    <div>
      {!isProblemClicked && (
        <div className="contest-table">
          <Button sx={{ backgroundColor: 'rgb(203, 52, 52)', marginRight: "91%" }} variant="contained" color='secondary' onClick={handleBack}>Back</Button>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem, index) => {
                const problemNumber = index + 1; 
                return (
                  <tr key={problem.id}>
                    <td style={{ cursor: 'pointer' }} onClick={() => handleProblemClick(index)}>
                      {`${problemNumber}. ${problem.title}`}
                    </td>
                    <td className={getDifficultyClass(problem.level)}>
                      {problem.level}
                    </td>
                    <td >
                      {problem.score}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div >
          <div style={{display: "flex", flexDirection: 'column', alignItems: 'center', padding: "0px 10px"}}>
          <h2 style={{color: "black"}}>Leaderboard</h2>
          <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Participant</th>
                        <th>Solved</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.slice(0, 5).map((standing) => (
                        <tr key={standing.place}>
                          <td>
                            <div>
                              {standing.place === 1 ? '🥇' : standing.place === 2 ? '🥈' : standing.place === 3 ? '🥉' : standing.place}
                            </div>
                          </td>
                          <td>
                            {standing.participant}
                          </td>
                          <td>{standing.solved}</td>
                          <td>{standing.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              </div>
          </div>
        )}

      {isProblemClicked && (
        <Arena problem={problems[index]} index={index} handleBackClick={handleBackClick} contestId = {contestId}/>
      )}
    </div>
  );
};

export default ContestProblems;
