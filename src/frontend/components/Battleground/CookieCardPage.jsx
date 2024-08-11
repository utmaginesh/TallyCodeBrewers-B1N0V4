import React, { useState, useEffect, useContext } from 'react';
import CookieCard from './CookieCard';
import './CookieCardPage.css';
import axios from 'axios';
import ContestProblems from './ContestProblems';
import { UserContext } from '../../../../UserContext';

// Define static colors
const staticColors = [
  'linear-gradient(to right, rgb(255, 87, 34), rgb(255, 138, 101))',
  'linear-gradient(to right, rgb(31, 111, 177), rgb(17, 147, 207))',
  'linear-gradient(to right, rgb(66, 169, 69), rgb(124, 185, 54))',
  'linear-gradient(to right, rgb(202, 154, 9), rgb(204, 164, 44))',
  'linear-gradient(rgb(134, 27, 153), rgb(173, 32, 198))',
];


const CookieCardPage = () => {
  const [cardData, setCardData] = useState([]);
  const [isJoinClicked, setIsJoinedClicked] = useState(false);
  const [contestId, setContestId] = useState(null);
  const {user} = useContext(UserContext);
  const handleJoin = async (id) =>{
    setContestId(id);
    try{
      console.log(id);
      console.log(user);
      const response = await axios.post(`http://localhost:8080/api/resgisterUserContest/${id}/${user}`);
      console.log(response.data);
      setIsJoinedClicked(true);
    }catch(error){
      console.error("Error registering ContestUser: " + error);
    }


  }
  const handleBack = ()=>{
    setIsJoinedClicked(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/getContestData'); 
        const data =response.data;
        
        // Map static colors to the fetched data
        const dataWithColors = data.map((card, index) => ({
          ...card,
          background: staticColors[index % staticColors.length], 
        }));

        setCardData(dataWithColors);
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    {!isJoinClicked && (
      <div className="cookieCardPage">
        {cardData.map((card, index) => (
          <CookieCard
          key={index}
          background={card.background}
          heading={card.contestname}
          description={card.contestdesc}
          buttonText={"Join Now"}
          startTime={card.startTime}
          endTime={card.endTime}
          handleJoin = {handleJoin}
          isJoinClicked = {isJoinClicked}
          cardId = {card.id}
            />
          ))}
      </div>)}

      {isJoinClicked && (
      <ContestProblems contestId = {contestId} handleBack={handleBack}/>
      )}

    </>
  );
};

export default CookieCardPage;
