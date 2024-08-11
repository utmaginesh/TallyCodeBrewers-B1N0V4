import React, { useState } from 'react';
import './CookieCard.css';
import ContestProblems from './ContestProblems';
import { Button } from '@mui/material';

const calculateTimeDifference = (time) => {
  const now = new Date();
  const targetTime = new Date(time);
  const difference = targetTime - now;

  if (difference <= 0) {
    return 'Expired';
  }

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  return `${seconds} second${seconds > 1 ? 's' : ''}`;
};

const CookieCard = ({ background, heading, description, buttonText, startTime, endTime ,contestId, handleJoin, isJoinClicked, cardId}) => {
  const now = new Date();
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);


  let timeInfo = '';

  if (now < startDate) {
    timeInfo = `Starts in ${calculateTimeDifference(startTime)}`;
  } else if (now > endDate) {
    timeInfo = 'Expired';
  } else {
    timeInfo = `Ends in ${calculateTimeDifference(endTime)}`;
  }



  return (
    <>
    {!isJoinClicked && (
      <>
      <div className="cookieCard" style={{ background }}>
        <div className="cookieContent">
          <p className="cookieHeading">{heading}</p>
          <p className="cookieDescription">
            {description} 
          </p>
          {/* {Date.now() < endDate && ( */}
          <button className="acceptButton" onClick={()=> handleJoin(cardId)}>{buttonText}</button>
          {/* )} */}
        </div>
        <div className="cookieTimes">
          <p>{timeInfo}</p>
        </div>
      </div></>
      )}

    </>
  );
};

export default CookieCard;