import React from 'react';
import './Leaderboard.css';

function Leaderboard() {
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
      

  return (
    <div >
        <h1>Leaderboard</h1>
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
  );
}

export default Leaderboard;