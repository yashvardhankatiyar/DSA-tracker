import { Box, Checkbox, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Ques = ({ id, Q, link, status, updateStatus }) => {
  const [stat, setStat] = useState(status);

  const handleCheckboxChange = () => {
    const newStatus = stat === 'incomplete' ? 'complete' : 'incomplete';
    setStat(newStatus);
    updateStatus(id, newStatus);
  };

  return (
    <Link to={link} target="_blank">
      <Box
        margin='10px'
        height="120px"
        width="300px"
        border="4px solid black"
        borderRadius="10px"
        p='10px'
        position="relative"
        sx={{
          cursor: "pointer",
          textAlign: "center",
          backgroundColor: "#161F38",
        }}
        className='topic-Box'
      >
        <Typography
          fontSize="15px"
          mt='5px'
          fontWeight='600'
          fontFamily="'Poppins', sans-serif"
          color='white'
          sx={{
            textDecoration: 'none'
          }}
        >
          {Q}
        </Typography>
        <Typography
          fontSize="10px"
          fontFamily="'Poppins', sans-serif"
          color='white'
          sx={{
            fontWeight: '600',
            position: "absolute",
            bottom: '5px',
            left: '10px',
            textAlign: "left",
            textDecoration: 'none'
          }}
        >
          Status: {stat}
        </Typography>
        <Checkbox
          checked={stat === 'complete'}
          onChange={handleCheckboxChange}
          sx={{
            position: "absolute",
            bottom: '0px',
            right: "0px",
          }}
        />
      </Box>
    </Link>
  );
};

export default Ques;
