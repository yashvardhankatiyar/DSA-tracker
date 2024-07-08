import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Card = ({ info, index }) => {
  const navigate = useNavigate();

  const handleClick = (info) => {
    navigate(`/question/${info}`);
  };


  return (
    <Box
      onClick={() => handleClick(info.type)}
      key={index}
      margin="10px"
      className="topic-Box"
      height="85px"
      width="350px"
      justifyContent="center"
      display="flex"
      sx={{
        border: "4px solid black",
        borderRadius: "10px",
        alignItems: "center",
        backgroundColor: "#2F3C7E",
        boxShadow: 5,
        cursor: "pointer",
      }}
    >
      <Typography fontFamily="'Poppins', sans-serif" fontSize="25px" color="white">
        {info.type}
      </Typography>
    </Box>
  );
};

export default Card;